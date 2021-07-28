import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Person } from '../../../../work-allocation-2/models/dtos';
import { ExclusionNavigationEvent, ExclusionState, ExclusionStateData, PersonRole } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-search-person',
  templateUrl: './search-person.component.html'
})
export class SearchPersonComponent implements OnInit {
  @Input() public navEvent: ExclusionNavigation;
  public domain = PersonRole.ALL;
  public formGroup: FormGroup = new FormGroup({});
  public personName: string;
  public person: Person;
  public subscription: Subscription;
  public personRole: PersonRole;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
    this.subscription = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe(exclusion => this.setPerson(exclusion));
  }

  public setPerson(exclusion: ExclusionStateData): void {
    this.personName = exclusion && exclusion.person ? this.getDisplayName(exclusion.person) : null;
    this.person = exclusion.person;
    this.personRole = exclusion.personRole;
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    if (this.formGroup && this.formGroup.value && this.formGroup.value.findPersonControl && this.person) {
      switch (navEvent) {
        case ExclusionNavigationEvent.CONTINUE:
          this.store.dispatch(new fromFeature.UpdatePersonExclusion(ExclusionState.DESCRIBE_EXCLUSION, this.person));
          break;
        default:
          throw new Error('Invalid option');
      }
    } else {
      this.formGroup.setErrors({
        invalid: true
      });
      return;
    }
  }

  public selectedPerson(person?: Person) {
    this.person = person;
  }

  // moved to container to stop unneccessary call to child component for the moment
  public getDisplayName(selectedPerson: Person) {
    return selectedPerson.email ? `${selectedPerson.name}(${selectedPerson.email})` : selectedPerson.name;
  }
}
