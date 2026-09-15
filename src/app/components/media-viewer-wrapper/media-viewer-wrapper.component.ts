import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { Title } from '@angular/platform-browser';

const MEDIA_VIEWER = 'media-viewer-info';

@Component({
  standalone: false,
  selector: 'exui-media-viewer',
  templateUrl: './media-viewer-wrapper.component.html',
  styleUrls: ['./media-viewer-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MediaViewerWrapperComponent implements OnInit, OnDestroy {
  public mediaURL = '';
  public mediaFilename = '';
  public mediaContentType = '';
  public mediaAnnotationApiUrl = '';
  public mediaReady = false;
  public toolbarButtons = { showPrint: true };
  public caseId = '';
  public caseJurisdiction = '';

  public icpJurisdictions$: Observable<string[]>;
  public icpEnabled$: Observable<boolean>;
  public enableRedactSearch$: Observable<boolean>;
  private handoffConsumed = false;
  private readonly messageListener = (event: MessageEvent): void => this.receiveHandoff(event);

  public constructor(
    private readonly featureToggleService: FeatureToggleService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly titleService: Title,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    window.addEventListener('message', this.messageListener);
    const sessionStorageMedia = this.sessionStorageService.getItem(MEDIA_VIEWER);

    if (sessionStorageMedia) {
      const media = safeJsonParse<{
        document_binary_url: string;
        document_filename: string;
        content_type: string;
        annotation_api_url?: string;
        case_id?: string;
        case_jurisdiction?: string;
      }>(sessionStorageMedia, null);
      if (!media) {
        return;
      }
      this.populateMedia(media);
    } else {
      this.titleService.setTitle('View Document');
    }

    this.initialiseFeatureFlags();
  }

  public ngOnDestroy(): void {
    window.removeEventListener('message', this.messageListener);
  }

  private receiveHandoff(event: MessageEvent): void {
    const data = event.data;
    const token = this.route.snapshot.queryParamMap.get('mvToken');

    if (
      event.origin !== window.location.origin ||
      event.source !== window.opener ||
      !data ||
      data.type !== 'MEDIA_VIEWER_HANDOFF' ||
      data.token !== token ||
      typeof data.payload !== 'string' ||
      this.handoffConsumed
    ) {
      return;
    }

    const media = safeJsonParse<{
      document_binary_url: string;
      document_filename: string;
      content_type: string;
      annotation_api_url?: string;
      case_id?: string;
      case_jurisdiction?: string;
    }>(data.payload, null);

    if (
      !media ||
      typeof media.document_binary_url !== 'string' ||
      typeof media.document_filename !== 'string' ||
      typeof media.content_type !== 'string'
    ) {
      return;
    }

    this.handoffConsumed = true;
    this.sessionStorageService.setItem(MEDIA_VIEWER, data.payload);
    this.populateMedia(media);
    this.initialiseFeatureFlags();
    this.cleanUrl(token);
    (event.source as Window).postMessage({ type: 'MEDIA_VIEWER_HANDOFF_RECEIVED', token }, event.origin);
  }

  private populateMedia(media: {
    document_binary_url: string;
    document_filename: string;
    content_type: string;
    annotation_api_url?: string;
    case_id?: string;
    case_jurisdiction?: string;
  }): void {
    this.mediaURL = media.document_binary_url;
    this.mediaFilename = media.document_filename;
    this.mediaContentType = media.content_type;
    this.mediaAnnotationApiUrl = media.annotation_api_url;
    this.caseId = media.case_id;
    this.caseJurisdiction = media.case_jurisdiction;
    this.mediaReady = true;
    this.titleService.setTitle(this.mediaFilename + ' - View Document');
  }

  private initialiseFeatureFlags(): void {
    this.icpJurisdictions$ = this.featureToggleService.getValue('icp-jurisdictions', []);
    this.icpEnabled$ = of(true);
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
