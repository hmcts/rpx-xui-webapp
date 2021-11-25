import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { LocationSearchContainerComponent } from './location-search-container.component';
import { LocationModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { By } from '@angular/platform-browser';

describe('LocationSearchContainerComponent', () => {
  let component: LocationSearchContainerComponent;
  let fixture: ComponentFixture<LocationSearchContainerComponent>;

  const initialState = {
    hearings: {
      hearingsList: {
        caseHearingsMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSearchContainerComponent ],
      providers: [
        provideMockStore({initialState})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    } as LocationModel;

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
    } as LocationModel;

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
    });
  });
});
