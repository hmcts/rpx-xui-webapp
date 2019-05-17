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
  template: `
    <a *ngIf="backLink" [routerLink]="backLink" class="govuk-back-link">Back</a>
    <main id="content" role="main" class="govuk-main-wrapper">
      <h1 *ngIf="title" class="govuk-heading-xl">{{title}}</h1>
      <ng-content></ng-content>
    </main>
  `
})
export class ExuiPageWrapperComponent  {

  @Input() backLink: string;
  @Input() title: string;

  constructor() { }

}
