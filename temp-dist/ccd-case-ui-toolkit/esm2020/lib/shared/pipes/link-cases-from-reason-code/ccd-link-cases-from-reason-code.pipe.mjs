import { Pipe } from '@angular/core';
import { LinkedCasesService } from '../../components/palette/linked-cases/services';
import * as i0 from "@angular/core";
import * as i1 from "../../components/palette/linked-cases/services";
export class LinkCasesFromReasonValuePipe {
    constructor(linkedCasesService) {
        this.linkedCasesService = linkedCasesService;
    }
    transform(linkFromReason) {
        if (linkFromReason?.otherDescription) {
            const reasonCodeMapping = this.linkedCasesService.linkCaseReasons?.find(reason => reason.key === linkFromReason.reasonCode);
            return reasonCodeMapping?.value_en === 'Other'
                ? `${reasonCodeMapping?.value_en} - ${linkFromReason.otherDescription}`
                : reasonCodeMapping?.value_en;
        }
        return this.linkedCasesService.linkCaseReasons?.find(reason => reason.key === linkFromReason.reasonCode)?.value_en;
    }
}
LinkCasesFromReasonValuePipe.ɵfac = function LinkCasesFromReasonValuePipe_Factory(t) { return new (t || LinkCasesFromReasonValuePipe)(i0.ɵɵdirectiveInject(i1.LinkedCasesService, 16)); };
LinkCasesFromReasonValuePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdLinkCasesFromReasonValue", type: LinkCasesFromReasonValuePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LinkCasesFromReasonValuePipe, [{
        type: Pipe,
        args: [{
                name: 'ccdLinkCasesFromReasonValue'
            }]
    }], function () { return [{ type: i1.LinkedCasesService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLWxpbmstY2FzZXMtZnJvbS1yZWFzb24tY29kZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9waXBlcy9saW5rLWNhc2VzLWZyb20tcmVhc29uLWNvZGUvY2NkLWxpbmstY2FzZXMtZnJvbS1yZWFzb24tY29kZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDOzs7QUFLcEYsTUFBTSxPQUFPLDRCQUE0QjtJQUV2QyxZQUE2QixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUFHLENBQUM7SUFFaEUsU0FBUyxDQUFDLGNBQThCO1FBQzdDLElBQUksY0FBYyxFQUFFLGdCQUFnQixFQUFFO1lBQ3BDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1SCxPQUFPLGlCQUFpQixFQUFFLFFBQVEsS0FBSyxPQUFPO2dCQUM1QyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxRQUFRLE1BQU0sY0FBYyxDQUFDLGdCQUFnQixFQUFFO2dCQUN2RSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQztJQUNySCxDQUFDOzt3R0FaVSw0QkFBNEI7Z0hBQTVCLDRCQUE0Qjt1RkFBNUIsNEJBQTRCO2NBSHhDLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsNkJBQTZCO2FBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlua0Zyb21SZWFzb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL2RvbWFpbic7XG5pbXBvcnQgeyBMaW5rZWRDYXNlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL3NlcnZpY2VzJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY2NkTGlua0Nhc2VzRnJvbVJlYXNvblZhbHVlJ1xufSlcbmV4cG9ydCBjbGFzcyBMaW5rQ2FzZXNGcm9tUmVhc29uVmFsdWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsaW5rZWRDYXNlc1NlcnZpY2U6IExpbmtlZENhc2VzU2VydmljZSkge31cblxuICBwdWJsaWMgdHJhbnNmb3JtKGxpbmtGcm9tUmVhc29uOiBMaW5rRnJvbVJlYXNvbik6IHN0cmluZyB7XG4gICAgaWYgKGxpbmtGcm9tUmVhc29uPy5vdGhlckRlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCByZWFzb25Db2RlTWFwcGluZyA9IHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmxpbmtDYXNlUmVhc29ucz8uZmluZChyZWFzb24gPT4gcmVhc29uLmtleSA9PT0gbGlua0Zyb21SZWFzb24ucmVhc29uQ29kZSk7XG4gICAgICByZXR1cm4gcmVhc29uQ29kZU1hcHBpbmc/LnZhbHVlX2VuID09PSAnT3RoZXInXG4gICAgICAgID8gYCR7cmVhc29uQ29kZU1hcHBpbmc/LnZhbHVlX2VufSAtICR7bGlua0Zyb21SZWFzb24ub3RoZXJEZXNjcmlwdGlvbn1gXG4gICAgICAgIDogcmVhc29uQ29kZU1hcHBpbmc/LnZhbHVlX2VuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua0Nhc2VSZWFzb25zPy5maW5kKHJlYXNvbiA9PiByZWFzb24ua2V5ID09PSBsaW5rRnJvbVJlYXNvbi5yZWFzb25Db2RlKT8udmFsdWVfZW47XG4gIH1cbn1cbiJdfQ==