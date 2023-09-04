import { EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../../../../../domain';
import { CasesService } from '../../../../case-editor/services/cases.service';
import { CaseLink, LinkedCasesState } from '../../domain';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
export declare class UnLinkCasesComponent implements OnInit {
    private readonly fb;
    private readonly casesService;
    private readonly linkedCasesService;
    private static readonly LINKED_CASES_TAB_ID;
    private static readonly CASE_NAME_MISSING_TEXT;
    linkedCasesStateEmitter: EventEmitter<LinkedCasesState>;
    notifyAPIFailure: EventEmitter<boolean>;
    unlinkCaseForm: UntypedFormGroup;
    caseId: string;
    linkedCases: CaseLink[];
    errorMessages: ErrorMessage[];
    unlinkErrorMessage: string;
    isLoaded: boolean;
    isServerError: boolean;
    constructor(fb: FormBuilder, casesService: CasesService, linkedCasesService: LinkedCasesService);
    ngOnInit(): void;
    getLinkedCases(): void;
    getAllLinkedCaseInformation(): void;
    searchCasesByCaseIds(searchCasesResponse: any[]): Observable<unknown[]>;
    initForm(): void;
    get getLinkedCasesFormArray(): FormArray;
    onChange(caseSelected: any): void;
    onNext(): void;
    emitLinkedCasesState(isNavigateToNextPage: boolean): void;
    resetErrorMessages(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnLinkCasesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnLinkCasesComponent, "ccd-unlink-cases", never, {}, { "linkedCasesStateEmitter": "linkedCasesStateEmitter"; "notifyAPIFailure": "notifyAPIFailure"; }, never, never, false, never>;
}
//# sourceMappingURL=unlink-cases.component.d.ts.map