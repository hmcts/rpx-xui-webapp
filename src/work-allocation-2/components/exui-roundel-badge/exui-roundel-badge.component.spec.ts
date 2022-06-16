import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {InfoMessage, InfoMessageType} from './../../enums';
import { WorkAllocationComponentsModule } from './../work-allocation.components.module';
import { RoundelBadgeComponent } from './exui-roundel-badge.component';


@Component({
  template: `<exui-roundel-badge [isNew]="isNew" [rowData]="rowData" [field]="field"></exui-roundel-badge>`
})
class WrapperComponent {
  @ViewChild(RoundelBadgeComponent) public appComponentRef: RoundelBadgeComponent;
  @Input() public isNew: any;
  @Input() public rowData: any;
  @Input() public field: any;
}

describe('WorkAllocation', () => {

  describe('InfoMessageComponent', () => {
    let component: RoundelBadgeComponent;
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

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
