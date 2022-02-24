import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../../hearing.test.data';
import {HearingsService} from '../../../services/hearings.service';
import {HearingChangeReasonComponent} from './hearing-change-reason.component';

describe('HearingChangeReasonComponent', () => {
  let component: HearingChangeReasonComponent;
  let fixture: ComponentFixture<HearingChangeReasonComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HearingChangeReasonComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingChangeReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
