import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ExclusionNavigationEvent, ExclusionState, RadioOption } from '../../../models';
import { RoleAllocationCaptionText, RoleAllocationRadioText, RoleAllocationTitleText } from '../../../models/enums';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';
import * as fromRoot from '../../../../app/store';

@Component({
  selector: 'exui-choose-exclusion',
  templateUrl: './choose-exclusion.component.html',
  styleUrls: ['./choose-exclusion.component.scss']
})
export class ChooseExclusionComponent implements OnInit {

  @Input() public navEvent: ExclusionNavigation;
  public options: RadioOption[];
  public locationInfo$: Observable<any>;
  public excludeMe: RadioOption = { radioId: 'excludeMe', radioName: RoleAllocationRadioText.ExclusionSelf };
  public excludeOther: RadioOption = { radioId: 'excludeOther', radioName: RoleAllocationRadioText.ExclusionOther };
  public title = RoleAllocationTitleText.ExclusionAllocate;
  public caption = RoleAllocationCaptionText.Exclusion;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
    // currently the case allocator role information is stored in location info
    this.locationInfo$ = this.store.pipe(select(fromRoot.getLocationInfo));
    this.locationInfo$.subscribe(li => {
      const firstLocationInfo = li[0];
      this.options = (firstLocationInfo && firstLocationInfo.isCaseAllocator) ? [this.excludeMe, this.excludeOther] : [this.excludeMe];
    });
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        // TODO if selected option is exclude me
        // this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHOOSE_EXCLUSION));
        // TODO if selected option is exclude another person
        this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHOOSE_PERSON_ROLE));
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
