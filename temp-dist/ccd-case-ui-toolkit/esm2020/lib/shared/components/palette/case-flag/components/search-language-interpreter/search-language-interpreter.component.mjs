import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { CaseFlagFieldState, CaseFlagWizardStepTitle, SearchLanguageInterpreterErrorMessage, SearchLanguageInterpreterStep } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/input";
import * as i4 from "@angular/material/autocomplete";
import * as i5 from "@angular/material/core";
function SearchLanguageInterpreterComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "span", 21);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.languageNotSelectedErrorMessage, " ");
} }
function SearchLanguageInterpreterComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "span", 21);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.languageEnteredInBothFieldsErrorMessage, " ");
} }
function SearchLanguageInterpreterComponent_mat_option_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const language_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", language_r6);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", language_r6.value, " ");
} }
function SearchLanguageInterpreterComponent_mat_option_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 24);
    i0.ɵɵtext(1, "No results found");
    i0.ɵɵelementEnd();
} }
function SearchLanguageInterpreterComponent_div_21_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "span", 21);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.languageNotEnteredErrorMessage, " ");
} }
function SearchLanguageInterpreterComponent_div_21_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "span", 21);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.languageCharLimitErrorMessage, " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
function SearchLanguageInterpreterComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "div", 1)(2, "label", 26);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, SearchLanguageInterpreterComponent_div_21_div_4_Template, 4, 1, "div", 27);
    i0.ɵɵtemplate(5, SearchLanguageInterpreterComponent_div_21_div_5_Template, 4, 1, "div", 28);
    i0.ɵɵelement(6, "input", 29);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx_r5.languageNotEnteredErrorMessage || ctx_r5.languageCharLimitErrorMessage));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r5.searchLanguageInterpreterStep.INPUT_LABEL);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.languageNotEnteredErrorMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.languageCharLimitErrorMessage);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("name", ctx_r5.manualLanguageEntryControlName)("formControlName", ctx_r5.manualLanguageEntryControlName);
} }
export class SearchLanguageInterpreterComponent {
    constructor() {
        this.caseFlagStateEmitter = new EventEmitter();
        this.minSearchCharacters = 3;
        this.languageSearchTermControlName = 'languageSearchTerm';
        this.manualLanguageEntryControlName = 'manualLanguageEntry';
        this.searchTerm = '';
        this.isCheckboxEnabled = false;
        this.errorMessages = [];
        this.languageNotSelectedErrorMessage = '';
        this.languageNotEnteredErrorMessage = '';
        this.languageCharLimitErrorMessage = '';
        this.languageEnteredInBothFieldsErrorMessage = '';
        this.noResults = false;
        this.languageMaxCharLimit = 80;
        this.signLanguageFlagCode = 'RA0042';
    }
    get searchLanguageInterpreterStep() {
        return SearchLanguageInterpreterStep;
    }
    ngOnInit() {
        this.searchLanguageInterpreterTitle = this.flagCode === this.signLanguageFlagCode
            ? CaseFlagWizardStepTitle.SEARCH_SIGN_LANGUAGE_INTERPRETER
            : CaseFlagWizardStepTitle.SEARCH_LANGUAGE_INTERPRETER;
        this.searchLanguageInterpreterHint = this.flagCode === this.signLanguageFlagCode
            ? SearchLanguageInterpreterStep.SIGN_HINT_TEXT
            : SearchLanguageInterpreterStep.HINT_TEXT;
        this.formGroup.addControl(this.languageSearchTermControlName, new FormControl());
        this.formGroup.addControl(this.manualLanguageEntryControlName, new FormControl());
        this.filteredLanguages$ = this.formGroup.get(this.languageSearchTermControlName).valueChanges.pipe(
        // Need to check type of input because it changes to object (i.e. Language) when a value is selected from the
        // autocomplete panel, instead of string when a value is being typed in
        map(input => typeof input === 'string' ? input : input.value), map(searchTerm => {
            // Update the current search term
            this.searchTerm = searchTerm;
            return this.filterLanguages(searchTerm);
        }), tap(languages => this.noResults = languages.length === 0));
    }
    onNext() {
        // Validate language interpreter entry
        this.validateLanguageEntry();
        // Return case flag field state and error messages to the parent
        this.caseFlagStateEmitter.emit({
            currentCaseFlagFieldState: CaseFlagFieldState.FLAG_LANGUAGE_INTERPRETER,
            errorMessages: this.errorMessages
        });
    }
    onEnterLanguageManually(event) {
        this.isCheckboxEnabled = event.target.checked;
        // If the checkbox is disabled, i.e. unchecked, then clear the manual language entry FormControl of any value to
        // prevent it being retained even when the field itself is hidden
        if (!this.isCheckboxEnabled) {
            this.formGroup.get(this.manualLanguageEntryControlName).setValue(null);
        }
    }
    displayLanguage(language) {
        return language ? language.value : undefined;
    }
    validateLanguageEntry() {
        this.languageNotSelectedErrorMessage = null;
        this.languageNotEnteredErrorMessage = null;
        this.languageCharLimitErrorMessage = null;
        this.languageEnteredInBothFieldsErrorMessage = null;
        this.errorMessages = [];
        // Checkbox not enabled means the user has opted to search for and select the language
        if (!this.isCheckboxEnabled && !this.formGroup.get(this.languageSearchTermControlName).value) {
            this.languageNotSelectedErrorMessage = SearchLanguageInterpreterErrorMessage.LANGUAGE_NOT_ENTERED;
            this.errorMessages.push({
                title: '',
                description: SearchLanguageInterpreterErrorMessage.LANGUAGE_NOT_ENTERED,
                fieldId: this.languageSearchTermControlName
            });
        }
        // Checkbox enabled means the user has opted to enter the language manually
        if (this.isCheckboxEnabled) {
            if (!this.formGroup.get(this.manualLanguageEntryControlName).value) {
                this.languageNotEnteredErrorMessage = SearchLanguageInterpreterErrorMessage.LANGUAGE_NOT_ENTERED;
                this.errorMessages.push({
                    title: '',
                    description: SearchLanguageInterpreterErrorMessage.LANGUAGE_NOT_ENTERED,
                    fieldId: this.manualLanguageEntryControlName
                });
            }
            else if (this.formGroup.get(this.manualLanguageEntryControlName).value.length > this.languageMaxCharLimit) {
                this.languageCharLimitErrorMessage = SearchLanguageInterpreterErrorMessage.LANGUAGE_CHAR_LIMIT_EXCEEDED;
                this.errorMessages.push({
                    title: '',
                    description: SearchLanguageInterpreterErrorMessage.LANGUAGE_CHAR_LIMIT_EXCEEDED,
                    fieldId: this.manualLanguageEntryControlName
                });
            }
            else if (this.formGroup.get(this.languageSearchTermControlName).value) {
                // Language entry is permitted in only one field at a time
                this.languageEnteredInBothFieldsErrorMessage = SearchLanguageInterpreterErrorMessage.LANGUAGE_ENTERED_IN_BOTH_FIELDS;
                this.errorMessages.push({
                    title: '',
                    description: SearchLanguageInterpreterErrorMessage.LANGUAGE_ENTERED_IN_BOTH_FIELDS,
                    fieldId: this.languageSearchTermControlName
                });
            }
        }
    }
    filterLanguages(searchTerm) {
        if (searchTerm.length < this.minSearchCharacters) {
            return [];
        }
        return this.languages
            ? this.languages.filter(language => language.value.toLowerCase().includes(searchTerm.toLowerCase(), 0))
            : [];
    }
}
SearchLanguageInterpreterComponent.ɵfac = function SearchLanguageInterpreterComponent_Factory(t) { return new (t || SearchLanguageInterpreterComponent)(); };
SearchLanguageInterpreterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchLanguageInterpreterComponent, selectors: [["ccd-search-language-interpreter"]], inputs: { formGroup: "formGroup", languages: "languages", flagCode: "flagCode" }, outputs: { caseFlagStateEmitter: "caseFlagStateEmitter" }, decls: 25, vars: 18, consts: [[1, "form-group", 3, "formGroup"], [1, "govuk-form-group", 3, "ngClass"], [1, "govuk-label-wrapper"], [1, "govuk-label", "govuk-label--l", 3, "for"], ["id", "language-search-box-hint", 1, "govuk-hint"], [1, "auto-complete-container"], ["id", "language-not-selected-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "language-entered-in-both-fields-error-message", "class", "govuk-error-message", 4, "ngIf"], ["aria-label", "Language search box", "matInput", "", "type", "text", 1, "govuk-input", "search-language__input", 3, "formControlName", "matAutocomplete"], ["autoActiveFirstOption", "", 1, "mat-autocomplete-panel-extend", 3, "displayWith"], ["autoSearchLanguage", "matAutocomplete"], [3, "value", 4, "ngFor", "ngForOf"], ["disabled", "", 4, "ngIf"], ["data-module", "govuk-checkboxes", 1, "govuk-checkboxes", "govuk-checkboxes--small", "govuk-checkboxes--conditional"], [1, "govuk-radios__item"], ["id", "enter-language-manually", "name", "enter-language-manually", "type", "checkbox", 1, "govuk-checkboxes__input", 3, "change"], ["for", "enter-language-manually", 1, "govuk-label", "govuk-checkboxes__label"], ["class", "govuk-radios__conditional", 4, "ngIf"], [1, "govuk-button-group"], ["type", "button", 1, "button", "button-primary", 3, "click"], ["id", "language-not-selected-error-message", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], ["id", "language-entered-in-both-fields-error-message", 1, "govuk-error-message"], [3, "value"], ["disabled", ""], [1, "govuk-radios__conditional"], ["for", "manual-language-entry", 1, "govuk-label"], ["id", "language-not-entered-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "language-char-limit-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "manual-language-entry", "type", "text", 1, "govuk-input", "govuk-input--width-20", 3, "name", "formControlName"], ["id", "language-not-entered-error-message", 1, "govuk-error-message"], ["id", "language-char-limit-error-message", 1, "govuk-error-message"]], template: function SearchLanguageInterpreterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2)(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(5, "div", 4);
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 5);
        i0.ɵɵtemplate(8, SearchLanguageInterpreterComponent_div_8_Template, 4, 1, "div", 6);
        i0.ɵɵtemplate(9, SearchLanguageInterpreterComponent_div_9_Template, 4, 1, "div", 7);
        i0.ɵɵelement(10, "input", 8);
        i0.ɵɵelementStart(11, "mat-autocomplete", 9, 10);
        i0.ɵɵtemplate(13, SearchLanguageInterpreterComponent_mat_option_13_Template, 2, 2, "mat-option", 11);
        i0.ɵɵpipe(14, "async");
        i0.ɵɵtemplate(15, SearchLanguageInterpreterComponent_mat_option_15_Template, 2, 0, "mat-option", 12);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(16, "div", 13)(17, "div", 14)(18, "input", 15);
        i0.ɵɵlistener("change", function SearchLanguageInterpreterComponent_Template_input_change_18_listener($event) { return ctx.onEnterLanguageManually($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(19, "label", 16);
        i0.ɵɵtext(20);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(21, SearchLanguageInterpreterComponent_div_21_Template, 7, 8, "div", 17);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(22, "div", 18)(23, "button", 19);
        i0.ɵɵlistener("click", function SearchLanguageInterpreterComponent_Template_button_click_23_listener() { return ctx.onNext(); });
        i0.ɵɵtext(24, "Next");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        const _r2 = i0.ɵɵreference(12);
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(16, _c0, ctx.languageNotSelectedErrorMessage || ctx.languageEnteredInBothFieldsErrorMessage));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("for", ctx.languageSearchTermControlName);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.searchLanguageInterpreterTitle, " ");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.searchLanguageInterpreterHint, " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.languageNotSelectedErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.languageEnteredInBothFieldsErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("formControlName", ctx.languageSearchTermControlName)("matAutocomplete", _r2);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("displayWith", ctx.displayLanguage);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(14, 14, ctx.filteredLanguages$));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.noResults && ctx.searchTerm && ctx.searchTerm.length >= ctx.minSearchCharacters);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", ctx.searchLanguageInterpreterStep.CHECKBOX_LABEL, " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isCheckboxEnabled);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, i3.MatInput, i4.MatAutocomplete, i5.MatOption, i4.MatAutocompleteTrigger, i1.AsyncPipe], styles: [".autocomplete__input--show-all-values[_ngcontent-%COMP%]{padding:5px 34px 5px 5px;cursor:pointer}.autocomplete__dropdown-arrow-down[_ngcontent-%COMP%]{z-index:-1;display:inline-block;position:absolute;right:8px;width:24px;height:24px;top:10px}.autocomplete__menu[_ngcontent-%COMP%]{background-color:#fff;border:2px solid #0b0c0c;border-top:0;color:#0b0c0c;margin:0;max-height:342px;overflow-x:hidden;padding:0;width:100%;width:calc(100% - 4px)}.autocomplete__menu--visible[_ngcontent-%COMP%]{display:block}.autocomplete__menu--hidden[_ngcontent-%COMP%]{display:none}.autocomplete__menu--overlay[_ngcontent-%COMP%]{box-shadow:#00000042 0 2px 6px;left:0;position:absolute;top:100%;z-index:100}.autocomplete__menu--inline[_ngcontent-%COMP%]{position:relative}.autocomplete__option[_ngcontent-%COMP%]{border-bottom:solid #b1b4b6;border-width:1px 0;cursor:pointer;display:block;position:relative}.autocomplete__option[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{pointer-events:none}.autocomplete__option[_ngcontent-%COMP%]:first-of-type{border-top-width:0}.autocomplete__option[_ngcontent-%COMP%]:last-of-type{border-bottom-width:0}.autocomplete__option--odd[_ngcontent-%COMP%]{background-color:#fafafa}.autocomplete__option--focused[_ngcontent-%COMP%], .autocomplete__option[_ngcontent-%COMP%]:hover{background-color:#1d70b8;border-color:#1d70b8;color:#fff;outline:0}.autocomplete__option--no-results[_ngcontent-%COMP%]{background-color:#fafafa;color:#646b6f;cursor:not-allowed}.autocomplete__hint[_ngcontent-%COMP%], .autocomplete__input[_ngcontent-%COMP%], .autocomplete__option[_ngcontent-%COMP%]{font-size:13px;line-height:1.25}.autocomplete__hint[_ngcontent-%COMP%], .autocomplete__option[_ngcontent-%COMP%]{padding:5px}@media (min-width: 641px){.autocomplete__hint[_ngcontent-%COMP%], .autocomplete__input[_ngcontent-%COMP%], .autocomplete__option[_ngcontent-%COMP%]{font-size:13px;line-height:1.31579}}.div-action[_ngcontent-%COMP%]{display:inline-block}.add-location[_ngcontent-%COMP%]{display:inline}.remove-location-button[_ngcontent-%COMP%]{margin:5px}.hide-autocomplete[_ngcontent-%COMP%]{display:none}.auto-complete-container[_ngcontent-%COMP%]{min-width:550px;display:inline-block;margin-right:4px}.autocomplete__input[_ngcontent-%COMP%]{line-height:24px;font-size:19px}.hidden[_ngcontent-%COMP%]{display:none}.search-language__input[_ngcontent-%COMP%]{position:relative;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' width='40' height='40'%3E%3Cpath d='M25.7 24.8L21.9 21c.7-1 1.1-2.2 1.1-3.5 0-3.6-2.9-6.5-6.5-6.5S10 13.9 10 17.5s2.9 6.5 6.5 6.5c1.6 0 3-.6 4.1-1.5l3.7 3.7 1.4-1.4zM12 17.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5z' fill='%23505a5f'%3E%3C/path%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:center left -2px;background-size:40px 40px;padding-left:35px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchLanguageInterpreterComponent, [{
        type: Component,
        args: [{ selector: 'ccd-search-language-interpreter', template: "<div class=\"form-group\" [formGroup]=\"formGroup\">\n  <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': languageNotSelectedErrorMessage || languageEnteredInBothFieldsErrorMessage}\">\n    <h1 class=\"govuk-label-wrapper\"><label class=\"govuk-label govuk-label--l\" [for]=\"languageSearchTermControlName\">\n        {{searchLanguageInterpreterTitle}}\n      </label>\n    </h1>\n    <div id=\"language-search-box-hint\" class=\"govuk-hint\">\n      {{searchLanguageInterpreterHint}}\n    </div>\n    <div class=\"auto-complete-container\">\n      <div id=\"language-not-selected-error-message\" class=\"govuk-error-message\"\n        *ngIf=\"languageNotSelectedErrorMessage\">\n        <span class=\"govuk-visually-hidden\">Error:</span> {{languageNotSelectedErrorMessage}}\n      </div>\n      <div id=\"language-entered-in-both-fields-error-message\" class=\"govuk-error-message\"\n        *ngIf=\"languageEnteredInBothFieldsErrorMessage\">\n        <span class=\"govuk-visually-hidden\">Error:</span> {{languageEnteredInBothFieldsErrorMessage}}\n      </div>\n      <input aria-label=\"Language search box\" matInput [formControlName]=\"languageSearchTermControlName\" [matAutocomplete]=\"autoSearchLanguage\"\n        class=\"govuk-input search-language__input\" type=\"text\">\n      <mat-autocomplete class=\"mat-autocomplete-panel-extend\" autoActiveFirstOption #autoSearchLanguage=\"matAutocomplete\"\n        [displayWith]=\"displayLanguage\">\n        <mat-option *ngFor=\"let language of filteredLanguages$ | async\" [value]=\"language\">\n          {{language.value}}\n        </mat-option>\n        <mat-option *ngIf=\"noResults && searchTerm && searchTerm.length >= minSearchCharacters\" disabled>No results found</mat-option>\n      </mat-autocomplete>\n    </div>\n    <div class=\"govuk-checkboxes govuk-checkboxes--small govuk-checkboxes--conditional\" data-module=\"govuk-checkboxes\">\n      <div class=\"govuk-radios__item\">\n        <input class=\"govuk-checkboxes__input\" id=\"enter-language-manually\" name=\"enter-language-manually\" type=\"checkbox\"\n          (change)=\"onEnterLanguageManually($event)\">\n        <label class=\"govuk-label govuk-checkboxes__label\" for=\"enter-language-manually\">\n          {{searchLanguageInterpreterStep.CHECKBOX_LABEL}}\n        </label>\n      </div>\n      <div class=\"govuk-radios__conditional\" *ngIf=\"isCheckboxEnabled\">\n        <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': languageNotEnteredErrorMessage || languageCharLimitErrorMessage }\">\n          <label class=\"govuk-label\" for=\"manual-language-entry\">{{searchLanguageInterpreterStep.INPUT_LABEL}}</label>\n          <div id=\"language-not-entered-error-message\" class=\"govuk-error-message\"\n            *ngIf=\"languageNotEnteredErrorMessage\">\n            <span class=\"govuk-visually-hidden\">Error:</span> {{languageNotEnteredErrorMessage}}\n          </div>\n          <div id=\"language-char-limit-error-message\" class=\"govuk-error-message\"\n            *ngIf=\"languageCharLimitErrorMessage\">\n            <span class=\"govuk-visually-hidden\">Error:</span> {{languageCharLimitErrorMessage}}\n          </div>\n          <input class=\"govuk-input govuk-input--width-20\" id=\"manual-language-entry\" [name]=\"manualLanguageEntryControlName\" type=\"text\"\n            [formControlName]=\"manualLanguageEntryControlName\">\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"govuk-button-group\">\n    <button class=\"button button-primary\" type=\"button\" (click)=\"onNext()\">Next</button>\n  </div>\n</div>\n", styles: [".autocomplete__input--show-all-values{padding:5px 34px 5px 5px;cursor:pointer}.autocomplete__dropdown-arrow-down{z-index:-1;display:inline-block;position:absolute;right:8px;width:24px;height:24px;top:10px}.autocomplete__menu{background-color:#fff;border:2px solid #0b0c0c;border-top:0;color:#0b0c0c;margin:0;max-height:342px;overflow-x:hidden;padding:0;width:100%;width:calc(100% - 4px)}.autocomplete__menu--visible{display:block}.autocomplete__menu--hidden{display:none}.autocomplete__menu--overlay{box-shadow:#00000042 0 2px 6px;left:0;position:absolute;top:100%;z-index:100}.autocomplete__menu--inline{position:relative}.autocomplete__option{border-bottom:solid #b1b4b6;border-width:1px 0;cursor:pointer;display:block;position:relative}.autocomplete__option>*{pointer-events:none}.autocomplete__option:first-of-type{border-top-width:0}.autocomplete__option:last-of-type{border-bottom-width:0}.autocomplete__option--odd{background-color:#fafafa}.autocomplete__option--focused,.autocomplete__option:hover{background-color:#1d70b8;border-color:#1d70b8;color:#fff;outline:0}.autocomplete__option--no-results{background-color:#fafafa;color:#646b6f;cursor:not-allowed}.autocomplete__hint,.autocomplete__input,.autocomplete__option{font-size:13px;line-height:1.25}.autocomplete__hint,.autocomplete__option{padding:5px}@media (min-width: 641px){.autocomplete__hint,.autocomplete__input,.autocomplete__option{font-size:13px;line-height:1.31579}}.div-action{display:inline-block}.add-location{display:inline}.remove-location-button{margin:5px}.hide-autocomplete{display:none}.auto-complete-container{min-width:550px;display:inline-block;margin-right:4px}.autocomplete__input{line-height:24px;font-size:19px}.hidden{display:none}.search-language__input{position:relative;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' width='40' height='40'%3E%3Cpath d='M25.7 24.8L21.9 21c.7-1 1.1-2.2 1.1-3.5 0-3.6-2.9-6.5-6.5-6.5S10 13.9 10 17.5s2.9 6.5 6.5 6.5c1.6 0 3-.6 4.1-1.5l3.7 3.7 1.4-1.4zM12 17.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5z' fill='%23505a5f'%3E%3C/path%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:center left -2px;background-size:40px 40px;padding-left:35px}\n"] }]
    }], null, { formGroup: [{
            type: Input
        }], languages: [{
            type: Input
        }], flagCode: [{
            type: Input
        }], caseFlagStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWxhbmd1YWdlLWludGVycHJldGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmxhZy9jb21wb25lbnRzL3NlYXJjaC1sYW5ndWFnZS1pbnRlcnByZXRlci9zZWFyY2gtbGFuZ3VhZ2UtaW50ZXJwcmV0ZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvc2VhcmNoLWxhbmd1YWdlLWludGVycHJldGVyL3NlYXJjaC1sYW5ndWFnZS1pbnRlcnByZXRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzFDLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsdUJBQXVCLEVBQ3ZCLHFDQUFxQyxFQUNyQyw2QkFBNkIsRUFDOUIsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7O0lDRGYsK0JBQzBDLGVBQUE7SUFDSixzQkFBTTtJQUFBLGlCQUFPO0lBQUMsWUFDcEQ7SUFBQSxpQkFBTTs7O0lBRDhDLGVBQ3BEO0lBRG9ELHVFQUNwRDs7O0lBQ0EsK0JBQ2tELGVBQUE7SUFDWixzQkFBTTtJQUFBLGlCQUFPO0lBQUMsWUFDcEQ7SUFBQSxp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Q2tDO1FBQ2hDLG9HQUVhOztRQUNiLG9HQUE4SDtRQUNoSSxpQkFBbUIsRUFBQTtRQUVyQixnQ0FBbUgsZUFBQSxpQkFBQTtRQUc3Ryx1SEFBVSxtQ0FBK0IsSUFBQztRQUQ1QyxpQkFDNkM7UUFDN0Msa0NBQWlGO1FBQy9FLGFBQ0Y7UUFBQSxpQkFBUSxFQUFBO1FBRVYsc0ZBY007UUFDUixpQkFBTSxFQUFBO1FBRVIsZ0NBQWdDLGtCQUFBO1FBQ3NCLGdIQUFTLFlBQVEsSUFBQztRQUFDLHFCQUFJO1FBQUEsaUJBQVMsRUFBQSxFQUFBOzs7UUF0RGhFLHlDQUF1QjtRQUNmLGVBQTRHO1FBQTVHLHlJQUE0RztRQUM5RCxlQUFxQztRQUFyQyx1REFBcUM7UUFDM0csZUFDRjtRQURFLG1FQUNGO1FBR0EsZUFDRjtRQURFLGtFQUNGO1FBR0ssZUFBcUM7UUFBckMsMERBQXFDO1FBSXJDLGVBQTZDO1FBQTdDLGtFQUE2QztRQUdDLGVBQWlEO1FBQWpELG1FQUFpRCx3QkFBQTtRQUdoRyxlQUErQjtRQUEvQixpREFBK0I7UUFDRSxlQUE2QjtRQUE3Qix3RUFBNkI7UUFHakQsZUFBeUU7UUFBekUsMEdBQXlFO1FBUXBGLGVBQ0Y7UUFERSxpRkFDRjtRQUVzQyxlQUF1QjtRQUF2Qiw0Q0FBdUI7O3VGRGxCeEQsa0NBQWtDO2NBTDlDLFNBQVM7MkJBQ0UsaUNBQWlDO2dCQU9wQyxTQUFTO2tCQURmLEtBQUs7WUFJQyxTQUFTO2tCQURmLEtBQUs7WUFJQyxRQUFRO2tCQURkLEtBQUs7WUFJQyxvQkFBb0I7a0JBRDFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IENhc2VGbGFnU3RhdGUsIExhbmd1YWdlIH0gZnJvbSAnLi4vLi4vZG9tYWluJztcbmltcG9ydCB7XG4gIENhc2VGbGFnRmllbGRTdGF0ZSxcbiAgQ2FzZUZsYWdXaXphcmRTdGVwVGl0bGUsXG4gIFNlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJFcnJvck1lc3NhZ2UsXG4gIFNlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJTdGVwXG59IGZyb20gJy4uLy4uL2VudW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXNlYXJjaC1sYW5ndWFnZS1pbnRlcnByZXRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtbGFuZ3VhZ2UtaW50ZXJwcmV0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtbGFuZ3VhZ2UtaW50ZXJwcmV0ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hMYW5ndWFnZUludGVycHJldGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBsYW5ndWFnZXM6IExhbmd1YWdlW107XG5cbiAgQElucHV0KClcbiAgcHVibGljIGZsYWdDb2RlOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjYXNlRmxhZ1N0YXRlRW1pdHRlcjogRXZlbnRFbWl0dGVyPENhc2VGbGFnU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYXNlRmxhZ1N0YXRlPigpO1xuXG4gIHB1YmxpYyByZWFkb25seSBtaW5TZWFyY2hDaGFyYWN0ZXJzID0gMztcbiAgcHVibGljIHJlYWRvbmx5IGxhbmd1YWdlU2VhcmNoVGVybUNvbnRyb2xOYW1lID0gJ2xhbmd1YWdlU2VhcmNoVGVybSc7XG4gIHB1YmxpYyByZWFkb25seSBtYW51YWxMYW5ndWFnZUVudHJ5Q29udHJvbE5hbWUgPSAnbWFudWFsTGFuZ3VhZ2VFbnRyeSc7XG4gIHB1YmxpYyBmaWx0ZXJlZExhbmd1YWdlcyQ6IE9ic2VydmFibGU8TGFuZ3VhZ2VbXT47XG4gIHB1YmxpYyBzZWFyY2hUZXJtID0gJyc7XG4gIHB1YmxpYyBpc0NoZWNrYm94RW5hYmxlZCA9IGZhbHNlO1xuICBwdWJsaWMgc2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlclRpdGxlOiBDYXNlRmxhZ1dpemFyZFN0ZXBUaXRsZTtcbiAgcHVibGljIHNlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJIaW50OiBTZWFyY2hMYW5ndWFnZUludGVycHJldGVyU3RlcDtcbiAgcHVibGljIGVycm9yTWVzc2FnZXM6IEVycm9yTWVzc2FnZVtdID0gW107XG4gIHB1YmxpYyBsYW5ndWFnZU5vdFNlbGVjdGVkRXJyb3JNZXNzYWdlID0gJyc7XG4gIHB1YmxpYyBsYW5ndWFnZU5vdEVudGVyZWRFcnJvck1lc3NhZ2UgPSAnJztcbiAgcHVibGljIGxhbmd1YWdlQ2hhckxpbWl0RXJyb3JNZXNzYWdlID0gJyc7XG4gIHB1YmxpYyBsYW5ndWFnZUVudGVyZWRJbkJvdGhGaWVsZHNFcnJvck1lc3NhZ2UgPSAnJztcbiAgcHVibGljIG5vUmVzdWx0cyA9IGZhbHNlO1xuICBwcml2YXRlIHJlYWRvbmx5IGxhbmd1YWdlTWF4Q2hhckxpbWl0ID0gODA7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2lnbkxhbmd1YWdlRmxhZ0NvZGUgPSAnUkEwMDQyJztcblxuICBwdWJsaWMgZ2V0IHNlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJTdGVwKCk6IHR5cGVvZiBTZWFyY2hMYW5ndWFnZUludGVycHJldGVyU3RlcCB7XG4gICAgcmV0dXJuIFNlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJTdGVwO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlclRpdGxlID0gdGhpcy5mbGFnQ29kZSA9PT0gdGhpcy5zaWduTGFuZ3VhZ2VGbGFnQ29kZVxuICAgICAgPyBDYXNlRmxhZ1dpemFyZFN0ZXBUaXRsZS5TRUFSQ0hfU0lHTl9MQU5HVUFHRV9JTlRFUlBSRVRFUlxuICAgICAgOiBDYXNlRmxhZ1dpemFyZFN0ZXBUaXRsZS5TRUFSQ0hfTEFOR1VBR0VfSU5URVJQUkVURVI7XG4gICAgdGhpcy5zZWFyY2hMYW5ndWFnZUludGVycHJldGVySGludCA9IHRoaXMuZmxhZ0NvZGUgPT09IHRoaXMuc2lnbkxhbmd1YWdlRmxhZ0NvZGVcbiAgICAgID8gU2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlclN0ZXAuU0lHTl9ISU5UX1RFWFRcbiAgICAgIDogU2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlclN0ZXAuSElOVF9URVhUO1xuICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5sYW5ndWFnZVNlYXJjaFRlcm1Db250cm9sTmFtZSwgbmV3IEZvcm1Db250cm9sKCkpO1xuICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2wodGhpcy5tYW51YWxMYW5ndWFnZUVudHJ5Q29udHJvbE5hbWUsIG5ldyBGb3JtQ29udHJvbCgpKTtcbiAgICB0aGlzLmZpbHRlcmVkTGFuZ3VhZ2VzJCA9IHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmxhbmd1YWdlU2VhcmNoVGVybUNvbnRyb2xOYW1lKS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgIC8vIE5lZWQgdG8gY2hlY2sgdHlwZSBvZiBpbnB1dCBiZWNhdXNlIGl0IGNoYW5nZXMgdG8gb2JqZWN0IChpLmUuIExhbmd1YWdlKSB3aGVuIGEgdmFsdWUgaXMgc2VsZWN0ZWQgZnJvbSB0aGVcbiAgICAgIC8vIGF1dG9jb21wbGV0ZSBwYW5lbCwgaW5zdGVhZCBvZiBzdHJpbmcgd2hlbiBhIHZhbHVlIGlzIGJlaW5nIHR5cGVkIGluXG4gICAgICBtYXAoaW5wdXQgPT4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyA/IGlucHV0IDogaW5wdXQudmFsdWUpLFxuICAgICAgbWFwKHNlYXJjaFRlcm0gPT4ge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnJlbnQgc2VhcmNoIHRlcm1cbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gc2VhcmNoVGVybTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTGFuZ3VhZ2VzKHNlYXJjaFRlcm0pO1xuICAgICAgfSksXG4gICAgICB0YXAobGFuZ3VhZ2VzID0+IHRoaXMubm9SZXN1bHRzID0gbGFuZ3VhZ2VzLmxlbmd0aCA9PT0gMClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG9uTmV4dCgpOiB2b2lkIHtcbiAgICAvLyBWYWxpZGF0ZSBsYW5ndWFnZSBpbnRlcnByZXRlciBlbnRyeVxuICAgIHRoaXMudmFsaWRhdGVMYW5ndWFnZUVudHJ5KCk7XG4gICAgLy8gUmV0dXJuIGNhc2UgZmxhZyBmaWVsZCBzdGF0ZSBhbmQgZXJyb3IgbWVzc2FnZXMgdG8gdGhlIHBhcmVudFxuICAgIHRoaXMuY2FzZUZsYWdTdGF0ZUVtaXR0ZXIuZW1pdCh7XG4gICAgICBjdXJyZW50Q2FzZUZsYWdGaWVsZFN0YXRlOiBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19MQU5HVUFHRV9JTlRFUlBSRVRFUixcbiAgICAgIGVycm9yTWVzc2FnZXM6IHRoaXMuZXJyb3JNZXNzYWdlc1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uRW50ZXJMYW5ndWFnZU1hbnVhbGx5KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuaXNDaGVja2JveEVuYWJsZWQgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XG5cbiAgICAvLyBJZiB0aGUgY2hlY2tib3ggaXMgZGlzYWJsZWQsIGkuZS4gdW5jaGVja2VkLCB0aGVuIGNsZWFyIHRoZSBtYW51YWwgbGFuZ3VhZ2UgZW50cnkgRm9ybUNvbnRyb2wgb2YgYW55IHZhbHVlIHRvXG4gICAgLy8gcHJldmVudCBpdCBiZWluZyByZXRhaW5lZCBldmVuIHdoZW4gdGhlIGZpZWxkIGl0c2VsZiBpcyBoaWRkZW5cbiAgICBpZiAoIXRoaXMuaXNDaGVja2JveEVuYWJsZWQpIHtcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLm1hbnVhbExhbmd1YWdlRW50cnlDb250cm9sTmFtZSkuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3BsYXlMYW5ndWFnZShsYW5ndWFnZT86IExhbmd1YWdlKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gbGFuZ3VhZ2UgPyBsYW5ndWFnZS52YWx1ZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVMYW5ndWFnZUVudHJ5KCk6IHZvaWQge1xuICAgIHRoaXMubGFuZ3VhZ2VOb3RTZWxlY3RlZEVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy5sYW5ndWFnZU5vdEVudGVyZWRFcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgIHRoaXMubGFuZ3VhZ2VDaGFyTGltaXRFcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgIHRoaXMubGFuZ3VhZ2VFbnRlcmVkSW5Cb3RoRmllbGRzRXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBbXTtcbiAgICAvLyBDaGVja2JveCBub3QgZW5hYmxlZCBtZWFucyB0aGUgdXNlciBoYXMgb3B0ZWQgdG8gc2VhcmNoIGZvciBhbmQgc2VsZWN0IHRoZSBsYW5ndWFnZVxuICAgIGlmICghdGhpcy5pc0NoZWNrYm94RW5hYmxlZCAmJiAhdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMubGFuZ3VhZ2VTZWFyY2hUZXJtQ29udHJvbE5hbWUpLnZhbHVlKSB7XG4gICAgICB0aGlzLmxhbmd1YWdlTm90U2VsZWN0ZWRFcnJvck1lc3NhZ2UgPSBTZWFyY2hMYW5ndWFnZUludGVycHJldGVyRXJyb3JNZXNzYWdlLkxBTkdVQUdFX05PVF9FTlRFUkVEO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzLnB1c2goe1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBTZWFyY2hMYW5ndWFnZUludGVycHJldGVyRXJyb3JNZXNzYWdlLkxBTkdVQUdFX05PVF9FTlRFUkVELFxuICAgICAgICBmaWVsZElkOiB0aGlzLmxhbmd1YWdlU2VhcmNoVGVybUNvbnRyb2xOYW1lXG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2hlY2tib3ggZW5hYmxlZCBtZWFucyB0aGUgdXNlciBoYXMgb3B0ZWQgdG8gZW50ZXIgdGhlIGxhbmd1YWdlIG1hbnVhbGx5XG4gICAgaWYgKHRoaXMuaXNDaGVja2JveEVuYWJsZWQpIHtcbiAgICAgIGlmICghdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMubWFudWFsTGFuZ3VhZ2VFbnRyeUNvbnRyb2xOYW1lKS52YWx1ZSkge1xuICAgICAgICB0aGlzLmxhbmd1YWdlTm90RW50ZXJlZEVycm9yTWVzc2FnZSA9IFNlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJFcnJvck1lc3NhZ2UuTEFOR1VBR0VfTk9UX0VOVEVSRUQ7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFNlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJFcnJvck1lc3NhZ2UuTEFOR1VBR0VfTk9UX0VOVEVSRUQsXG4gICAgICAgICAgZmllbGRJZDogdGhpcy5tYW51YWxMYW5ndWFnZUVudHJ5Q29udHJvbE5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLm1hbnVhbExhbmd1YWdlRW50cnlDb250cm9sTmFtZSkudmFsdWUubGVuZ3RoID4gdGhpcy5sYW5ndWFnZU1heENoYXJMaW1pdCkge1xuICAgICAgICB0aGlzLmxhbmd1YWdlQ2hhckxpbWl0RXJyb3JNZXNzYWdlID0gU2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlckVycm9yTWVzc2FnZS5MQU5HVUFHRV9DSEFSX0xJTUlUX0VYQ0VFREVEO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZWFyY2hMYW5ndWFnZUludGVycHJldGVyRXJyb3JNZXNzYWdlLkxBTkdVQUdFX0NIQVJfTElNSVRfRVhDRUVERUQsXG4gICAgICAgICAgZmllbGRJZDogdGhpcy5tYW51YWxMYW5ndWFnZUVudHJ5Q29udHJvbE5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmxhbmd1YWdlU2VhcmNoVGVybUNvbnRyb2xOYW1lKS52YWx1ZSkge1xuICAgICAgICAvLyBMYW5ndWFnZSBlbnRyeSBpcyBwZXJtaXR0ZWQgaW4gb25seSBvbmUgZmllbGQgYXQgYSB0aW1lXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VFbnRlcmVkSW5Cb3RoRmllbGRzRXJyb3JNZXNzYWdlID0gU2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlckVycm9yTWVzc2FnZS5MQU5HVUFHRV9FTlRFUkVEX0lOX0JPVEhfRklFTERTO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTZWFyY2hMYW5ndWFnZUludGVycHJldGVyRXJyb3JNZXNzYWdlLkxBTkdVQUdFX0VOVEVSRURfSU5fQk9USF9GSUVMRFMsXG4gICAgICAgICAgZmllbGRJZDogdGhpcy5sYW5ndWFnZVNlYXJjaFRlcm1Db250cm9sTmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbHRlckxhbmd1YWdlcyhzZWFyY2hUZXJtOiBzdHJpbmcpOiBMYW5ndWFnZVtdIHtcbiAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPCB0aGlzLm1pblNlYXJjaENoYXJhY3RlcnMpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sYW5ndWFnZXNcbiAgICAgID8gdGhpcy5sYW5ndWFnZXMuZmlsdGVyKGxhbmd1YWdlID0+IGxhbmd1YWdlLnZhbHVlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpLCAwKSlcbiAgICAgIDogW107XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJ7J2Zvcm0tZ3JvdXAtZXJyb3InOiBsYW5ndWFnZU5vdFNlbGVjdGVkRXJyb3JNZXNzYWdlIHx8IGxhbmd1YWdlRW50ZXJlZEluQm90aEZpZWxkc0Vycm9yTWVzc2FnZX1cIj5cbiAgICA8aDEgY2xhc3M9XCJnb3Z1ay1sYWJlbC13cmFwcGVyXCI+PGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstbGFiZWwtLWxcIiBbZm9yXT1cImxhbmd1YWdlU2VhcmNoVGVybUNvbnRyb2xOYW1lXCI+XG4gICAgICAgIHt7c2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlclRpdGxlfX1cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9oMT5cbiAgICA8ZGl2IGlkPVwibGFuZ3VhZ2Utc2VhcmNoLWJveC1oaW50XCIgY2xhc3M9XCJnb3Z1ay1oaW50XCI+XG4gICAgICB7e3NlYXJjaExhbmd1YWdlSW50ZXJwcmV0ZXJIaW50fX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXV0by1jb21wbGV0ZS1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgaWQ9XCJsYW5ndWFnZS1ub3Qtc2VsZWN0ZWQtZXJyb3ItbWVzc2FnZVwiIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICpuZ0lmPVwibGFuZ3VhZ2VOb3RTZWxlY3RlZEVycm9yTWVzc2FnZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPkVycm9yOjwvc3Bhbj4ge3tsYW5ndWFnZU5vdFNlbGVjdGVkRXJyb3JNZXNzYWdlfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBpZD1cImxhbmd1YWdlLWVudGVyZWQtaW4tYm90aC1maWVsZHMtZXJyb3ItbWVzc2FnZVwiIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICpuZ0lmPVwibGFuZ3VhZ2VFbnRlcmVkSW5Cb3RoRmllbGRzRXJyb3JNZXNzYWdlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstdmlzdWFsbHktaGlkZGVuXCI+RXJyb3I6PC9zcGFuPiB7e2xhbmd1YWdlRW50ZXJlZEluQm90aEZpZWxkc0Vycm9yTWVzc2FnZX19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxpbnB1dCBhcmlhLWxhYmVsPVwiTGFuZ3VhZ2Ugc2VhcmNoIGJveFwiIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwibGFuZ3VhZ2VTZWFyY2hUZXJtQ29udHJvbE5hbWVcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9TZWFyY2hMYW5ndWFnZVwiXG4gICAgICAgIGNsYXNzPVwiZ292dWstaW5wdXQgc2VhcmNoLWxhbmd1YWdlX19pbnB1dFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICA8bWF0LWF1dG9jb21wbGV0ZSBjbGFzcz1cIm1hdC1hdXRvY29tcGxldGUtcGFuZWwtZXh0ZW5kXCIgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uICNhdXRvU2VhcmNoTGFuZ3VhZ2U9XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICBbZGlzcGxheVdpdGhdPVwiZGlzcGxheUxhbmd1YWdlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBsYW5ndWFnZSBvZiBmaWx0ZXJlZExhbmd1YWdlcyQgfCBhc3luY1wiIFt2YWx1ZV09XCJsYW5ndWFnZVwiPlxuICAgICAgICAgIHt7bGFuZ3VhZ2UudmFsdWV9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0lmPVwibm9SZXN1bHRzICYmIHNlYXJjaFRlcm0gJiYgc2VhcmNoVGVybS5sZW5ndGggPj0gbWluU2VhcmNoQ2hhcmFjdGVyc1wiIGRpc2FibGVkPk5vIHJlc3VsdHMgZm91bmQ8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXMgZ292dWstY2hlY2tib3hlcy0tc21hbGwgZ292dWstY2hlY2tib3hlcy0tY29uZGl0aW9uYWxcIiBkYXRhLW1vZHVsZT1cImdvdnVrLWNoZWNrYm94ZXNcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1yYWRpb3NfX2l0ZW1cIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstY2hlY2tib3hlc19faW5wdXRcIiBpZD1cImVudGVyLWxhbmd1YWdlLW1hbnVhbGx5XCIgbmFtZT1cImVudGVyLWxhbmd1YWdlLW1hbnVhbGx5XCIgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uRW50ZXJMYW5ndWFnZU1hbnVhbGx5KCRldmVudClcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstY2hlY2tib3hlc19fbGFiZWxcIiBmb3I9XCJlbnRlci1sYW5ndWFnZS1tYW51YWxseVwiPlxuICAgICAgICAgIHt7c2VhcmNoTGFuZ3VhZ2VJbnRlcnByZXRlclN0ZXAuQ0hFQ0tCT1hfTEFCRUx9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstcmFkaW9zX19jb25kaXRpb25hbFwiICpuZ0lmPVwiaXNDaGVja2JveEVuYWJsZWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJ7J2Zvcm0tZ3JvdXAtZXJyb3InOiBsYW5ndWFnZU5vdEVudGVyZWRFcnJvck1lc3NhZ2UgfHwgbGFuZ3VhZ2VDaGFyTGltaXRFcnJvck1lc3NhZ2UgfVwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsXCIgZm9yPVwibWFudWFsLWxhbmd1YWdlLWVudHJ5XCI+e3tzZWFyY2hMYW5ndWFnZUludGVycHJldGVyU3RlcC5JTlBVVF9MQUJFTH19PC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGlkPVwibGFuZ3VhZ2Utbm90LWVudGVyZWQtZXJyb3ItbWVzc2FnZVwiIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICAgICAqbmdJZj1cImxhbmd1YWdlTm90RW50ZXJlZEVycm9yTWVzc2FnZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay12aXN1YWxseS1oaWRkZW5cIj5FcnJvcjo8L3NwYW4+IHt7bGFuZ3VhZ2VOb3RFbnRlcmVkRXJyb3JNZXNzYWdlfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGlkPVwibGFuZ3VhZ2UtY2hhci1saW1pdC1lcnJvci1tZXNzYWdlXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCJcbiAgICAgICAgICAgICpuZ0lmPVwibGFuZ3VhZ2VDaGFyTGltaXRFcnJvck1lc3NhZ2VcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstdmlzdWFsbHktaGlkZGVuXCI+RXJyb3I6PC9zcGFuPiB7e2xhbmd1YWdlQ2hhckxpbWl0RXJyb3JNZXNzYWdlfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1pbnB1dCBnb3Z1ay1pbnB1dC0td2lkdGgtMjBcIiBpZD1cIm1hbnVhbC1sYW5ndWFnZS1lbnRyeVwiIFtuYW1lXT1cIm1hbnVhbExhbmd1YWdlRW50cnlDb250cm9sTmFtZVwiIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwibWFudWFsTGFuZ3VhZ2VFbnRyeUNvbnRyb2xOYW1lXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib25OZXh0KClcIj5OZXh0PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=