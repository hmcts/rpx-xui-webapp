import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseShareComponent } from './case-share.component';

describe('CaseShareComponent', () => {
  let component: CaseShareComponent;
  let fixture: ComponentFixture<CaseShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
