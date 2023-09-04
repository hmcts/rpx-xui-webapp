import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class DynamicListPipe {
    transform(value, items) {
        const item = items.find(i => i.code === value);
        return item ? item.label : DynamicListPipe.EMPTY;
    }
}
DynamicListPipe.EMPTY = '';
DynamicListPipe.ɵfac = function DynamicListPipe_Factory(t) { return new (t || DynamicListPipe)(); };
DynamicListPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdDynamicList", type: DynamicListPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DynamicListPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdDynamicList'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1saXN0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9keW5hbWljLWxpc3QvZHluYW1pYy1saXN0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBTXBELE1BQU0sT0FBTyxlQUFlO0lBSW5CLFNBQVMsQ0FBQyxLQUFhLEVBQUUsS0FBc0I7UUFDcEQsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDbkQsQ0FBQzs7QUFMdUIscUJBQUssR0FBRyxFQUFFLENBQUM7OEVBRnhCLGVBQWU7c0ZBQWYsZUFBZTt1RkFBZixlQUFlO2NBSDNCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRml4ZWRMaXN0SXRlbSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2ZpeGVkLWxpc3QtaXRlbS5tb2RlbCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZER5bmFtaWNMaXN0J1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljTGlzdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFTVBUWSA9ICcnO1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgaXRlbXM6IEZpeGVkTGlzdEl0ZW1bXSk6IGFueSB7XG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zLmZpbmQoaSA9PiBpLmNvZGUgPT09IHZhbHVlKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ubGFiZWwgOiBEeW5hbWljTGlzdFBpcGUuRU1QVFk7XG4gIH1cblxufVxuIl19