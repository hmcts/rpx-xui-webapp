import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class PhaseComponent {
}
PhaseComponent.ɵfac = function PhaseComponent_Factory(t) { return new (t || PhaseComponent)(); };
PhaseComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PhaseComponent, selectors: [["cut-phase-bar"]], inputs: { phaseLabel: "phaseLabel", phaseLink: "phaseLink", isSolicitor: "isSolicitor" }, decls: 13, vars: 15, consts: [[1, "phase-banner"], [1, "phase-tag"], [1, "text-16"], ["target", "_blank", "rel", "noopener", 3, "href"]], template: function PhaseComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "p")(2, "strong", 1);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "span", 2);
        i0.ɵɵtext(6);
        i0.ɵɵpipe(7, "rpxTranslate");
        i0.ɵɵelementStart(8, "a", 3);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtext(11);
        i0.ɵɵpipe(12, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵclassProp("full-screen", !ctx.isSolicitor);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, ctx.phaseLabel));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(7, 9, "This is a new service \u2013 your"), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("href", ctx.phaseLink, i0.ɵɵsanitizeUrl);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 11, "feedback"));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 13, "will help us to improve it"), ".");
    } }, dependencies: [i1.RpxTranslatePipe], styles: [".phase-banner[_ngcontent-%COMP%]{padding-top:10px;padding-left:15px;border-bottom:1px solid #bfc1c3;max-width:1005px;margin:0 auto}@media (min-width: 641px){.phase-banner[_ngcontent-%COMP%]{padding-bottom:10px}}.phase-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:table;margin:0;color:#000;font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:11pt;line-height:1.2727272727}@media (min-width: 641px){.phase-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12pt;line-height:1.3333333333}}.phase-banner[_ngcontent-%COMP%]   .phase-tag[_ngcontent-%COMP%]{display:-moz-inline-stack;display:inline-block;margin:0 8px 0 0;padding:2px 5px 0;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:11pt;line-height:1.2727272727;text-transform:uppercase;letter-spacing:1px;text-decoration:none;color:#fff;background-color:#005ea5}@media (min-width: 641px){.phase-banner[_ngcontent-%COMP%]   .phase-tag[_ngcontent-%COMP%]{font-size:12pt;line-height:1.25}}.phase-banner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:table-cell;vertical-align:baseline}.full-screen[_ngcontent-%COMP%]{max-width:100%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PhaseComponent, [{
        type: Component,
        args: [{ selector: 'cut-phase-bar', template: "<div [class.full-screen]=\"!isSolicitor\" class=\"phase-banner\">\n  <p>\n    <strong class=\"phase-tag\">{{phaseLabel | rpxTranslate}}</strong>\n    <span class=\"text-16\">{{'This  is a new service \u2013 your' | rpxTranslate}} <a href=\"{{phaseLink}}\" target=\"_blank\" rel=\"noopener\">{{'feedback' | rpxTranslate}}</a> {{'will help us to improve it' | rpxTranslate}}.</span>\n  </p>\n</div>\n", styles: [".phase-banner{padding-top:10px;padding-left:15px;border-bottom:1px solid #bfc1c3;max-width:1005px;margin:0 auto}@media (min-width: 641px){.phase-banner{padding-bottom:10px}}.phase-banner p{display:table;margin:0;color:#000;font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:11pt;line-height:1.2727272727}@media (min-width: 641px){.phase-banner p{font-size:12pt;line-height:1.3333333333}}.phase-banner .phase-tag{display:-moz-inline-stack;display:inline-block;margin:0 8px 0 0;padding:2px 5px 0;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:11pt;line-height:1.2727272727;text-transform:uppercase;letter-spacing:1px;text-decoration:none;color:#fff;background-color:#005ea5}@media (min-width: 641px){.phase-banner .phase-tag{font-size:12pt;line-height:1.25}}.phase-banner span{display:table-cell;vertical-align:baseline}.full-screen{max-width:100%}\n"] }]
    }], null, { phaseLabel: [{
            type: Input
        }], phaseLink: [{
            type: Input
        }], isSolicitor: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL2NvbXBvbmVudHMvaGVhZGVyL3BoYXNlL3BoYXNlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9jb21wb25lbnRzL2hlYWRlci9waGFzZS9waGFzZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPakQsTUFBTSxPQUFPLGNBQWM7OzRFQUFkLGNBQWM7aUVBQWQsY0FBYztRQ1AzQiw4QkFBNkQsUUFBQSxnQkFBQTtRQUUvQixZQUE2Qjs7UUFBQSxpQkFBUztRQUNoRSwrQkFBc0I7UUFBQSxZQUFtRDs7UUFBQSw0QkFBdUQ7UUFBQSxZQUE2Qjs7UUFBQSxpQkFBSTtRQUFDLGFBQWdEOztRQUFBLGlCQUFPLEVBQUEsRUFBQTs7UUFIeE4sK0NBQWtDO1FBRVQsZUFBNkI7UUFBN0IsMERBQTZCO1FBQ2pDLGVBQW1EO1FBQW5ELHlGQUFtRDtRQUFHLGVBQW9CO1FBQXBCLGlFQUFvQjtRQUFnQyxlQUE2QjtRQUE3Qix3REFBNkI7UUFBSyxlQUFnRDtRQUFoRCxxRkFBZ0Q7O3VGREl6TSxjQUFjO2NBTDFCLFNBQVM7MkJBQ0ksZUFBZTtnQkFPcEIsVUFBVTtrQkFEaEIsS0FBSztZQUlDLFNBQVM7a0JBRGYsS0FBSztZQUlDLFdBQVc7a0JBRGpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY3V0LXBoYXNlLWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BoYXNlLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BoYXNlLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQaGFzZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHBoYXNlTGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcGhhc2VMaW5rOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGlzU29saWNpdG9yOiBib29sZWFuO1xuXG59XG4iLCI8ZGl2IFtjbGFzcy5mdWxsLXNjcmVlbl09XCIhaXNTb2xpY2l0b3JcIiBjbGFzcz1cInBoYXNlLWJhbm5lclwiPlxuICA8cD5cbiAgICA8c3Ryb25nIGNsYXNzPVwicGhhc2UtdGFnXCI+e3twaGFzZUxhYmVsIHwgcnB4VHJhbnNsYXRlfX08L3N0cm9uZz5cbiAgICA8c3BhbiBjbGFzcz1cInRleHQtMTZcIj57eydUaGlzICBpcyBhIG5ldyBzZXJ2aWNlIOKAkyB5b3VyJyB8IHJweFRyYW5zbGF0ZX19IDxhIGhyZWY9XCJ7e3BoYXNlTGlua319XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj57eydmZWVkYmFjaycgfCBycHhUcmFuc2xhdGV9fTwvYT4ge3snd2lsbCBoZWxwIHVzIHRvIGltcHJvdmUgaXQnIHwgcnB4VHJhbnNsYXRlfX0uPC9zcGFuPlxuICA8L3A+XG48L2Rpdj5cbiJdfQ==