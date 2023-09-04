import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
export declare class NoLinkedCasesComponent implements OnInit {
    private readonly router;
    private readonly linkedCasesService;
    serverLinkedApiError: {
        id: string;
        message: string;
    };
    constructor(router: Router, linkedCasesService: LinkedCasesService);
    ngOnInit(): void;
    onBack(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NoLinkedCasesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NoLinkedCasesComponent, "ccd-no-linked-cases", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=no-linked-cases.component.d.ts.map