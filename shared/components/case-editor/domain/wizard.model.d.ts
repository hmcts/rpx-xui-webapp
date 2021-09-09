import { WizardPage } from './wizard-page.model';
import { Predicate } from '../../../domain/predicate.model';
export declare class Wizard {
    private orderService;
    pages: WizardPage[];
    constructor(wizardPages: WizardPage[]);
    firstPage(canShow: Predicate<WizardPage>): WizardPage;
    getPage(pageId: string, canShow: Predicate<WizardPage>): WizardPage;
    findWizardPage(caseFieldId: string): WizardPage;
    nextPage(pageId: string, canShow: Predicate<WizardPage>): WizardPage;
    previousPage(pageId: string, canShow: Predicate<WizardPage>): WizardPage;
    hasPage(pageId: string): boolean;
    hasPreviousPage(pageId: string, canShow: Predicate<WizardPage>): boolean;
    reverse(): WizardPage[];
    private findPage;
    private findExistingIndex;
}
