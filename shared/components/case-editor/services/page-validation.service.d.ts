import { FormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition/case-field.model';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import { WizardPage } from '../domain/wizard-page.model';
export declare class PageValidationService {
    private caseFieldService;
    constructor(caseFieldService: CaseFieldService);
    isPageValid(page: WizardPage, editForm: FormGroup): boolean;
    private checkDocumentField;
    isHidden(caseField: CaseField, editForm: FormGroup): boolean;
    private checkOptionalField;
    private checkMandatoryField;
}
