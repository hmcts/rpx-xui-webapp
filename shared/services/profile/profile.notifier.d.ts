import { Profile } from '../../domain';
export declare class ProfileNotifier {
    private profileSource;
    profile: import("rxjs/internal/Observable").Observable<Profile>;
    announceProfile(profile: Profile): void;
}
