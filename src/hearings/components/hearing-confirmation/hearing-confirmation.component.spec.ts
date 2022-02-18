import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HearingConfirmationComponent } from './hearing-confirmation.component';

describe('HearingConfirmationComponent', () => {
  let component: HearingConfirmationComponent;
  let fixture: ComponentFixture<HearingConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingConfirmationComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HearingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display anchor link with destination to hearings tab if subheading description is null or empty', () => {
    component.caseId = '1111222233334444';
    fixture.detectChanges();
    const subheadingDescriptionElement = fixture.debugElement.nativeElement.querySelector('.govuk-body');
    const anchorElement = subheadingDescriptionElement.querySelector('a');
    expect(anchorElement.getAttribute('href')).toEqual('/cases/case-details/1111222233334444/hearings');
  });
});
