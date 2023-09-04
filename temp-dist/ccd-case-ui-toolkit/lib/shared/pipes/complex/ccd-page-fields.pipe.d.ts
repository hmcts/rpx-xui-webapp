import { PipeTransform } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { WizardPage } from '../../components/case-editor/domain/wizard-page.model';
import { CaseField } from '../../domain/definition';
import * as i0 from "@angular/core";
export declare class CcdPageFieldsPipe implements PipeTransform {
    transform(page: WizardPage, dataFormGroup: UntypedFormGroup): CaseField;
    static ɵfac: i0.ɵɵFactoryDeclaration<CcdPageFieldsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CcdPageFieldsPipe, "ccdPageFields", false>;
}
//# sourceMappingURL=ccd-page-fields.pipe.d.ts.map