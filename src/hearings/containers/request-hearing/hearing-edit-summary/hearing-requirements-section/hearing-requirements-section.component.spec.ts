import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockRpxTranslatePipe } from '../../../../../app/shared/test/mock-rpx-translate.pipe';
import { caseFlagsRefData, initialState } from '../../../../hearing.test.data';
import { PartyFlagsModel } from '../../../../models/partyFlags.model';
import { HearingsService } from '../../../../services/hearings.service';
import { HearingRequirementsSectionComponent } from './hearing-requirements-section.component';

describe('HearingRequirementsSectionComponent', () => {
  let component: HearingRequirementsSectionComponent;
  let fixture: ComponentFixture<HearingRequirementsSectionComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
  const hearingsService = new HearingsService(mockedHttpClient);

  const caseFlagsFromLatestSHV: PartyFlagsModel[] = [
    {
      partyId: 'P1',
      partyName: 'Jane Smith',
      flagParentId: 'RA0008',
      flagId: 'RA0042',
      flagDescription: 'Sign language interpreter required',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P2',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'CF0006',
      flagDescription: 'Potential fraud',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P3',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'CF0007',
      flagDescription: 'Urgent flag',
      flagStatus: 'ACTIVE'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        HearingRequirementsSectionComponent,
        MockRpxTranslatePipe
      ],
      providers: [
        { provide: HearingsService, useValue: hearingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingRequirementsSectionComponent);
    component = fixture.componentInstance;
    component.caseFlagsRefData = caseFlagsRefData;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    component.serviceHearingValuesModel = initialState.hearings.hearingValues.serviceHearingValuesModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.reasonableAdjustmentChangesConfirmed = true;
    component.ngOnInit();
    expect(component.reasonableAdjustmentChangesConfirmed).toEqual(true);
  });

  it('should not display label', () => {
    hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.reasonableAdjustmentChangesConfirmed = false;
    component.ngOnInit();
    expect(component.reasonableAdjustmentChangesConfirmed).toEqual(false);
  });

  xit('should return parties with flags', () => {
    component.ngOnInit();
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('caseFlags');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'caseFlags', changeLink: '/hearings/request/hearing-requirements#linkAmendFlags'
    });
  });
});
