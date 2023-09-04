import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../../../../domain';
import { LinkedCasesState } from '../../domain';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
export declare class BeforeYouStartComponent {
    private readonly router;
    private readonly linkedCasesService;
    linkedCasesStateEmitter: EventEmitter<LinkedCasesState>;
    isLinkCasesJourney: boolean;
    errorMessages: ErrorMessage[];
    serverLinkedApiError: {
        id: string;
        message: string;
    };
    constructor(router: Router, linkedCasesService: LinkedCasesService);
    onNext(): void;
    onBack(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BeforeYouStartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BeforeYouStartComponent, "ccd-linked-cases-before-you-start", never, {}, { "linkedCasesStateEmitter": "linkedCasesStateEmitter"; }, never, never, false, never>;
}
//# sourceMappingURL=before-you-start.component.d.ts.map