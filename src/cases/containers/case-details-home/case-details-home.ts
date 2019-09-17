import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'exui-case-details-home',
  templateUrl: './case-details-home.html'
})
export class CaseDetailsHomeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('HMCTS Manage Cases | Case');
  }
}
