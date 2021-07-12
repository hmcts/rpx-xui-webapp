import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DescribeExclusionComponent } from '../../components';

import { AllocateRoleContainerComponent } from './allocate-role-container.component';

describe('AllocateRoleContainerComponent', () => {
  let component: AllocateRoleContainerComponent;
  let fixture: ComponentFixture<AllocateRoleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AllocateRoleContainerComponent, DescribeExclusionComponent]
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

  it('should set the form to an invalid state if none of the values are populated', () => {
    spyOn(component, 'continue');
    const container: DebugElement = fixture.debugElement.query(By.css('#submit-button'));
    const button: HTMLButtonElement = container.nativeElement as HTMLButtonElement;
    button.click();
    expect(component.continue).toHaveBeenCalledWith({text: ''}, false);
  });

  it('should mark the form as touched when the user submits the form', () => {
    spyOn(component.allocationForm.get('text'), 'markAsTouched');
    component.continue({text: 'some text'}, true);
    expect(component.allocationForm.get('text').markAsTouched).toHaveBeenCalled();
  });
});
