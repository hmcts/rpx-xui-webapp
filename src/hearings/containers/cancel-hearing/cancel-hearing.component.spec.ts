import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HearingsService } from 'src/hearings/services/hearings.service';
import { RefDataModel } from '../../../hearings/models/refData.model';
import { CancelHearingComponent } from './cancel-hearing.component';

describe('CancelHearingComponent', () => {
  let component: CancelHearingComponent;
  let fixture: ComponentFixture<CancelHearingComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const reasons: RefDataModel[] = [
    {
      key: 'reasonone',
      value_en: 'Reason 1',
      value_cy: '',
      hintText_EN: 'Reason 1',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [CancelHearingComponent],
      providers: [
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingCancelOptions: reasons
              }
            },
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
