import { WizardPageField } from '../domain';
import { CaseField } from '../../../domain';
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
}
