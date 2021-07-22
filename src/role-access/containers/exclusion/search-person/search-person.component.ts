import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Person } from '../../../../work-allocation-2/models/dtos';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.scss']
})
export class SearchPersonComponent implements OnInit {
  @Input() public navEvent: ExclusionNavigation;
  public formGroup: FormGroup = new FormGroup({});
  public person?: Person;
  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    if (this.formGroup && this.formGroup.value && this.formGroup.value.findPersonControl) {
      console.log('navigationHandler ');
    } else {
      this.formGroup.setErrors({
        invalid: true
      });
      return;
    }
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.DESCRIBE_EXCLUSION));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public selectedPerson(person?: Person) {
    this.person = person;
  }
}
