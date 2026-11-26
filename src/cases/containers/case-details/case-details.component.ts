import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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
  private headingObserver: MutationObserver;

  constructor(
    private readonly store: Store<fromCaseCreate.State>,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  public ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement;
    this.addPaymentHistoryHeadingSemantics(host);
    this.headingObserver = new MutationObserver(() => this.addPaymentHistoryHeadingSemantics(host));
    this.headingObserver.observe(host, { childList: true, subtree: true });
  }

  public ngOnInit(): void {
    this.$caseIdSubscription = this.store.pipe(select(fromCaseCreate.getCaseId)).subscribe((caseId) => (this.caseId = caseId));
  }

  public ngOnDestroy(): void {
    this.unSubscribe(this.$caseIdSubscription);
    this.headingObserver?.disconnect();
  }

  public unSubscribe(subscription: Subscription): void {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  private addPaymentHistoryHeadingSemantics(root: HTMLElement): void {
    root.querySelectorAll<HTMLSpanElement>('ccpay-case-transactions span.heading-medium').forEach((label) => {
      if (!/^group reference:/i.test(label.textContent?.trim() ?? '')) {
        const heading = label.ownerDocument.createElement('h2');
        Array.from(label.attributes).forEach((attribute) => {
          if (attribute.name !== 'role' && attribute.name !== 'aria-level') {
            heading.setAttribute(attribute.name, attribute.value);
          }
        });
        while (label.firstChild) {
          heading.appendChild(label.firstChild);
        }
        label.replaceWith(heading);
      }
    });
  }
}
