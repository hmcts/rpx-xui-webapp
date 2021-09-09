import { BehaviorSubject } from 'rxjs';
export declare class NavigationNotifierService {
    navigationSource: BehaviorSubject<any>;
    navigation: import("rxjs/internal/Observable").Observable<any>;
    announceNavigation(origin: any): void;
}
