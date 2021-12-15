import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AbstractControl, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchLocationComponent } from '@hmcts/rpx-xui-common-lib';
import {LocationByEPIMSModel} from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {ACTION} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import {HearingVenueComponent} from './hearing-venue.component';
class NativeElement {
  public focus() {}
}
class MockAutoCompleteInputBox {
  public nativeElement: NativeElement = new NativeElement();
}

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
  public autoCompleteInputBox: MockAutoCompleteInputBox = new MockAutoCompleteInputBox();
}

fdescribe('HearingVenueComponent', () => {
  let component: HearingVenueComponent;
  let fixture: ComponentFixture<HearingVenueComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

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
      imports: [ReactiveFormsModule],
      declarations: [HearingVenueComponent, MockLocationSearchContainerComponent ],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const fb = TestBed.get(FormBuilder);
    const form =  fb.group({
      locationSelectedFormControl: [null]
    });
    fixture = TestBed.createComponent(HearingVenueComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(component, 'removeSelection').and.callThrough();
    spyOn(component.selectedLocations$, 'subscribe').and.returnValue(of([]));
    spyOn(component, 'getLocationSearchFocus').and.callThrough();
    spyOn(component, 'appendLocation').and.callThrough();
    component.searchLocationComponent = new MockLocationSearchContainerComponent() as unknown as SearchLocationComponent;
    spyOn(component.searchLocationComponent.autoCompleteInputBox.nativeElement, 'focus');
  });

  it('should initialise component', async () => {
    expect(component).toBeDefined();
    component.ngOnInit();
    expect(component.getLocationSearchFocus).toHaveBeenCalled();
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

  // it('should remove selection in selection list', async () => {
  //   const location = {
  //     court_venue_id: '100',
  //     epims_id: '219164',
  //     is_hearing_location: 'Y',
  //     is_case_management_location: 'Y',
  //     site_name: 'Aberdeen Tribunal Hearing Centre',
  //     court_name: 'ABERDEEN TRIBUNAL HEARING CENTRE',
  //     court_status: 'Open',
  //     region_id: '9',
  //     region: 'Scotland',
  //     court_type_id: '17',
  //     court_type: 'Employment Tribunal',
  //     open_for_public: 'Yes',
  //     court_address: 'AB1, 48 HUNTLY STREET, ABERDEEN',
  //     postcode: 'AB11 6LT'
  //   } as LocationByEPIMSModel;

  //   component.findLocationFormGroup.controls.locationSelectedFormControl.setValue(location);
  //   component.addSelection();
  //   fixture.detectChanges();
  //   component.removeSelection(location);
  //   expect(component.selectedLocations$.subscribe).toHaveBeenCalled();
  // });

  it('should show summry header', async (done) => {
    component.findLocationFormGroup.controls.locationSelectedFormControl.setValue('TEST ERROR');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      done();
      const errorElement = fixture.debugElement.query(By.css('.govuk-error-summary__list'));
      expect(errorElement).toEqual(null);
    });
  });

  // it('should include page elements', () => {
  //   const hearingHeader = fixture.debugElement.query(By.css('.govuk-heading-l'));
  //   expect(hearingHeader.nativeElement.innerText).toContain('What are the hearing venue details?');
  //   const hint = fixture.debugElement.query(By.css('.govuk-hint'));
  //   expect(hint.nativeElement.innerText).toContain('If this is a fully remote hearing you must still select the court or tribunal which will be managing the case.');
  //   const findCourtLink = fixture.debugElement.query(By.css('.govuk-inset-text'));
  //   expect(findCourtLink.nativeElement.innerText).toContain('You can check the venue has the required facilities or reasonable adjustments using');
  // });

  // it('should call auto complete focus', () => {
  //   component.getLocationSearchFocus();
  //   expect(component.searchLocationComponent &&
  //     component.searchLocationComponent.autoCompleteInputBox &&
  //     component.searchLocationComponent.autoCompleteInputBox.nativeElement).toBeDefined();
  //   expect(component.searchLocationComponent.autoCompleteInputBox.nativeElement.focus).toHaveBeenCalled();
  // });

  afterEach(() => {
    fixture.destroy();
  });
});
