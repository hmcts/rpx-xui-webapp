import { Injectable, RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
/** Keeps track of initially hidden fields that toggle to show on the page (parent page).
 *  Used to decide whether to redisplay the grey bar when returning to the page during
 *  navigation between pages.
 */
export class GreyBarService {
    constructor(rendererFactory) {
        this.fieldsToggledToShow = [];
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    showGreyBar(field, el) {
        if (!field.isCollection()) {
            this.addGreyBar(el);
        }
    }
    removeGreyBar(el) {
        const divSelector = el.nativeElement.querySelector('div');
        if (divSelector) {
            this.renderer.removeClass(divSelector, 'show-condition-grey-bar');
        }
    }
    addToggledToShow(fieldId) {
        this.fieldsToggledToShow.push(fieldId);
    }
    removeToggledToShow(fieldId) {
        this.fieldsToggledToShow = this.fieldsToggledToShow.filter(id => id !== fieldId);
    }
    wasToggledToShow(fieldId) {
        return this.fieldsToggledToShow.find(id => id === fieldId) !== undefined;
    }
    reset() {
        this.fieldsToggledToShow = [];
    }
    addGreyBar(el) {
        const divSelector = el.nativeElement.querySelector('div');
        if (divSelector) {
            this.renderer.addClass(divSelector, 'show-condition-grey-bar');
        }
    }
}
GreyBarService.ɵfac = function GreyBarService_Factory(t) { return new (t || GreyBarService)(i0.ɵɵinject(i0.RendererFactory2)); };
GreyBarService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: GreyBarService, factory: GreyBarService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GreyBarService, [{
        type: Injectable
    }], function () { return [{ type: i0.RendererFactory2 }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JleS1iYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZGlyZWN0aXZlcy9jb25kaXRpb25hbC1zaG93L3NlcnZpY2VzL2dyZXktYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLFVBQVUsRUFBYSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHcEY7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGNBQWM7SUFLekIsWUFBWSxlQUFpQztRQUhyQyx3QkFBbUIsR0FBYSxFQUFFLENBQUM7UUFJdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQWdCLEVBQUUsRUFBYztRQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRU0sYUFBYSxDQUFDLEVBQWM7UUFDakMsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUseUJBQXlCLENBQUMsQ0FBQztTQUNuRTtJQUNILENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxPQUFlO1FBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLG1CQUFtQixDQUFDLE9BQWU7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVNLGdCQUFnQixDQUFDLE9BQWU7UUFDckMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVPLFVBQVUsQ0FBQyxFQUFjO1FBQy9CLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLHlCQUF5QixDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDOzs0RUEzQ1UsY0FBYztvRUFBZCxjQUFjLFdBQWQsY0FBYzt1RkFBZCxjQUFjO2NBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuXG4vKiogS2VlcHMgdHJhY2sgb2YgaW5pdGlhbGx5IGhpZGRlbiBmaWVsZHMgdGhhdCB0b2dnbGUgdG8gc2hvdyBvbiB0aGUgcGFnZSAocGFyZW50IHBhZ2UpLlxuICogIFVzZWQgdG8gZGVjaWRlIHdoZXRoZXIgdG8gcmVkaXNwbGF5IHRoZSBncmV5IGJhciB3aGVuIHJldHVybmluZyB0byB0aGUgcGFnZSBkdXJpbmdcbiAqICBuYXZpZ2F0aW9uIGJldHdlZW4gcGFnZXMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcmV5QmFyU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBmaWVsZHNUb2dnbGVkVG9TaG93OiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuICB9XG5cbiAgcHVibGljIHNob3dHcmV5QmFyKGZpZWxkOiBDYXNlRmllbGQsIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgaWYgKCFmaWVsZC5pc0NvbGxlY3Rpb24oKSkge1xuICAgICAgdGhpcy5hZGRHcmV5QmFyKGVsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlR3JleUJhcihlbDogRWxlbWVudFJlZikge1xuICAgIGNvbnN0IGRpdlNlbGVjdG9yID0gZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcbiAgICBpZiAoZGl2U2VsZWN0b3IpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZGl2U2VsZWN0b3IsICdzaG93LWNvbmRpdGlvbi1ncmV5LWJhcicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRUb2dnbGVkVG9TaG93KGZpZWxkSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZmllbGRzVG9nZ2xlZFRvU2hvdy5wdXNoKGZpZWxkSWQpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVRvZ2dsZWRUb1Nob3coZmllbGRJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5maWVsZHNUb2dnbGVkVG9TaG93ID0gdGhpcy5maWVsZHNUb2dnbGVkVG9TaG93LmZpbHRlcihpZCA9PiBpZCAhPT0gZmllbGRJZCk7XG4gIH1cblxuICBwdWJsaWMgd2FzVG9nZ2xlZFRvU2hvdyhmaWVsZElkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZHNUb2dnbGVkVG9TaG93LmZpbmQoaWQgPT4gaWQgPT09IGZpZWxkSWQpICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgdGhpcy5maWVsZHNUb2dnbGVkVG9TaG93ID0gW107XG4gIH1cblxuICBwcml2YXRlIGFkZEdyZXlCYXIoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBjb25zdCBkaXZTZWxlY3RvciA9IGVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2Jyk7XG4gICAgaWYgKGRpdlNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdlNlbGVjdG9yLCAnc2hvdy1jb25kaXRpb24tZ3JleS1iYXInKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==