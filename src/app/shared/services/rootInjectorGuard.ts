import { inject, InjectFlags, Type } from '@angular/core';

export class RootInjectorGuard {
    constructor(type: Type<any>) {
        // tslint:disable-next-line:no-bitwise
        const parent = inject(type, InjectFlags.Optional | InjectFlags.SkipSelf);

        if (parent) {
            throw Error(`[${type}]: Creating multiple instances, but should be singleton.`);
        }
    }
}
