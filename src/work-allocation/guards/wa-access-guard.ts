import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class WorkAllocationAccessGuard {
  constructor() {}

  public static navigateUrl(isfeatureEnabled: boolean, router: Router, url: string): void {
    if (!isfeatureEnabled) {
      router.navigate([url]);
    }
  }

  public canActivate(): Observable<boolean> {
    // waAccess feature flag removed - EXUI-2615: always allow
    return of(true);
  }
}
