import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/services/user/user.service';

@Component({
  selector: 'exui-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {

  public refundsApiRoot = 'api/refund';
  public ccdCaseNumber = 0;
  public userEmail = 'test@test.com';
  public userRoles = ['role1', 'role2'];

  constructor(private readonly userService: UserService) { }

  public ngOnInit() {
    this.userService.getUserDetails().subscribe(details => {
      this.userEmail = details.userInfo.email;
      this.userRoles = details.userInfo.roles;
    });
  }

}
