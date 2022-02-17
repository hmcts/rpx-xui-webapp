import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingConfirmationComponent } from './hearing-confirmation.component';

describe('HearingConfirmationComponent', () => {
  let component: HearingConfirmationComponent;
  let fixture: ComponentFixture<HearingConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingConfirmationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
