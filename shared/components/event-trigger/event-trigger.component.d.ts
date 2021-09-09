import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CaseViewTrigger } from '../../domain';
import { OrderService } from '../../services';
export declare class EventTriggerComponent implements OnChanges {
    private fb;
    private orderService;
    triggers: CaseViewTrigger[];
    triggerText: string;
    isDisabled: boolean;
    onTriggerSubmit: EventEmitter<CaseViewTrigger>;
    onTriggerChange: EventEmitter<any>;
    triggerForm: FormGroup;
    constructor(fb: FormBuilder, orderService: OrderService);
    ngOnChanges(changes?: SimpleChanges): void;
    isButtonDisabled(): boolean;
    private getDefault;
    triggerSubmit(): void;
    triggerChange(): void;
}
