import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaViewerWrapperComponent } from './media-viewer-wrapper.component';
import { DocumentUrlPipe } from '@hmcts/ccd-case-ui-toolkit/dist/shared/components/palette/document/document-url.pipe';
import { MediaViewerModule } from '@hmcts/media-viewer';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/window';
import { AbstractAppConfig } from '@hmcts/ccd-case-ui-toolkit/dist/app.config';
import createSpyObj = jasmine.createSpyObj;
import { MediaViewerToolbarComponent } from '../media-viewer-toolbar/media-viewer-toolbar.component';
import { MediaViewerSearchComponent } from '../media-viewer-search/media-viewer-search.component';
import { FormsModule } from '@angular/forms';

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

    beforeEach(async(() => {
        mockAppConfig = createSpyObj<AbstractAppConfig>('AppConfig', ['getDocumentManagementUrl', 'getRemoteDocumentManagementUrl']);
        mockAppConfig.getDocumentManagementUrl.and.returnValue(GATEWAY_DOCUMENT_URL);
        mockAppConfig.getRemoteDocumentManagementUrl.and.returnValue(REMOTE_DOCUMENT_URL);
        windowService = createSpyObj('windowService', ['setLocalStorage', 'getLocalStorage', 'removeLocalStorage']);
        TestBed.configureTestingModule({
            imports: [
              FormsModule,
              MediaViewerModule,
            ],
            declarations: [
                MediaViewerWrapperComponent,
                MediaViewerToolbarComponent,
                MediaViewerSearchComponent,
                DocumentUrlPipe
            ],
            providers: [
                { provide: AbstractAppConfig, useValue: mockAppConfig },
                { provide: WindowService, useValue: windowService }
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

});
