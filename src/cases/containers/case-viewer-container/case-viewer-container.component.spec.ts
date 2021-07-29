import { Component, Input } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseTab, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, FeatureUser } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { reducers, State } from 'src/app/store';
import { CaseViewerContainerComponent } from './case-viewer-container.component';

@Component({
  // tslint:disable-next-line
  selector: 'ccd-case-viewer',
  template: '<p>Tasks Container</p>'
})
class CaseViewerComponent {
  @Input() public caseDetails: CaseView;
  @Input() public prependedTabs: CaseTab[] = [];
}

describe('CaseViewerContainerComponent', () => {
  let component: CaseViewerContainerComponent;
  let fixture: ComponentFixture<CaseViewerContainerComponent>;
  const mockFeatureToggleService = jasmine.createSpyObj('mockFeatureToggleService', ['getValue']);

  class MockFeatureToggleService implements FeatureToggleService {
    getValue<R>(_key: string, _defaultValue: R): Observable<R> {
      // @ts-ignore
      return of('WorkAllocationRelease2');
    }

    getValueOnce<R>(_key: string, _defaultValue: R): Observable<R> {
      return of(null);
    }

    initialize(_user: FeatureUser, _clientId: string): void {
    }

    isEnabled(_feature: string): Observable<boolean> {
      return undefined;
    }
  }

  const initialState: State = {
    routerReducer: null,
    appConfig: {
      config: {},
      termsAndCondition: null,
      loaded: true,
      loading: true,
      locationInfo: [],
      termsAndConditions: null,
      isTermsAndConditionsFeatureEnabled: null,
      useIdleSessionTimeout: null,
      userDetails: {
        sessionTimeout: {
          idleModalDisplayTime: 0,
          totalIdleTime: 0
        },
        canShareCases: true,
        userInfo: {
          id: '',
          active: true,
          email: 'juser4@mailinator.com',
          forename: 'XUI test',
          roles: ['caseworker-ia-iacjudge'],
          uid: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
          surname: 'judge'
        }
      }
    }
  };
  const TABS: CaseTab[] = [
    {
      id: 'tasks',
      label: 'Tasks',
      fields: [],
      show_condition: null
    },
    {
      id: 'roles-and-access',
      label: 'Roles and access',
      fields: [],
      show_condition: null
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot(reducers)],
      providers: [
        provideMockStore({initialState}),
        {provide: FeatureToggleService, useClass: MockFeatureToggleService},
      ],
      declarations: [CaseViewerContainerComponent, CaseViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return the two tabs', (done: DoneFn) => {
    component.tabs$.subscribe((tabs: CaseTab[]) => {
      expect(tabs.length).toBe(TABS.length);
      expect(tabs[0].id).toBe('tasks');
      expect(tabs[1].id).toBe('roles-and-access');
      done();
    });
  });
});
