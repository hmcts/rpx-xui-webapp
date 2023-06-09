import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';
import { initialState } from '../../../hearing.test.data';
import { LovRefDataService } from '../../../services/lov-ref-data.service';
import { HearingActualsViewEditPartiesComponent } from './hearing-actuals-view-edit-parties.component';

const hearingRole = [
  {
    key: 'appellant',
    value_en: 'Appellant',
    value_cy: '',
    hintText_EN: 'Appellant',
    hintTextCY: '',
    order: 1,
    parentKey: null
  },
  {
    key: 'claimant',
    value_en: 'Claimant',
    value_cy: '',
    hintText_EN: 'Claimant',
    hintTextCY: '',
    order: 2,
    parentKey: null
  },
  {
    key: 'interpreter',
    value_en: 'Interpreter',
    value_cy: '',
    hintText_EN: 'Interpreter',
    hintTextCY: '',
    order: 3,
    parentKey: null
  },
  {
    key: 'solicitor',
    value_en: 'Solicitor',
    value_cy: '',
    hintText_EN: 'Solicitor',
    hintTextCY: '',
    order: 4,
    parentKey: null
  },
  {
    key: 'barrister',
    value_en: 'Barrister',
    value_cy: '',
    hintText_EN: 'Barrister',
    hintTextCY: '',
    order: 5,
    parentKey: null
  }
];
const partyChannels = [
  {
    key: 'inPerson',
    value_en: 'In person',
    value_cy: '',
    hintText_EN: 'in person',
    hintTextCY: 'Wyneb yn wyneb',
    order: 1,
    parentKey: null
  },
  {
    key: 'byPhone',
    value_en: 'By phone',
    value_cy: '',
    hintText_EN: 'By Phone',
    hintTextCY: 'Ffôn',
    order: 2,
    parentKey: null,
    child_nodes: [
      {
        key: 'telephone-btMeetMe',
        value_en: 'Telephone - BTMeetme',
        value_cy: '',
        hintText_EN: 'By Phone bTMeetme',
        hintTextCY: '',
        order: 1,
        parentKey: null
      },
      {
        key: 'telephone-CVP',
        value_en: 'Telephone - CVP',
        value_cy: '',
        hintText_EN: 'By Phone CVP',
        hintTextCY: '',
        order: 2,
        parentKey: null
      },
      {
        key: 'telephone-other',
        value_en: 'Telephone - Other',
        value_cy: '',
        hintText_EN: 'By Phone Other',
        hintTextCY: '',
        order: 3,
        parentKey: null
      },
      {
        key: 'telephone-skype',
        value_en: 'Telephone - Skype',
        value_cy: '',
        hintText_EN: 'By Phone Skype',
        hintTextCY: '',
        order: 4,
        parentKey: null
      }
    ]
  },
  {
    key: 'byVideo',
    value_en: 'By video',
    value_cy: 'Fideo',
    hintText_EN: 'By video',
    hintTextCY: '',
    order: 4,
    parentKey: null,
    child_nodes: [
      {
        key: 'video-conference',
        value_en: 'Video Conference',
        value_cy: '',
        hintText_EN: 'By video conference',
        hintTextCY: '',
        order: 4,
        parentKey: null
      },
      {
        key: 'video-other',
        value_en: 'Video - Other',
        value_cy: '',
        hintText_EN: 'By video other',
        hintTextCY: '',
        order: 4,
        parentKey: null
      },
      {
        key: 'video-skype',
        value_en: 'Video - Skype',
        value_cy: '',
        hintText_EN: 'By video skype',
        hintTextCY: '',
        order: 4,
        parentKey: null
      },
      {
        key: 'video-teams',
        value_en: 'Video - Teams',
        value_cy: '',
        hintText_EN: 'By video teams',
        hintTextCY: '',
        order: 4,
        parentKey: null
      }
    ]
  },
  {
    key: 'notAttending',
    value_en: 'Not attending',
    value_cy: '',
    hintText_EN: 'not attending',
    hintTextCY: '',
    order: 5,
    parentKey: null
  }
];

describe('HearingActualsViewEditPartiesComponent', () => {
  let store: Store<any>;
  let component: HearingActualsViewEditPartiesComponent;
  let fixture: ComponentFixture<HearingActualsViewEditPartiesComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const lovRefDataService = new LovRefDataService(mockedHttpClient);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsViewEditPartiesComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        LoadingService,
        provideMockStore({ initialState }),
        { provide: LovRefDataService, useValue: lovRefDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({
              id: '1',
              hearingDate: '2021-03-12'
            })),
            snapshot: {
              data: {
                partyChannels,
                hearingRole
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingActualsViewEditPartiesComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRole should return the correct english role value', () => {
    expect(component.getRole('barrister')).toEqual('Barrister');
  });

  it('getRole should return the provided key if role not found', () => {
    expect(component.getRole('test')).toEqual('test');
  });

  it('should add a new FormGroup to the FormArray', () => {
    const addBtn = fixture.debugElement.query(By.css('.btn-add'));

    expect(component.parties.get([component.parties.length - 1]).value)
      .not.toEqual(jasmine.objectContaining({ firstName: '', lastName: '', isPlannedParty: false }));

    addBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.parties.get([component.parties.length - 1]).value)
      .toEqual(jasmine.objectContaining(
        {
          firstName: null,
          lastName: null,
          isPlannedParty: false,
          role: null,
          attendanceType:
          null,
          organisation: null
        }));
  });

  it('should add a FormGroup from the FormArray', () => {
    expect(component.parties.length).toEqual(3);
    const addBtn = fixture.debugElement.query(By.css('.btn-add'));

    addBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.parties.length).toEqual(4);
  });

  it('should remove a FormGroup from the FormArray', () => {
    expect(component.parties.length).toEqual(3);
    expect(component.parties.get([component.parties.length - 1]).value)
      .not.toEqual(jasmine.objectContaining({ firstName: '', lastName: '', isPlannedParty: false }));

    const removeBtn = fixture.debugElement.query(By.css('.btn-remove:last-child'));
    removeBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.parties.length).toEqual(2);
  });

  it('should submit form with correct details', () => {
    const addBtn = fixture.debugElement.query(By.css('.btn-add'));
    addBtn.nativeElement.click();
    fixture.detectChanges();
    component.parties.get([0]).patchValue({
      attendeeRepresenting: 'Mary'
    });
    component.parties.get([1]).patchValue({
      attendeeRepresenting: 'Mary'
    });
    component.parties.get([component.parties.length - 1]).patchValue({
      firstName: 'Peter',
      lastName: 'Jones',
      isPlannedParty: false,
      role: 'Claimant',
      attendanceType: 'inPerson',
      attendeeRepresenting: 'Mary',
      organisation: null
    });
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    component.submitForm(component.form.value, component.form.valid);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should mark form as invalid if some of the values are missing', () => {
    const addBtn = fixture.debugElement.query(By.css('.btn-add'));
    addBtn.nativeElement.click();
    fixture.detectChanges();
    component.parties.get([component.parties.length - 1]).patchValue({
      firstName: '',
      lastName: '',
      isPlannedParty: false
    });
    component.submitForm(component.form.value, component.form.valid);
    expect(component.parties.get([component.parties.length - 1]).valid).toBeFalsy();
    expect(component.form.valid).toBeFalsy();
  });

  it('should mark one of the fields with duplicate entry identified', () => {
    const addBtn = fixture.debugElement.query(By.css('.btn-add'));
    addBtn.nativeElement.click();
    addBtn.nativeElement.click();
    fixture.detectChanges();
    component.parties.get([component.parties.length - 2]).patchValue({
      firstName: 'Peter',
      lastName: 'Jones',
      isPlannedParty: false,
      role: 'Claimant',
      attendanceType: 'inPerson',
      attendeeRepresenting: 'Mary',
      organisation: null
    });
    component.parties.get([component.parties.length - 1]).patchValue({
      firstName: 'Peter',
      lastName: 'Jones',
      isPlannedParty: false,
      role: 'Claimant',
      attendanceType: 'inPerson',
      attendeeRepresenting: 'Mary',
      organisation: null
    });
    fixture.detectChanges();
    component.submitForm(component.form.value, component.form.valid);
    expect(component.parties.get([component.parties.length - 1]).valid).toBeFalsy();
    expect(component.parties.get([component.parties.length - 1]).hasError('duplicateEntries')).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});

describe('HearingViewEditSummaryComponent add actual participants', () => {
  let component: HearingActualsViewEditPartiesComponent;
  let fixture: ComponentFixture<HearingActualsViewEditPartiesComponent>;
  const newState: any = JSON.parse(JSON.stringify(initialState));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsViewEditPartiesComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        LoadingService,
        provideMockStore({ initialState: newState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({
              id: '1',
              hearingDate: '2021-03-12'
            })),
            snapshot: {
              data: {
                partyChannels,
                hearingRole
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingActualsViewEditPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with actual parties involved', () => {
    const parties: any = component.form.value;
    expect(parties.parties.length).toBe(3);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
