import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'exui-task-assignment-choose-role',
  templateUrl: './task-assignment-choose-role.component.html',
  styleUrls: ['./task-assignment-choose-role.component.scss']
})
export class TaskAssignmentChooseRoleComponent implements OnInit {
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
  }

  private static get returnUrl(): string {
    // Default URL is '' because this is the only sensible return navigation if the user has used browser navigation
    // buttons, which clear the `window.history.state` object
    let url: string = '';

    // The returnUrl is undefined if the user has used browser navigation buttons, so check for its presence
    if (window && window.history && window.history.state && TaskAssignmentChooseRoleComponent.returnUrl) {
      // Truncate any portion of the URL beginning with '#', as is appended when clicking "Manage" on a task
      url = TaskAssignmentChooseRoleComponent.returnUrl.split('#')[0];
    }

    return url;
  }

  public ngOnInit() {
    this.form = this.fb.group({});
  }

  public cancel(): void {
    // Use returnUrl to return the user to the "All work" or "My work" screen, depending on which one they started from
    this.router.navigate([TaskAssignmentChooseRoleComponent.returnUrl]);
  }

  public assign(): void {

  }
}
