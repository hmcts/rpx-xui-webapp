import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import * as fromActions from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private name: string;
  constructor(
    private logger: LoggerService,
    private store: Store<fromActions.State>
  ) {
    this.name = 'App.Component';
  }

  ngOnInit() {
  }


  // To do move signOut to header component when available!!!
  signOut() {
    this.store.dispatch(new fromActions.Logout());
  }
}
