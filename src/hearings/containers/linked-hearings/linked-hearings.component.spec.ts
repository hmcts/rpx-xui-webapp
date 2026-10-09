import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../hearing.test.data';
import { ACTION } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import { AbstractPageFlow } from '../../utils/abstract-page-flow';
import { LinkedHearingsComponent } from './linked-hearings.component';

describe('LinkedHearingsComponent', () => {
  let component: LinkedHearingsComponent;
  let fixture: ComponentFixture<LinkedHearingsComponent>;

  let mockStore: any;
  const mockPageFlow = jasmine.createSpyObj('PageFlow', ['getCurrentPage']);
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LinkedHearingsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AbstractPageFlow, useValue: mockPageFlow },
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
      ],
    }).compileComponents();
    mockStore = TestBed.inject(Store);
    fixture = TestBed.createComponent(LinkedHearingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from hearing state and case context changes when destroyed', () => {
    const hearingStateUnsubscribeSpy = spyOn(component.sub, 'unsubscribe').and.callThrough();
    const caseInfoUnsubscribeSpy = spyOn(component.caseInfoSub, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();

    expect(hearingStateUnsubscribeSpy).toHaveBeenCalled();
    expect(caseInfoUnsubscribeSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
