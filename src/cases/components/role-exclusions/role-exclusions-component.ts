import {Component, Input, OnInit} from '@angular/core';
import { RoleExclusion } from '../../models/role-exclusions/role-exclusion.model';

@Component({
    selector: 'exui-role-exclusions',
    templateUrl: './role-exclusions-component.html'
  })

export class RoleExclusionsComponent implements OnInit {
  @Input() 
  public exclusions: RoleExclusion [];

  @Input()
  public allowDelete: boolean = false;

  ngOnInit(): void {
  }
  public deleteExclusion(exclusion: RoleExclusion) {
    console.log(exclusion);
  }
}
