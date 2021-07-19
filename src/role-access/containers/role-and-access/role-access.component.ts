import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleExclusion } from '../../models/role-exclusion.model';
import { RoleExclusionsService } from '../../services/role-exclusions.service';

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
