import { EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpError } from '../../domain/http';
import { CallbackErrorsContext } from './domain/error-context';
import * as i0 from "@angular/core";
export declare class CallbackErrorsComponent implements OnInit {
    static readonly TRIGGER_TEXT_SUBMIT = "Submit";
    static readonly TRIGGER_TEXT_START = "Start";
    static readonly TRIGGER_TEXT_GO = "Go";
    static readonly TRIGGER_TEXT_IGNORE = "Ignore Warning and Go";
    triggerTextIgnore: string;
    triggerTextContinue: string;
    callbackErrorsSubject: Subject<any>;
    callbackErrorsContext: EventEmitter<CallbackErrorsContext>;
    error: HttpError;
    ngOnInit(): void;
    hasErrors(): boolean;
    hasWarnings(): boolean;
    private buildCallbackErrorsContext;
    private hasInvalidData;
    static ɵfac: i0.ɵɵFactoryDeclaration<CallbackErrorsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CallbackErrorsComponent, "ccd-callback-errors", never, { "triggerTextIgnore": "triggerTextIgnore"; "triggerTextContinue": "triggerTextContinue"; "callbackErrorsSubject": "callbackErrorsSubject"; }, { "callbackErrorsContext": "callbackErrorsContext"; }, never, never, false, never>;
}
//# sourceMappingURL=callback-errors.component.d.ts.map