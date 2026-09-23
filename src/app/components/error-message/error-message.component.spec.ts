import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorMessage } from '../../models';
import { MockRpxTranslatePipe } from '../../shared/test/mock-rpx-translate.pipe';
import { ErrorMessageComponent } from './error-message.component';

@Component({
  standalone: false,
  template: '<exui-error-message [title]="title" [error]="error"></exui-error-message>',
})
class WrapperComponent {
  @ViewChild(ErrorMessageComponent, { static: true }) public appComponentRef: ErrorMessageComponent;
  @Input() public error: ErrorMessage;
}

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrapperComponent, ErrorMessageComponent, MockRpxTranslatePipe],
      imports: [RouterTestingModule],
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

  it('should link the error summary to the field id on the same page', () => {
    wrapper.error = { title: 'There is a problem', description: 'Select an option', fieldId: 'APPROVE_REQUEST' };
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__list a');
    expect(link.getAttribute('href')).toBe('#APPROVE_REQUEST');
  });

  it('should link multiple errors to their field ids', () => {
    wrapper.error = { title: 'There is a problem', description: '', multiple: true, errors: [{ name: 'field-a', error: 'Error A' }] };
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__list a');
    expect(link.getAttribute('href')).toBe('#field-a');
  });

  it('should focus the target field when the error summary link is clicked', () => {
    const input = document.createElement('input');
    input.id = 'APPROVE_REQUEST';
    document.body.appendChild(input);
    wrapper.error = { title: 'There is a problem', description: 'Select an option', fieldId: 'APPROVE_REQUEST' };
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__list a');
    const event = new MouseEvent('click', { cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(input);
    input.remove();
  });

  it('should stay on the page when the target field does not exist', () => {
    wrapper.error = { title: 'There is a problem', description: 'Select an option', fieldId: 'missing-field' };
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__list a');
    const event = new MouseEvent('click', { cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });
});
