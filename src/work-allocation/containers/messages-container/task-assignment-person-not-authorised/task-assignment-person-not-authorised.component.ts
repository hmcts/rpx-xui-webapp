import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'exui-task-assignment-person-not-authorised',
    templateUrl: './task-assignment-person-not-authorised.component.html',
    standalone: false
})
export class TaskAssignmentPersonNotAuthorisedComponent {
  public returnUrl = '/work/my-work/list';

  constructor(private readonly router: Router) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras && currentNavigation.extras.state) {
      this.returnUrl = currentNavigation.extras.state.returnUrl;
    }
  }
}
