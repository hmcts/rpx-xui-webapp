import {Component, Input} from '@angular/core';
/**
 * Main Page Wrapper
 * Responsible for:
 * * Wrapping content within the gov-uk html elements bellow
 * * @prop showBackLink - switch for back link
 * * @prop title = title
 * * @prop summaryErrors list of errors
 * * @prop back link, title (title), summaryErrors (array of errors)
 */
@Component({
  selector: 'exui-page-wrapper',
  templateUrl: 'exui-page-wrapper.component.html',
  styleUrls: ['exui-page-wrapper.component.scss']
})
export class ExuiPageWrapperComponent  {

  @Input() backLink: string;
  @Input() title: string;

  constructor() { }

}
