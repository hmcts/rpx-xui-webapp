import { Pipe } from '@angular/core';
import { CaseFieldService } from '../../../services/case-fields';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/case-fields";
export class IsReadOnlyAndNotCollectionPipe {
    constructor(caseFieldService) {
        this.caseFieldService = caseFieldService;
    }
    transform(field) {
        if (!field || !field.field_type || !field.field_type.type) {
            return false;
        }
        if (this.isCollection(field)) {
            return false;
        }
        return this.caseFieldService.isReadOnly(field);
    }
    // CaseField @Expose() doesn't work with the pipe in here, so leaving the manual check
    isCollection(field) {
        return field.field_type && field.field_type.type === 'Collection';
    }
}
IsReadOnlyAndNotCollectionPipe.ɵfac = function IsReadOnlyAndNotCollectionPipe_Factory(t) { return new (t || IsReadOnlyAndNotCollectionPipe)(i0.ɵɵdirectiveInject(i1.CaseFieldService, 16)); };
IsReadOnlyAndNotCollectionPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdIsReadOnlyAndNotCollection", type: IsReadOnlyAndNotCollectionPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IsReadOnlyAndNotCollectionPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdIsReadOnlyAndNotCollection'
            }]
    }], function () { return [{ type: i1.CaseFieldService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVhZC1vbmx5LWFuZC1ub3QtY29sbGVjdGlvbi5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvdXRpbHMvaXMtcmVhZC1vbmx5LWFuZC1ub3QtY29sbGVjdGlvbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7QUFLakUsTUFBTSxPQUFPLDhCQUE4QjtJQUV6QyxZQUE4QixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFFN0QsU0FBUyxDQUFDLEtBQWdCO1FBQy9CLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDekQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxzRkFBc0Y7SUFDOUUsWUFBWSxDQUFDLEtBQWdCO1FBQ25DLE9BQU8sS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUM7SUFDcEUsQ0FBQzs7NEdBakJVLDhCQUE4QjtvSEFBOUIsOEJBQThCO3VGQUE5Qiw4QkFBOEI7Y0FIMUMsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSwrQkFBK0I7YUFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBDYXNlRmllbGRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvY2FzZS1maWVsZHMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2RJc1JlYWRPbmx5QW5kTm90Q29sbGVjdGlvbidcbn0pXG5leHBvcnQgY2xhc3MgSXNSZWFkT25seUFuZE5vdENvbGxlY3Rpb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSAgY2FzZUZpZWxkU2VydmljZTogQ2FzZUZpZWxkU2VydmljZSkge31cblxuICBwdWJsaWMgdHJhbnNmb3JtKGZpZWxkOiBDYXNlRmllbGQpOiBib29sZWFuIHtcbiAgICBpZiAoIWZpZWxkIHx8ICFmaWVsZC5maWVsZF90eXBlIHx8ICFmaWVsZC5maWVsZF90eXBlLnR5cGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNDb2xsZWN0aW9uKGZpZWxkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYXNlRmllbGRTZXJ2aWNlLmlzUmVhZE9ubHkoZmllbGQpO1xuICB9XG5cbiAgLy8gQ2FzZUZpZWxkIEBFeHBvc2UoKSBkb2Vzbid0IHdvcmsgd2l0aCB0aGUgcGlwZSBpbiBoZXJlLCBzbyBsZWF2aW5nIHRoZSBtYW51YWwgY2hlY2tcbiAgcHJpdmF0ZSBpc0NvbGxlY3Rpb24oZmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmaWVsZC5maWVsZF90eXBlICYmIGZpZWxkLmZpZWxkX3R5cGUudHlwZSA9PT0gJ0NvbGxlY3Rpb24nO1xuICB9XG59XG4iXX0=