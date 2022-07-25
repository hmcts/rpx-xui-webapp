import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseField, CaseTab, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, FeatureUser } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { reducers, State } from '../../../app/store';
import { CaseViewerContainerComponent } from './case-viewer-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AllocateRoleService } from '../../../role-access/services';
import { WASupportedJurisdictionsService } from '../../../work-allocation-2/services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ccd-case-viewer',
  template: `
    <mat-tab-group>
      <mat-tab *ngFor="let tab of prependedTabs" [id]="tab.id" [label]="tab.label">
      </mat-tab>
    </mat-tab-group>
  `
})
class CaseViewerComponent {
  @Input() public caseDetails: CaseView;
  @Input() public prependedTabs: CaseTab[] = [];
  @Input() public appendedTabs: CaseTab[] = [];
}

describe('CaseViewerContainerComponent', () => {
  let component: CaseViewerContainerComponent;
  let fixture: ComponentFixture<CaseViewerContainerComponent>;
  let debug: DebugElement;

  const CASE_VIEW: CaseView = {
    events: [],
    triggers: [],
    case_id: '1234567890123456',
    case_type: {
      id: 'TestAddressBookCase',
      name: 'Test Address Book Case',
      jurisdiction: {
        id: 'SSCS',
        name: 'SSCS',
      },
      printEnabled: true
    },
    channels: [],
    state: {
      id: 'CaseCreated',
      name: 'Case created'
    },
    tabs: [
      {
        id: 'NameTab',
        label: 'Name',
        order: 2,
        fields: [
          Object.assign(new CaseField(), {
            id: 'PersonFirstName',
            label: 'First name',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Text',
              type: 'Text'
            },
            order: 2,
            value: 'Janet',
            show_condition: '',
            hint_text: ''
          }),
          Object.assign(new CaseField(), {
            id: 'PersonLastName',
            label: 'Last name',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Text',
              type: 'Text'
            },
            order: 1,
            value: 'Parker',
            show_condition: 'PersonFirstName="Jane*"',
            hint_text: ''
          }),
          Object.assign(new CaseField(), {
            id: 'PersonComplex',
            label: 'Complex field',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Complex',
              type: 'Complex',
              complex_fields: []
            },
            order: 3,
            show_condition: 'PersonFirstName="Park"',
            hint_text: ''
          })
        ],
        show_condition: 'PersonFirstName="Janet"'
      },
      {
        id: 'HistoryTab',
        label: 'History',
        order: 1,
        fields: [Object.assign(new CaseField(), {
          id: 'CaseHistory',
          label: 'Case History',
          display_context: 'OPTIONAL',
          field_type: {
            id: 'CaseHistoryViewer',
            type: 'CaseHistoryViewer'
          },
          order: 1,
          value: null,
          show_condition: '',
          hint_text: ''
        })],
        show_condition: ''
      },
      {
        id: 'SomeTab',
        label: 'Some Tab',
        order: 3,
        fields: [],
        show_condition: ''
      },
    ]
  };

  const mockSupportedJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', ['getWASupportedJurisdictions']);

  class MockFeatureToggleService implements FeatureToggleService {
    public getValue<R>(_key: string, _defaultValue: R): Observable<R> {
      // @ts-ignore
      return of('WorkAllocationRelease2');
    }

    public getValueOnce<R>(_key: string, _defaultValue: R): Observable<R> {
      return of([{
        jurisdiction: 'SSCS',
        roles: ['caseworker-sscs-judge', 'caseworker-sscs']
      }
      ] as unknown as R);
    }

    public initialize(_user: FeatureUser, _clientId: string): void {
    }

    public isEnabled(_feature: string): Observable<boolean> {
      return undefined;
    }
  }

  class MockAllocateRoleService {
    public manageLabellingRoleAssignment(caseId: string): Observable<string[]> {
      return of([]);
    }
  }

  const initialState: State = {
    routerReducer: null,
    appConfig: {
      config: {},
      termsAndCondition: null,
      loaded: true,
      loading: true,
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
          roles: [
            'caseworker',
            'caseworker-ia-iacjudge',
            'caseworker-sscs',
            'caseworker-sscs-judge',
            'caseworker-test',
            'managePayment',
            'payments',
            'payments-refund',
            'payments-refund-approver',
            'pui-finance-manager',
            'pui-organisation-manager',
            'pui-user-manager'
          ],
          uid: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
          surname: 'judge'
        },
        roleAssignmentInfo: []
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
      imports: [RouterTestingModule, StoreModule.forRoot(reducers), MatTabsModule, BrowserAnimationsModule],
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                case: CASE_VIEW
              }
            }
          }
        },
        {provide: FeatureToggleService, useClass: MockFeatureToggleService},
        {provide: AllocateRoleService, useClass: MockAllocateRoleService },
        {provide: WASupportedJurisdictionsService, useValue: mockSupportedJurisdictionsService}
      ],
      declarations: [CaseViewerContainerComponent, CaseViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseViewerContainerComponent);
    mockSupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA', 'SSCS']));
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should return the two tabs', (done: DoneFn) => {
    component.prependedTabs$.subscribe((tabs: CaseTab[]) => {
      expect(tabs.length).toBe(TABS.length);
      expect(tabs[0].id).toBe('tasks');
      expect(tabs[1].id).toBe('roles-and-access');
      done();
    });
  });

  it('should render two tabs', () => {
    const matTabLabels: DebugElement = debug.query(By.css('.mat-tab-labels'));
    const matTabHTMLElement: HTMLElement = matTabLabels.nativeElement as HTMLElement;
    const tasksTab: HTMLElement = matTabHTMLElement.children[0] as HTMLElement;
    const roleAndAccessTab: HTMLElement = matTabHTMLElement.children[1] as HTMLElement;
    expect((tasksTab.querySelector('.mat-tab-label-content') as HTMLElement).innerText).toBe('Tasks');
    expect((roleAndAccessTab.querySelector('.mat-tab-label-content') as HTMLElement).innerText).toBe('Roles and access');
  });

  it('should return Hearings as the last tab', () => {
    component.appendedTabs$.subscribe(tab =>
      expect(tab[0].id).toBe('hearings')
    );
  });
});
