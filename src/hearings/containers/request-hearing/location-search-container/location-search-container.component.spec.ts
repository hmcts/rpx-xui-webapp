import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { LocationByEPIMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { Observable } from 'rxjs';
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
            hmctsServiceID: 'SSCS'
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
    spyOn(component, 'removeSelection');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display selection in selection list', async (done) => {
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
    fixture.detectChanges();
    done();
    const selectedLoctions = fixture.debugElement.queryAll(By.css('.location-selection'));
    expect(selectedLoctions.length).toBeGreaterThan(0);
  });

  it('should remove selection in selection list', async () => {
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
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const selectedLoctions = fixture.debugElement.queryAll(By.css('.location-selection'));
      const button =  fixture.debugElement.query(By.css('.remove-loation-button'));
      button.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      const selectedLoctionsAfterClick = fixture.debugElement.queryAll(By.css('.location-selection'));
      expect(selectedLoctions.length).toBeGreaterThan(0);
      expect(selectedLoctionsAfterClick.length).toEqual(0);
      expect(component.removeSelection).toHaveBeenCalled();
    });
  });
});
