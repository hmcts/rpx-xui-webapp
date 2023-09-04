import { Pipe } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
export class CcdCollectionTableCaseFieldsFilterPipe {
    transform(objs, caseField, value) {
        const fields = objs.map((obj) => ({
            ...obj.value.caseField,
            type: obj.value.type.type ? obj.value.type.type : obj.value.type
        }));
        return plainToClassFromExist(new CaseField(), {
            id: caseField ? caseField.id : '',
            label: caseField ? caseField.label : '',
            display_context: 'READONLY',
            value,
            field_type: {
                id: caseField ? caseField.id : '',
                type: 'Complex',
                complex_fields: fields,
            }
        });
    }
}
CcdCollectionTableCaseFieldsFilterPipe.ɵfac = function CcdCollectionTableCaseFieldsFilterPipe_Factory(t) { return new (t || CcdCollectionTableCaseFieldsFilterPipe)(); };
CcdCollectionTableCaseFieldsFilterPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdCollectionTableCaseFieldsFilter", type: CcdCollectionTableCaseFieldsFilterPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CcdCollectionTableCaseFieldsFilterPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdCollectionTableCaseFieldsFilter'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLWNvbGxlY3Rpb24tdGFibGUtdmFsdWUtY2FzZS1maWVsZHMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvcGlwZXMvY29tcGxleC9jY2QtY29sbGVjdGlvbi10YWJsZS12YWx1ZS1jYXNlLWZpZWxkcy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFLckUsTUFBTSxPQUFPLHNDQUFzQztJQUUxQyxTQUFTLENBQUMsSUFBOEIsRUFBRSxTQUFvQixFQUFFLEtBQVM7UUFDOUUsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0MsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDdEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUk7U0FDakUsQ0FBQyxDQUFDLENBQUM7UUFDSixPQUFPLHFCQUFxQixDQUFDLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDNUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZDLGVBQWUsRUFBRSxVQUFVO1lBQzNCLEtBQUs7WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsY0FBYyxFQUFFLE1BQU07YUFDdkI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs0SEFsQlUsc0NBQXNDO2lJQUF0QyxzQ0FBc0M7dUZBQXRDLHNDQUFzQztjQUhsRCxJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLG9DQUFvQzthQUMzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2RDb2xsZWN0aW9uVGFibGVDYXNlRmllbGRzRmlsdGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBDY2RDb2xsZWN0aW9uVGFibGVDYXNlRmllbGRzRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0ob2JqczogeyBba2V5OiBzdHJpbmddOiBhbnkgfVtdLCBjYXNlRmllbGQ6IENhc2VGaWVsZCwgdmFsdWU6IHt9KTogQ2FzZUZpZWxkIHtcbiAgICBjb25zdCBmaWVsZHM6IENhc2VGaWVsZFtdID0gb2Jqcy5tYXAoKG9iaikgPT4gKHtcbiAgICAgIC4uLm9iai52YWx1ZS5jYXNlRmllbGQsXG4gICAgICB0eXBlOiBvYmoudmFsdWUudHlwZS50eXBlID8gb2JqLnZhbHVlLnR5cGUudHlwZSA6IG9iai52YWx1ZS50eXBlXG4gICAgfSkpO1xuICAgIHJldHVybiBwbGFpblRvQ2xhc3NGcm9tRXhpc3QobmV3IENhc2VGaWVsZCgpLCB7XG4gICAgICBpZDogY2FzZUZpZWxkID8gY2FzZUZpZWxkLmlkIDogJycsXG4gICAgICBsYWJlbDogY2FzZUZpZWxkID8gY2FzZUZpZWxkLmxhYmVsIDogJycsXG4gICAgICBkaXNwbGF5X2NvbnRleHQ6ICdSRUFET05MWScsXG4gICAgICB2YWx1ZSxcbiAgICAgIGZpZWxkX3R5cGU6IHtcbiAgICAgICAgaWQ6IGNhc2VGaWVsZCA/IGNhc2VGaWVsZC5pZCA6ICcnLFxuICAgICAgICB0eXBlOiAnQ29tcGxleCcsXG4gICAgICAgIGNvbXBsZXhfZmllbGRzOiBmaWVsZHMsXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==