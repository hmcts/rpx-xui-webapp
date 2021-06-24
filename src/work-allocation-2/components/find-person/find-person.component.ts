import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Person, PersonDomain } from '../../models/dtos';
import { FindAPersonService } from '../../services/find-person.service';

@Component({
  selector: 'exui-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.scss'],
})

export class FindPersonComponent implements OnInit {
  @Output() public personSelected = new EventEmitter<Person>();
  @Input() public title: string;
  @Input() public domainString: string = 'BOTH';
  @Input() public findPersonGroup: FormGroup = new FormGroup({});
  @Input() public selectedPerson: string;
  public domain: PersonDomain;
  public showAutocomplete: boolean = false;
  constructor(private readonly findPersonService: FindAPersonService) {}
  public findPersonControl = new FormControl();
  public filteredOptions: Observable<Person[]>;
  private readonly minSearchCharacters = 2;

  public ngOnInit(): void {
    this.findPersonGroup.addControl('findPersonControl', this.findPersonControl);
    this.domain = PersonDomain[this.domainString];
    this.filteredOptions = this.findPersonControl.valueChanges.pipe(
      startWith(''),
      switchMap(searchTerm => {
        return this.filter(searchTerm || '');
      })
    );
    this.findPersonControl.setValue(this.selectedPerson);
  }

  public filter(searchTerm: string): Observable<Person[]> {
    if (searchTerm && searchTerm.length > this.minSearchCharacters) {
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
    if (currentValue && currentValue.length > this.minSearchCharacters) {
      this.showAutocomplete = true;
    } else {
      this.showAutocomplete = false;
    }
  }
}
