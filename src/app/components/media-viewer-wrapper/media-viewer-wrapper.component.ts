import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';

const MEDIA_VIEWER = 'media-viewer-info';

@Component({
    selector: 'exui-media-viewer',
    templateUrl: './media-viewer-wrapper.component.html',
    styleUrls: ['./media-viewer-wrapper.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MediaViewerWrapperComponent implements OnInit {

    mediaURL = '';
    mediaFilename = '';
    mediaContentType = '';
    mediaAnnotationApiUrl = '';
    toolbarButtons = { showPrint: true };
    caseId = '';
    caseJurisdiction = '';

    icpJurisdictions$: Observable<string[]>;
    icpEnabled$: Observable<boolean>

    public constructor(
        private windowService: WindowService,
        private featureToggleService: FeatureToggleService,
    ) {
    }

    async ngOnInit() {


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
        return icpJurisdictions.includes(this.caseJurisdiction) ? true : isEnabled;
    }
}
