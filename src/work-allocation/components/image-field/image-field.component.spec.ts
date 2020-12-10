import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAllocationComponentsModule } from './../work-allocation.components.module';
import { ImageFieldComponent } from './image-field.component';

@Component({
  template: `<exui-image-field [src]="src" [alt]="alt"></exui-image-field>`
})
class WrapperComponent {
  @ViewChild(ImageFieldComponent) public appComponentRef: ImageFieldComponent;
  @Input() public src: string;
  @Input() public alt: string;
}

describe('WorkAllocation', () => {

  describe('ImageFieldComponent', () => {
    let component: ImageFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ]
      }).compileComponents();
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should show only if there is an image to show', () => {
      // Expect the nativeElement to be empty (no image yet)
      expect(fixture.debugElement.nativeElement.querySelector('img')).toBeNull();


      // Set up the image
      const EXAMPLE_IMAGE: string = '/assets/images/test.jpg';

      // Add the image src and it should now be available
      component.src = EXAMPLE_IMAGE;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE_IMAGE);

      // Remove the image src and it should no longer display
      component.src = undefined;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element).toBeNull();

      // Add the image src and it should now be available again
      component.src = EXAMPLE_IMAGE;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE_IMAGE);

      // Set the image src to null and it should no longer display
      component.src = null;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element).toBeNull();

      // Add the image src and it should now be available again
      component.src = EXAMPLE_IMAGE;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE_IMAGE);
    });

    it('should allow swapping of an image', () => {
      // Expect the nativeElement to be empty (no image yet)
      expect(fixture.debugElement.nativeElement.querySelector('img')).toBeNull();


      // Set up the image
      const EXAMPLE1_IMAGE: string = '/assets/images/test.jpg';
      const EXAMPLE2_IMAGE: string = '/assets/images/govuk-crest.png';

      // Add the first image src and it should now be available
      component.src = EXAMPLE1_IMAGE;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE1_IMAGE);

      // Replace the image src and it should no longer display
      component.src = EXAMPLE2_IMAGE;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE2_IMAGE);

      // Add the image src again and it should now be available again
      component.src = EXAMPLE1_IMAGE;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE1_IMAGE);

      // Set the image src to null and it should no longer display
      component.src = null;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element).toBeNull();

    });

    it('should show the correct alt text', () => {
      // Expect the nativeElement to be empty (no image yet)
      expect(fixture.debugElement.nativeElement.querySelector('img')).toBeNull();


      // Set up the image
      const EXAMPLE_IMAGE: string = '/assets/images/test.jpg';
      const ALT_STRING: string = 'Example for alt';

      // Add the image src and it should now be available with default Image alt setting
      component.src = EXAMPLE_IMAGE;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE_IMAGE);
      expect(element.getAttribute('alt')).toBe('Image');

      // Set the alt to be the example given
      component.alt = ALT_STRING;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('alt')).toBe(ALT_STRING);

      // Remove the alt and check whether the default setting is valid
      component.alt = undefined;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('alt')).toBe('Image');

      // Set the alt to be the example given again
      component.alt = ALT_STRING;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('alt')).toBe(ALT_STRING);

      // Set the alt and check whether the default setting is valid
      component.alt = null;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('alt')).toBe('Image');

    });

  });

});
