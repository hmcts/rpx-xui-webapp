import { EventEmitter, OnInit } from '@angular/core';
import { Jurisdiction } from '../../domain/definition/jurisdiction.model';
import { DefinitionsService } from '../../services/definitions/definitions.service';
import * as i0 from "@angular/core";
export declare class SearchFiltersWrapperComponent implements OnInit {
    private readonly definitionsService;
    autoApply: boolean;
    onApply: EventEmitter<any>;
    onReset: EventEmitter<any>;
    onJurisdiction: EventEmitter<any>;
    jurisdictions: Jurisdiction[];
    isVisible: boolean;
    constructor(definitionsService: DefinitionsService);
    ngOnInit(): void;
    onWrapperApply(value: any): void;
    onWrapperReset(value: any): void;
    onWrapperJurisdiction(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchFiltersWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchFiltersWrapperComponent, "ccd-search-filters-wrapper", never, { "autoApply": "autoApply"; }, { "onApply": "onApply"; "onReset": "onReset"; "onJurisdiction": "onJurisdiction"; }, never, never, false, never>;
}
//# sourceMappingURL=search-filters-wrapper.component.d.ts.map