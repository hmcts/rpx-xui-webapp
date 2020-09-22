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
 */
export class HeaderComponent implements OnInit {

  @Input() public navItems: { active: boolean; href: string; }[];
  @Input() public title: AppTitleModel;
  @Input() public userNav: UserNavModel;
  @Input() public showFindCase: boolean;
  @Input() public backgroundColor: string;
  @Input() public logoType: string;
  @Input() public logoIsUsed: boolean = false;
  @Input() public showNavItems: Observable<boolean>;
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
