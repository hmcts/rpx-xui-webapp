import { Component, OnInit } from '@angular/core';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';

const MEDIA_VIEWER = 'media-viewer';

@Component({
    selector: 'exui-media-viewer',
    templateUrl: './media-viewer-wrapper.component.html',
    styleUrls: ['../../../../node_modules/@hmcts/media-viewer/assets/aui-styles.scss']
})
export class MediaViewerWrapperComponent implements OnInit {

    mediaURL = '';
    mediaFilename = '';
    mediaContentType = '';
    mediaAnnotationApiUrl = '';

    public constructor(
        private windowService: WindowService
    ) {
    }

    async ngOnInit() {


        const localStorageMedia = this.windowService.getLocalStorage(MEDIA_VIEWER);
        if (localStorageMedia) {
            const media = JSON.parse(localStorageMedia);
            this.mediaURL = media.document_binary_url;
            this.mediaFilename = media.document_filename;
            this.mediaContentType = media.content_type;
            this.mediaAnnotationApiUrl = media.annotation_api_url;
        }
    }

}
