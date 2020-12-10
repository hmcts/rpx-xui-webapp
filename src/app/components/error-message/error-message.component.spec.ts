import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from '..';

@Component({
  template: `<exui-error-message [title]="title" [errorDesc]="errorDesc"></exui-error-message>`
})
class WrapperComponent {
  @ViewChild(ErrorMessageComponent) public appComponentRef: ErrorMessageComponent;
  @Input() public title: string;
  @Input() public errorDesc: string;
}

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperComponent, ErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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
    component.title = title;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerText).toBe(title);
  });

  it('should display the correct error description', () => {
    const errorDesc: string = 'This is an example description';

    // Add the error description and it should now be available
    component.errorDesc = errorDesc;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerText).toBe(errorDesc);
  });

});
