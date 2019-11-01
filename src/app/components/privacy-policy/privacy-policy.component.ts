import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'exui-privacy-policy',
    templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent implements OnInit {

    constructor(private readonly route: ActivatedRoute) { }

    public ngOnInit() {
        this.route.fragment.subscribe(fragment => {
            try {
                document.querySelector(`#${fragment}`).scrollIntoView();
            } catch (e) { }
        });
    }
}
