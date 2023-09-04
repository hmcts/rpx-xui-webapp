import { EventEmitter, OnInit } from '@angular/core';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { DefinitionsService } from '../../services/definitions/definitions.service';
import * as i0 from "@angular/core";
export declare class CaseListFiltersComponent implements OnInit {
    private readonly definitionsService;
    defaults: any;
    onApply: EventEmitter<any>;
    onReset: EventEmitter<any>;
    jurisdictions: Jurisdiction[];
    isVisible: boolean;
    constructor(definitionsService: DefinitionsService);
    ngOnInit(): void;
    onWrapperApply(value: any): void;
    onWrapperReset(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseListFiltersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseListFiltersComponent, "ccd-case-list-filters", never, { "defaults": "defaults"; }, { "onApply": "onApply"; "onReset": "onReset"; }, never, never, false, never>;
}
//# sourceMappingURL=case-list-filters.component.d.ts.map