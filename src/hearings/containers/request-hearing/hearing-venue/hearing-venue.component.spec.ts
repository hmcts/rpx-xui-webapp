import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingVenueComponent } from './hearing-venue.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ViewHearingComponent', () => {
  let component: HearingVenueComponent;
  let fixture: ComponentFixture<HearingVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ HearingVenueComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingVenueComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getLocationSearchFocus');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show summry header', async (done) => {
    component.findLocationFormGroup.controls.locationSelectedFormControl.setValue('TEST ERROR');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      done();
      const errorElement = fixture.debugElement.query(By.css('.govuk-error-summary__list'));
      expect(errorElement).toBeDefined();
    });
  });

  it('should call getLocationSearchFocus when clicking on the summary error anchor', async (done) => {
    component.findLocationFormGroup.controls.locationSelectedFormControl.setValue('TEST ERROR');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      done();
      const errorElement = fixture.debugElement.query(By.css('.govuk-error-message'));
      expect(errorElement).toBeDefined();
      const errorAnchor = errorElement.nativeElement.nativeElement.querySelector('a');
      errorAnchor.dispatchEvent(new Event('click'));
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.getLocationSearchFocus).toHaveBeenCalled();
      });
    });
  });
});
