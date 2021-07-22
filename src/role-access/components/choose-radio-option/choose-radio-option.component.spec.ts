import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioOption } from '../../models';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../models/enums';
import { ChooseRadioOptionComponent } from './choose-radio-option.component';

@Component({
  template: `<exui-choose-radio-option [radios]="radios" [title]="title" [caption]="caption"></exui-choose-radio-option>`
})
class WrapperComponent {
  @ViewChild(ChooseRadioOptionComponent) public ref: ChooseRadioOptionComponent;
  @Input() public radios: RadioOption[];
  @Input() public title: RoleAllocationTitleText;
  @Input() public caption: RoleAllocationCaptionText;
}

const mockRoles: RadioOption[] = [
  { radioId: '1', radioName: 'Role 1' },
  { radioId: '2', radioName: 'Role 2' },
  { radioId: '3', radioName: 'Role 3' }];

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

  it('should correctly set the text', () => {
    component.title = RoleAllocationTitleText.ExclusionAllocate;
    component.caption = RoleAllocationCaptionText.Exclusion;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.govuk-heading-l')).nativeElement;
    expect(titleElement.textContent).toContain(RoleAllocationCaptionText.Exclusion);
    expect(titleElement.textContent).toContain(RoleAllocationTitleText.ExclusionAllocate);
  });

  it('should correctly set the radio buttons based on the roles inputted', () => {
    component.radios = mockRoles;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.govuk-radios__input')).nativeElement;
    expect(element.id).toBe('1');
    expect(element.value).toBe('Role 1');
  });
});
