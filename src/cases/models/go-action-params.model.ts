import { NavigationExtras } from '@angular/router';

export interface GoActionParams {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
    callback?(): void;
    errorHandler?(err): void;
}
