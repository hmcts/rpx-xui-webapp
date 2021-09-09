import { OnInit, EventEmitter } from '@angular/core';
import { Jurisdiction } from '../../domain';
import { DefinitionsService } from '../../services';
export declare class SearchFiltersWrapperComponent implements OnInit {
    private definitionsService;
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
}
