import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HearingDetailModel } from 'src/hearings/models/linkHearings.model';
import { initialState } from '../../../hearing.test.data';
import { GroupLinkType } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { LinkedHearingsCheckYourAnswersComponent } from './check-your-answers.component';

describe('LinkedHearingsCheckYourAnswersComponent', () => {
  let component: LinkedHearingsCheckYourAnswersComponent;
  let fixture: ComponentFixture<LinkedHearingsCheckYourAnswersComponent>;
  let mockStore: any;
  const mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockHttpClient);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedHearingsCheckYourAnswersComponent],
      providers: [
        provideMockStore({ initialState }),
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
    expect(component.linkedCases.length).toBe(3);
  });

  it('should display position column return true', () => {
    const linkedHearingGroup = initialState.hearings.hearingLinks.linkedHearingGroup;
    expect(component.canDisplayPositionColumn(linkedHearingGroup)).toEqual(true);
  });

  it('should display position column return false', () => {
    const linkedHearingGroup = initialState.hearings.hearingLinks.linkedHearingGroup;
    linkedHearingGroup.groupDetails.groupLinkType = GroupLinkType.SAME_SLOT;
    expect(component.canDisplayPositionColumn(linkedHearingGroup)).toEqual(false);
  });

  it('should return valid position', () => {
    const hearing: HearingDetailModel = {
      hearingId: 'h1000001',
      hearingStage: 'Initial hearing',
      isSelected: true,
      hearingStatus: '',
      hearingIsLinkedFlag: false
    };
    component.hearingsInGroup = initialState.hearings.hearingLinks.linkedHearingGroup.hearingsInGroup;
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
    component.hearingsInGroup = initialState.hearings.hearingLinks.linkedHearingGroup.hearingsInGroup;
    component.showPositionColumn = true;
    expect(component.getPosition(hearing)).toBeNull();
  });

  it('should call navigate on change event', () => {
    const hearingLinkChangeElement = fixture.debugElement.nativeElement.querySelector('#hearing-link-change');
    hearingLinkChangeElement.click();
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/hearings', 'link', 'h100002']);
  });
});
