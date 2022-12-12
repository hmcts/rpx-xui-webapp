import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'exui-restricted-case-access-container',
  templateUrl: './restricted-case-access-container.component.html'
})
export class RestrictedCaseAccessContainerComponent implements OnInit {

	public caseReference: string;

	constructor(private route: ActivatedRoute) {
		this.caseReference = this.route.snapshot.params.cid;
	}

  public ngOnInit(): void {
		console.log('CASE ID', this.caseReference);
  }
}
