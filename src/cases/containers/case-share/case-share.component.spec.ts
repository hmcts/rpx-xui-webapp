import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { getRouterState } from '../../../app/store/reducers';
import { LoadShareCase, LoadUserFromOrgForCase } from '../../store/actions';
import * as fromCasesFeature from '../../store';
import { CaseShareComponent } from './case-share.component';

@Pipe({
  standalone: false,
  name: 'rpxTranslate',
})
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('CaseShareComponent', () => {
  let component: CaseShareComponent;
  let fixture: ComponentFixture<CaseShareComponent>;

  let mockStore: MockStore;
  let dispatchSpy: jasmine.Spy;
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['getValue']);

  const sharedCases = [
    {
      caseId: '9417373995765133',
      caseTitle: 'Sam Green Vs Williams Lee',
      sharedWith: [
        {
          idamId: 'u666666',
          firstName: 'Kate',
          lastName: 'Grant',
          email: 'kate.grant@lambbrooks.com',
        },
      ],
    },
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CaseShareComponent, RpxTranslateMockPipe],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromCasesFeature.getShareCaseListState, value: [] },
            { selector: fromCasesFeature.getOrganisationUsersState, value: [] },
            { selector: getRouterState, value: { state: { queryParams: {} } } as any },
          ],
        }),
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService,
        },
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    mockFeatureToggleService.getValue.and.returnValue(of(true));
    dispatchSpy = spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(CaseShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deselect case', () => {
    component.deselect(sharedCases);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should synchronize to store', () => {
    component.synchronizeStore(sharedCases);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should load selected cases and organisation users when share-case route is initialised', () => {
    fixture.destroy();
    dispatchSpy.calls.reset();
    mockStore.overrideSelector(fromCasesFeature.getShareCaseListState, sharedCases);
    mockStore.overrideSelector(fromCasesFeature.getOrganisationUsersState, []);
    mockStore.overrideSelector(getRouterState, { state: { queryParams: { init: true } } } as any);

    fixture = TestBed.createComponent(CaseShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(new LoadShareCase(sharedCases));
    expect(dispatchSpy).toHaveBeenCalledWith(new LoadUserFromOrgForCase());
  });

  afterEach(() => {
    fixture.destroy();
  });
});
