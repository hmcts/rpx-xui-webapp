import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HearingCompletedSummaryComponent } from './hearing-completed-summary.component';

describe('HearingCompletedSummaryComponent', () => {
  let component: HearingCompletedSummaryComponent;
  let fixture: ComponentFixture<HearingCompletedSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HearingCompletedSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingCompletedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
