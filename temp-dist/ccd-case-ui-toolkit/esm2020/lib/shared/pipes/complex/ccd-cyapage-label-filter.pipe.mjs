import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CcdCYAPageLabelFilterPipe {
    constructor() {
        this.getNonLabelComplexFieldType = (complexFields) => complexFields.filter((caseField) => caseField.field_type.type !== 'Label');
    }
    transform(caseFields) {
        return caseFields.map((caseField) => {
            if (caseField.field_type.collection_field_type &&
                caseField.field_type.collection_field_type.complex_fields &&
                caseField.field_type.collection_field_type.complex_fields.length) {
                caseField.field_type.collection_field_type.complex_fields = this.transform(caseField.field_type.collection_field_type.complex_fields);
            }
            if (caseField.field_type.complex_fields && caseField.field_type.complex_fields.length) {
                caseField.field_type.complex_fields = this.getNonLabelComplexFieldType(caseField.field_type.complex_fields);
            }
            return caseField;
        });
    }
}
CcdCYAPageLabelFilterPipe.ɵfac = function CcdCYAPageLabelFilterPipe_Factory(t) { return new (t || CcdCYAPageLabelFilterPipe)(); };
CcdCYAPageLabelFilterPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdCYAPageLabelFilter", type: CcdCYAPageLabelFilterPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CcdCYAPageLabelFilterPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdCYAPageLabelFilter'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLWN5YXBhZ2UtbGFiZWwtZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3BpcGVzL2NvbXBsZXgvY2NkLWN5YXBhZ2UtbGFiZWwtZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBTXBELE1BQU0sT0FBTyx5QkFBeUI7SUFIdEM7UUFzQm1CLGdDQUEyQixHQUFHLENBQUMsYUFBMEIsRUFBZSxFQUFFLENBQ3pGLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQTtLQUN4RjtJQW5CUSxTQUFTLENBQUMsVUFBdUI7UUFDdEMsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzdDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUI7Z0JBQzVDLFNBQVMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsY0FBYztnQkFDekQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUNsRSxTQUFTLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUN4RSxTQUFTLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FDMUQsQ0FBQzthQUNIO1lBQ0QsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JGLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzdHO1lBRUQsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztrR0FqQlUseUJBQXlCO3VHQUF6Qix5QkFBeUI7dUZBQXpCLHlCQUF5QjtjQUhyQyxJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLHVCQUF1QjthQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uL2RvbWFpbic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZENZQVBhZ2VMYWJlbEZpbHRlcidcbn0pXG5leHBvcnQgY2xhc3MgQ2NkQ1lBUGFnZUxhYmVsRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oY2FzZUZpZWxkczogQ2FzZUZpZWxkW10pOiBDYXNlRmllbGRbXSB7XG4gICAgcmV0dXJuIGNhc2VGaWVsZHMubWFwKChjYXNlRmllbGQ6IENhc2VGaWVsZCkgPT4ge1xuICAgICAgaWYgKGNhc2VGaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZSAmJlxuICAgICAgICBjYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMgJiZcbiAgICAgICAgY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzLmxlbmd0aCkge1xuICAgICAgICBjYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMgPSB0aGlzLnRyYW5zZm9ybShcbiAgICAgICAgICBjYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcyAmJiBjYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMgPSB0aGlzLmdldE5vbkxhYmVsQ29tcGxleEZpZWxkVHlwZShjYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYXNlRmllbGQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IGdldE5vbkxhYmVsQ29tcGxleEZpZWxkVHlwZSA9IChjb21wbGV4RmllbGRzOiBDYXNlRmllbGRbXSk6IENhc2VGaWVsZFtdID0+XG4gICAgY29tcGxleEZpZWxkcy5maWx0ZXIoKGNhc2VGaWVsZDogQ2FzZUZpZWxkKSA9PiBjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlICE9PSAnTGFiZWwnKVxufVxuIl19