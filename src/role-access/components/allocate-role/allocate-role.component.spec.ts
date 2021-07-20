import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleAllocationCaptionText, RoleAllocationRadioText, RoleAllocationTitleText, RoleAllocationType } from '../../models/enums';
import { AllocateRoleComponent } from './allocate-role.component';

@Component({
  template: `<exui-allocate-role [roleAllocation]="roleAllocation"></exui-allocate-role>`
})
class WrapperComponent {
  @ViewChild(AllocateRoleComponent) public ref: AllocateRoleComponent;
  @Input() public roleAllocation: RoleAllocationType;
}

describe('AllocateRoleComponent', () => {
  let component: AllocateRoleComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRoleComponent, WrapperComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.ref;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should correctly set the exclusion text', () => {
    component.roleAllocation = RoleAllocationType.Exclusion;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(RoleAllocationTitleText.ExclusionAllocate);
    expect(component.caption).toBe(RoleAllocationCaptionText.Exclusion);
    expect(component.selfText).toBe(RoleAllocationRadioText.ExclusionSelf);
    expect(component.otherText).toBe(RoleAllocationRadioText.ExclusionOther);
  });

  it('should correctly set the judiciary text', () => {
    component.roleAllocation = RoleAllocationType.Judiciary;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(RoleAllocationTitleText.NonExclusionAllocate);
    expect(component.caption).toBe(RoleAllocationCaptionText.JudiciaryAllocate);
    expect(component.selfText).toBe(RoleAllocationRadioText.NonExclusionSelf);
    expect(component.otherText).toBe(RoleAllocationRadioText.NonExclusionOther);
  });

  it('should correctly set the legalops text', () => {
    component.roleAllocation = RoleAllocationType.LegalOps;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(RoleAllocationTitleText.NonExclusionAllocate);
    expect(component.caption).toBe(RoleAllocationCaptionText.LegalOpsAllocate);
    expect(component.selfText).toBe(RoleAllocationRadioText.NonExclusionSelf);
    expect(component.otherText).toBe(RoleAllocationRadioText.NonExclusionOther);
  });
});
