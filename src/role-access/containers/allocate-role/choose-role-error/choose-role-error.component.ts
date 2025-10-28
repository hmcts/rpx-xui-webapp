import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { getLabel } from '../../../../work-allocation/utils';
import {
  AllocateRoleNavigation
} from '../../../models';

@Component({
  standalone: false,
  selector: 'exui-choose-role-error',
  templateUrl: './choose-role-error.component.html'
})
export class ChooseRoleErrorComponent implements OnInit {
  @Input() public navEvent: AllocateRoleNavigation;

  public roleCategory: string;
  public jurisdiction: string;

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    // roleCategory: 1. JUDICIAL/2. LEGAL_OPERATIONS which is exactly matched with back end
    // 1. judicial: add judicial role journey
    // 2. legalOps: add legal Ops role journey
    this.roleCategory = this.route.snapshot.queryParams && this.route.snapshot.queryParams.roleCategory ?
      getLabel(this.route.snapshot.queryParams.roleCategory) : '';
    this.jurisdiction = this.route.snapshot.queryParams && this.route.snapshot.queryParams.jurisdiction ?
      this.route.snapshot.queryParams.jurisdiction : '';
  }
}
