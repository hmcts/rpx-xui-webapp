import { CaseField } from '../../../domain';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
/**
 * Display a complex type fields as a list of values without labels.
 * This is intended for rendering of Check Your Answer page.
 */
export declare class ReadComplexFieldRawComponent extends AbstractFieldReadComponent {
    caseFields: CaseField[];
}
