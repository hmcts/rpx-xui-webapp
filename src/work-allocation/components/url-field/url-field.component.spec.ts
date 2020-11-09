import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { UrlFieldComponent } from './url-field.component';

@Component({
  template: `<exui-url-field [href]="href" [label]="label" [target]="target"></exui-url-field>`
})
class WrapperComponent {
  @ViewChild(UrlFieldComponent) public appComponentRef: UrlFieldComponent;
  @Input() public href: string;
  @Input() public label: string;
  @Input() public target: string;
}

describe('WorkAllocation', () => {

  describe('UrlFieldComponent', () => {
    let component: UrlFieldComponent;
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
