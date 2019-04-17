import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiHttpInterceptorComponent } from './exui-http-interceptor.component';

describe('ExuiHttpInterceptorComponent', () => {
  let component: ExuiHttpInterceptorComponent;
  let fixture: ComponentFixture<ExuiHttpInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExuiHttpInterceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiHttpInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
