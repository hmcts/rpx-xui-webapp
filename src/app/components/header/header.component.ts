import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class HeaderComponent {
  @Input() public navItems: NavItemsModel[];
  @Input() public title: AppTitleModel;
  @Input() public userNav: UserNavModel;
  @Input() public backgroundColor: string;
  @Input() public logo: string;
  @Input() public logoIsUsed: boolean = false;
  @Input() public showNavItems: Observable<boolean>;
  @Input() public currentUrl: string;
  @Input() public decorate16DigitCaseReferenceSearchBoxInHeader: boolean;
  @Output() public navigate = new EventEmitter<string>();

  public contentHash: string = '#content';

  constructor(
    public store: Store<fromRoot.State>,
  ) {}

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
