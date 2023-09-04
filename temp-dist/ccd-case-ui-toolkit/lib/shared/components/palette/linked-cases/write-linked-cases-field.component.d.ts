import { AfterViewInit, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseEditDataService } from '../../../commons/case-edit-data';
import { CaseView } from '../../../domain/case-view';
import { CommonDataService } from '../../../services/common-data-service/common-data-service';
import { CasesService } from '../../case-editor/services/cases.service';
import { AbstractFieldWriteComponent } from '../base-field';
import { CaseLink, LinkedCasesState } from './domain';
import { LinkedCasesEventTriggers, LinkedCasesPages } from './enums';
import { LinkedCasesService } from './services';
import * as i0 from "@angular/core";
export declare class WriteLinkedCasesFieldComponent extends AbstractFieldWriteComponent implements OnInit, AfterViewInit {
    private readonly appConfig;
    private readonly commonDataService;
    private readonly casesService;
    private readonly linkedCasesService;
    private readonly caseEditDataService;
    caseEditForm: UntypedFormGroup;
    caseDetails: CaseView;
    linkedCasesPage: number;
    linkedCasesPages: typeof LinkedCasesPages;
    linkedCasesEventTriggers: typeof LinkedCasesEventTriggers;
    linkedCases: CaseLink[];
    constructor(appConfig: AbstractAppConfig, commonDataService: CommonDataService, casesService: CasesService, linkedCasesService: LinkedCasesService, caseEditDataService: CaseEditDataService);
    ngOnInit(): void;
    initialiseCaseDetails(caseDetails: CaseView): void;
    ngAfterViewInit(): void;
    onLinkedCasesStateEmitted(linkedCasesState: LinkedCasesState): void;
    getLinkedCaseReasons(): void;
    proceedToNextPage(): void;
    submitLinkedCases(): void;
    isAtFinalPage(): boolean;
    getNextPage(linkedCasesState: LinkedCasesState): number;
    getLinkedCases(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WriteLinkedCasesFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WriteLinkedCasesFieldComponent, "ccd-write-linked-cases-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=write-linked-cases-field.component.d.ts.map