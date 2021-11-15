import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseField, CaseTab, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { CaseViewerContainerComponent } from './case-viewer-container.component';

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
      imports: [RouterTestingModule, MatTabsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                case: CASE_VIEW
              }
            }
          }
        }
      ],
      declarations: [CaseViewerContainerComponent, CaseViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseViewerContainerComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should show no tabs', (done: DoneFn) => {
    component.tabs$.subscribe((tabs: CaseTab[]) => {
      expect(tabs.length).toBe(0);
      done();
    });
  });
});
