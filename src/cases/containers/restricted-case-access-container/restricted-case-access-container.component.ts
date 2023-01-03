import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CaseRole } from '../../../role-access/models/case-role.interface';
import { AllocateRoleService } from '../../../role-access/services/allocate-role.service';
import { Caseworker } from '../../../work-allocation/models/dtos';
import { CaseworkerDataService } from '../../../work-allocation/services/caseworker-data.service';

export interface RestrictedCase {
  user: string;
  role: string;
  email: string;
}

@Component({
  selector: 'exui-restricted-case-access-container',
  templateUrl: './restricted-case-access-container.component.html'
})
export class RestrictedCaseAccessContainerComponent implements OnInit {

  public caseReference: string;
  public caseDetails: CaseView;
  public caseRoles: CaseRole[];
  public caseWorkers: Caseworker[];
  
  constructor(private route: ActivatedRoute,
              private readonly allocateService: AllocateRoleService,
              private readonly caseworkerDataService: CaseworkerDataService) {
  }

  public ngOnInit(): void {
    this.caseReference = this.route.snapshot.params.cid;
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    console.log('CASE ID', this.caseReference);
    console.log('CASE DETAILS', this.caseDetails);
    this.loadRoles();
  }

  public loadRoles(): void {
    this.caseworkerDataService.getCaseworkersForServices(['IA']).subscribe(caseworkers => {
      this.allocateService.getCaseRoles(this.caseReference, 'IA', 'Asylum').pipe(
        switchMap(caseRoles => {
          this.caseRoles = caseRoles;
          console.log('CASE ROLES', this.caseRoles);
          return caseRoles.map(role => role.actorId);
        }),
        switchMap(idamIds => {
          console.log('IDAM IDS', idamIds);
          return this.caseworkerDataService.getCaseworkersForServices(['IA']);
        }),
        switchMap(caseWorkers => {
          return of(caseWorkers)
        })
      ).subscribe(result => {
        console.log('SWITCH MAP', result);
      });
    });

    this.allocateService.getCaseRoles(this.caseReference, 'IA', 'Asylum').pipe(
      switchMap(caseRoles => {
        this.caseRoles = caseRoles;
        console.log('CASE ROLES', this.caseRoles);
        return caseRoles.map(role => role.actorId);
      }),
      switchMap(idamIds => {
        console.log('IDAM IDS', idamIds);
        return this.caseworkerDataService.getCaseworkersForServices(['IA']);
      }),
      switchMap(caseWorkers => {
        return of(caseWorkers)
      })
    ).subscribe(result => {
      console.log('SWITCH MAP', result);
    });

    this.allocateService.getCaseRoles(this.caseReference, 'IA', 'Asylum').subscribe(result => {
      console.log('CASE ROLES', result);
    });

    // this.caseworkerDataService.getCaseworkersForServices(['IA']).subscribe(result => {
    //   console.log('CASE WORKERS', result);
    // });

    // this.caseworkerDataService.getDetails('740306ad-4fbd-42a8-9f5c-32ca38148c06').subscribe(result => {
    // 	console.log('RESULT', result);
    // });
  }


}
