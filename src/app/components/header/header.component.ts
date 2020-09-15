import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})

/**
 * Header Component
 *
 * This header component is common to both MO and MC, and is doing the work of fetching data from the store,
 * and displaying the items in the header dependent on the User.
 *
 * TODO:
 * If we want to keep our /component folder pure and gradually move these components across to a common lib,
 * we should not have application logic in here ie. this.cookieService.get('roles'), and none of the logic that
 * fetches items from the store, instead they should be passed down into this component.
 *
 * Therefore application logic needs to be abstracted up a level, to app-header.
 */
export class HeaderComponent implements OnInit {

  @Input() navItems: { active: boolean; href: string; }[];
  @Input() title: AppTitleModel;
  @Input() userNav: UserNavModel;
  @Input() showFindCase: boolean;
  @Input() userRoles;
  @Input() backgroundColor: string;
  @Input() isCaseManager: boolean = false;
  @Input() showNavItems: Observable<boolean>;
  @Output() navigate = new EventEmitter<string>();

  // public isCaseManager = false;

  constructor(
    public store: Store<fromRoot.State>,
  ) {}

  public ngOnInit() {

     console.log('userRoles');
     console.log(this.userRoles);
     console.log('this.isCaseManager');
     console.log(this.isCaseManager);
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
