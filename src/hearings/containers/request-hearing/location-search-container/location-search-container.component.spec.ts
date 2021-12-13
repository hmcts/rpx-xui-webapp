import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { LocationByEPIMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { LocationSearchContainerComponent } from './location-search-container.component';
@Component({
  selector: 'exui-search-location',
  template: '',
})
class MockLocationSearchContainerComponent {
  @Input() public serviceIds: string = '';
  @Input() public locationType: string = '';
  @Input() public disabled: boolean = false;
  @Input() public selectedLocations$: Observable<LocationByEPIMSModel[]>;
  @Input() public submitted?: boolean = true;
  @Input() public control: AbstractControl;
}

describe('LocationSearchContainerComponent', () => {
  let component: LocationSearchContainerComponent;
  let fixture: ComponentFixture<LocationSearchContainerComponent>;

  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'TEST'
          }
        ]
      },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSearchContainerComponent, MockLocationSearchContainerComponent ],
      providers: [
        provideMockStore({initialState}),
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(component, 'removeSelection').and.callThrough();
    spyOn(component.selectedLocations$, 'subscribe');
  });

  it('should display selection in selection list', async () => {
    const location = {
      court_venue_id: '100',
      epims_id: '219164',
      is_hearing_location: 'Y',
      is_case_management_location: 'Y',
      site_name: 'Aberdeen Tribunal Hearing Centre',
      court_name: 'ABERDEEN TRIBUNAL HEARING CENTRE',
      court_status: 'Open',
      region_id: '9',
      region: 'Scotland',
      court_type_id: '17',
      court_type: 'Employment Tribunal',
      open_for_public: 'Yes',
      court_address: 'AB1, 48 HUNTLY STREET, ABERDEEN',
      postcode: 'AB11 6LT'
    } as LocationByEPIMSModel;

    component.findLocationFormGroup.controls.locationSelectedFormControl.setValue(location);
    component.addSelection();
    component.selectedLocations$.subscribe(selectedLocations => {
      expect(selectedLocations.length).toBeGreaterThan(0);
      expect(component.findLocationFormGroup.controls.locationSelectedFormControl.value).toBeUndefined();
    });
  });

  it('should remove selection in selection list', async () => {
    const location =  {
      court_venue_id: '100',
      epims_id: '219164',
      is_hearing_location: 'Y',
      is_case_management_location: 'Y',
      site_name: 'Aberdeen Tribunal Hearing Centre',
      court_name: 'ABERDEEN TRIBUNAL HEARING CENTRE',
      court_status: 'Open',
      region_id: '9',
      region: 'Scotland',
      court_type_id: '17',
      court_type: 'Employment Tribunal',
      open_for_public: 'Yes',
      court_address: 'AB1, 48 HUNTLY STREET, ABERDEEN',
      postcode: 'AB11 6LT'
    } as LocationByEPIMSModel;

    component.selectedLocations$ = of([ location ]);
    component.removeSelection(location);
    fixture.detectChanges();
    // expect(component.selectedLocations$.subscribe).toHaveBeenCalled();
    component.selectedLocations$.subscribe(selectedLocations => {
      expect(selectedLocations.length).toEqual(0);
    });
  });

  it('should include page elements', () => {
    const hearingHeader = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(hearingHeader.textContent).toContain('What are the hearing venue details?');
    const hint = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hint.textContent).toContain('If this is a fully remote hearing you must still select the court or tribunal which will be managing the case.');
    const findCourtLink = fixture.debugElement.nativeElement.querySelector('.govuk-inset-text');
    expect(findCourtLink.textContent).toContain('You can check the venue has the required facilities or reasonable adjustments using');
    expect(findCourtLink.innerHTML).toContain('https://www.find-court-tribunal.service.gov.uk/search-by-name');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
