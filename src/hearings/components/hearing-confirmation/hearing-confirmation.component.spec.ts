import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HearingConfirmationSource } from 'src/hearings/models/hearings.enum';
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

  it('should display anchor link with destination to hearings tab for hearing request source', () => {
    component.caseId = '1111222233334444';
    component.confirmationSource = HearingConfirmationSource.HEARING_REQUEST;
    fixture.detectChanges();
    const subheadingDescriptionElement = fixture.debugElement.nativeElement.querySelector('.govuk-body');
    const anchorElement = subheadingDescriptionElement.querySelector('a');
    expect(anchorElement.getAttribute('href')).toEqual('/cases/case-details/1111222233334444/hearings');
  });
});
