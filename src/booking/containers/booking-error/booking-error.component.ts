import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'exui-booking-error',
    templateUrl: './booking-error.component.html'
})
export class BookingErrorComponent implements OnInit {

  public error: any;
  constructor(private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.activatedRoute.data.subscribe(error => {
      this.error = error;
    });
  }
}
