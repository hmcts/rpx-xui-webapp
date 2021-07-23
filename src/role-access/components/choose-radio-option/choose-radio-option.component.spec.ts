import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RoleAllocationCaptionText, RoleAllocationTitleText } from '../../models/enums';
import { OptionsModel } from '../../models/options-model';
import { ChooseRadioOptionComponent } from './choose-radio-option.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `<exui-choose-radio-option [optionsList]="optionsList" [title]="title" [caption]="caption"></exui-choose-radio-option>`
})
class WrapperComponent {
  @ViewChild(ChooseRadioOptionComponent) public ref: ChooseRadioOptionComponent;
  @Input() public optionsList: OptionsModel[];
  @Input() public title: RoleAllocationTitleText;
  @Input() public caption: RoleAllocationCaptionText;
}

const mockRoles: OptionsModel[] = [
  { optionId: '1', optionValue: 'Role 1' },
  { optionId: '2', optionValue: 'Role 2' },
  { optionId: '3', optionValue: 'Role 3' }];

describe('ChooseRadioOptionComponent', () => {
  const RADIO_OPTION_CONTROL: FormControl = new FormControl('');
  const FORM_GROUP: FormGroup = new FormGroup({['personRole']: RADIO_OPTION_CONTROL});

  let component: ChooseRadioOptionComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRadioOptionComponent, WrapperComponent ],
      imports: [
        ReactiveFormsModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.ref;
    component.formGroup = FORM_GROUP;
    component.radioControlName = 'personRole';
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
    component.optionsList = mockRoles;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.govuk-radios__input')).nativeElement;
    expect(element.id).toBe('1');
    expect(element.value).toBe('on');
  });
});
