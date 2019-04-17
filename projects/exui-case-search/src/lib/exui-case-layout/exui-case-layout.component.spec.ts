import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiCaseLayoutComponent } from './exui-case-layout.component';

describe('ExuiCaseLayoutComponent', () => {
  let component: ExuiCaseLayoutComponent;
  let fixture: ComponentFixture<ExuiCaseLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExuiCaseLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiCaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
