import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class IsCompoundPipe {
    transform(field) {
        if (!field || !field.field_type || !field.field_type.type) {
            return false;
        }
        if (IsCompoundPipe.COMPOUND_TYPES.indexOf(field.field_type.type) !== -1) {
            if (IsCompoundPipe.EXCLUDE.indexOf(field.field_type.id) !== -1) {
                return false;
            }
            return true;
        }
        return false;
    }
}
IsCompoundPipe.COMPOUND_TYPES = [
    'Complex',
    'Label',
    'AddressGlobal',
    'AddressUK',
    'AddressGlobalUK',
    'CasePaymentHistoryViewer',
    'CaseHistoryViewer',
    'Organisation',
    'WaysToPay',
    'ComponentLauncher',
    'FlagLauncher',
    'CaseFlag'
];
IsCompoundPipe.EXCLUDE = [
    'CaseLink',
    'JudicialUser'
];
IsCompoundPipe.ɵfac = function IsCompoundPipe_Factory(t) { return new (t || IsCompoundPipe)(); };
IsCompoundPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdIsCompound", type: IsCompoundPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IsCompoundPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdIsCompound'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY29tcG91bmQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL3V0aWxzL2lzLWNvbXBvdW5kLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBT3BELE1BQU0sT0FBTyxjQUFjO0lBc0JsQixTQUFTLENBQUMsS0FBZ0I7UUFDL0IsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUN6RCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3ZFLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDOUQsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O0FBakN1Qiw2QkFBYyxHQUFvQjtJQUN4RCxTQUFTO0lBQ1QsT0FBTztJQUNQLGVBQWU7SUFDZixXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLDBCQUEwQjtJQUMxQixtQkFBbUI7SUFDbkIsY0FBYztJQUNkLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLFVBQVU7Q0FDWCxDQUFDO0FBRXNCLHNCQUFPLEdBQWE7SUFDMUMsVUFBVTtJQUNWLGNBQWM7Q0FDZixDQUFDOzRFQXBCUyxjQUFjO29GQUFkLGNBQWM7dUZBQWQsY0FBYztjQUgxQixJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLGVBQWU7YUFDdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IEZpZWxkVHlwZUVudW0gfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbi9maWVsZC10eXBlLWVudW0ubW9kZWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2RJc0NvbXBvdW5kJ1xufSlcbmV4cG9ydCBjbGFzcyBJc0NvbXBvdW5kUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENPTVBPVU5EX1RZUEVTOiBGaWVsZFR5cGVFbnVtW10gPSBbXG4gICAgJ0NvbXBsZXgnLFxuICAgICdMYWJlbCcsXG4gICAgJ0FkZHJlc3NHbG9iYWwnLFxuICAgICdBZGRyZXNzVUsnLFxuICAgICdBZGRyZXNzR2xvYmFsVUsnLFxuICAgICdDYXNlUGF5bWVudEhpc3RvcnlWaWV3ZXInLFxuICAgICdDYXNlSGlzdG9yeVZpZXdlcicsXG4gICAgJ09yZ2FuaXNhdGlvbicsXG4gICAgJ1dheXNUb1BheScsXG4gICAgJ0NvbXBvbmVudExhdW5jaGVyJyxcbiAgICAnRmxhZ0xhdW5jaGVyJyxcbiAgICAnQ2FzZUZsYWcnXG4gIF07XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVhDTFVERTogc3RyaW5nW10gPSBbXG4gICAgJ0Nhc2VMaW5rJyxcbiAgICAnSnVkaWNpYWxVc2VyJ1xuICBdO1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oZmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIGlmICghZmllbGQgfHwgIWZpZWxkLmZpZWxkX3R5cGUgfHwgIWZpZWxkLmZpZWxkX3R5cGUudHlwZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChJc0NvbXBvdW5kUGlwZS5DT01QT1VORF9UWVBFUy5pbmRleE9mKGZpZWxkLmZpZWxkX3R5cGUudHlwZSkgIT09IC0xKSB7XG4gICAgICBpZiAoSXNDb21wb3VuZFBpcGUuRVhDTFVERS5pbmRleE9mKGZpZWxkLmZpZWxkX3R5cGUuaWQpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==