import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleAllocationType } from '../../models/enums';
import { ChooseRadioOptionComponent } from './choose-radio-option.component';

@Component({
  template: `<exui-choose-radio-option></exui-choose-radio-option>`
})
class WrapperComponent {
  @ViewChild(ChooseRadioOptionComponent) public ref: ChooseRadioOptionComponent;
  @Input() public roleAllocation: RoleAllocationType;
}

describe('ChooseRadioOptionComponent', () => {
  let component: ChooseRadioOptionComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRadioOptionComponent, WrapperComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.ref;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
