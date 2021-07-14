import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorMessageComponent } from '../../../app/components';
import { DescribeExclusionComponent } from '../../components';

import { AllocateRoleContainerComponent } from './allocate-role-container.component';

describe('AllocateRoleContainerComponent', () => {
  let component: AllocateRoleContainerComponent;
  let fixture: ComponentFixture<AllocateRoleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [AllocateRoleContainerComponent, DescribeExclusionComponent, ErrorMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit form when all values are populated', () => {
    spyOn(component, 'continue');
    const container: DebugElement = fixture.debugElement.query(By.css('#submit-button'));
    component.allocationForm.get(component.DESCRIBE_EXCLUSION_CONTROL_NAME).patchValue('some text');
    const button: HTMLButtonElement = container.nativeElement as HTMLButtonElement;
    button.click();
    expect(component.continue).toHaveBeenCalledWith({text: 'some text'}, true);
  });

  it('should set the form to an invalid state if none of the values are populated and display error', () => {
    spyOn(component, 'continue');
    component.error = {
      title: 'There is a problem',
      description: 'Enter exclusion',
      fieldId: 'exclusion-description'
    };
    fixture.detectChanges();
    const buttonDebugElement: DebugElement = fixture.debugElement.query(By.css('#submit-button'));
    const errorDebugElement: DebugElement = fixture.debugElement.query(By.css('.govuk-error-summary__list'));
    const button: HTMLButtonElement = buttonDebugElement.nativeElement as HTMLButtonElement;
    const error: HTMLElement = errorDebugElement.nativeElement as HTMLElement;
    button.click();
    expect(component.continue).toHaveBeenCalledWith({text: ''}, false);
    expect(error.firstChild.firstChild.textContent).toBe('Enter exclusion');
  });

  it('should mark the form as touched when the user submits the form', () => {
    spyOn(component.allocationForm.get('text'), 'markAsTouched');
    component.continue({text: 'some text'}, true);
    expect(component.allocationForm.get('text').markAsTouched).toHaveBeenCalled();
  });
});
