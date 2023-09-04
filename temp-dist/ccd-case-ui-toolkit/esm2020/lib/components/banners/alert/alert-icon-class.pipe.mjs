import { Pipe } from '@angular/core';
import { AlertComponent } from './alert.component';
import * as i0 from "@angular/core";
export class AlertIconClassPipe {
    transform(type) {
        switch (type) {
            case AlertComponent.TYPE_SUCCESS:
                return AlertIconClassPipe.CLASS_SUCCESS;
            case AlertComponent.TYPE_WARNING:
            default:
                return AlertIconClassPipe.CLASS_WARNING;
        }
    }
}
AlertIconClassPipe.CLASS_WARNING = 'icon-alert';
AlertIconClassPipe.CLASS_SUCCESS = 'icon-tick';
AlertIconClassPipe.ɵfac = function AlertIconClassPipe_Factory(t) { return new (t || AlertIconClassPipe)(); };
AlertIconClassPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "cutAlertIconClass", type: AlertIconClassPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertIconClassPipe, [{
        type: Pipe,
        args: [{
                name: 'cutAlertIconClass'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtaWNvbi1jbGFzcy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYmFubmVycy9hbGVydC9hbGVydC1pY29uLWNsYXNzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUtuRCxNQUFNLE9BQU8sa0JBQWtCO0lBSXRCLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxjQUFjLENBQUMsWUFBWTtnQkFDOUIsT0FBTyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7WUFDMUMsS0FBSyxjQUFjLENBQUMsWUFBWSxDQUFDO1lBQ2pDO2dCQUNFLE9BQU8sa0JBQWtCLENBQUMsYUFBYSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7QUFYdUIsZ0NBQWEsR0FBRyxZQUFZLENBQUM7QUFDN0IsZ0NBQWEsR0FBRyxXQUFXLENBQUM7b0ZBRnpDLGtCQUFrQjs0RkFBbEIsa0JBQWtCO3VGQUFsQixrQkFBa0I7Y0FIOUIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxtQkFBbUI7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGVydENvbXBvbmVudCB9IGZyb20gJy4vYWxlcnQuY29tcG9uZW50JztcblxuQFBpcGUoe1xuICBuYW1lOiAnY3V0QWxlcnRJY29uQ2xhc3MnXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0SWNvbkNsYXNzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTEFTU19XQVJOSU5HID0gJ2ljb24tYWxlcnQnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTEFTU19TVUNDRVNTID0gJ2ljb24tdGljayc7XG5cbiAgcHVibGljIHRyYW5zZm9ybSh0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBBbGVydENvbXBvbmVudC5UWVBFX1NVQ0NFU1M6XG4gICAgICAgIHJldHVybiBBbGVydEljb25DbGFzc1BpcGUuQ0xBU1NfU1VDQ0VTUztcbiAgICAgIGNhc2UgQWxlcnRDb21wb25lbnQuVFlQRV9XQVJOSU5HOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIEFsZXJ0SWNvbkNsYXNzUGlwZS5DTEFTU19XQVJOSU5HO1xuICAgIH1cbiAgfVxufVxuIl19