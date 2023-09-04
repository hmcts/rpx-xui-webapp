import { CaseField } from '../../../domain/definition/case-field.model';
import { WizardPageField } from '../domain/wizard-page-field.model';
import * as i0 from "@angular/core";
export declare class WizardPageFieldToCaseFieldMapper {
    mapAll(wizardPageFields: WizardPageField[], caseFields: CaseField[]): CaseField[];
    private map;
    private processComplexFieldOverride;
    private fixShowConditionPath;
    private preparePathPrefix;
    private getCaseFieldLeaf;
    private hideParentIfAllChildrenHidden;
    private getCaseFieldChildren;
    private allCaseFieldsHidden;
    static ɵfac: i0.ɵɵFactoryDeclaration<WizardPageFieldToCaseFieldMapper, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WizardPageFieldToCaseFieldMapper>;
}
//# sourceMappingURL=wizard-page-field-to-case-field.mapper.d.ts.map