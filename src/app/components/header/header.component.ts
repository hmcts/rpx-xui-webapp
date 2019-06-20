import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../store';
// import {AppTitlesModel} from '../../models/app-titles.model';
// import {UserNavModel} from '../../models/user-nav.model';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() navItems: { active: boolean; href: string; }[];
  @Input() title;
  @Input() userNav;
  @Output() navigate = new EventEmitter<string>();

  isUserLoggedIn$: Observable<boolean>;

  constructor(public store: Store<fromRoot.State>) {}


  ngOnInit(): void {

    // this.isUserLoggedIn$ = this.store.pipe(select(fromAuth.getIsAuthenticated));
    // this.store.pipe(select(fromRoot.getRouterState)).subscribe(rootState => {
    //   if (rootState) {
    //     this.updateNavItems(rootState.state.url);
    //   }
    // });
  }

  // updateNavItems(url): void {
  //   this.navItems = this.navItems.map((item: {href}) => {
  //     return {
  //       ...item,
  //       active: item.href === url
  //     };
  //   });
  // }

  onNavigate(event) {
    this.navigate.emit(event);
  }
}
