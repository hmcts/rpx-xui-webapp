import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class keyValuePipe {
    constructor() { }
    transform(input) {
        let keys = [];
        for (let key in input) {
            if (input.hasOwnProperty(key)) {
                keys.push({ key: key, value: input[key] });
            }
        }
        return keys;
    }
    static ɵfac = function keyValuePipe_Factory(t) { return new (t || keyValuePipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "keyValue", type: keyValuePipe, pure: true });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(keyValuePipe, [{
        type: Pipe,
        args: [{
                name: 'keyValue'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXZhbHVlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wYXltZW50LWxpYi9zcmMvbGliL3BpcGVzL2tleS12YWx1ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUlwRCxNQUFNLE9BQU8sWUFBWTtJQUN2QixnQkFBZSxDQUFDO0lBQ2hCLFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3JCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDM0M7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztzRUFWVSxZQUFZOzJFQUFaLFlBQVk7O3VGQUFaLFlBQVk7Y0FIeEIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxVQUFVO2FBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQFBpcGUoe1xuICBuYW1lOiAna2V5VmFsdWUnXG59KVxuZXhwb3J0IGNsYXNzIGtleVZhbHVlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIHRyYW5zZm9ybShpbnB1dDogYW55KTogYW55IHtcbiAgICBsZXQga2V5cyA9IFtdO1xuICAgIGZvciAobGV0IGtleSBpbiBpbnB1dCkge1xuICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAga2V5cy5wdXNoKHsga2V5OiBrZXksIHZhbHVlOiBpbnB1dFtrZXldfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xuICB9XG59XG4iXX0=