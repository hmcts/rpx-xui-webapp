import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../hearing.test.data';
import {HearingAmendWarningMsgComponent} from './hearing-amend-warning-msg.component';

describe('HearingAmendWarningMsgComponent', () => {
  let component: HearingAmendWarningMsgComponent;
  let fixture: ComponentFixture<HearingAmendWarningMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingAmendWarningMsgComponent],
      providers: [
        provideMockStore({initialState}),
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingAmendWarningMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
