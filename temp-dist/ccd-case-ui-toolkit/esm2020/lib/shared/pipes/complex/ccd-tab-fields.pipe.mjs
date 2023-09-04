import { Pipe } from '@angular/core';
import { plainToClassFromExist } from 'class-transformer';
import { CaseField } from '../../domain/definition';
import * as i0 from "@angular/core";
export class CcdTabFieldsPipe {
    transform(tab) {
        const value = tab.fields.reduce((acc, field) => {
            return { ...acc, [field.id]: field.value };
        }, {});
        return plainToClassFromExist(new CaseField(), {
            id: tab.id,
            label: tab.label,
            display_context: 'READONLY',
            value,
            field_type: {
                id: tab.id,
                type: 'Complex',
                complex_fields: tab.fields
            }
        });
    }
}
CcdTabFieldsPipe.ɵfac = function CcdTabFieldsPipe_Factory(t) { return new (t || CcdTabFieldsPipe)(); };
CcdTabFieldsPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdTabFields", type: CcdTabFieldsPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CcdTabFieldsPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdTabFields'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLXRhYi1maWVsZHMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvcGlwZXMvY29tcGxleC9jY2QtdGFiLWZpZWxkcy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFLcEQsTUFBTSxPQUFPLGdCQUFnQjtJQUVwQixTQUFTLENBQUMsR0FBWTtRQUMzQixNQUFNLEtBQUssR0FBUSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxLQUFnQixFQUFFLEVBQUU7WUFDbEUsT0FBTyxFQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDUCxPQUFPLHFCQUFxQixDQUFDLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDNUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ2hCLGVBQWUsRUFBRSxVQUFVO1lBQzNCLEtBQUs7WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLElBQUksRUFBRSxTQUFTO2dCQUNmLGNBQWMsRUFBRSxHQUFHLENBQUMsTUFBTTthQUMzQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7O2dGQWpCVSxnQkFBZ0I7cUZBQWhCLGdCQUFnQjt1RkFBaEIsZ0JBQWdCO2NBSDVCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsY0FBYzthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcblxuaW1wb3J0IHsgQ2FzZVRhYiB9IGZyb20gJy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24nO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2RUYWJGaWVsZHMnXG59KVxuZXhwb3J0IGNsYXNzIENjZFRhYkZpZWxkc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwdWJsaWMgdHJhbnNmb3JtKHRhYjogQ2FzZVRhYik6IENhc2VGaWVsZCB7XG4gICAgY29uc3QgdmFsdWU6IGFueSA9IHRhYi5maWVsZHMucmVkdWNlKChhY2M6IGFueSwgZmllbGQ6IENhc2VGaWVsZCkgPT4ge1xuICAgICAgcmV0dXJuIHsuLi5hY2MsIFtmaWVsZC5pZF06IGZpZWxkLnZhbHVlfTtcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIHBsYWluVG9DbGFzc0Zyb21FeGlzdChuZXcgQ2FzZUZpZWxkKCksIHtcbiAgICAgIGlkOiB0YWIuaWQsXG4gICAgICBsYWJlbDogdGFiLmxhYmVsLFxuICAgICAgZGlzcGxheV9jb250ZXh0OiAnUkVBRE9OTFknLFxuICAgICAgdmFsdWUsXG4gICAgICBmaWVsZF90eXBlOiB7XG4gICAgICAgIGlkOiB0YWIuaWQsXG4gICAgICAgIHR5cGU6ICdDb21wbGV4JyxcbiAgICAgICAgY29tcGxleF9maWVsZHM6IHRhYi5maWVsZHNcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=