import { CaseField } from '../../domain/definition/case-field.model';
export declare class CaseFieldService {
    isOptional(field: CaseField): boolean;
    isReadOnly(field: CaseField): boolean;
    isMandatory(field: CaseField): boolean;
    isLabel(field: CaseField): boolean;
}
