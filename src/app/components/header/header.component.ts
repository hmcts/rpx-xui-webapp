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

  @Input() navItems: { active: boolean; href: string; }[];
  @Input() title: AppTitleModel;
  @Input() userNav: UserNavModel;
  @Input() showFindCase: boolean;
  @Input() backgroundColor: string;
  @Input() logoType: string;
  @Input() logoIsUsed: boolean = false;
  @Input() showNavItems: Observable<boolean>;
  @Output() navigate = new EventEmitter<string>();

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
