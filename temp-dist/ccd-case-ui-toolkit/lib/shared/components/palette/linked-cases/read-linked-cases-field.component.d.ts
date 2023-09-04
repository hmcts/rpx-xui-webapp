import { AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseField } from '../../../domain';
import { CommonDataService } from '../../../services/common-data-service/common-data-service';
import { LinkedCasesService } from './services';
import * as i0 from "@angular/core";
export declare class ReadLinkedCasesFieldComponent implements OnInit, AfterViewInit {
    private readonly route;
    private readonly router;
    private readonly linkedCasesService;
    private readonly appConfig;
    private readonly commonDataService;
    caseField: CaseField;
    reasonListLoaded: boolean;
    reload: boolean;
    serverError: {
        id: string;
        message: string;
    };
    serverLinkedApiError: {
        id: string;
        message: string;
    };
    isServerReasonCodeError: boolean;
    isServerJurisdictionError: boolean;
    isServerLinkedFromError: boolean;
    isServerLinkedToError: boolean;
    constructor(route: ActivatedRoute, router: Router, linkedCasesService: LinkedCasesService, appConfig: AbstractAppConfig, commonDataService: CommonDataService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    reloadCurrentRoute(): void;
    getFailureLinkedToNotification(evt: any): void;
    getFailureLinkedFromNotification(evt: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadLinkedCasesFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadLinkedCasesFieldComponent, "ccd-read-linked-cases-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-linked-cases-field.component.d.ts.map