import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {ACTION} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';
import {RequestHearingComponent} from './request-hearing.component';

describe('RequestHearingComponent', () => {
  let component: RequestHearingComponent;
  let fixture: ComponentFixture<RequestHearingComponent>;
  let mockStore: any;
  const mockPageFlow = jasmine.createSpyObj('PageFlow', ['getCurrentPage']);
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RequestHearingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AbstractPageFlow, useValue: mockPageFlow},
        provideMockStore(),
        {provide: HearingsService, useValue: hearingsService},
      ]
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture = TestBed.createComponent(RequestHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check continue method', () => {
    spyOn(hearingsService, 'navigateAction');
    component.onBack();
    expect(hearingsService.navigateAction).toHaveBeenCalledWith(ACTION.BACK);
  });

  it('should check submit method', () => {
    spyOn(hearingsService, 'navigateAction');
    component.onSubmit();
    expect(hearingsService.navigateAction).toHaveBeenCalledWith(ACTION.SUBMIT);
  });

  it('should check is answer page', () => {
    spyOn(hearingsService, 'navigateAction');
    mockPageFlow.getCurrentPage.and.returnValue('hearing-check-answers');
    expect(component.isCheckAnswerPage()).toBeTruthy();
  });


  afterEach(() => {
    fixture.destroy();
  });
});
