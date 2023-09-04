import { ElementRef, RendererFactory2 } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
/** Keeps track of initially hidden fields that toggle to show on the page (parent page).
 *  Used to decide whether to redisplay the grey bar when returning to the page during
 *  navigation between pages.
 */
export declare class GreyBarService {
    private fieldsToggledToShow;
    private readonly renderer;
    constructor(rendererFactory: RendererFactory2);
    showGreyBar(field: CaseField, el: ElementRef): void;
    removeGreyBar(el: ElementRef): void;
    addToggledToShow(fieldId: string): void;
    removeToggledToShow(fieldId: string): void;
    wasToggledToShow(fieldId: string): boolean;
    reset(): void;
    private addGreyBar;
    static ɵfac: i0.ɵɵFactoryDeclaration<GreyBarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GreyBarService>;
}
//# sourceMappingURL=grey-bar.service.d.ts.map