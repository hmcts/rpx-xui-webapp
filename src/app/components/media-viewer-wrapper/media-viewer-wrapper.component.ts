import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';

const MEDIA_VIEWER = 'media-viewer-info';

@Component({
    selector: 'exui-media-viewer',
    templateUrl: './media-viewer-wrapper.component.html',
    styleUrls: ['./media-viewer-wrapper.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MediaViewerWrapperComponent implements OnInit {

    public mediaURL = '';
    public mediaFilename = '';
    public mediaContentType = '';
    public mediaAnnotationApiUrl = '';
    public toolbarButtons = { showPrint: true };
    public caseId = '';
    public caseJurisdiction = '';

    public icpJurisdictions$: Observable<string[]>;
    public icpEnabled$: Observable<boolean>;

    public constructor(
        private readonly windowService: WindowService,
        private readonly featureToggleService: FeatureToggleService,
    ) {
    }

    public async ngOnInit() {


        const localStorageMedia = this.windowService.getLocalStorage(MEDIA_VIEWER);
        if (localStorageMedia) {
            const media: {
                document_binary_url: string
                document_filename: string
                content_type: string
                annotation_api_url?: string
                case_id?: string
                case_jurisdiction?: string
            } = JSON.parse(localStorageMedia);
            this.mediaURL = media.document_binary_url;
            this.mediaFilename = media.document_filename;
            this.mediaContentType = media.content_type;
            this.mediaAnnotationApiUrl = media.annotation_api_url;
            this.caseId = media.case_id;
            this.caseJurisdiction = media.case_jurisdiction;
        }

        this.icpJurisdictions$ = this.featureToggleService.getValue('icp-jurisdictions', []);
        this.icpEnabled$ = this.featureToggleService.isEnabled('icp-enabled');
    }

    /**
     * isIcpEnabled()
     * Determines ICP visibility
     *
     * @param isEnabled - true
     * @param icpJurisdictions - []
     */
    public isIcpEnabled(isEnabled: boolean, icpJurisdictions: string[]): boolean {
        return icpJurisdictions && icpJurisdictions.length > 0 ? icpJurisdictions.includes(this.caseJurisdiction) : isEnabled;
    }
}
