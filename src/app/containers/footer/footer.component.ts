import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppConstants } from '../../app.constants';
import * as fromRoot from '../../store';
import { Helper, Navigation } from './footer.model';

@Component({
    selector: 'exui-app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    public helpData: Helper = AppConstants.FOOTER_DATA;
    public navigationData: Navigation = AppConstants.FOOTER_DATA_NAVIGATION;

    constructor(private readonly store: Store<fromRoot.State>) {
    }

    public ngOnInit() {

        this.store.pipe(
            select(fromRoot.getIsTermsAndConditionsFeatureEnabled)
        ).subscribe(isEnabled => {
            isEnabled ? this.navigationData.items[1].href = '/terms-and-conditions' :
                this.navigationData.items[1].href = '/legacy-terms-and-conditions';
        });
    }
}
