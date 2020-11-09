import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAllocationComponentsModule } from './../work-allocation.components.module';
import { ImageFieldComponent } from './image-field.component';

@Component({
  template: `<exui-image-field [src]="src" [alt]="alt"></exui-image-field>`
})
class WrapperComponent {
  @ViewChild(ImageFieldComponent) appComponentRef: ImageFieldComponent;
  @Input() public src: string;
  @Input() public alt: string;
}

describe('WorkAllocation', () => {

  describe('ImageFieldComponent', () => {
    let component: ImageFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    /**
     * TODO: Add some actual unit tests.
     */

  });

});
