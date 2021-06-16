import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, startWith, debounceTime } from 'rxjs/operators';
import { FindAPersonService } from '../../services/find-person.service';
import { Person, PersonDomain } from '../../models/dtos';
import { of } from 'rxjs';

@Component({
  selector: 'exui-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.scss'],
})

export class FindPersonComponent implements OnInit {
  @Input() public title: string;
  constructor(private readonly findPersonService: FindAPersonService) {}
  myControl = new FormControl();
  filteredOptions: Observable<Person>;
  ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        // debounceTime(400),
        switchMap(searchTerm => {
          return this.filter(searchTerm || '')
        })
      );
  }

  private filter(searchTerm: string): Observable<Person[]> {
    if (searchTerm && searchTerm.length > 2) {
      return this.findPersonService.find({searchTerm, jurisdiction: PersonDomain.BOTH});
    }
    return of();
  }

  public onSelectionChange(selectedItem) {
    console.log(selectedItem);
  }
}
