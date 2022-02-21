import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AlertService, CaseField, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { of } from 'rxjs';

import { TaskAlertBannerComponent } from '../../../cases/components';
import { AllocateRoleService } from '../../../role-access/services';
import { CaseworkerDataService, WorkAllocationCaseService } from '../../../work-allocation-2/services';
import { getMockTasks } from '../../../work-allocation-2/tests/utils.spec';
import { TasksContainerComponent } from './tasks-container.component';

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

describe('TasksContainerComponent', () => {
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);
  const mockWACaseService = jasmine.createSpyObj('waCaseService', ['getTasksByCaseId']);
  const mockCaseworkerService = jasmine.createSpyObj('caseworkerService', ['getCaseworkersForServices']);
  const mockRoleService = jasmine.createSpyObj('mockRolesService', ['getCaseRolesUserDetails']);
  let component: TasksContainerComponent;
  let fixture: ComponentFixture<TasksContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAlertBannerComponent, TasksContainerComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: AlertService, useValue: mockAlertService},
        {provide: WorkAllocationCaseService, useValue: mockWACaseService},
        {provide: CaseworkerDataService, useValue: mockCaseworkerService},
        {provide: AllocateRoleService, useValue: mockRoleService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                tasks: {
                  tasks: getMockTasks(),
                  caseworkers: null
                },
                case: CASE_VIEW
              },
              paramMap: convertToParamMap({cId: '1234567890123456'}),
            }
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksContainerComponent);
    component = fixture.componentInstance;
    mockWACaseService.getTasksByCaseId.and.returnValue(of(getMockTasks()));
    mockCaseworkerService.getCaseworkersForServices.and.returnValue([]);
    mockRoleService.getCaseRolesUserDetails.and.returnValue(of(getMockTasks()));
    fixture.detectChanges();
  });

  it('should correctly show task alert when warnings are present', () => {
    // as the mock tasks include a warning the task alert banner should be displayed
    expect(component.warningIncluded).toBe(true);
  });

  it('should return an empty list if there are no tasks', () => {
    mockWACaseService.getTasksByCaseId.and.returnValue(of([]));
    mockRoleService.getCaseRolesUserDetails.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.tasks.length).toEqual(0);
  });


  it('should refresh tasks when requested', () => {
    const firstTask = getMockTasks()[0];
    mockWACaseService.getTasksByCaseId.and.returnValue(of([firstTask]));
    component.onTaskRefreshRequired();
    expect(component.tasks.length).toEqual(1);
  });

  afterEach(() => {
    fixture.destroy();
  })

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
