import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseField, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { CASEROLES } from '../../../../api/workAllocation2/constants/roles.mock.data';
import { CaseRolesTableComponent } from '../../../role-access/components/case-roles-table/case-roles-table.component';
import { initialMockState } from '../../../role-access/testing/app-initial-state.mock';
import { RolesAndAccessComponent } from '../../components/roles-and-access/roles-and-access.component';
import { ShowAllocateLinkDirective } from '../../directives/show-allocate-link.directive';
import { RolesAndAccessContainerComponent } from './roles-and-access-container.component';

const metadataField = {} as CaseField;
metadataField.id = '[JURISDICTION]';
metadataField.value = 'JUDICIAL';
const CASE_VIEW: CaseView = {
  metadataFields: [metadataField],
  events: [],
  triggers: [],
  case_id: '1234567890123456',
  case_type: {
    id: 'TestAddressBookCase',
    name: 'Test Address Book Case',
    jurisdiction: {
      id: 'TEST',
      name: 'Test',
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

const user = {
  sessionTimeout: {
    idleModalDisplayTime: 123,
    totalIdleTime: 100,
  },
  canShareCases: false,
  userInfo: {
    id: '134',
    forename: '',
    surname: '',
    email: '',
    active: true,
    roles: ['role1'],
    uid: '34345456'
  },
  locationInfo: [
                 {  primaryLocation: '', jurisdiction: 'JUDICIAL', isCaseAllocator: true},
                 {  primaryLocation: '', jurisdiction: 'DIVORCE', isCaseAllocator: false}
                ]
};

describe('RolesContainerComponent', () => {
  let component: RolesAndAccessContainerComponent;
  const route = new ActivatedRoute();
  route.snapshot = {} as ActivatedRouteSnapshot;
  route.snapshot.data = {
    roles: CASEROLES,
    showAllocateRoleLink: true,
    case: CASE_VIEW
  };
  const mockCaseStore = jasmine.createSpyObj('mockCaseStore', ['pipe', 'select']);
  const mockAppStore = jasmine.createSpyObj('mockAppStore', ['pipe', 'select']);
  beforeEach((() => {
    component = new RolesAndAccessContainerComponent(route, mockCaseStore, mockAppStore);
  }));

  it('applyJurisdiction filter coorectly', () => {
    mockAppStore.select.and.returnValue(of(user));
    const spy = spyOn(component, 'setDisplayAllocateLink');
    component.applyJurisdiction(CASE_VIEW);
    expect(spy).toHaveBeenCalledWith(user, 'JUDICIAL');
  });
});

describe('RolesContainerComponent', () => {
  let component: RolesAndAccessContainerComponent;
  let fixture: ComponentFixture<RolesAndAccessContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), ExuiCommonLibModule],
      providers: [
        provideMockStore({initialState: initialMockState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                roles: CASEROLES,
                showAllocateRoleLink: true,
                case: CASE_VIEW
              }
            }
          }
        },
      ],
      declarations: [RolesAndAccessContainerComponent, RolesAndAccessComponent, CaseRolesTableComponent, ShowAllocateLinkDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAndAccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get a list of case roles from the activated route snapshot', () => {
    expect(component.roles.length).toBe(2);
    expect(component.roles[0].name).toBe('Judge Beech');
  });

  it('setDisplayAllocateLink to set true for JUDICIAL', () => {
    component.setDisplayAllocateLink(user, 'JUDICIAL');
    expect(component.showAllocateRoleLink).toBeTruthy();
  });
});
