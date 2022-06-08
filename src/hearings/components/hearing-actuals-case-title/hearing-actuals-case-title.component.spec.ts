import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingActualsCaseTitleComponent } from './hearing-actuals-case-title.component';

describe('HearingActualsCaseTitleComponent', () => {
  let component: HearingActualsCaseTitleComponent;
  let fixture: ComponentFixture<HearingActualsCaseTitleComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsCaseTitleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HearingActualsCaseTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display case title if case details object is not empty', () => {
    component.caseTitle = 'Jane Smith vs DWP';
    fixture.detectChanges();
    const caseNameEl = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(caseNameEl.textContent).toContain('Jane Smith vs DWP');
  });
});
