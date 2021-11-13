import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatOption, MatOptionModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { SearchLocationComponent } from './search-location.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationModel } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { of } from 'rxjs';

fdescribe('SearchLocationComponent', () => {
  let component: SearchLocationComponent;
  let fixture: ComponentFixture<SearchLocationComponent>;
  const SearchFilterServiceMock = jasmine.createSpyObj('LocationService', [
    'getAllLocations'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        MatAutocompleteModule,
        MatOptionModule,
      ],
      declarations: [
        SearchLocationComponent
      ],
      providers: [{ provide: LocationService, useValue: SearchFilterServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchLocationComponent);
    component = fixture.componentInstance;
    const locationService = TestBed.get(LocationService);
    locationService.getAllLocations.and.returnValue(of([
      {
        "court_venue_id": "100",
        "epims_id": "219164",
        "is_hearing_location": "Y",
        "is_case_management_location": "Y",
        "site_name": "Aberdeen Tribunal Hearing Centre",
        "court_name": "ABERDEEN TRIBUNAL HEARING CENTRE",
        "court_status": "Open",
        "region_id": "9",
        "region": "Scotland",
        "court_type_id": "17",
        "court_type": "Employment Tribunal",
        "open_for_public": "Yes",
        "court_address": "AB1, 48 HUNTLY STREET, ABERDEEN",
        "postcode": "AB11 6LT"
      },
      {
        "court_venue_id": "101",
        "epims_id": "219164",
        "is_hearing_location": "Y",
        "is_case_management_location": "Y",
        "site_name": "Aberdeen Tribunal Hearing Centre",
        "court_name": "ABERDEEN TRIBUNAL HEARING CENTRE",
        "court_status": "Open",
        "region_id": "9",
        "region": "Scotland",
        "court_type_id": "31",
        "court_type": "Social Security and Child Support Tribunal",
        "open_for_public": "Yes",
        "court_address": "AB1, 48 HUNTLY STREET, ABERDEEN",
        "postcode": "AB11 6LT"
      },
      {
        "court_venue_id": "102",
        "epims_id": "827534",
        "is_hearing_location": "Y",
        "is_case_management_location": "Y",
        "site_name": "Aberystwyth Justice Centre",
        "court_name": "ABERYSTWYTH JUSTICE CENTRE",
        "court_status": "Open",
        "region_id": "8",
        "region": "Wales",
        "court_type_id": "25",
        "court_type": "Magistrates Court",
        "open_for_public": "Yes",
        "court_address": "TREFECHAN",
        "postcode": "SY23 1AS "
      }]));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter locations on address based on input value', fakeAsync ((done) => {
    component.locations$.subscribe(x => {
      expect(x.length).toBeGreaterThan(1);
      done
    });

    const selectedLoction = fixture.debugElement.query(By.css('#input-selected-location'));
    selectedLoction.nativeElement.value = 'TREFECHAN';
    selectedLoction.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fixture.whenStable().then(() => { 
      fixture.detectChanges();
      component.locations$.subscribe(x => {
        expect(x.length).toEqual(1);
        done;
      });
    });
  }))

  it('should display selection in selection list', fakeAsync ((done) => {
    const location = { 
      "court_venue_id": "100",
      "epims_id": "219164",
      "is_hearing_location": "Y",
      "is_case_management_location": "Y",
      "site_name": "Aberdeen Tribunal Hearing Centre",
      "court_name": "ABERDEEN TRIBUNAL HEARING CENTRE",
      "court_status": "Open",
      "region_id": "9",
      "region": "Scotland",
      "court_type_id": "17",
      "court_type": "Employment Tribunal",
      "open_for_public": "Yes",
      "court_address": "AB1, 48 HUNTLY STREET, ABERDEEN",
      "postcode": "AB11 6LT"
    } as LocationModel;
    component.selectedLocation = location;
    component.addSelection();
    fixture.detectChanges();
    done;
    const selectedLoctions = fixture.debugElement.queryAll(By.css('.location-selection'));
    expect(selectedLoctions.length).toBeGreaterThan(0);
  }))

  it('should display selection in selection list', fakeAsync ((done) => {
    const location = {
      "court_venue_id": "100",
      "epims_id": "219164",
      "is_hearing_location": "Y",
      "is_case_management_location": "Y",
      "site_name": "Aberdeen Tribunal Hearing Centre",
      "court_name": "ABERDEEN TRIBUNAL HEARING CENTRE",
      "court_status": "Open",
      "region_id": "9",
      "region": "Scotland",
      "court_type_id": "17",
      "court_type": "Employment Tribunal",
      "open_for_public": "Yes",
      "court_address": "AB1, 48 HUNTLY STREET, ABERDEEN",
      "postcode": "AB11 6LT"
    } as LocationModel;

    component.selectedLocation = location;
    component.addSelection();
    fixture.detectChanges();
    done;

    const selectedLoctions = fixture.debugElement.queryAll(By.css('.location-selection'));
    expect(selectedLoctions.length).toBeGreaterThan(0);
    const button =  fixture.debugElement.query(By.css('.remove-loation-button'));
    button.nativeElement.dispatchEvent(new Event('click'));
    tick();

    fixture.whenStable().then(() => { 
      fixture.detectChanges();
      const selectedLoctionsAfterClick = fixture.debugElement.queryAll(By.css('.location-selection'));
      expect(selectedLoctionsAfterClick.length).toEqual(0);
    });
  }))
});
