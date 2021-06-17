import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { FindAPersonService } from '../../services/find-person.service';
import { Person, PersonDomain } from '../../models/dtos';
import { of } from 'rxjs';

@Component({
  selector: 'exui-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.scss'],
})

export class FindPersonComponent implements OnInit {
  @Output() personSelected = new EventEmitter<Person>();
  @Input() public title: string;
  @Input() public domainString: string = 'BOTH';
  public domain: PersonDomain;
  constructor(private readonly findPersonService: FindAPersonService) {}
  public findPersonControl = new FormControl();
  filteredOptions: Observable<Person[]>;
  ngOnInit() {
    this.domain = PersonDomain[this.domainString];
    this.filteredOptions = this.findPersonControl.valueChanges.pipe(
      startWith(''),
      switchMap(searchTerm => {
        return this.filter(searchTerm || '')
      })
    );
  }

  public filter(searchTerm: string): Observable<Person[]> {
    if (searchTerm && searchTerm.length > 2) {
      return this.findPersonService.find({searchTerm, jurisdiction: this.domain});
    }
    return of();
  }

  public onSelectionChange(selectedPerson?: Person) {
    this.personSelected.emit(selectedPerson);
  }
}
