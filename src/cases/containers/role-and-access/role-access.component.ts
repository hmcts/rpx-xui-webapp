import { Component, OnInit } from '@angular/core';
import { RoleExclusion } from '../../../cases/models/role-exclusions/role-exclusion.model';
import { RoleExclusionsService } from '../../../cases/services';

@Component({
    selector: 'exui-role-access',
    templateUrl: './role-access.component.html'
  })

export class RoleAccessComponent implements OnInit {
  constructor(private readonly roleExclusionsService: RoleExclusionsService) { }
  public exclusions: RoleExclusion[];

  public ngOnInit() {
    this.roleExclusionsService.getCurrentUserRoleExclusions().subscribe(exclusions => this.exclusions = exclusions);
  }
}
