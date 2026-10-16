import { HttpClient, HttpHeaders, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HEARINGS_JOURNEY_HEADER } from '../../../common/hearings/telemetry-correlation';
import { hearingsJourneyInterceptor } from './hearings-journey.interceptor';
import { HearingsTelemetryService } from './hearings-telemetry.service';

describe('Hearings journey interceptor', () => {
  const journeyA = 'a'.repeat(32);
  const journeyB = 'b'.repeat(32);
  let currentJourney: { journeyId: string } | null;
  let http: HttpClient;
  let requests: HttpTestingController;
  let readJourney: jasmine.Spy;

  beforeEach(() => {
    currentJourney = { journeyId: journeyA };
    readJourney = jasmine.createSpy('readJourney').and.callFake(() => currentJourney);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([hearingsJourneyInterceptor])),
        provideHttpClientTesting(),
        { provide: Window, useValue: window },
        {
          provide: HearingsTelemetryService,
          useValue: {
            get requestJourneyId() {
              return readJourney()?.journeyId;
            },
          },
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    requests = TestBed.inject(HttpTestingController);
  });

  afterEach(() => requests.verify());

  [
    'api/hearings/getHearings?caseId=private-case',
    '/api/hearings/submitHearingRequest',
    '/api/prd/lov/getLovRefData',
    '/api/prd/caseFlag/getCaseFlagRefData',
    '/api/prd/location/getLocationById',
    '/api/prd/judicial/searchJudicialUserByPersonalCodes',
    '/refdata/commondata/lov/categories/CaseLinkingReasonCode',
    `${window.location.origin}/api/hearings/getHearing`,
  ].forEach((url) => {
    it(`adds only the anonymous journey header for ${url}`, () => {
      http.get(url).subscribe();
      const request = requests.expectOne(url);
      expect(request.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe(journeyA);
      expect(request.request.headers.keys()).toEqual([HEARINGS_JOURNEY_HEADER]);
      request.flush({});
    });
  });

  [
    'https://external.example/api/hearings/getHearing',
    '//external.example/api/hearings/getHearing',
    `${window.location.origin}.external.example/api/hearings/getHearing`,
    '/api/monitoring-tools',
    '/api/cases',
    '/assets/config.json',
    '/api/hearings-other',
    '/api/prd/unrelated/getData',
    '/hearings/request/hearing-stage',
  ].forEach((url) => {
    it(`does not send the journey ID to ${url}`, () => {
      http.get(url).subscribe();
      const request = requests.expectOne(url);
      expect(request.request.headers.has(HEARINGS_JOURNEY_HEADER)).toBeFalse();
      expect(readJourney).not.toHaveBeenCalled();
      request.flush({});
    });
  });

  [null, { journeyId: 'private-case' }, { journeyId: '1234567890123456' }, { journeyId: 'a'.repeat(33) }].forEach((journey) => {
    it(`preserves requests without an active valid journey: ${JSON.stringify(journey)}`, () => {
      currentJourney = journey;
      http.get('/api/hearings/getHearing').subscribe();
      const request = requests.expectOne('/api/hearings/getHearing');
      expect(request.request.headers.has(HEARINGS_JOURNEY_HEADER)).toBeFalse();
      request.flush({});
    });
  });

  it('keeps the initiating ID on in-flight requests after switching journeys and clears it on exit', () => {
    const received = jasmine.createSpy('received');
    http.get('/api/hearings/first').subscribe(received);
    const first = requests.expectOne('/api/hearings/first');
    currentJourney = { journeyId: journeyB };
    http.get('/api/hearings/second').subscribe();
    const second = requests.expectOne('/api/hearings/second');
    expect(first.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe(journeyA);
    expect(second.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe(journeyB);
    currentJourney = null;
    http.get('/api/hearings/third').subscribe();
    const third = requests.expectOne('/api/hearings/third');
    expect(third.request.headers.has(HEARINGS_JOURNEY_HEADER)).toBeFalse();
    second.flush({});
    first.flush({ original: 'response' });
    third.flush({});
    expect(received).toHaveBeenCalledOnceWith({ original: 'response' });
  });

  it('preserves request bodies, options, existing headers and native trace correlation headers', () => {
    const body = { caseReference: 'private-case', formValue: 'private-form' };
    const headers = new HttpHeaders({ Authorization: 'existing-token', traceparent: 'existing-trace', 'X-XSRF-TOKEN': 'xsrf' });
    http.post('/api/hearings/submitHearingRequest', body, { headers, withCredentials: true }).subscribe();
    const request = requests.expectOne('/api/hearings/submitHearingRequest');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBe(body);
    expect(request.request.withCredentials).toBeTrue();
    expect(request.request.headers.get('Authorization')).toBe('existing-token');
    expect(request.request.headers.get('traceparent')).toBe('existing-trace');
    expect(request.request.headers.get('X-XSRF-TOKEN')).toBe('xsrf');
    expect(request.request.headers.get(HEARINGS_JOURNEY_HEADER)).toBe(journeyA);
    request.flush({});
  });

  it('still sends exactly one unchanged request when telemetry fails and preserves HTTP errors', () => {
    readJourney.and.throwError('Telemetry unavailable');
    const received = jasmine.createSpy('received');
    http.get('/api/hearings/getHearing').subscribe({ error: received });
    const request = requests.expectOne('/api/hearings/getHearing');
    expect(request.request.headers.has(HEARINGS_JOURNEY_HEADER)).toBeFalse();
    request.flush({ error: 'original' }, { status: 503, statusText: 'Unavailable' });
    expect(received).toHaveBeenCalledTimes(1);
    expect(received.calls.first().args[0].status).toBe(503);
    expect(received.calls.first().args[0].error).toEqual({ error: 'original' });
  });
});
