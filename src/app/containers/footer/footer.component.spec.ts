import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  @Component({
    selector: 'exui-app-host-dummy-component',
    template: '<exui-app-footer></exui-app-footer>',
    standalone: false
})
  class TestDummyHostComponent {
    @ViewChild(FooterComponent, { static: false })
    public footerComponent: FooterComponent;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let testHostComponent: TestDummyHostComponent;
  let testHostFixture: ComponentFixture<TestDummyHostComponent>;
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let element: DebugElement;

  beforeEach(waitForAsync(() => {
    const storeMock = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [FooterComponent, TestDummyHostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{
        provide: Store,
        useValue: storeMock
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestDummyHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
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
