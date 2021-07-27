import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { PersonRole } from '../../../role-access/models';
import { Person } from '../../models/dtos';
import { FindAPersonService } from '../../services/find-person.service';

@Component({
  selector: 'exui-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.scss'],
})

export class FindPersonComponent implements OnInit {
  @Output() public personSelected = new EventEmitter<Person>();
  @Input() public title: string;
  @Input() public domain: PersonRole = PersonRole.ALL;
  @Input() public findPersonGroup;
  @Input() public selectedPerson: string;
  public showAutocomplete: boolean = false;

  constructor(private readonly findPersonService: FindAPersonService) {
  }

  public findPersonControl = new FormControl();
  public filteredOptions: Observable<Person[]>;
  private readonly minSearchCharacters = 3;

  public ngOnInit(): void {
    if (!this.findPersonGroup) {
      this.findPersonGroup = new FormGroup({});
    } else {
      this.findPersonGroup.addControl('findPersonControl', this.findPersonControl);
    }
    this.filteredOptions = this.findPersonControl.valueChanges.pipe(
      startWith(''),
      switchMap(searchTerm => {
        return this.filter(searchTerm || '');
      })
    );
    this.findPersonControl.setValue(this.selectedPerson);
  }

  public filter(searchTerm: string): Observable<Person[]> {
    if (searchTerm && searchTerm.length >= this.minSearchCharacters) {
      return this.findPersonService.find({searchTerm, jurisdiction: this.domain});
    }
    return of();
  }

  public onSelectionChange(selectedPerson?: Person) {
    this.personSelected.emit(selectedPerson);
  }

  public getDisplayName(selectedPerson: Person) {
    return selectedPerson.email ? `${selectedPerson.name}(${selectedPerson.email})` : selectedPerson.name;
  }

  public updatedVal(currentValue) {
    if (currentValue && currentValue.length >= this.minSearchCharacters) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }
  }
}
