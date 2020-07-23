import {Component, OnInit} from '@angular/core';

/*
* Sign Out Component
* Responsible for displaying you been signed out page.
*/
@Component({
  selector: 'exui-sign-out',
  templateUrl: './signed-out.component.html',
})
export class SignedOutComponent implements OnInit {
  public redirectUrl: string;
  constructor() { }

  public ngOnInit(): void {
    this.redirectUrl = './';
  }
}
