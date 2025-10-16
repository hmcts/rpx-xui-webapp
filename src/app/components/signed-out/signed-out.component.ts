import { Component, OnInit } from '@angular/core';

/*
* Sign Out Component
* Responsible for displaying you been signed out page.
*/
@Component({
  standalone: false,
  selector: 'exui-sign-out',
  templateUrl: './signed-out.component.html'

})
export class SignedOutComponent implements OnInit {
  public redirectUrl: string;

  public ngOnInit(): void {
    this.redirectUrl = './';
  }
}
