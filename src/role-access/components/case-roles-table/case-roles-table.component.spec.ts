import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseField, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { CASEROLES } from '../../../../api/workAllocation2/constants/roles.mock.data';
import { initialMockState } from '../../testing/app-initial-state.mock';
import { CaseRolesTableComponent } from './case-roles-table.component';

describe('CaseRolesTableComponent', () => {
  let component: CaseRolesTableComponent;
  let fixture: ComponentFixture<CaseRolesTableComponent>;
  const CASE_VIEW: CaseView = {
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), ExuiCommonLibModule],
      declarations: [CaseRolesTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRolesTableComponent);
    component = fixture.componentInstance;
    component.caseDetails = CASE_VIEW;
    component.locationInfo = initialMockState.appConfig.locationInfo[0];
    fixture.detectChanges();
  });

  it('should display a list of roles', () => {
    component.roles = CASEROLES;
    fixture.detectChanges();
    const tableBody: DebugElement = fixture.debugElement.query(By.css('.govuk-table__body'));
    const tableBodyHTMLElement: HTMLElement = tableBody.nativeElement as HTMLElement;
    expect(tableBodyHTMLElement.children.length).toBe(2);
    expect(tableBodyHTMLElement.children[0].children[0].textContent).toBe('Judge Beech');
    expect(tableBodyHTMLElement.children[0].children[2].textContent).toBe('Taylor House');
    expect(tableBodyHTMLElement.children[1].children[0].textContent).toBe('Kuda Nyamainashe');
    expect(tableBodyHTMLElement.children[1].children[2].textContent).toBe('Milton Keynes');
  });

  it('should display no roles for this case', () => {
    const summaryList: DebugElement = fixture.debugElement.query(By.css('.govuk-summary-list__value'));
    const element: HTMLElement = summaryList.nativeElement as HTMLElement;
    expect(element.textContent).toBe(' There are no legal ops roles for this case. ');
  });

  it('should show the reallocate and remove allocation link', () => {
    component.roles = CASEROLES;
    fixture.detectChanges();
    const tableBody: DebugElement = fixture.debugElement.query(By.css('.govuk-table__body'));
    const tableBodyHTMLElement: HTMLElement = tableBody.nativeElement as HTMLElement;
    const firstRow = tableBodyHTMLElement.children[0] as HTMLElement;
    const manageLinkCell = firstRow.children[5].children[0] as HTMLElement;
    manageLinkCell.click();
    fixture.detectChanges();
    const secondRow = tableBodyHTMLElement.children[1] as HTMLElement;
    const manageLinkRow = secondRow.querySelector('.right') as HTMLElement;
    expect(manageLinkRow.children.length).toBe(2);
    expect(manageLinkRow.children[0].textContent).toBe('Reallocate');
    expect(manageLinkRow.children[1].textContent).toBe('Remove Allocation');
  });
});
