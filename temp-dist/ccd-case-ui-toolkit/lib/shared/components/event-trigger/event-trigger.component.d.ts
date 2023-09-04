import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { CaseViewTrigger } from '../../domain/case-view/case-view-trigger.model';
import { OrderService } from '../../services/order/order.service';
import * as i0 from "@angular/core";
export declare class EventTriggerComponent implements OnChanges {
    private readonly fb;
    private readonly orderService;
    triggers: CaseViewTrigger[];
    triggerText: string;
    isDisabled: boolean;
    onTriggerSubmit: EventEmitter<CaseViewTrigger>;
    onTriggerChange: EventEmitter<any>;
    triggerForm: UntypedFormGroup;
    constructor(fb: FormBuilder, orderService: OrderService);
    ngOnChanges(changes?: SimpleChanges): void;
    isButtonDisabled(): boolean;
    triggerSubmit(): void;
    triggerChange(): void;
    private getDefault;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventTriggerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventTriggerComponent, "ccd-event-trigger", never, { "triggers": "triggers"; "triggerText": "triggerText"; "isDisabled": "isDisabled"; }, { "onTriggerSubmit": "onTriggerSubmit"; "onTriggerChange": "onTriggerChange"; }, never, never, false, never>;
}
//# sourceMappingURL=event-trigger.component.d.ts.map