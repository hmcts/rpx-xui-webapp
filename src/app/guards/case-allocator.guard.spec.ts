import { CaseAllocatorGuard } from './case-allocator.guard';

describe('Case Allocator guard', () => {
  let guard: CaseAllocatorGuard;
  let service: any;
  let router: any;

  beforeEach(() => {
    service = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    router = jasmine.createSpyObj('router', ['navigateByUrl']);
    guard = new CaseAllocatorGuard(service, router);
  });

  it('is Truthy', () => {
    expect(guard).toBeTruthy();
  });

  it('calls acceptGuard returns true', () => {
    const user = { roles: ['case-allocator'] };
    service.getItem.and.returnValue(JSON.stringify(user));
    const result = guard.canActivate();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it('calls acceptGuard returns true', () => {
    const user = { roles: ['Some role'] };
    service.getItem.and.returnValue(JSON.stringify(user));
    const result = guard.canActivate();
    expect(router.navigateByUrl).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });
});
