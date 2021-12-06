import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Actions, EXUISectionStatusEnum } from 'api/hearings/models/hearings.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from 'src/app/models/user-details.model';
import { RoleCategoryMappingService } from 'src/app/services/role-category-mapping/role-category-mapping.service';
import * as fromHearingStore from '../../../store';
import * as fromAppStore from '../../../../app/store';

@Component({
  selector: 'xui-hearing-stage',
  templateUrl: './hearing-stage.component.html',
  styleUrls: ['./hearing-stage.component.scss']
})
export class HearingStageComponent implements OnInit {
  public hearingsActions: Actions[] = [Actions.READ];
  public userRoles$: Observable<string[]>;
  constructor(private readonly appStore: Store<fromAppStore.State>,
    private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly roleCategoryMappingService: RoleCategoryMappingService) {
      const caseID = this.activatedRoute.snapshot.params.cid;
      this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
        map(userDetails => userDetails.userInfo.roles)
      );
      this.hearingStore.dispatch(new fromHearingStore.LoadAllHearings(caseID));
      // this.roleCategoryMappingService.isJudicialOrLegalOpsCategory(this.userRoles$).subscribe(
      //   userRole => console.log('userrole', userRole)
      //   //{
      //   //   if (userRole === UserRole.LegalOps) {
      //   //     console.log('userrole', userRole);
      //   //     this.hearingsActions = [...this.hearingsActions, Actions.CREATE, Actions.UPDATE, Actions.DELETE];
      //   //   }
      //   // }
      // );
   }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }
}
