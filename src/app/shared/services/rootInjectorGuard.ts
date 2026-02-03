import { inject, Type } from '@angular/core';

export class RootInjectorGuard {
  private readonly _singletonGuard = true;

  constructor(type: Type<unknown>) {
    const parent = inject(type, { optional: true, skipSelf: true });

    if (parent) {
      throw new Error(`[${type}]: Creating multiple instances, but should be singleton.`);
    }
  }
}
