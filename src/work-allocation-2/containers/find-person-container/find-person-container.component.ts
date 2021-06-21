import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from '../../models/dtos';

@Component({
    selector: 'exui-find-person-container',
    templateUrl: './find-person-container.component.html'
  })

export class FindPersonContainerComponent {
  public readonly findPersonGroup: FormGroup;
  constructor() {
    this.findPersonGroup = new FormGroup({})
  }
  public selectedPerson(person?: Person) {
    console.log(person);
    console.log(this.findPersonGroup.value);
  }
  public onSubmit(): void {
    console.log(this.findPersonGroup.value);
  }
}
