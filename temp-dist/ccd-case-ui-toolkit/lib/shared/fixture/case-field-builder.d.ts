import { CaseField, FieldType } from '../domain/definition';
import { AccessControlList } from '../domain/definition/access-control-list.model';
export declare class CaseFieldBuilder {
    private readonly caseField;
    static create(): CaseFieldBuilder;
    withACLs(acls: AccessControlList[]): CaseFieldBuilder;
    withId(id: string): CaseFieldBuilder;
    withFieldType(fieldType: FieldType): CaseFieldBuilder;
    withDisplayContext(displayContext: string): CaseFieldBuilder;
    withDisplayContextParameter(displayContextParameter: string): CaseFieldBuilder;
    withHidden(hidden: boolean): CaseFieldBuilder;
    withHintText(hintText: string): CaseFieldBuilder;
    withLabel(label: string): CaseFieldBuilder;
    withOrder(order: number): CaseFieldBuilder;
    withSecurityLabel(securityLabel: string): CaseFieldBuilder;
    withShowCondition(showCondition: string): CaseFieldBuilder;
    withShowSummaryContentOption(option: number): CaseFieldBuilder;
    withValue(value: any): CaseFieldBuilder;
    withListValue(value: any): CaseFieldBuilder;
    build(): CaseField;
}
//# sourceMappingURL=case-field-builder.d.ts.map