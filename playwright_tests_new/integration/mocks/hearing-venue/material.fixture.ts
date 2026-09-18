import 'zone.js';
import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { ExuiCommonLibModule, LocationService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';

class VenueFixture {
  control = new FormControl();
  selected = [{ epimms_id: 'seed', court_name: 'Seeded Court' }];
  add() {
    if (this.control.value) {
      const value = document.body.dataset.wrongVenue
        ? { ...this.control.value, court_name: 'Basingstoke Different Court' }
        : this.control.value;
      this.selected = [...this.selected, value];
    }
  }
}
Component({
  selector: 'venue-fixture',
  standalone: true,
  imports: [ExuiCommonLibModule],
  template: `<div class="search-location"><xuilib-search-venue [control]="control" [selectedLocations]="selected" />
    <a href="#" (click)="add(); $event.preventDefault()"> Add location </a></div>
    @for (venue of selected; track venue.epimms_id) {
      <a href="#" [attr.data-venue-id]="venue.epimms_id"><span class="sr-only">Click to remove:</span> {{venue.court_name}}</a>
    }`,
})(VenueFixture);
bootstrapApplication(VenueFixture, {
  providers: [
    provideNoopAnimations(),
    {
      provide: LocationService,
      useValue: {
        searchLocations: () =>
          of([
            ...(document.body.dataset.wrongActive ? [{ epimms_id: 'unexpected', court_name: 'Unrelated Court' }] : []),
            { epimms_id: 'target', court_name: 'Basingstoke County Court' },
            { epimms_id: 'other', court_name: 'Basingstoke Magistrates Court' },
          ]),
      },
    },
  ],
});
