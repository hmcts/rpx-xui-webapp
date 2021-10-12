import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelHearingComponent } from './cancel-hearing.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CancelHearingComponent', () => {
  let component: CancelHearingComponent;
  let fixture: ComponentFixture<CancelHearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelHearingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
