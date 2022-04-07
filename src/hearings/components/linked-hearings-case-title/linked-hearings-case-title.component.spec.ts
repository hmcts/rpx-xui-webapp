import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedHearingsCaseTitleComponent } from './linked-hearings-case-title.component';

describe('LinkedHearingsCaseTitleComponent', () => {
  let component: LinkedHearingsCaseTitleComponent;
  let fixture: ComponentFixture<LinkedHearingsCaseTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedHearingsCaseTitleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedHearingsCaseTitleComponent);
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
    expect(caseNameEl.textContent).toEqual('Link hearings to Jane Smith vs DWP (full hearing)');
  })
});
