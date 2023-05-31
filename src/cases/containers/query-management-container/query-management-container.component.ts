import { Component, OnInit } from '@angular/core';
import { partyMessagesMockData, QueryListItem } from '@hmcts/ccd-case-ui-toolkit';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'exui-query-management-container',
  templateUrl: './query-management-container.component.html'
})
export class QueryManagementContainerComponent implements OnInit {
  public queryItem: QueryListItem | undefined;
  public formGroup: FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    const queryItemId = this.activatedRoute.snapshot.data.qid;
    if (queryItemId) {
      this.queryItem = new QueryListItem();
      Object.assign(this.queryItem, partyMessagesMockData[0].partyMessages[0]);
    }
  }
}
