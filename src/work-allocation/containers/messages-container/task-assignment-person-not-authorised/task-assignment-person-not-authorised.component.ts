import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'exui-task-assignment-person-not-authorised',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './task-assignment-person-not-authorised.component.html',
})
export class TaskAssignmentPersonNotAuthorisedComponent {
  public returnUrl = '/work/my-work/list';

  constructor(private readonly router: Router) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras?.state) {
      this.returnUrl = currentNavigation.extras.state.returnUrl;
    }
  }
}
