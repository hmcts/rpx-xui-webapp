import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Role } from '../../models';
import { RoleAllocationCaptionText, RoleAllocationRadioText, RoleAllocationTitleText, RoleAllocationType } from '../../models/enums';
import { ChooseRoleComponent } from './choose-role.component';

@Component({
  template: `<exui-choose-role [roleAllocation]="roleAllocation"></exui-choose-role>`
})
class WrapperComponent {
  @ViewChild(ChooseRoleComponent) public ref: ChooseRoleComponent;
  @Input() public roleAllocation: RoleAllocationType;
}

const mockRoles: Role[] = [
  { roleId: '1', roleName: 'Role 1' },
  { roleId: '2', roleName: 'Role 2' },
  { roleId: '3', roleName: 'Role 3' }]

describe('AllocateRoleComponent', () => {
  let component: ChooseRoleComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRoleComponent, WrapperComponent ]
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
    expect(component.title).toBe(RoleAllocationTitleText.ExclusionChoose);
    expect(component.caption).toBe(RoleAllocationCaptionText.Exclusion);
  });

  it('should correctly set the judiciary text', () => {
    component.roleAllocation = RoleAllocationType.Judiciary;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(RoleAllocationTitleText.NonExclusionChoose);
    expect(component.caption).toBe(RoleAllocationCaptionText.JudiciaryChoose);
  });

  it('should correctly set the legal ops text', () => {
    component.roleAllocation = RoleAllocationType.LegalOps;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(RoleAllocationTitleText.NonExclusionChoose);
    expect(component.caption).toBe(RoleAllocationCaptionText.LegalOpsChoose);
  });

  it('should correctly set the radio buttons based on the roles inputted', () => {
    component.roles = mockRoles;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.govuk-radios__input')).nativeElement;
    expect(element.id).toBe('1');
    expect(element.value).toBe('Role 1');
  });
});
