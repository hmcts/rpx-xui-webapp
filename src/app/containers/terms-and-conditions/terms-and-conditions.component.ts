import { Component, OnInit } from '@angular/core';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { Store, select } from '@ngrx/store';
import { LoadTermsConditions } from 'src/app/store';
import * as fromRoot from '../../store';

@Component({
    selector: 'exui-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html'
})
export class TermsAndConditionsComponent implements OnInit {

    public document: TCDocument = null;

    constructor(private readonly store: Store<fromRoot.State>) {
    }

    public ngOnInit() {
      // TODO: store subscription so we can unsubscribe on destroy
        this.store.pipe(
            select(fromRoot.getTermsAndConditions)
        ).subscribe(doc => {
            if (doc) {
                this.document = doc;
            } else {
                this.store.dispatch(new LoadTermsConditions());
            }
        });
    }
}
