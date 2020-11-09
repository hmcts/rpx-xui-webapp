import { Component, Input } from '@angular/core';

@Component({
  selector: 'exui-url-field',
  templateUrl: './url-field.component.html'
})
export class UrlFieldComponent {
  /**
   * The url to use for the link.
   */
  @Input() public href: string;

  /**
   * The label to display. If this is not provided, the url will
   * be displayed.
   */
  @Input() public label: string;
  
  /**
   * The target for the link. Defaults to "_self".
   */
  @Input() public target: string = '_self';
}
