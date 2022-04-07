import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { State } from '../../../../app/store';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { AccessReason, SpecificAccessErrors, SpecificAccessText } from '../../../models/enums';
import { DecideSpecificAccessAndGo } from '../../../store';
import { SpecificAccessReviewComponent } from './specific-access-review.component';

describe('SpecificAccessReviewComponent', () => {
  let component: SpecificAccessReviewComponent;
  let fixture: ComponentFixture<SpecificAccessReviewComponent>;
  let mockStore: MockStore<State>;
  const FORM_GROUP: FormGroup = new FormGroup({});

  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnStoreDispatch = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [SpecificAccessReviewComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore(),
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    spyOnPipeToStore = spyOn(mockStore, 'pipe').and.callThrough();
    spyOnStoreDispatch = spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(SpecificAccessReviewComponent);
    component = fixture.componentInstance;
    component.formGroup = FORM_GROUP;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

  describe('navigation', () => {

    it('should create component and show the "review access" info message banner', () => {
      const headingElement = fixture.debugElement.nativeElement.querySelector(
        '.govuk-fieldset__heading'
      );
      expect(headingElement.textContent).toContain(
        SpecificAccessText.TITLE
      );
      const hintElement = fixture.debugElement.nativeElement.querySelector(
        '.govuk-fieldset__legend--m'
      );
      expect(hintElement.textContent).toContain(
        SpecificAccessText.HINT
      );
    });

    xit('should show validation error when any radio button selected and the form submitted', () => {
      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

      submitButton.click();
      fixture.detectChanges();
      expect(component.formGroup.invalid).toBe(true);
      const errorBannerElement = fixture.debugElement.nativeElement.querySelector(
        '.govuk-error-summary__list'
      );
      expect(errorBannerElement.textContent).toContain(
        SpecificAccessErrors.NO_SELECTION
      );
      const errorMessageElement = fixture.debugElement.nativeElement.querySelector(
        '.govuk-error-summary__title'
      );
      expect(errorMessageElement.textContent).toContain(
        SpecificAccessErrors.GENERIC_ERROR
      );
    });

    xit('should clear validation error when a radio button selected and the form submitted', () => {
      const radioButton =
        fixture.debugElement.nativeElement.querySelector('#reason-0');
      radioButton.click();
      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();
      expect(component.formGroup.invalid).toBe(false);
      const errorBannerElement = fixture.debugElement.nativeElement.querySelector(
        '.govuk-error-summary__list'
      );
      expect(errorBannerElement).toBeNull();
      const errorMessageElement = fixture.debugElement.nativeElement.querySelector(
        '.govuk-error-summary__title'
      );
      expect(errorMessageElement).toBeNull();
    });

    xit('should go back to the page before previous one when the Cancel link is clicked', () => {
      const cancelLink =
        fixture.debugElement.nativeElement.querySelector('a.govuk-body');
      expect(cancelLink.text).toContain('Cancel');
      spyOn(window.history, 'go');
      cancelLink.click();
      expect(window.history.go).toHaveBeenCalledWith(-1);
    });

    it('should correctly navigate on click of continue button for approve request', () => {
      component.reviewOptionControl.setValue(AccessReason.APPROVE_REQUEST);
      component.navigationHandler(SpecificAccessNavigationEvent.CONTINUE);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new DecideSpecificAccessAndGo( { accessReason: AccessReason.APPROVE_REQUEST, specificAccessState: SpecificAccessState.SPECIFIC_ACCESS_DURATION } ));
    });

    it('should correctly navigate on click of continue button for reject request', () => {
      component.reviewOptionControl.setValue(AccessReason.REJECT_REQUEST);
      component.navigationHandler(SpecificAccessNavigationEvent.CONTINUE);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new DecideSpecificAccessAndGo( { accessReason: AccessReason.REJECT_REQUEST, specificAccessState: SpecificAccessState.SPECIFIC_ACCESS_DENIED } ));
    });

    it('should correctly navigate on click of continue button for request more information', () => {
      component.reviewOptionControl.setValue(AccessReason.REQUEST_MORE_INFORMATION);
      component.navigationHandler(SpecificAccessNavigationEvent.CONTINUE);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new DecideSpecificAccessAndGo( { accessReason: AccessReason.REQUEST_MORE_INFORMATION, specificAccessState: SpecificAccessState.SPECIFIC_ACCESS_INFORMATION } ));
    });

  });

  describe('onDestroy()', () => {
    it('should unsubscribe', () => {
      component.specificAccessStateDataSub = new Observable().subscribe();
      spyOn(component.specificAccessStateDataSub, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.specificAccessStateDataSub.unsubscribe).toHaveBeenCalled();
    });
  });
});
