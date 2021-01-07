import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorMessage } from '../../models';
import { ErrorMessageComponent } from './error-message.component';

@Component({
  template: `<exui-error-message [title]="title" [error]="error"></exui-error-message>`
})
class WrapperComponent {
  @ViewChild(ErrorMessageComponent) public appComponentRef: ErrorMessageComponent;
  @Input() public error: ErrorMessage;
}

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperComponent, ErrorMessageComponent ],
      imports: [ RouterTestingModule ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const title: string = 'This is an example title';

    // Add the title and it should now be available
    wrapper.error = { title, description: '' };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerText).toBe(title);
  });

  it('should display the correct error description', () => {
    const description: string = 'This is an example description';

    // Add the error description and it should now be available
    wrapper.error = { title: '', description };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerText).toBe(description);
  });

});
