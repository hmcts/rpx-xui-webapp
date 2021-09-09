import { CaseField, FieldType } from '../domain/definition';
import { AccessControlList } from '../domain/definition/access-control-list.model';
export declare class CaseFieldBuilder {
    private caseField;
    static create(): CaseFieldBuilder;
    withACLs(acls: AccessControlList[]): CaseFieldBuilder;
    withId(id: string): CaseFieldBuilder;
    withFieldType(field_type: FieldType): CaseFieldBuilder;
    withDisplayContext(display_context: string): CaseFieldBuilder;
    withDisplayContextParameter(display_context_parameter: string): CaseFieldBuilder;
    withHidden(hidden: boolean): CaseFieldBuilder;
    withHintText(hint_text: string): CaseFieldBuilder;
    withLabel(label: string): CaseFieldBuilder;
    withOrder(order: number): CaseFieldBuilder;
    withSecurityLabel(security_label: string): CaseFieldBuilder;
    withShowCondition(show_condition: string): CaseFieldBuilder;
    withShowSummaryContentOption(option: number): CaseFieldBuilder;
    withValue(value: any): CaseFieldBuilder;
    withListValue(value: any): CaseFieldBuilder;
    build(): CaseField;
}
