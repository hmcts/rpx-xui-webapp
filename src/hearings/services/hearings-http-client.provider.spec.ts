import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { createEnvironmentInjector, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HEARINGS_IDENTIFIER_HEADERS, HEARINGS_JOURNEY_HEADER } from '../../../common/hearings/telemetry-correlation';
import { provideHearingsHttpClient } from './hearings-http-client.provider';
import { hearingsJourneyInterceptor } from './hearings-journey.interceptor';
import { HearingsTelemetryService } from './hearings-telemetry.service';
import { HearingsService } from './hearings.service';

describe('Lazy Cases/Hearings HTTP correlation provider', () => {
  let child: EnvironmentInjector;
  let requests: HttpTestingController;
  let readJourney: jasmine.Spy;
  let legacyInterceptor: jasmine.Spy;
  let rootInterceptor: jasmine.Spy;
  let currentJourney: string | null;

  beforeEach(() => {
    currentJourney = 'a'.repeat(32);
    readJourney = jasmine.createSpy('readJourney').and.callFake(() => currentJourney);
    legacyInterceptor = jasmine.createSpy('legacyInterceptor').and.callFake((request, next) => next.handle(request));
    rootInterceptor = jasmine.createSpy('rootInterceptor').and.callFake((request, next) => next(request));
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([hearingsJourneyInterceptor, rootInterceptor]), withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: Window, useValue: window },
        { provide: HTTP_INTERCEPTORS, multi: true, useValue: { intercept: legacyInterceptor } },
        {
          provide: HearingsTelemetryService,
          useValue: {
            get requestJourneyId() {
              return readJourney();
            },
            get requestIdentifiers() {
              return { caseId: 'case-a', hearingId: 'hearing-a', jurisdiction: 'CIVIL' };
            },
            captureException: () => () => {},
          },
        },
      ],
    });
    // The exact provider shared by CasesModule and HearingsModule, under a real root client.
    child = createEnvironmentInjector(
      [
        provideHearingsHttpClient(),
        provideHttpClientTesting(),
        HearingsService,
        { provide: HttpXsrfTokenExtractor, useValue: { getToken: () => 'feature-xsrf-token' } },
      ],
      TestBed.inject(EnvironmentInjector)
    );
    requests = child.get(HttpTestingController);
  });

  afterEach(() => {
    requests.verify();
    TestBed.inject(HttpTestingController).verify();
    child.destroy();
  });

  it('adds correlation to a real feature-scoped HearingsService call exactly once', () => {
    expect(child.get(HttpClient)).not.toBe(TestBed.inject(HttpClient));
    const received = jasmine.createSpy('received');
    child.get(HearingsService).getAllHearings('case-a').subscribe(received);
    const request = requests.expectOne('api/hearings/getHearings?caseId=case-a');
    expect(request.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe('a'.repeat(32));
    expect(request.request.headers.get(HEARINGS_IDENTIFIER_HEADERS.caseId)).toBe('case-a');
    expect(request.request.headers.get(HEARINGS_IDENTIFIER_HEADERS.hearingId)).toBe('hearing-a');
    expect(request.request.headers.get(HEARINGS_IDENTIFIER_HEADERS.jurisdiction)).toBe('CIVIL');
    expect(readJourney).toHaveBeenCalledTimes(1);
    expect(legacyInterceptor).toHaveBeenCalledTimes(1);
    expect(rootInterceptor).not.toHaveBeenCalled();
    const response = { caseRef: 'case-a', caseHearings: [] };
    request.flush(response);
    expect(received).toHaveBeenCalledOnceWith(response);
  });

  it('does not forward feature correlation to external or unrelated endpoints', () => {
    for (const url of ['https://external.example/api/hearings/getHearing', '/api/cases']) {
      child.get(HttpClient).get(url).subscribe();
      const request = requests.expectOne(url);
      expect(request.request.headers.has(HEARINGS_JOURNEY_HEADER)).toBeFalse();
      expect(request.request.headers.has(HEARINGS_IDENTIFIER_HEADERS.caseId)).toBeFalse();
      request.flush({});
    }
    expect(readJourney).not.toHaveBeenCalled();
    expect(legacyInterceptor).toHaveBeenCalledTimes(2);
  });

  it('also correlates a nested feature client without running parent interceptors twice', () => {
    const nested = createEnvironmentInjector([provideHearingsHttpClient(), provideHttpClientTesting(), HearingsService], child);
    try {
      nested.get(HearingsService).getAllHearings('case-a').subscribe();
      const controller = nested.get(HttpTestingController);
      const request = controller.expectOne('api/hearings/getHearings?caseId=case-a');
      expect(request.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe('a'.repeat(32));
      expect(readJourney).toHaveBeenCalledTimes(1);
      expect(legacyInterceptor).toHaveBeenCalledTimes(1);
      expect(rootInterceptor).not.toHaveBeenCalled();
      request.flush({});
      controller.verify();
    } finally {
      nested.destroy();
    }
  });

  it('deduplicates correlation when CasesModule and its imported HearingsModule share one injector', () => {
    const combined = createEnvironmentInjector(
      [provideHearingsHttpClient(), provideHearingsHttpClient(), provideHttpClientTesting(), HearingsService],
      TestBed.inject(EnvironmentInjector)
    );
    try {
      combined.get(HearingsService).getAllHearings('case-a').subscribe();
      const controller = combined.get(HttpTestingController);
      const request = controller.expectOne('api/hearings/getHearings?caseId=case-a');
      expect(request.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe('a'.repeat(32));
      expect(readJourney).toHaveBeenCalledTimes(1);
      expect(legacyInterceptor).toHaveBeenCalledTimes(1);
      request.flush({});
      controller.verify();
    } finally {
      combined.destroy();
    }
  });

  it('preserves bodies, auth/native-trace headers, credentials and feature XSRF handling', () => {
    const body = { caseReference: 'case-a', formValue: 'not-telemetry' };
    const headers = new HttpHeaders({ Authorization: 'unchanged', traceparent: 'native-trace' });
    child.get(HttpClient).post('/api/hearings/submitHearingRequest', body, { headers, withCredentials: true }).subscribe();
    const request = requests.expectOne('/api/hearings/submitHearingRequest');
    expect(request.request.body).toBe(body);
    expect(request.request.withCredentials).toBeTrue();
    expect(request.request.headers.get('Authorization')).toBe('unchanged');
    expect(request.request.headers.get('traceparent')).toBe('native-trace');
    expect(request.request.headers.get('X-XSRF-TOKEN')).toBe('feature-xsrf-token');
    expect(request.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe('a'.repeat(32));
    expect(legacyInterceptor).toHaveBeenCalledTimes(1);
    request.flush({});
  });

  it('preserves HTTP errors if correlation fails, without sending twice', () => {
    readJourney.and.throwError('Telemetry unavailable');
    const error = jasmine.createSpy('error');
    child.get(HearingsService).getAllHearings('case-a').subscribe({ error });
    const request = requests.expectOne('api/hearings/getHearings?caseId=case-a');
    expect(request.request.headers.has(HEARINGS_JOURNEY_HEADER)).toBeFalse();
    request.flush({ original: true }, { status: 503, statusText: 'Unavailable' });
    expect(error).toHaveBeenCalledOnceWith(jasmine.objectContaining({ status: 503, error: { original: true } }));
    expect(legacyInterceptor).toHaveBeenCalledTimes(1);
  });

  it('uses the latest journey for later calls, and sends no metadata after leaving Hearings', () => {
    const http = child.get(HttpClient);
    http.get('/api/hearings/first').subscribe();
    const first = requests.expectOne('/api/hearings/first');
    currentJourney = 'b'.repeat(32);
    http.get('/api/hearings/second').subscribe();
    const second = requests.expectOne('/api/hearings/second');
    currentJourney = null;
    http.get('/api/hearings/third').subscribe();
    const third = requests.expectOne('/api/hearings/third');
    expect(first.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe('a'.repeat(32));
    expect(second.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe('b'.repeat(32));
    expect(third.request.headers.has(HEARINGS_JOURNEY_HEADER)).toBeFalse();
    first.flush({});
    second.flush({});
    third.flush({});
  });
});
