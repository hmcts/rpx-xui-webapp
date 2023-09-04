import { OnInit } from '@angular/core';
import { CaseView } from '../../domain/case-view/case-view.model';
import { CaseField } from '../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
export declare class CaseHeaderComponent implements OnInit {
    caseDetails: CaseView;
    caseTitle: CaseField;
    caseFields: CaseField[];
    ngOnInit(): void;
    isDraft(): boolean;
    private getCaseFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseHeaderComponent, "ccd-case-header", never, { "caseDetails": "caseDetails"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=case-header.component.d.ts.map