import { Observable } from 'rxjs';
export declare class LoadingService implements HasLoadingState {
    private registered;
    private loading;
    readonly isLoading: Observable<boolean>;
    register(): string;
    unregister(token: string): void;
    private generateToken;
}
export declare abstract class HasLoadingState {
    readonly isLoading: Observable<boolean>;
}
