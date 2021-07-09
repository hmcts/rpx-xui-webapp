import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocationCaptionText, AllocationRadioText, AllocationTitleText, AllocationType } from 'src/cases/enums';
import { AllocateRoleComponent } from '..';

@Component({
  template: `<exui-allocate-role [allocation]="allocation"></exui-allocate-role>`
})
class WrapperComponent {
  @ViewChild(AllocateRoleComponent) public ref: AllocateRoleComponent;
  @Input() public allocation: AllocationType;
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
    component.allocation = AllocationType.Exclusion;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(AllocationTitleText.Exclusion);
    expect(component.caption).toBe(AllocationCaptionText.Exclusion);
    expect(component.selfText).toBe(AllocationRadioText.ExclusionSelf);
    expect(component.otherText).toBe(AllocationRadioText.ExclusionOther);
  });

  it('should correctly set the judiciary text', () => {
    component.allocation = AllocationType.Judiciary;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(AllocationTitleText.Judiciary);
    expect(component.caption).toBe(AllocationCaptionText.Judiciary);
    expect(component.selfText).toBe(AllocationRadioText.NonExclusionSelf);
    expect(component.otherText).toBe(AllocationRadioText.NonExclusionOther);
  });

  it('should correctly set the legalops text', () => {
    component.allocation = AllocationType.LegalOps;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe(AllocationTitleText.LegalOps);
    expect(component.caption).toBe(AllocationCaptionText.LegalOps);
    expect(component.selfText).toBe(AllocationRadioText.NonExclusionSelf);
    expect(component.otherText).toBe(AllocationRadioText.NonExclusionOther);
  });
});
