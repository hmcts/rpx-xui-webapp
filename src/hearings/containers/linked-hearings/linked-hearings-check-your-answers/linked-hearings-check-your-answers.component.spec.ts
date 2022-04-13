import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../hearing.test.data';
import { GroupLinkType } from '../../../models/hearings.enum';
import { HearingDetailModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { LinkedHearingsCheckYourAnswersComponent } from './linked-hearings-check-your-answers.component';

describe('LinkedHearingsCheckYourAnswersComponent', () => {
  let component: LinkedHearingsCheckYourAnswersComponent;
  let fixture: ComponentFixture<LinkedHearingsCheckYourAnswersComponent>;
  let mockStore: any;
  const mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockHttpClient);
  const caseId = '1111-2222-3333-4444';
  const hearingId = 'h100002';
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockRoute = {
    snapshot: {
      params: {
        caseId: {caseId},
        hearingId: {hearingId}
      }
    }
  };
  const linkedHearingGroup = {
    groupDetails: {
      groupName: 'Group A',
      groupReason: 'Reason 1',
      groupLinkType: GroupLinkType.ORDERED,
      groupComments: 'Comment 1',
    },
    hearingsInGroup: [
      {
        hearingId: 'h1000001',
        hearingOrder: 1,
      },
      {
        hearingId: 'h1000003',
        hearingOrder: 2,
      },
      {
        hearingId: 'h1000005',
        hearingOrder: 3,
      }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedHearingsCheckYourAnswersComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
        { provide: HearingsService, useValue: hearingsService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedHearingsCheckYourAnswersComponent);
    mockStore = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display position column return true', () => {
    component.linkedHearingGroup = linkedHearingGroup;
    expect(component.canDisplayPositionColumn()).toEqual(true);
  });

  it('should display position column return false', () => {
    linkedHearingGroup.groupDetails.groupLinkType = GroupLinkType.SAME_SLOT;
    component.linkedHearingGroup = linkedHearingGroup;
    expect(component.canDisplayPositionColumn()).toEqual(false);
  });

  it('should return valid position', () => {
    const hearing: HearingDetailModel = {
      hearingId: 'h1000001',
      hearingStage: 'Initial hearing',
      isSelected: true,
      hearingStatus: '',
      hearingIsLinkedFlag: false
    };
    component.hearingsInGroup = linkedHearingGroup.hearingsInGroup;
    component.showPositionColumn = true;
    expect(component.getPosition(hearing)).not.toBeNull();
  });

  it('should return position as null', () => {
    const hearing = {
      hearingId: 'h1000002',
      hearingStage: 'Initial hearing',
      isSelected: false,
      hearingStatus: '',
      hearingIsLinkedFlag: false
    };
    component.hearingsInGroup = linkedHearingGroup.hearingsInGroup;
    component.showPositionColumn = true;
    expect(component.getPosition(hearing)).toBeNull();
  });

  it('should change call navigate', () => {
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.onChange();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'link', caseId, hearingId]);
  });

  it('should dispatch on submit link hearings', () => {
    component.linkedHearingGroup = linkedHearingGroup;
    component.caseId = caseId;
    component.hearingId = hearingId;
    spyOn(mockStore, 'dispatch');
    component.onLinkHearings();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.SubmitLinkedHearingGroup({
      linkedHearingGroup, caseId, hearingId}));
  });
});
