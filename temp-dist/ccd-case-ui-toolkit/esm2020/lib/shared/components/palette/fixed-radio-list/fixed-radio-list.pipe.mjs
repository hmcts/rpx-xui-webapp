import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FixedRadioListPipe {
    transform(value, items) {
        const item = items.find(i => i.code === value);
        return item ? item.label : FixedRadioListPipe.EMPTY;
    }
}
FixedRadioListPipe.EMPTY = '';
FixedRadioListPipe.ɵfac = function FixedRadioListPipe_Factory(t) { return new (t || FixedRadioListPipe)(); };
FixedRadioListPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdFixedRadioList", type: FixedRadioListPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FixedRadioListPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdFixedRadioList'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtcmFkaW8tbGlzdC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZml4ZWQtcmFkaW8tbGlzdC9maXhlZC1yYWRpby1saXN0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBTXBELE1BQU0sT0FBTyxrQkFBa0I7SUFJdEIsU0FBUyxDQUFDLEtBQWEsRUFBRSxLQUFzQjtRQUNwRCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO0lBQ3RELENBQUM7O0FBTHVCLHdCQUFLLEdBQUcsRUFBRSxDQUFDO29GQUZ4QixrQkFBa0I7NEZBQWxCLGtCQUFrQjt1RkFBbEIsa0JBQWtCO2NBSDlCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsbUJBQW1CO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRml4ZWRMaXN0SXRlbSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2ZpeGVkLWxpc3QtaXRlbS5tb2RlbCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZEZpeGVkUmFkaW9MaXN0J1xufSlcbmV4cG9ydCBjbGFzcyBGaXhlZFJhZGlvTGlzdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFTVBUWSA9ICcnO1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgaXRlbXM6IEZpeGVkTGlzdEl0ZW1bXSk6IGFueSB7XG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zLmZpbmQoaSA9PiBpLmNvZGUgPT09IHZhbHVlKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ubGFiZWwgOiBGaXhlZFJhZGlvTGlzdFBpcGUuRU1QVFk7XG4gIH1cbn1cbiJdfQ==