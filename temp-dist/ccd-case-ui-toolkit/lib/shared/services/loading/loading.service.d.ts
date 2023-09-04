import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class LoadingService {
    private readonly registered;
    private readonly loading;
    get isLoading(): Observable<boolean>;
    register(): string;
    unregister(token: string): void;
    private generateToken;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoadingService>;
}
//# sourceMappingURL=loading.service.d.ts.map