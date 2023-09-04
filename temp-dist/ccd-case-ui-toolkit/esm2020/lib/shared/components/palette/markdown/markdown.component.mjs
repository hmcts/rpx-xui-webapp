import { Component, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ngx-md";
import * as i2 from "../../../pipes/case-reference/case-reference.pipe";
export class MarkdownComponent {
    constructor() { }
    ngOnInit() {
        this.content = this.content.replace(/  \n/g, '<br>');
    }
    onMarkdownClick(event) {
        // If we don't have an anchor tag, we don't need to do anything.
        if (event.target instanceof HTMLAnchorElement === false) {
            return;
        }
        return true;
    }
}
MarkdownComponent.ɵfac = function MarkdownComponent_Factory(t) { return new (t || MarkdownComponent)(); };
MarkdownComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MarkdownComponent, selectors: [["ccd-markdown"]], hostBindings: function MarkdownComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function MarkdownComponent_click_HostBindingHandler($event) { return ctx.onMarkdownClick($event); });
    } }, inputs: { content: "content", markdownUseHrefAsRouterLink: "markdownUseHrefAsRouterLink" }, decls: 3, vars: 3, consts: [[1, "markdown", 3, "innerHTML"]], template: function MarkdownComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵelement(1, "markdown", 0);
        i0.ɵɵpipe(2, "ccdCaseReference");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(2, 1, ctx.content), i0.ɵɵsanitizeHtml);
    } }, dependencies: [i1.NgxMdComponent, i2.CaseReferencePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MarkdownComponent, [{
        type: Component,
        args: [{ selector: 'ccd-markdown', template: "<div><markdown class=\"markdown\" [innerHTML]=\"content | ccdCaseReference\"></markdown></div>\n" }]
    }], function () { return []; }, { content: [{
            type: Input
        }], markdownUseHrefAsRouterLink: [{
            type: Input
        }], onMarkdownClick: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbWFya2Rvd24vbWFya2Rvd24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbWFya2Rvd24vbWFya2Rvd24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7QUFNdkUsTUFBTSxPQUFPLGlCQUFpQjtJQU01QixnQkFBZSxDQUFDO0lBRVQsUUFBUTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFHTSxlQUFlLENBQUMsS0FBaUI7UUFDdEMsZ0VBQWdFO1FBQ2hFLElBQUksS0FBSyxDQUFDLE1BQU0sWUFBWSxpQkFBaUIsS0FBSyxLQUFLLEVBQUU7WUFDdkQsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztrRkFuQlUsaUJBQWlCO29FQUFqQixpQkFBaUI7b0dBQWpCLDJCQUF1Qjs7UUNOcEMsMkJBQUs7UUFBQSw4QkFBK0U7O1FBQUEsaUJBQU07O1FBQTFELGVBQXdDO1FBQXhDLGdGQUF3Qzs7dUZETTNELGlCQUFpQjtjQUo3QixTQUFTOzJCQUNFLGNBQWM7c0NBS2pCLE9BQU87a0JBRGIsS0FBSztZQUdDLDJCQUEyQjtrQkFEakMsS0FBSztZQVVDLGVBQWU7a0JBRHJCLFlBQVk7bUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLW1hcmtkb3duJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hcmtkb3duLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcHVibGljIGNvbnRlbnQ6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIG1hcmtkb3duVXNlSHJlZkFzUm91dGVyTGluayE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQucmVwbGFjZSgvICBcXG4vZywgJzxicj4nKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uTWFya2Rvd25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYW4gYW5jaG9yIHRhZywgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZy5cbiAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCI8ZGl2PjxtYXJrZG93biBjbGFzcz1cIm1hcmtkb3duXCIgW2lubmVySFRNTF09XCJjb250ZW50IHwgY2NkQ2FzZVJlZmVyZW5jZVwiPjwvbWFya2Rvd24+PC9kaXY+XG4iXX0=