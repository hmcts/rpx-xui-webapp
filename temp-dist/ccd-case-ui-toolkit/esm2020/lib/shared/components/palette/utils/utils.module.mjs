import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RpxTranslatePipe, RpxTranslationModule } from 'rpx-xui-translation';
import { DashPipe } from './dash.pipe';
import { DatePipe } from './date.pipe';
import { FieldLabelPipe } from './field-label.pipe';
import { FirstErrorPipe } from './first-error.pipe';
import { IsCompoundPipe } from './is-compound.pipe';
import { IsMandatoryPipe } from './is-mandatory.pipe';
import { IsReadOnlyAndNotCollectionPipe } from './is-read-only-and-not-collection.pipe';
import { IsReadOnlyPipe } from './is-read-only.pipe';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class PaletteUtilsModule {
}
PaletteUtilsModule.ɵfac = function PaletteUtilsModule_Factory(t) { return new (t || PaletteUtilsModule)(); };
PaletteUtilsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: PaletteUtilsModule });
PaletteUtilsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        IsCompoundPipe,
        RpxTranslatePipe
    ], imports: [CommonModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaletteUtilsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    DatePipe,
                    FieldLabelPipe,
                    FirstErrorPipe,
                    IsCompoundPipe,
                    IsMandatoryPipe,
                    IsReadOnlyPipe,
                    IsReadOnlyAndNotCollectionPipe,
                    DashPipe
                ],
                exports: [
                    DatePipe,
                    FieldLabelPipe,
                    FirstErrorPipe,
                    IsCompoundPipe,
                    IsMandatoryPipe,
                    IsReadOnlyPipe,
                    IsReadOnlyAndNotCollectionPipe,
                    DashPipe
                ],
                providers: [
                    IsCompoundPipe,
                    RpxTranslatePipe
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PaletteUtilsModule, { declarations: [DatePipe,
        FieldLabelPipe,
        FirstErrorPipe,
        IsCompoundPipe,
        IsMandatoryPipe,
        IsReadOnlyPipe,
        IsReadOnlyAndNotCollectionPipe,
        DashPipe], imports: [CommonModule, i1.RpxTranslationModule], exports: [DatePipe,
        FieldLabelPipe,
        FirstErrorPipe,
        IsCompoundPipe,
        IsMandatoryPipe,
        IsReadOnlyPipe,
        IsReadOnlyAndNotCollectionPipe,
        DashPipe] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvdXRpbHMvdXRpbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFnQ3JELE1BQU0sT0FBTyxrQkFBa0I7O29GQUFsQixrQkFBa0I7b0VBQWxCLGtCQUFrQjt5RUFMbkI7UUFDUixjQUFjO1FBQ2QsZ0JBQWdCO0tBQ2pCLFlBMUJDLFlBQVk7UUFDWixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBMkJ0QixrQkFBa0I7Y0E5QjlCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7aUJBQ2hDO2dCQUNELFlBQVksRUFBRTtvQkFDWixRQUFRO29CQUNSLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxjQUFjO29CQUNkLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCw4QkFBOEI7b0JBQzlCLFFBQVE7aUJBQ1Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFFBQVE7b0JBQ1IsY0FBYztvQkFDZCxjQUFjO29CQUNkLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixjQUFjO29CQUNkLDhCQUE4QjtvQkFDOUIsUUFBUTtpQkFDVDtnQkFDRCxTQUFTLEVBQUM7b0JBQ1IsY0FBYztvQkFDZCxnQkFBZ0I7aUJBQ2pCO2FBQ0Y7O3dGQUNZLGtCQUFrQixtQkF4QjNCLFFBQVE7UUFDUixjQUFjO1FBQ2QsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2YsY0FBYztRQUNkLDhCQUE4QjtRQUM5QixRQUFRLGFBWFIsWUFBWSxzQ0FjWixRQUFRO1FBQ1IsY0FBYztRQUNkLGNBQWM7UUFDZCxjQUFjO1FBQ2QsZUFBZTtRQUNmLGNBQWM7UUFDZCw4QkFBOEI7UUFDOUIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUnB4VHJhbnNsYXRlUGlwZSwgUnB4VHJhbnNsYXRpb25Nb2R1bGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IERhc2hQaXBlIH0gZnJvbSAnLi9kYXNoLnBpcGUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICcuL2RhdGUucGlwZSc7XG5pbXBvcnQgeyBGaWVsZExhYmVsUGlwZSB9IGZyb20gJy4vZmllbGQtbGFiZWwucGlwZSc7XG5pbXBvcnQgeyBGaXJzdEVycm9yUGlwZSB9IGZyb20gJy4vZmlyc3QtZXJyb3IucGlwZSc7XG5pbXBvcnQgeyBJc0NvbXBvdW5kUGlwZSB9IGZyb20gJy4vaXMtY29tcG91bmQucGlwZSc7XG5pbXBvcnQgeyBJc01hbmRhdG9yeVBpcGUgfSBmcm9tICcuL2lzLW1hbmRhdG9yeS5waXBlJztcbmltcG9ydCB7IElzUmVhZE9ubHlBbmROb3RDb2xsZWN0aW9uUGlwZSB9IGZyb20gJy4vaXMtcmVhZC1vbmx5LWFuZC1ub3QtY29sbGVjdGlvbi5waXBlJztcbmltcG9ydCB7IElzUmVhZE9ubHlQaXBlIH0gZnJvbSAnLi9pcy1yZWFkLW9ubHkucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRlUGlwZSxcbiAgICBGaWVsZExhYmVsUGlwZSxcbiAgICBGaXJzdEVycm9yUGlwZSxcbiAgICBJc0NvbXBvdW5kUGlwZSxcbiAgICBJc01hbmRhdG9yeVBpcGUsXG4gICAgSXNSZWFkT25seVBpcGUsXG4gICAgSXNSZWFkT25seUFuZE5vdENvbGxlY3Rpb25QaXBlLFxuICAgIERhc2hQaXBlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEYXRlUGlwZSxcbiAgICBGaWVsZExhYmVsUGlwZSxcbiAgICBGaXJzdEVycm9yUGlwZSxcbiAgICBJc0NvbXBvdW5kUGlwZSxcbiAgICBJc01hbmRhdG9yeVBpcGUsXG4gICAgSXNSZWFkT25seVBpcGUsXG4gICAgSXNSZWFkT25seUFuZE5vdENvbGxlY3Rpb25QaXBlLFxuICAgIERhc2hQaXBlXG4gIF0sXG4gIHByb3ZpZGVyczpbXG4gICAgSXNDb21wb3VuZFBpcGUsXG4gICAgUnB4VHJhbnNsYXRlUGlwZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBhbGV0dGVVdGlsc01vZHVsZSB7fVxuIl19