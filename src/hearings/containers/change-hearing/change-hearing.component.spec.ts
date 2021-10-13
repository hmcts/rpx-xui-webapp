import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeHearingComponent } from './change-hearing.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ChangeHearingComponent', () => {
  let component: ChangeHearingComponent;
  let fixture: ComponentFixture<ChangeHearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeHearingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
