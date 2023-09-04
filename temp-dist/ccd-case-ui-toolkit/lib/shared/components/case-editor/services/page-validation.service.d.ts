import { UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import { WizardPage } from '../domain/wizard-page.model';
import * as i0 from "@angular/core";
export declare class PageValidationService {
    private readonly caseFieldService;
    constructor(caseFieldService: CaseFieldService);
    isPageValid(page: WizardPage, editForm: UntypedFormGroup): boolean;
    isHidden(caseField: CaseField, editForm: UntypedFormGroup, path?: string): boolean;
    private checkDocumentField;
    private checkOptionalField;
    private checkMandatoryField;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageValidationService>;
}
//# sourceMappingURL=page-validation.service.d.ts.map