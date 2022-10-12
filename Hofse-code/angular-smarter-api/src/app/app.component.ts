import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  jurisdictions: any[] = [];
  caseTypes: any[] = [];
  states: any[] = [];
  selected: string = '';
  caseType: string = '';
  stateO: string = '';

  JurisdictionsList = [
    {
      id: 'DIVORCE',
      name: 'Family Divorce',
      description: 'Family Divorce: dissolution of marriage',
    },
    {
      id: 'PROBATE',
      name: 'Manage probate application',
      description:
        'Services (grant of representation, caveats, will lodgment, standing search, settlers, pre lodgement)',
    },
    {
      id: 'CIVIL',
      name: 'Civil',
      description: 'Civil Jurisdiction',
    },
  ];

  StatesList = [
    {
      id: 'CaseCreated',
      name: 'Case created',
      description: 'Case created',
      order: 1,
      title_display: null,
      caseTypeId: 'CaseViewCallbackMessages2',
    },
    {
      id: 'AfterEvent',
      name: 'After event',
      description: 'After event',
      order: 2,
      title_display: null,
      caseTypeId: 'CaseViewCallbackMessages2',
    },
    {
      id: 'CaseUpdated',
      name: 'Case updated',
      description: 'Case updated',
      order: 3,
      title_display: null,
      caseTypeId: 'CaseViewCallbackMessages2',
    },
    {
      id: 'Created',
      name: 'Bulk case list created',
      description: 'Bulk case list created',
      order: 1,
      caseTypeId: 'NO_FAULT_DIVORCE_BulkAction',
    },
    {
      id: 'Empty',
      name: 'Bulk case empty',
      description: 'Bulk case empty',
      order: 5,
      title_display: null,
      caseTypeId: 'NO_FAULT_DIVORCE_BulkAction',
    },
    {
      id: 'Draft',
      name: 'Draft',
      description: 'Draft',
      order: 34,
      caseTypeId: 'NFD',
    },
    {
      id: 'AosDrafted',
      name: 'AoS drafted',
      description: 'AoS drafted',
      order: 3,
      caseTypeId: 'NFD',
    },
    {
      id: 'AfterEvent',
      name: 'After event',
      description: 'After event',
      order: 2,
      title_display: null,
      caseTypeId: 'xuiTestJurisdiction',
    },
    {
      id: 'CaseUpdated',
      name: 'Case Updated',
      description: 'Case Updated',
      order: 3,
      title_display: null,
      caseTypeId: 'xuiTestJurisdiction',
    },
    {
      id: 'StandingSearchCreated',
      name: 'Standing search created',
      description: 'Standing search created',
      caseTypeId: 'StandingSearch',
    },
    {
      id: 'WillWithdrawn',
      name: 'Will withdrawn',
      description: 'Will withdrawn',
      order: 3,
      caseTypeId: 'WillLodgement',
    },
    {
      id: 'WillImported',
      name: 'Will imported',
      description: 'Will imported',
      order: 4,
      caseTypeId: 'WillLodgement',
    },
    {
      id: 'dummyCaseCreated',
      name: 'Create dummy case',
      description: 'Create dummy case',
      order: 1,
      caseTypeId: 'LegacySearch',
    },
    {
      id: 'CASE_DISMISSED',
      name: 'Claim Dismissed',
      description: 'Claim has been dismissed',
      order: 6,
      jurisdictionId: 'CIVIL',
    },
    {
      id: 'PROCEEDS_IN_HERITAGE_SYSTEM',
      name: 'Case Proceeds Offline',
      jurisdictionId: 'GENERALAPPLICATION',
    },
  ];

  CaseTypesList = [
    {
      id: 'CaseViewCallbackMessages2',
      description:
        'CaseType for testing callback errors or warnings triggered on CaseView screen',

      name: 'CaseView Callback Messages 2',
      jurisdictionId: 'DIVORCE',
    },
    {
      id: 'NO_FAULT_DIVORCE_BulkAction',
      description: 'Handling of the dissolution of marriage',

      name: 'New Law Bulk Case',
      jurisdictionId: 'DIVORCE',
    },
    {
      id: 'NFD',
      description: 'Handling of the dissolution of marriage',

      name: 'New Law Case',
      jurisdictionId: 'DIVORCE',
    },
    {
      id: 'xuiTestJurisdiction',
      description:
        'CaseType for testing callback errors or warnings triggered on CaseView screen',

      name: 'XUI Case PoC',
      jurisdictionId: 'DIVORCE',
    },
    {
      id: 'StandingSearch',
      description: 'Probate - Tanding search',

      name: 'Standing search',
      jurisdictionId: 'PROBATE',
    },
    {
      id: 'WillLodgement',
      description: 'Probate - Will lodgement',

      name: 'Will lodgement',
      jurisdictionId: 'PROBATE',
    },
    {
      id: 'LegacySearch',
      description: 'ProbateMan cases',

      name: 'Legacy Case Search',
      jurisdictionId: 'PROBATE',
    },
    {
      id: 'CIVIL',
      description: 'Civil',

      name: 'Civil',
      jurisdictionId: 'CIVIL',
    },
    {
      id: 'GENERALAPPLICATION',
      description: 'Civil General Application',

      name: 'Civil General Application',
      jurisdictionId: 'CIVIL',
    },
  ];

  title = 'XUI API Performance demo';

  ngOnInit() {
    this.jurisdictions = this.JurisdictionsList;
  }

  onJurisdictionChange(sel: string) {
    if (!sel) {
      this.caseTypes = [];
      this.states = [];
      return;
    }
    this.caseTypes = this.CaseTypesList;
  }

  onCasetypeChange(sel: string) {
    if (!sel) {
      this.states = [];
      return;
    }
    this.states = this.StatesList;
  }

  onApplyClick() {
    console.log(
      'I would normally go and get the list of cases that match my selections above...'
    );
  }
}
