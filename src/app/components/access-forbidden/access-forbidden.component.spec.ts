import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessForbiddenComponent } from '..';

describe('AccessibilityComponent', () => {
  let component: AccessForbiddenComponent;
  let fixture: ComponentFixture<AccessForbiddenComponent>;

  @Component({
    selector: 'exui-app-header',
    template: ''
  })
  class MockAppHeaderComponent {

  }

  @Component({
  selector: 'exui-app-footer',
  template: ''
  })
  class MockFooterComponent {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessForbiddenComponent, MockAppHeaderComponent, MockFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});