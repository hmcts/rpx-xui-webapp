import { inject,
  Inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Type } from '@angular/core';
import { LaunchDarklyService } from '@hmcts/rpx-xui-common-lib';

export const MCLAUNCHDARKLYKEY = new InjectionToken<string>('LAUNCHDARKLYKEY');
@Injectable({
  providedIn: 'root'
})
export class McLaunchDarklyService extends LaunchDarklyService {
  constructor(@Inject(MCLAUNCHDARKLYKEY) key: string) {
    super();
    this.rootGuard(LaunchDarklyService);
  }

  private rootGuard(type: Type<any>) {
    const parent = inject(type, InjectFlags.Optional | InjectFlags.SkipSelf);

    if (parent) {
      throw Error(`[${type}]: Creating multiple instances, but should be singleton.`);
    }
  }
}
