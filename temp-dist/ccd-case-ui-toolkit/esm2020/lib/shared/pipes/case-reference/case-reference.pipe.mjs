import { Pipe } from '@angular/core';
import { Draft, DRAFT_PREFIX } from '../../domain/draft.model';
import * as i0 from "@angular/core";
export class CaseReferencePipe {
    transform(caseReference) {
        if (!caseReference) {
            return '';
        }
        if (Draft.isDraft(caseReference)) {
            return DRAFT_PREFIX;
        }
        else {
            const regex = /(?:\/)?(\d{4})(\d{4})(\d{4})(\d{4})/g;
            const result = String(caseReference).replace(regex, (match, g1, g2, g3, g4) => {
                const isLink = match[0] === '/';
                if (isLink) {
                    return match;
                }
                return [g1, g2, g3, g4].join('-');
            });
            return result;
        }
    }
}
CaseReferencePipe.ɵfac = function CaseReferencePipe_Factory(t) { return new (t || CaseReferencePipe)(); };
CaseReferencePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdCaseReference", type: CaseReferencePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseReferencePipe, [{
        type: Pipe,
        args: [{
                name: 'ccdCaseReference'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1yZWZlcmVuY2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvcGlwZXMvY2FzZS1yZWZlcmVuY2UvY2FzZS1yZWZlcmVuY2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUsvRCxNQUFNLE9BQU8saUJBQWlCO0lBRXJCLFNBQVMsQ0FBQyxhQUFxQjtRQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDaEMsT0FBTyxZQUFZLENBQUM7U0FDckI7YUFBTTtZQUNMLE1BQU0sS0FBSyxHQUFHLHNDQUFzQyxDQUFDO1lBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUN4RCxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztnQkFDaEMsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7Z0JBRUQsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOztrRkF0QlUsaUJBQWlCOzBGQUFqQixpQkFBaUI7dUZBQWpCLGlCQUFpQjtjQUg3QixJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLGtCQUFrQjthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWZ0LCBEUkFGVF9QUkVGSVggfSBmcm9tICcuLi8uLi9kb21haW4vZHJhZnQubW9kZWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2RDYXNlUmVmZXJlbmNlJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlUmVmZXJlbmNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oY2FzZVJlZmVyZW5jZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWNhc2VSZWZlcmVuY2UpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKERyYWZ0LmlzRHJhZnQoY2FzZVJlZmVyZW5jZSkpIHtcbiAgICAgIHJldHVybiBEUkFGVF9QUkVGSVg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gLyg/OlxcLyk/KFxcZHs0fSkoXFxkezR9KShcXGR7NH0pKFxcZHs0fSkvZztcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhjYXNlUmVmZXJlbmNlKS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gsXG4gICAgICAgIGcxLCBnMiwgZzMsIGc0KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNMaW5rID0gbWF0Y2hbMF0gPT09ICcvJztcbiAgICAgICAgICBpZiAoaXNMaW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFtnMSwgZzIsIGczLCBnNF0uam9pbignLScpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG59XG4iXX0=