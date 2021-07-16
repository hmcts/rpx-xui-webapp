import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleExclusion } from '../../../cases/models/role-exclusions/role-exclusion.model';
import { RoleExclusionsService } from '../../../cases/services';

@Component({
    selector: 'exui-role-access',
    templateUrl: './role-access.component.html'
  })

export class RoleAccessComponent implements OnInit {
  constructor(private readonly roleExclusionsService: RoleExclusionsService) { }
  public exclusions$: Observable<RoleExclusion[]>;

  public ngOnInit(): void {
    this.exclusions$ = this.roleExclusionsService.getCurrentUserRoleExclusions();
  }
}
