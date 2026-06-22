import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppTitleModel } from '../../models/app-title.model';
import { UserNavModel } from '../../models/user-nav.model';
import * as fromRoot from '../../store';
import { NavItemsModel } from './../../models/nav-item.model';
import { FocusService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  standalone: false,
  selector: 'exui-header',
  templateUrl: './header.component.html',
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

  private static contentHash: string = '#content';

  constructor(
    public store: Store<fromRoot.State>,
    public readonly focusService: FocusService
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

  public getSkipToMainContentUrl(): string {
    return this.currentUrl?.split('#')[0] + HeaderComponent.contentHash;
  }

  /**
   * @param url to test
   * @return true if the given url will navigate to the main content
   */
  public static isSkipToMainContent(url: string): boolean {
    return url?.endsWith(HeaderComponent.contentHash);
  }
}
