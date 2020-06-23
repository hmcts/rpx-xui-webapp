import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exui-case-share',
  templateUrl: './case-share.component.html',
  styleUrls: ['./case-share.component.scss']
})
export class CaseShareComponent implements OnInit {

  @Input() backLink: string;

  constructor() {
    this.backLink = 'cases';
  }

  ngOnInit() {
  }

}
