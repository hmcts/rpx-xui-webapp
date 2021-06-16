import { Component } from '@angular/core';
import { Person } from '../../models/dtos';

@Component({
    selector: 'exui-find-person-container',
    templateUrl: './find-person-container.component.html'
  })

export class FindPersonContainerComponent {
  public selectedPerson(person?: Person) {
    console.log(person);
  }
}
