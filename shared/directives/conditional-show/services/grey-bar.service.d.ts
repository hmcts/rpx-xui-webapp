import { ElementRef, RendererFactory2 } from '@angular/core';
import { CaseField } from '../../../domain';
/** Keeps track of initially hidden fields that toggle to show on the page (parent page).
 *  Used to decide whether to redisplay the grey bar when returning to the page during
 *  navigation between pages.
 */
export declare class GreyBarService {
    private fieldsToggledToShow;
    private renderer;
    constructor(rendererFactory: RendererFactory2);
    showGreyBar(field: CaseField, el: ElementRef): void;
    removeGreyBar(el: ElementRef): void;
    addToggledToShow(fieldId: string): void;
    removeToggledToShow(fieldId: string): void;
    wasToggledToShow(fieldId: string): boolean;
    reset(): void;
    private addGreyBar;
}
