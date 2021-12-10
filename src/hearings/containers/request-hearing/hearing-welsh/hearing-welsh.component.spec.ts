import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {ErrorMessage} from 'src/app/models';
import {ACTION} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import {HearingWelshComponent} from './hearing-welsh.component';

@Component({
  selector: 'exui-error-message',
  template: '',
})
class MockTestComponent {
  @Input() public error: ErrorMessage;
}

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingWelshComponent', () => {
  let component: HearingWelshComponent;
  let fixture: ComponentFixture<HearingWelshComponent>;
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
      hearingValues: null,
      hearingRequest: null,
      hearingConditions: null,
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [
        HearingWelshComponent,
        MockTestComponent,
        MockHearingPartiesComponent,
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HearingWelshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check hearingInWelshFlag', (): void => {
    fixture.detectChanges();
    let errors;
    const hearingInWelshFlag = component.welshForm.controls.hearingInWelshFlag;

    hearingInWelshFlag.setValue(true);
    errors = hearingInWelshFlag.errors;
    expect(errors).toBeNull();

    hearingInWelshFlag.setValue(null);
    errors = hearingInWelshFlag.errors;
    expect(errors).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
