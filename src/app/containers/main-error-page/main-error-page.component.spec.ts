import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainErrorPageComponent } from './main-error-page.component';

describe('MainErrorPageComponent', () => {  
  @Component({
    selector: `exui-app-host-dummy-component`,
    template: `<exui-main-error-page></exui-main-error-page>`
  })
  class TestDummyHostComponent {
      @ViewChild(MainErrorPageComponent)
      public mainErrorPageComponent: MainErrorPageComponent;
  }

  let testHostComponent: TestDummyHostComponent;
  let testHostFixture: ComponentFixture<TestDummyHostComponent>;
  let component: MainErrorPageComponent;
  let fixture: ComponentFixture<MainErrorPageComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [
              RouterTestingModule
          ],
          declarations: [ MainErrorPageComponent, TestDummyHostComponent ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
          .compileComponents();
  }));
  beforeEach(() => {
      testHostFixture = TestBed.createComponent(TestDummyHostComponent);
      testHostComponent = testHostFixture.componentInstance;
  });
  beforeEach(() => {
      fixture = TestBed.createComponent(MainErrorPageComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement;
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });
  it('should be created by angular', () => {
      expect(fixture).not.toBeNull();
  });
});
