import { ConditionalShowDirective } from '../conditional-show.directive';
export declare class ConditionalShowRegistrarService {
    registeredDirectives: any[];
    register(newDirective: ConditionalShowDirective): void;
    refresh(): void;
    reset(): void;
}
