import {Component, Input, OnInit} from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'exui-logger',
  template: `
    <div>
        <p>{{message}}<p>
    <div>
  `
})
export class ExuiLoggerComponent implements OnInit {
  @Input() backLink: string;
  @Input() title: string;

  constructor(private ngxLogger: NGXLogger) { }
  ngOnInit(): void {

  }
}