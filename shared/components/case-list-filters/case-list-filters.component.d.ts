import { EventEmitter, OnInit } from '@angular/core';
import { DefinitionsService } from '../../services';
import { Jurisdiction } from '../../domain';
export declare class CaseListFiltersComponent implements OnInit {
    private definitionsService;
    defaults: any;
    onApply: EventEmitter<any>;
    onReset: EventEmitter<any>;
    jurisdictions: Jurisdiction[];
    isVisible: boolean;
    constructor(definitionsService: DefinitionsService);
    ngOnInit(): void;
    onWrapperApply(value: any): void;
    onWrapperReset(value: any): void;
}
