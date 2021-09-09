import { PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseField } from '../../../domain/definition';
import { WizardPage } from '../../case-editor/domain';
export declare class CcdPageFieldsPipe implements PipeTransform {
    transform(page: WizardPage, dataFormGroup: FormGroup): CaseField;
}
