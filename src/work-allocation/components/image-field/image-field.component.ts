import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'exui-image-field',
  templateUrl: './image-field.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ImageFieldComponent {
  /**
   * The url or base64 encoded string for the image.
   */
  @Input() public src: string;

  /**
   * The alternate text to use for the image take. This defaults to "Image".
   */
  @Input() public alt: string;
}
