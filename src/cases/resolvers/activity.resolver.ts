import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityService } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class ActivityResolver implements Resolve<boolean> {

  constructor(private activityService: ActivityService) {}

  resolve(): Observable<boolean> {
    this.activityService.verifyUserIsAuthorized();
    return Observable.of(true);
  }

}
