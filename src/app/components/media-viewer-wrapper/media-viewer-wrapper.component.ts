import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { Title } from '@angular/platform-browser';

const MEDIA_VIEWER = 'media-viewer-info';

@Component({
  standalone: false,
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
  public enableRedactSearch$: Observable<boolean>;

  public constructor(
    private readonly windowService: WindowService,
    private readonly featureToggleService: FeatureToggleService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly titleService: Title,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('mvToken');
    let sessionStorageMedia = this.sessionStorageService.getItem(MEDIA_VIEWER);

    if (!sessionStorageMedia && token) {
      const localKey = `${MEDIA_VIEWER}:${token}`;
      const localStorageMedia = this.windowService.getLocalStorage(localKey);

      if (localStorageMedia) {
        this.sessionStorageService.setItem(MEDIA_VIEWER, localStorageMedia);
        this.windowService.removeLocalStorage(localKey);
        this.cleanUrl(token);
        sessionStorageMedia = localStorageMedia;
      }
    }

    if (sessionStorageMedia) {
      const media: {
        document_binary_url: string;
        document_filename: string;
        content_type: string;
        annotation_api_url?: string;
        case_id?: string;
        case_jurisdiction?: string;
      } = JSON.parse(sessionStorageMedia);
      this.mediaURL = media.document_binary_url;
      this.mediaFilename = media.document_filename;
      this.mediaContentType = media.content_type;
      this.mediaAnnotationApiUrl = media.annotation_api_url;
      this.caseId = media.case_id;
      this.caseJurisdiction = media.case_jurisdiction;

      this.titleService.setTitle(this.mediaFilename + ' - View Document');
    } else {
      this.titleService.setTitle('View Document');
    }

    this.icpJurisdictions$ = this.featureToggleService.getValue('icp-jurisdictions', []);
    this.icpEnabled$ = this.featureToggleService.isEnabled('icp-enabled');
    this.enableRedactSearch$ = this.featureToggleService.isEnabled('enable-redact-search');
  }

  private cleanUrl(token: string | null): void {
    if (token) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
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
