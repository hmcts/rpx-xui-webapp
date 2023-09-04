import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../../../../../domain';
import { CaseFlagState, Language } from '../../domain';
import { CaseFlagWizardStepTitle, SearchLanguageInterpreterStep } from '../../enums';
import * as i0 from "@angular/core";
export declare class SearchLanguageInterpreterComponent implements OnInit {
    formGroup: UntypedFormGroup;
    languages: Language[];
    flagCode: string;
    caseFlagStateEmitter: EventEmitter<CaseFlagState>;
    readonly minSearchCharacters = 3;
    readonly languageSearchTermControlName = "languageSearchTerm";
    readonly manualLanguageEntryControlName = "manualLanguageEntry";
    filteredLanguages$: Observable<Language[]>;
    searchTerm: string;
    isCheckboxEnabled: boolean;
    searchLanguageInterpreterTitle: CaseFlagWizardStepTitle;
    searchLanguageInterpreterHint: SearchLanguageInterpreterStep;
    errorMessages: ErrorMessage[];
    languageNotSelectedErrorMessage: string;
    languageNotEnteredErrorMessage: string;
    languageCharLimitErrorMessage: string;
    languageEnteredInBothFieldsErrorMessage: string;
    noResults: boolean;
    private readonly languageMaxCharLimit;
    private readonly signLanguageFlagCode;
    get searchLanguageInterpreterStep(): typeof SearchLanguageInterpreterStep;
    ngOnInit(): void;
    onNext(): void;
    onEnterLanguageManually(event: Event): void;
    displayLanguage(language?: Language): string | undefined;
    private validateLanguageEntry;
    private filterLanguages;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchLanguageInterpreterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchLanguageInterpreterComponent, "ccd-search-language-interpreter", never, { "formGroup": "formGroup"; "languages": "languages"; "flagCode": "flagCode"; }, { "caseFlagStateEmitter": "caseFlagStateEmitter"; }, never, never, false, never>;
}
//# sourceMappingURL=search-language-interpreter.component.d.ts.map