import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class DynamicRadioListPipe {
    transform(value, items) {
        /**
         *
         * If value is object with element `value.code`, use code instead.
         */
        if (value && value.value && value.value.code) {
            value = value.value.code;
        }
        const item = items.find(i => i.code === value);
        return item ? item.label : DynamicRadioListPipe.EMPTY;
    }
}
DynamicRadioListPipe.EMPTY = '';
DynamicRadioListPipe.ɵfac = function DynamicRadioListPipe_Factory(t) { return new (t || DynamicRadioListPipe)(); };
DynamicRadioListPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdDynamicRadioList", type: DynamicRadioListPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DynamicRadioListPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdDynamicRadioList'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1yYWRpby1saXN0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9keW5hbWljLXJhZGlvLWxpc3QvZHluYW1pYy1yYWRpby1saXN0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBTXBELE1BQU0sT0FBTyxvQkFBb0I7SUFJeEIsU0FBUyxDQUFDLEtBQVUsRUFBRSxLQUFzQjtRQUNqRDs7O1dBR0c7UUFDSCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzVDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUNELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7SUFDeEQsQ0FBQzs7QUFadUIsMEJBQUssR0FBRyxFQUFFLENBQUM7d0ZBRnhCLG9CQUFvQjtnR0FBcEIsb0JBQW9CO3VGQUFwQixvQkFBb0I7Y0FIaEMsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxxQkFBcUI7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaXhlZExpc3RJdGVtIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vZml4ZWQtbGlzdC1pdGVtLm1vZGVsJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY2NkRHluYW1pY1JhZGlvTGlzdCdcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY1JhZGlvTGlzdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFTVBUWSA9ICcnO1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IGFueSwgaXRlbXM6IEZpeGVkTGlzdEl0ZW1bXSk6IGFueSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZiB2YWx1ZSBpcyBvYmplY3Qgd2l0aCBlbGVtZW50IGB2YWx1ZS5jb2RlYCwgdXNlIGNvZGUgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBpZiAodmFsdWUgJiYgdmFsdWUudmFsdWUgJiYgdmFsdWUudmFsdWUuY29kZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS52YWx1ZS5jb2RlO1xuICAgIH1cbiAgICBjb25zdCBpdGVtID0gaXRlbXMuZmluZChpID0+IGkuY29kZSA9PT0gdmFsdWUpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5sYWJlbCA6IER5bmFtaWNSYWRpb0xpc3RQaXBlLkVNUFRZO1xuICB9XG59XG4iXX0=