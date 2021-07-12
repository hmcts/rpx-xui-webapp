import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DescribeExclusionComponent } from './describe-exclusion.component';

describe('DescribeExclusionComponent', () => {
  let component: DescribeExclusionComponent;
  let fixture: ComponentFixture<DescribeExclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ DescribeExclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeExclusionComponent);
    component = fixture.componentInstance;
    component.controlName = 'text';
    component.title = 'Add an exclusion';
    component.description = 'Choose who the exclusion is for'
    component.controlName = 'text';
    const formGroup = new FormGroup({
      text: new FormControl('somevalue')
    });
    component.formGroup = formGroup;
    fixture.detectChanges();
  });

  it('should have a text area input box populated with a value', () => {
    const container: DebugElement = fixture.debugElement.query(By.css('#exclusion-description'));
    const textArea: HTMLInputElement = container.nativeElement as HTMLInputElement;
    expect(textArea.nodeName).toEqual('TEXTAREA');
    expect(textArea.value).toEqual('somevalue');
  });
});
