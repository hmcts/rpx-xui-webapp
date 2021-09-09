import { OnInit } from '@angular/core';
import { CaseView, CaseField } from '../../domain';
export declare class CaseHeaderComponent implements OnInit {
    caseDetails: CaseView;
    caseTitle: CaseField;
    caseFields: CaseField[];
    ngOnInit(): void;
    isDraft(): boolean;
    private getCaseFields;
}
