import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class YesNoService {
    format(value) {
        if (this.isYes(value)) {
            return YesNoService.YES;
        }
        else if (this.isNo(value)) {
            return YesNoService.NO;
        }
        return YesNoService.EMPTY;
    }
    isYes(value) {
        // tslint:disable-next-line:switch-default
        switch (typeof (value)) {
            case 'boolean':
                return value;
            case 'string':
                return YesNoService.YES_INPUTS.indexOf(value.toUpperCase()) !== -1;
        }
        return false;
    }
    isNo(value) {
        // tslint:disable-next-line:switch-default
        switch (typeof (value)) {
            case 'boolean':
                return !value;
            case 'string':
                return YesNoService.NO_INPUTS.indexOf(value.toUpperCase()) !== -1;
        }
        return false;
    }
}
YesNoService.YES_INPUTS = [
    'Y',
    'YES'
];
YesNoService.NO_INPUTS = [
    'N',
    'NO'
];
YesNoService.YES = 'Yes';
YesNoService.NO = 'No';
YesNoService.EMPTY = null;
YesNoService.ɵfac = function YesNoService_Factory(t) { return new (t || YesNoService)(); };
YesNoService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: YesNoService, factory: YesNoService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(YesNoService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVzLW5vLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS95ZXMtbm8veWVzLW5vLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHM0MsTUFBTSxPQUFPLFlBQVk7SUFhaEIsTUFBTSxDQUFDLEtBQVU7UUFFdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQztTQUN6QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUM7U0FDeEI7UUFFRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVPLEtBQUssQ0FBQyxLQUFVO1FBQ3RCLDBDQUEwQztRQUMxQyxRQUFRLE9BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxLQUFLLENBQUM7WUFDZixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLElBQUksQ0FBQyxLQUFVO1FBQ3JCLDBDQUEwQztRQUMxQyxRQUFRLE9BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNoQixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyRTtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7QUE3Q3VCLHVCQUFVLEdBQWE7SUFDN0MsR0FBRztJQUNILEtBQUs7Q0FDTixDQUFDO0FBQ3NCLHNCQUFTLEdBQWE7SUFDNUMsR0FBRztJQUNILElBQUk7Q0FDTCxDQUFDO0FBQ3NCLGdCQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ1osZUFBRSxHQUFHLElBQUksQ0FBQztBQUNWLGtCQUFLLEdBQUcsSUFBSSxDQUFDO3dFQVgxQixZQUFZO2tFQUFaLFlBQVksV0FBWixZQUFZO3VGQUFaLFlBQVk7Y0FEeEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFllc05vU2VydmljZSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFlFU19JTlBVVFM6IHN0cmluZ1tdID0gW1xuICAgICdZJyxcbiAgICAnWUVTJ1xuICBdO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBOT19JTlBVVFM6IHN0cmluZ1tdID0gW1xuICAgICdOJyxcbiAgICAnTk8nXG4gIF07XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFlFUyA9ICdZZXMnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBOTyA9ICdObyc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVNUFRZID0gbnVsbDtcblxuICBwdWJsaWMgZm9ybWF0KHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuXG4gICAgaWYgKHRoaXMuaXNZZXModmFsdWUpKSB7XG4gICAgICByZXR1cm4gWWVzTm9TZXJ2aWNlLllFUztcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNObyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBZZXNOb1NlcnZpY2UuTk87XG4gICAgfVxuXG4gICAgcmV0dXJuIFllc05vU2VydmljZS5FTVBUWTtcbiAgfVxuXG4gIHByaXZhdGUgaXNZZXModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzd2l0Y2gtZGVmYXVsdFxuICAgIHN3aXRjaCAodHlwZW9mKHZhbHVlKSkge1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBZZXNOb1NlcnZpY2UuWUVTX0lOUFVUUy5pbmRleE9mKHZhbHVlLnRvVXBwZXJDYXNlKCkpICE9PSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzTm8odmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzd2l0Y2gtZGVmYXVsdFxuICAgIHN3aXRjaCAodHlwZW9mKHZhbHVlKSkge1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhdmFsdWU7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gWWVzTm9TZXJ2aWNlLk5PX0lOUFVUUy5pbmRleE9mKHZhbHVlLnRvVXBwZXJDYXNlKCkpICE9PSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==