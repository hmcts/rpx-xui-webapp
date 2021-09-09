import { CaseField } from '../../../domain/definition';
import { Profile } from '../../../domain/profile';
export declare class CollectionCreateCheckerService {
    setDisplayContextForChildren(caseField: CaseField, profile: Profile): void;
    private getCaseFieldChildren;
    private isComplex;
    private isCollection;
    private hasCreateAccess;
}
