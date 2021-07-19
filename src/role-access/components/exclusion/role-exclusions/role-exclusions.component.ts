import {Component, Input} from '@angular/core';
import { RoleExclusion } from '../../../models/role-exclusion.model';

@Component({
    selector: 'exui-role-exclusions',
    templateUrl: './role-exclusions.component.html'
  })

export class RoleExclusionsComponent {
  @Input() public exclusions: RoleExclusion [];

  @Input() public allowDelete: boolean = false;

  public deleteExclusion(exclusion: RoleExclusion) {
    console.log(exclusion);
  }
}
