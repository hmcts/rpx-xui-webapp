import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../../hearing.test.data';
import {LovRefDataService} from '../../../services/lov-ref-data.service';
import { HearingActualsViewEditPartiesComponent } from './hearing-actuals-view-edit-parties.component';

describe('HearingViewEditSummaryComponent', () => {
  let component: HearingActualsViewEditPartiesComponent;
  let fixture: ComponentFixture<HearingActualsViewEditPartiesComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const lovRefDataService = new LovRefDataService(mockedHttpClient);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsViewEditPartiesComponent],
      imports: [RouterTestingModule],
      providers: [
        FormsModule,
        ReactiveFormsModule,
        provideMockStore({initialState}),
        {provide: LovRefDataService, useValue: lovRefDataService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingActualsViewEditPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
