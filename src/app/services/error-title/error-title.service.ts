import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

export const ERROR_TITLE_PREFIX = 'Error: ';
const ERROR_SUMMARY_SELECTOR = '.govuk-error-summary';

/**
 * GOV.UK pattern: while a page shows an error summary, its document title starts with "Error: ".
 *
 * Error summaries are rendered by many webapp, toolkit and common-lib components, so instead of
 * each one managing the title, this service watches the DOM and adds or removes the prefix
 * whenever a visible error summary appears or disappears. Components that already add the prefix
 * themselves are unaffected because the prefix is only ever applied once.
 */
@Injectable({ providedIn: 'root' })
export class ErrorTitleService implements OnDestroy {
  private observer: MutationObserver | null = null;
  private scheduled = false;

  constructor(
    private readonly titleService: Title,
    private readonly zone: NgZone,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public start(): void {
    const view = this.document.defaultView;
    if (this.observer || !this.document.body || !view || typeof view.MutationObserver === 'undefined') {
      return;
    }
    // Run outside Angular so DOM mutations don't trigger extra change detection cycles.
    this.zone.runOutsideAngular(() => {
      this.observer = new view.MutationObserver(() => this.scheduleSync());
      this.observer.observe(this.document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'hidden', 'style'],
      });
      // The <title> text is replaced on every route change, so re-apply the prefix when it changes.
      const titleElement = this.document.querySelector('title');
      if (titleElement) {
        this.observer.observe(titleElement, { childList: true, characterData: true, subtree: true });
      }
    });
    this.sync();
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  public sync(): void {
    this.scheduled = false;
    const hasError = this.hasVisibleErrorSummary();
    const title = this.titleService.getTitle();
    const hasPrefix = title.startsWith(ERROR_TITLE_PREFIX);
    if (hasError && !hasPrefix) {
      this.titleService.setTitle(`${ERROR_TITLE_PREFIX}${title}`);
    } else if (!hasError && hasPrefix) {
      this.titleService.setTitle(title.slice(ERROR_TITLE_PREFIX.length));
    }
  }

  private scheduleSync(): void {
    if (this.scheduled) {
      return;
    }
    this.scheduled = true;
    const view = this.document.defaultView;
    if (view?.requestAnimationFrame) {
      view.requestAnimationFrame(() => this.sync());
    } else {
      setTimeout(() => this.sync());
    }
  }

  private hasVisibleErrorSummary(): boolean {
    const summaries = this.document.querySelectorAll<HTMLElement>(ERROR_SUMMARY_SELECTOR);
    return Array.from(summaries).some((summary) => summary.getClientRects().length > 0);
  }
}

export function initializeErrorTitle(errorTitleService: ErrorTitleService): () => void {
  return () => errorTitleService.start();
}
