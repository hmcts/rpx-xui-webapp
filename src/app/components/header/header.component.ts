import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppTitleModel } from '../../models/app-title.model';
import { UserNavModel } from '../../models/user-nav.model';
import * as fromRoot from '../../store';
import { NavItemsModel } from './../../models/nav-item.model';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})

/**
 * Header Component
 */
export class HeaderComponent implements OnInit {

  @Input() public navItems: NavItemsModel[];
  @Input() public title: AppTitleModel;
  @Input() public userNav: UserNavModel;
  @Input() public showFindCase: boolean;
  @Input() public backgroundColor: string;
  @Input() public logoType: string;
  @Input() public logoIsUsed: boolean = false;
  @Input() public showNavItems: Observable<boolean>;
  @Input() public currentUrl: string;
  @Output() public navigate = new EventEmitter<string>();

  constructor(
    public store: Store<fromRoot.State>,
  ) {}

  public ngOnInit() {
  }

  public onNavigate(event) {

    this.emitNavigate(event, this.navigate);
  }

  /**
   * Emits Sign Out event to the parent.
   */
  public emitNavigate(event: any, emitter: EventEmitter<string>) {

    emitter.emit(event);
  }
}
