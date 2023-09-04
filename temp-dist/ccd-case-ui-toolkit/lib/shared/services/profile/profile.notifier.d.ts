import { BehaviorSubject } from 'rxjs';
import { Profile } from '../../domain/profile/profile.model';
import * as i0 from "@angular/core";
export declare class ProfileNotifier {
    readonly profileSource: BehaviorSubject<Profile>;
    profile: import("rxjs").Observable<Profile>;
    announceProfile(profile: Profile): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileNotifier, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProfileNotifier>;
}
//# sourceMappingURL=profile.notifier.d.ts.map