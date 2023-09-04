import { Pipe } from '@angular/core';
import { LinkedCasesService } from '../../components/palette/linked-cases/services';
import * as i0 from "@angular/core";
import * as i1 from "../../components/palette/linked-cases/services";
export class LinkCasesReasonValuePipe {
    constructor(linkedCasesService) {
        this.linkedCasesService = linkedCasesService;
    }
    transform(linkReason) {
        if (linkReason?.OtherDescription) {
            const reasonCodeMapping = this.linkedCasesService.linkCaseReasons?.find(reason => reason.key === linkReason.Reason);
            return reasonCodeMapping?.value_en === 'Other'
                ? `${reasonCodeMapping?.value_en} - ${linkReason.OtherDescription}`
                : reasonCodeMapping?.value_en;
        }
        return this.linkedCasesService.linkCaseReasons?.find(reason => reason.key === linkReason.Reason)?.value_en;
    }
}
LinkCasesReasonValuePipe.ɵfac = function LinkCasesReasonValuePipe_Factory(t) { return new (t || LinkCasesReasonValuePipe)(i0.ɵɵdirectiveInject(i1.LinkedCasesService, 16)); };
LinkCasesReasonValuePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdLinkCasesReasonValue", type: LinkCasesReasonValuePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkCasesReasonValuePipe, [{
        type: Pipe,
        args: [{
                name: 'ccdLinkCasesReasonValue'
            }]
    }], function () { return [{ type: i1.LinkedCasesService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLWxpbmstY2FzZXMtcmVhc29uLWNvZGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvcGlwZXMvbGluay1jYXNlcy1yZWFzb24tY29kZS9jY2QtbGluay1jYXNlcy1yZWFzb24tY29kZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDOzs7QUFLcEYsTUFBTSxPQUFPLHdCQUF3QjtJQUVuQyxZQUE2QixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUFHLENBQUM7SUFFaEUsU0FBUyxDQUFDLFVBQXNCO1FBQ3ZDLElBQUksVUFBVSxFQUFFLGdCQUFnQixFQUFFO1lBQ2pDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwSCxPQUFPLGlCQUFpQixFQUFFLFFBQVEsS0FBSyxPQUFPO2dCQUM3QyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxRQUFRLE1BQU0sVUFBVSxDQUFDLGdCQUFnQixFQUFFO2dCQUNuRSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDO1NBQy9CO1FBQ0MsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQztJQUM3RyxDQUFDOztnR0FaVSx3QkFBd0I7d0dBQXhCLHdCQUF3Qjt1RkFBeEIsd0JBQXdCO2NBSHBDLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUseUJBQXlCO2FBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlua1JlYXNvbiB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGlua2VkQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy9zZXJ2aWNlcyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZExpbmtDYXNlc1JlYXNvblZhbHVlJ1xufSlcbmV4cG9ydCBjbGFzcyBMaW5rQ2FzZXNSZWFzb25WYWx1ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxpbmtlZENhc2VzU2VydmljZTogTGlua2VkQ2FzZXNTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyB0cmFuc2Zvcm0obGlua1JlYXNvbjogTGlua1JlYXNvbik6IHN0cmluZyB7XG5cdFx0aWYgKGxpbmtSZWFzb24/Lk90aGVyRGVzY3JpcHRpb24pIHtcblx0XHRcdGNvbnN0IHJlYXNvbkNvZGVNYXBwaW5nID0gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua0Nhc2VSZWFzb25zPy5maW5kKHJlYXNvbiA9PiByZWFzb24ua2V5ID09PSBsaW5rUmVhc29uLlJlYXNvbik7XG5cdFx0XHRyZXR1cm4gcmVhc29uQ29kZU1hcHBpbmc/LnZhbHVlX2VuID09PSAnT3RoZXInXG5cdFx0XHRcdD8gYCR7cmVhc29uQ29kZU1hcHBpbmc/LnZhbHVlX2VufSAtICR7bGlua1JlYXNvbi5PdGhlckRlc2NyaXB0aW9ufWBcblx0XHRcdFx0OiByZWFzb25Db2RlTWFwcGluZz8udmFsdWVfZW47XG5cdFx0fVxuICAgIHJldHVybiB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5saW5rQ2FzZVJlYXNvbnM/LmZpbmQocmVhc29uID0+IHJlYXNvbi5rZXkgPT09IGxpbmtSZWFzb24uUmVhc29uKT8udmFsdWVfZW47XG4gIH1cbn1cbiJdfQ==