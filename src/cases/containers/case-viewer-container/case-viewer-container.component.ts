import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseTab, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'exui-case-viewer-container',
  templateUrl: './case-viewer-container.component.html'
})
export class CaseViewerContainerComponent implements OnInit {
  public caseDetails: CaseView;
  public tabs$: Observable<CaseTab[]> = of([]);

  constructor(private readonly route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
  }
}
