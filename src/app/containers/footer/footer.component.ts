import { Component } from '@angular/core';
import { Helper, Navigation } from './footer.model';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    public helpData: Helper = {
        heading: 'Help',
        email: {
            address: 'service-desk@hmcts.gov.uk',
            text: 'service-desk@hmcts.gov.uk'
        },
        phone: {
            text: '0207 633 4140'
        },
        opening: {
            text: 'Monday to Friday, 8am to 6pm (excluding public holidays)'
        }
    };
    public navigationData: Navigation = {
        items: [
            { text: 'Terms and conditions', href: 'terms-and-conditions'},
            { text: 'Cookies', href: 'cookies' },
            { text: 'Privacy policy', href: 'privacy-policy'}
        ]
    };
}
