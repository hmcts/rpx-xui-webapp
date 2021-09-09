import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivityService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Injectable()
export class ActivityResolver implements Resolve<boolean> {

  constructor(private readonly activityService: ActivityService) {}

  public resolve(): Observable<boolean> {
    try{
      this.activityService.verifyUserIsAuthorized();
    } catch (err) {
      console.log( err);
    }
    return Observable.of(true);
  }
}
