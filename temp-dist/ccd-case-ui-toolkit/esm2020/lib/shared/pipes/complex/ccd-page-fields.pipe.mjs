import { Pipe } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../domain/definition';
import * as i0 from "@angular/core";
export class CcdPageFieldsPipe {
    transform(page, dataFormGroup) {
        const complexFields = Object.keys(dataFormGroup.controls['data'].controls).map(key => {
            const control = dataFormGroup.controls['data'].get(key);
            return control['caseField'];
        }).filter(field => {
            return !!page.case_fields.find(pcf => pcf.id === field.id);
        }).sort((a, b) => a.order - b.order);
        const rawValue = dataFormGroup.value;
        const value = page.case_fields.reduce((acc, field) => {
            const fieldValue = rawValue[field.id] || field.value;
            return { ...acc, [field.id]: fieldValue };
        }, {});
        return plainToClassFromExist(new CaseField(), {
            id: page.id,
            label: page.label,
            display_context: 'READONLY',
            value,
            field_type: {
                id: page.id,
                type: 'Complex',
                complex_fields: complexFields
            }
        });
    }
}
CcdPageFieldsPipe.ɵfac = function CcdPageFieldsPipe_Factory(t) { return new (t || CcdPageFieldsPipe)(); };
CcdPageFieldsPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdPageFields", type: CcdPageFieldsPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CcdPageFieldsPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdPageFields'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLXBhZ2UtZmllbGRzLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3BpcGVzL2NvbXBsZXgvY2NkLXBhZ2UtZmllbGRzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUtwRCxNQUFNLE9BQU8saUJBQWlCO0lBQ3JCLFNBQVMsQ0FBQyxJQUFnQixFQUFFLGFBQStCO1FBQ2hFLE1BQU0sYUFBYSxHQUFnQixNQUFNLENBQUMsSUFBSSxDQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0SCxNQUFNLE9BQU8sR0FBcUIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQXNCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9GLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBYyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJDLE1BQU0sUUFBUSxHQUFRLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFFMUMsTUFBTSxLQUFLLEdBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFRLEVBQUUsS0FBZ0IsRUFBRSxFQUFFO1lBQ3hFLE1BQU0sVUFBVSxHQUFRLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMxRCxPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFDNUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQzVDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixlQUFlLEVBQUUsVUFBVTtZQUMzQixLQUFLO1lBQ0wsVUFBVSxFQUFFO2dCQUNWLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxJQUFJLEVBQUUsU0FBUztnQkFDZixjQUFjLEVBQUUsYUFBYTthQUM5QjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7O2tGQTFCVSxpQkFBaUI7dUZBQWpCLGlCQUFpQjt1RkFBakIsaUJBQWlCO2NBSDdCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsZUFBZTthQUN0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFdpemFyZFBhZ2UgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL2RvbWFpbi93aXphcmQtcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZFBhZ2VGaWVsZHMnXG59KVxuZXhwb3J0IGNsYXNzIENjZFBhZ2VGaWVsZHNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHB1YmxpYyB0cmFuc2Zvcm0ocGFnZTogV2l6YXJkUGFnZSwgZGF0YUZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCk6IENhc2VGaWVsZCB7XG4gICAgY29uc3QgY29tcGxleEZpZWxkczogQ2FzZUZpZWxkW10gPSBPYmplY3Qua2V5cygoZGF0YUZvcm1Hcm91cC5jb250cm9sc1snZGF0YSddIGFzIFVudHlwZWRGb3JtR3JvdXApLmNvbnRyb2xzKS5tYXAoa2V5ID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCA9IChkYXRhRm9ybUdyb3VwLmNvbnRyb2xzWydkYXRhJ10gYXMgVW50eXBlZEZvcm1Hcm91cCkuZ2V0KGtleSk7XG4gICAgICByZXR1cm4gY29udHJvbFsnY2FzZUZpZWxkJ10gYXMgQ2FzZUZpZWxkO1xuICAgIH0pLmZpbHRlcihmaWVsZCA9PiB7XG4gICAgICByZXR1cm4gISFwYWdlLmNhc2VfZmllbGRzLmZpbmQocGNmID0+IHBjZi5pZCA9PT0gZmllbGQuaWQpO1xuICAgIH0pLnNvcnQoKGEsIGIpID0+IGEub3JkZXIgLSBiLm9yZGVyKTtcblxuICAgIGNvbnN0IHJhd1ZhbHVlOiBhbnkgPSBkYXRhRm9ybUdyb3VwLnZhbHVlO1xuXG4gICAgY29uc3QgdmFsdWU6IGFueSA9IHBhZ2UuY2FzZV9maWVsZHMucmVkdWNlKChhY2M6IGFueSwgZmllbGQ6IENhc2VGaWVsZCkgPT4ge1xuICAgICAgY29uc3QgZmllbGRWYWx1ZTogYW55ID0gcmF3VmFsdWVbZmllbGQuaWRdIHx8IGZpZWxkLnZhbHVlO1xuICAgICAgcmV0dXJuIHsgLi4uYWNjLCBbZmllbGQuaWRdOiBmaWVsZFZhbHVlIH07XG4gICAgfSwge30pO1xuICAgIHJldHVybiBwbGFpblRvQ2xhc3NGcm9tRXhpc3QobmV3IENhc2VGaWVsZCgpLCB7XG4gICAgICBpZDogcGFnZS5pZCxcbiAgICAgIGxhYmVsOiBwYWdlLmxhYmVsLFxuICAgICAgZGlzcGxheV9jb250ZXh0OiAnUkVBRE9OTFknLFxuICAgICAgdmFsdWUsXG4gICAgICBmaWVsZF90eXBlOiB7XG4gICAgICAgIGlkOiBwYWdlLmlkLFxuICAgICAgICB0eXBlOiAnQ29tcGxleCcsXG4gICAgICAgIGNvbXBsZXhfZmllbGRzOiBjb21wbGV4RmllbGRzXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==