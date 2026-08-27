import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services';
import { canActivateForRole } from './role-guard.utils';

@Injectable({
  providedIn: 'root',
})
export class CaseAllocatorGuard {
  constructor(
    private readonly sessionStorageService: SessionStorageService,
    private readonly router: Router
  ) {}

  public canActivate(): boolean {
    return canActivateForRole(this.sessionStorageService, this.router, 'case-allocator');
  }
}
