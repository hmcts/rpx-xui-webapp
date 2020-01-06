import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../services/auth/auth.guard';

/*
* Sign Out Component
* Responsible for telling user that have been signed out.
* */

@Component({
  selector: 'app-sign-out',
  templateUrl: './signed-out.component.html',
})
export class SignedOutComponent implements OnInit {
  public redirectUrl: string
  constructor(private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.redirectUrl = '';
  }




}
