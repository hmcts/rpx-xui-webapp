import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractAppConfig, DocumentUrlPipe } from '@hmcts/ccd-case-ui-toolkit';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MediaViewerModule } from '@hmcts/media-viewer';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { MediaViewerWrapperComponent } from './media-viewer-wrapper.component';
import { RpxTranslationModule } from 'rpx-xui-translation';
import createSpyObj = jasmine.createSpyObj;
import { Title } from '@angular/platform-browser';

const GATEWAY_DOCUMENT_URL = 'http://localhost:1234/documents';
const REMOTE_DOCUMENT_URL = 'https://www.example.com/binary';
const MEDIA_VIEWER_DATA = {
  document_binary_url: GATEWAY_DOCUMENT_URL,
  document_filename: 'sample.pdf',
  content_type: 'pdf',
};

describe('MediaViewerWrapperComponent', () => {
  let component: MediaViewerWrapperComponent;
  let fixture: ComponentFixture<MediaViewerWrapperComponent>;
  let sessionStorageService;
  let activatedRoute;
  let mockAppConfig: any;
  let featureToggleService;
  let titleService;
  let postMessageSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    mockAppConfig = createSpyObj<AbstractAppConfig>('AppConfig', ['getDocumentManagementUrl', 'getRemoteDocumentManagementUrl']);
    mockAppConfig.getDocumentManagementUrl.and.returnValue(GATEWAY_DOCUMENT_URL);
    mockAppConfig.getRemoteDocumentManagementUrl.and.returnValue(REMOTE_DOCUMENT_URL);
    sessionStorageService = createSpyObj('sessionStorageService', ['setItem', 'getItem']);
    featureToggleService = createSpyObj('featureToggleService', ['isEnabled', 'getValue']);
    titleService = createSpyObj('titleService', ['setTitle']);
    activatedRoute = {
      snapshot: {
        queryParamMap: convertToParamMap({}),
      },
    };
    TestBed.configureTestingModule({
      imports: [
        MediaViewerModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterTestingModule,
        RpxTranslationModule.forRoot({
          baseUrl: '',
          debounceTimeMs: 300,
          validity: {
            days: 1,
          },
          testMode: true,
        }),
      ],
      declarations: [MediaViewerWrapperComponent, DocumentUrlPipe],
      providers: [
        { provide: AbstractAppConfig, useValue: mockAppConfig },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: FeatureToggleService, useValue: featureToggleService },
        { provide: SessionStorageService, useValue: sessionStorageService },
        { provide: Title, useValue: titleService },
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create media viewer component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not render the media viewer before metadata is received', () => {
      expect(component.mediaReady).toBeFalse();
      expect(fixture.debugElement.query(By.css('mv-media-viewer'))).toBeNull();
    });

    it('should not set the session or remove the local storage media viewer data if there is already media viewer data in session storage', () => {
      sessionStorageService.getItem.and.returnValues(JSON.stringify(MEDIA_VIEWER_DATA));
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.ngOnInit();
      expect(sessionStorageService.setItem).toHaveBeenCalledTimes(0);
    });

    it('should set default title when no media data found', () => {
      sessionStorageService.getItem.and.returnValues(null);
      activatedRoute.snapshot.queryParamMap = convertToParamMap({ mvToken: null });
      fixture.detectChanges();
      component.ngOnInit();
      expect(titleService.setTitle).toHaveBeenCalledWith('View Document');
    });
  });

  describe('Media Viewer hand-off', () => {
    const token = 'test-token';
    const payload = JSON.stringify({
      ...MEDIA_VIEWER_DATA,
      annotation_api_url: '/em-anno',
      case_id: '1111111111111111',
      case_jurisdiction: 'DIVORCE',
    });

    function handoffEvent(data: any, origin = window.location.origin, source = window): MessageEvent {
      return { data, origin, source } as unknown as MessageEvent;
    }

    beforeEach(() => {
      activatedRoute.snapshot.queryParamMap = convertToParamMap({ mvToken: token });
      spyOnProperty(window, 'opener', 'get').and.returnValue(window);
      postMessageSpy = spyOn(window, 'postMessage');
    });

    it('should accept valid metadata, store it in session storage, and render the viewer', () => {
      const replaceStateSpy = spyOn(window.history, 'replaceState');

      (component as any).receiveHandoff(
        handoffEvent({
          type: 'MEDIA_VIEWER_HANDOFF',
          token,
          payload,
        })
      );
      fixture.detectChanges();

      expect(sessionStorageService.setItem).toHaveBeenCalledWith('media-viewer-info', payload);
      expect(component.mediaURL).toBe(GATEWAY_DOCUMENT_URL);
      expect(component.mediaFilename).toBe('sample.pdf');
      expect(component.mediaContentType).toBe('pdf');
      expect(component.mediaReady).toBeTrue();
      expect(fixture.debugElement.query(By.css('mv-media-viewer'))).not.toBeNull();
      expect(replaceStateSpy).toHaveBeenCalled();
      expect(postMessageSpy as any).toHaveBeenCalledWith(
        { type: 'MEDIA_VIEWER_HANDOFF_RECEIVED', token },
        window.location.origin
      );
    });

    it('should ignore metadata from an unexpected origin', () => {
      (component as any).receiveHandoff(
        handoffEvent(
          {
            type: 'MEDIA_VIEWER_HANDOFF',
            token,
            payload,
          },
          'https://unexpected.example'
        )
      );

      expect(sessionStorageService.setItem).not.toHaveBeenCalled();
      expect(component.mediaReady).toBeFalse();
      expect(postMessageSpy as any).not.toHaveBeenCalled();
    });

    it('should ignore a replayed hand-off after the first valid message', () => {
      const event = handoffEvent({ type: 'MEDIA_VIEWER_HANDOFF', token, payload });

      (component as any).receiveHandoff(event);
      (component as any).receiveHandoff(event);

      expect(sessionStorageService.setItem).toHaveBeenCalledTimes(1);
      expect(postMessageSpy as any).toHaveBeenCalledTimes(1);
    });
  });

  describe('isIcpEnabled', () => {
    it('should return true when icp-enabled is true and jurisdiction is empty', () => {
      expect(component.isIcpEnabled(true, [])).toBeTruthy();
    });

    it('should return false when icp-enabled is false and jurisdiction is empty', () => {
      component.caseJurisdiction = 'dummy';
      expect(component.isIcpEnabled(false, [])).toBeFalsy();
    });

    it('should return true when icp-enabled is false but jurisdiction is not empty and correct', () => {
      component.caseJurisdiction = 'dummy';
      expect(component.isIcpEnabled(false, ['dummy'])).toBeTruthy();
    });

    it('should return false when icp-enabled is false and jurisdiction is not empty but is wrong ', () => {
      component.caseJurisdiction = 'dummy';
      expect(component.isIcpEnabled(false, ['dummy1'])).toBeFalsy();
    });

    it('should change the browser title', () => {
      titleService.setTitle.and.returnValues('View Document - Any');
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.ngOnInit();
      expect(titleService.setTitle).toHaveBeenCalled();
    });
  });
});
