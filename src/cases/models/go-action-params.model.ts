import { NavigationExtras } from '@angular/router';

export interface GoActionParams {
    path: any[]
    query?: any
    extras?: NavigationExtras
    callback?(): void
    errorHandler?(err): void
}
