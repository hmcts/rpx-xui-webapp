import { Pipe } from '@angular/core';
import { AbstractAppConfig } from '../../../../app.config';
import * as i0 from "@angular/core";
import * as i1 from "../../../../app.config";
export class DocumentUrlPipe {
    constructor(appConfig) {
        this.appConfig = appConfig;
    }
    transform(value) {
        const remoteHrsPattern = new RegExp(this.appConfig.getRemoteHrsUrl());
        value = value.replace(remoteHrsPattern, this.appConfig.getHrsUrl());
        const remoteDocumentManagementPattern = new RegExp(this.appConfig.getRemoteDocumentManagementUrl());
        return value.replace(remoteDocumentManagementPattern, this.appConfig.getDocumentManagementUrl());
    }
}
DocumentUrlPipe.ɵfac = function DocumentUrlPipe_Factory(t) { return new (t || DocumentUrlPipe)(i0.ɵɵdirectiveInject(i1.AbstractAppConfig, 16)); };
DocumentUrlPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdDocumentUrl", type: DocumentUrlPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DocumentUrlPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdDocumentUrl'
            }]
    }], function () { return [{ type: i1.AbstractAppConfig }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtdXJsLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9kb2N1bWVudC9kb2N1bWVudC11cmwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBSzNELE1BQU0sT0FBTyxlQUFlO0lBRTFCLFlBQTZCLFNBQTRCO1FBQTVCLGNBQVMsR0FBVCxTQUFTLENBQW1CO0lBQUcsQ0FBQztJQUV0RCxTQUFTLENBQUMsS0FBYTtRQUM1QixNQUFNLGdCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUN0RSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSwrQkFBK0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixFQUFFLENBQUMsQ0FBQztRQUNwRyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7SUFDbkcsQ0FBQzs7OEVBVFUsZUFBZTtzRkFBZixlQUFlO3VGQUFmLGVBQWU7Y0FIM0IsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxnQkFBZ0I7YUFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEFwcENvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcC5jb25maWcnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2REb2N1bWVudFVybCdcbn0pXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRVcmxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhcHBDb25maWc6IEFic3RyYWN0QXBwQ29uZmlnKSB7fVxuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgcmVtb3RlSHJzUGF0dGVybiA9IG5ldyBSZWdFeHAodGhpcy5hcHBDb25maWcuZ2V0UmVtb3RlSHJzVXJsKCkpO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZW1vdGVIcnNQYXR0ZXJuLCB0aGlzLmFwcENvbmZpZy5nZXRIcnNVcmwoKSk7XG4gICAgY29uc3QgcmVtb3RlRG9jdW1lbnRNYW5hZ2VtZW50UGF0dGVybiA9IG5ldyBSZWdFeHAodGhpcy5hcHBDb25maWcuZ2V0UmVtb3RlRG9jdW1lbnRNYW5hZ2VtZW50VXJsKCkpO1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlbW90ZURvY3VtZW50TWFuYWdlbWVudFBhdHRlcm4sIHRoaXMuYXBwQ29uZmlnLmdldERvY3VtZW50TWFuYWdlbWVudFVybCgpKTtcbiAgfVxufVxuIl19