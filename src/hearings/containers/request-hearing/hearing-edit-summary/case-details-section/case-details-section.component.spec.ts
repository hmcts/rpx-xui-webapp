import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockRpxTranslatePipe } from '../../../../../app/shared/test/mock-rpx-translate.pipe';
import { caseTypeRefData, initialState } from '../../../../hearing.test.data';
import { CaseCategoryDisplayModel } from '../../../../models/caseCategory.model';
import { CategoryType } from '../../../../models/hearings.enum';
import { CaseDetailsSectionComponent } from './case-details-section.component';

describe('CaseDetailsSectionComponent', () => {
  let component: CaseDetailsSectionComponent;
  let fixture: ComponentFixture<CaseDetailsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CaseDetailsSectionComponent,
        MockRpxTranslatePipe
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailsSectionComponent);
    component = fixture.componentInstance;
    component.caseTypeRefData = caseTypeRefData;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set case types', () => {
    const caseTypesToVerify: CaseCategoryDisplayModel[] = [
      {
        categoryType: CategoryType.CaseType,
        categoryValue: 'BBA3-002',
        categoryDisplayValue: 'PERSONAL INDEPENDENT PAYMENT (NEW CLAIM)',
        childNodes: [
          {
            categoryType: CategoryType.CaseSubType,
            categoryValue: 'BBA3-002CC',
            categoryParent: 'BBA3-002',
            categoryDisplayValue: 'CONDITIONS OF ENTITLEMENT - COMPLEX'
          },
          {
            categoryType: CategoryType.CaseSubType,
            categoryValue: 'BBA3-002GC',
            categoryParent: 'BBA3-002',
            categoryDisplayValue: 'GOOD CAUSE'
          },
          {
            categoryType: CategoryType.CaseSubType,
            categoryValue: 'BBA3-002RC',
            categoryParent: 'BBA3-002',
            categoryDisplayValue: 'RATE OF ASSESSMENT/PAYABILITY ISSUES - COMPLEX'
          }
        ]
      }
    ];
    component.ngOnInit();
    expect(component.caseTypes).toEqual(caseTypesToVerify);
  });
});