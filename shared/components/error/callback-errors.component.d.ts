import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CallbackErrorsContext } from './domain/error-context';
import { HttpError } from '../../domain/http';
export declare class CallbackErrorsComponent implements OnInit, OnDestroy {
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
    ngOnDestroy(): void;
    private buildCallbackErrorsContext;
    hasErrors(): boolean;
    hasWarnings(): boolean;
    private hasInvalidData;
}
