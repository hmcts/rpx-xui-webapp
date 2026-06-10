import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MockRpxTranslatePipe } from '../../../app/shared/test/mock-rpx-translate.pipe';
import { initialState } from '../../hearing.test.data';
import { ACTION } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import * as hearingActualsActions from '../../store/actions/hearing-actuals.action';
import * as hearingRequestActions from '../../store/actions/hearing-request.action';
import { AbstractPageFlow } from '../../utils/abstract-page-flow';
import { HearingActualsComponent } from './hearing-actuals.component';

describe('RequestHearingComponent', () => {
  let component: HearingActualsComponent;
  let fixture: ComponentFixture<HearingActualsComponent>;

  let mockStore: any;
  const mockPageFlow = jasmine.createSpyObj('PageFlow', ['getCurrentPage']);
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HearingActualsComponent, MockRpxTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AbstractPageFlow, useValue: mockPageFlow },
        { provide: ActivatedRoute, useValue: { params: of({ id: 'h100001' }) } },
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
      ],
    }).compileComponents();
    mockStore = TestBed.inject(Store);
    fixture = TestBed.createComponent(HearingActualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch hearing request and hearing actuals with case reference from hearingValues store', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new hearingRequestActions.LoadHearingRequest({
        hearingID: 'h100001',
        targetURL: '',
        caseRef: '1111222233334444',
      })
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      new hearingActualsActions.GetHearingActuals({
        id: 'h100001',
        caseRef: '1111222233334444',
      })
    );
  });

  afterEach(() => {
    fixture.destroy();
  });
});
