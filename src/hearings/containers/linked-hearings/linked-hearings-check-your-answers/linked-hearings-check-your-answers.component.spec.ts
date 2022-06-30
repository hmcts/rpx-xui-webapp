import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../hearing.test.data';
import { GroupLinkType, HMCStatus, Mode } from '../../../models/hearings.enum';
import { HearingDetailModel, ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
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
  const hearingGroupRequestId = 'g1000000';
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const source: ServiceLinkedCasesModel[] = [
    {
      caseReference: '4652724902696213',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing'
      ]
    },
    {
      caseReference: '5283819672542864',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing',
        'Progressed as part of lead case'
      ]
    },
    {
      caseReference: '8254902572336147',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Familial',
        'Guardian',
        'Linked for a hearing'
      ],
      hearings: [{
        hearingId: 'h100010',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: false,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsInLinkedGroup: false
      }, {
        hearingId: 'h100012',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: false,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsInLinkedGroup: false
      }]
    }
  ];
  const mockRoute = {
    snapshot: {
      params: {
        caseId: {caseId},
        hearingId: {hearingId}
      },
      data: {
        mode: Mode.MANAGE_HEARINGS,
        linkedCase: { serviceLinkedCases: source }
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

  const linkedCases = [
    {
      caseReference: '4652724902696213',
      caseName: 'Smith vs Peterson',
      hearingStage: 'Initial',
      position: 2
    },
    {
      caseReference: '5283819672542864',
      caseName: 'Smith vs Peterson',
      hearingStage: 'Initial',
      position: 1
    }
  ];

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

  it('should set hearing linked group for link hearings', () => {
    const setDisplayRowSpy = spyOn(component, 'setDisplayRow');
    const setCancelButtonTextSpy = spyOn(component, 'setCancelButtonText');
    component.hearingLinks = initialState.hearings.hearingLinks;
    component.isManageLink = false;
    component.setHearingLinkedGroup(source);
    expect(setDisplayRowSpy).toHaveBeenCalledTimes(3);
    expect(setCancelButtonTextSpy).toHaveBeenCalled();
  });

  it('should verify cancel button text', () => {
    component.isManageLink = true;
    component.isManageJourneyFinalPage = false;
    component.linkedCases = linkedCases;
    component.setCancelButtonText();
    expect(component.cancelButtonText).toEqual('Return to hearings');
    component.isManageLink = false;
    component.setCancelButtonText();
    expect(component.cancelButtonText).toEqual('Cancel');
  });

  it('should sort display records', () => {
    component.showPositionColumn = true;
    component.linkedCases = linkedCases;
    component.sortDisplayRecords();
    expect(component.linkedCases[0].position).toEqual(1);
    expect(component.linkedCases[1].position).toEqual(2);
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
      hearingIsInLinkedGroup: false
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
      hearingIsInLinkedGroup: false
    };
    component.hearingsInGroup = linkedHearingGroup.hearingsInGroup;
    component.showPositionColumn = true;
    expect(component.getPosition(hearing)).toBeNull();
  });

  it('should change call navigate', () => {
    const storeDispatchSpy = spyOn(mockStore, 'dispatch');
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.onChange();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'link', caseId, hearingId]);
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should navigate on submit link hearings', () => {
    const storeDispatchSpy = spyOn(mockStore, 'dispatch');
    component.linkedHearingGroup = linkedHearingGroup;
    component.caseId = caseId;
    component.hearingGroupRequestId = 'undefined';
    component.hearingId = hearingId;
    component.isManageLink = false;
    component.onLinkHearings();
    expect(storeDispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining(new fromHearingStore.SubmitLinkedHearingGroup({
      linkedHearingGroup, caseId, hearingGroupRequestId: 'undefined', hearingId, isManageLink: false
    })));
  });

  it('should navigate to previous page', () => {
    const storeDispatchSpy = spyOn(mockStore, 'dispatch');
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.isManageLink = false;
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'link', caseId, hearingId, 'group-selection']);
    expect(storeDispatchSpy).toHaveBeenCalled();
    component.isManageLink = true;
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'cases', 'case-details', caseId, 'hearings']);
  });

  it('should navigate to selected hearings page', () => {
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.hearingGroupRequestId = hearingGroupRequestId;
    component.isManageLink = true;
    component.onEdit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'manage-links', caseId, hearingGroupRequestId, hearingId, 'selected-hearings']);
  });

  it('should dispatch to store on link hearings', () => {
    const storeDispatchSpy = spyOn(mockStore, 'dispatch');
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.isManageLink = false;
    component.linkedHearingGroup = linkedHearingGroup;
    component.hearingGroupRequestId = hearingGroupRequestId;
    component.onLinkHearings();
    expect(storeDispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining(new fromHearingStore.SubmitLinkedHearingGroup({
      linkedHearingGroup, caseId, hearingGroupRequestId, hearingId, isManageLink: false
    })));
  });

  it('should dispatch to store on manage link hearings', () => {
    const storeDispatchSpy = spyOn(mockStore, 'dispatch');
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.linkedHearingGroup = linkedHearingGroup;
    component.hearingGroupRequestId = hearingGroupRequestId;
    component.onManageLinkHearings();
    expect(storeDispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining(new fromHearingStore.ManageLinkedHearingGroup({
      linkedHearingGroup, hearingGroupRequestId, caseId, hearingId
    })));
  });

  it('should dispatch to store on unlink hearings', () => {
    const storeDispatchSpy = spyOn(mockStore, 'dispatch');
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.hearingGroupRequestId = hearingGroupRequestId;
    component.onUnlinkHearings();
    expect(storeDispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining(new fromHearingStore.ManageLinkedHearingGroup({
      linkedHearingGroup: null, hearingGroupRequestId, caseId, hearingId
    })));
  });

  afterEach(() => {
    fixture.destroy();
  });
});
