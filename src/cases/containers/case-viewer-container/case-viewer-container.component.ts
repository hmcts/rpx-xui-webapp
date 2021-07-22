import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'exui-case-viewer-container',
  templateUrl: './case-viewer-container.component.html',
  styleUrls: ['./case-viewer-container.component.scss']
})
export class CaseViewerContainerComponent implements OnInit {
  public caseDetails: CaseView;

  constructor(private readonly route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
  }

}
