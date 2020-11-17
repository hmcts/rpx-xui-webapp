import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaViewerWrapperComponent } from './media-viewer-wrapper.component';
import { DocumentUrlPipe } from '@hmcts/ccd-case-ui-toolkit/dist/shared/components/palette/document/document-url.pipe';
import { MediaViewerModule } from '@hmcts/media-viewer';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/window';
import { AbstractAppConfig } from '@hmcts/ccd-case-ui-toolkit/dist/app.config';
import createSpyObj = jasmine.createSpyObj;
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';

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
    let windowService;
    let mockAppConfig: any;
    let featureToggleService;

    beforeEach(async(() => {
        mockAppConfig = createSpyObj<AbstractAppConfig>('AppConfig', ['getDocumentManagementUrl', 'getRemoteDocumentManagementUrl']);
        mockAppConfig.getDocumentManagementUrl.and.returnValue(GATEWAY_DOCUMENT_URL);
        mockAppConfig.getRemoteDocumentManagementUrl.and.returnValue(REMOTE_DOCUMENT_URL);
        windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage', 'removeLocalStorage']);
        featureToggleService = createSpyObj('featureToggleService', ['isEnabled', 'getValue']);
        TestBed.configureTestingModule({
            imports: [
                MediaViewerModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([])
            ],
            declarations: [
                MediaViewerWrapperComponent,
                DocumentUrlPipe
            ],
            providers: [
                { provide: AbstractAppConfig, useValue: mockAppConfig },
                { provide: WindowService, useValue: windowService },
                { provide: FeatureToggleService, useValue: featureToggleService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MediaViewerWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create media viewer component', () => {
        expect(component).toBeTruthy();
    });

    it('should load media viewer data from local storage', () => {
        windowService.getLocalStorage.and.returnValues(JSON.stringify(MEDIA_VIEWER_DATA));
        fixture.detectChanges();
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component.mediaURL).toBe(GATEWAY_DOCUMENT_URL);
        expect(component.mediaFilename).toBe('sample.pdf');
        expect(component.mediaContentType).toBe('pdf');
    });


    describe('isIcpEnabled', () => {
        it('should return true when icp-enabled is true and jurisdiction is empty', () => {
            component.caseJurisdiction = 'dummy';
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
    });
});
