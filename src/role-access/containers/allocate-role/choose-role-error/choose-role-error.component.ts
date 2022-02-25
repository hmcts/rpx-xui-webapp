import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { getLabel } from '../../../../work-allocation-2/utils';
import { CHOOSE_A_ROLE, ERROR_MESSAGE } from '../../../constants';
import {
  AllocateRoleNavigation,
  SpecificRole
} from '../../../models';
import { RoleAllocationTitleText } from '../../../models/enums';
import { OptionsModel } from '../../../models/options-model';

@Component({
  selector: 'exui-choose-role-error',
  templateUrl: './choose-role-error.component.html',
})
export class ChooseRoleErrorComponent implements OnInit {
  public ERROR_MESSAGE = ERROR_MESSAGE;
  @Input() public navEvent: AllocateRoleNavigation;

  public error: any;
  public title = RoleAllocationTitleText.NonExclusionChoose;
  public caption: string = '';
  public optionsList: OptionsModel[];
  public submitted: boolean = false;

  public formGroup: FormGroup;
  public radioOptionControl: FormControl;
  public radioControlName: string = CHOOSE_A_ROLE;

  public allocateRoleStateDataSub: Subscription;

  public typeOfRole: SpecificRole;

  public roleCategory: string = '';
  public jurisdiction: string;

  constructor(private readonly route: ActivatedRoute) {
  }

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
