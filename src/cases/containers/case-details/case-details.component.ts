import { Component, ElementRef, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppConstants } from '../../../app/app.constants';
import * as fromCaseCreate from '../../store';

/**
 * Case Details Component
 * It consumes ccd-case-view component
 * param caseId
 */
@Component({
  standalone: false,
  selector: 'exui-case-details',
  templateUrl: './case-details.component.html',
})
export class CaseDetailsComponent implements AfterViewInit, OnDestroy, OnInit {
  public caseId: string;
  public $caseIdSubscription: Subscription;
  private linkObserver: MutationObserver;

  constructor(
    private readonly store: Store<fromCaseCreate.State>,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  public ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement;
    this.addNewWindowHints(host);
    this.linkObserver = new MutationObserver(() => this.addNewWindowHints(host));
    this.linkObserver.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ['target'] });
  }

  public ngOnInit(): void {
    this.$caseIdSubscription = this.store.pipe(select(fromCaseCreate.getCaseId)).subscribe((caseId) => (this.caseId = caseId));
  }

  public ngOnDestroy(): void {
    this.unSubscribe(this.$caseIdSubscription);
    this.linkObserver?.disconnect();
  }

  private addNewWindowHints(root: HTMLElement): void {
    root.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((link) => {
      if (!link.querySelector('[data-new-window-hint]')) {
        const hint = document.createElement('span');
        hint.className = 'case-event-new-window-hint';
        hint.dataset.newWindowHint = 'true';
        hint.textContent = ` ${AppConstants.NEW_TAB_WARNING_TEXT}`;
        link.appendChild(hint);
      }

      const ariaLabel = link.getAttribute('aria-label');
      if (ariaLabel && !/new tab/i.test(ariaLabel)) {
        link.setAttribute('aria-label', `${ariaLabel} ${AppConstants.NEW_TAB_WARNING_TEXT}`);
      }
    });
  }

  public unSubscribe(subscription: Subscription): void {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
