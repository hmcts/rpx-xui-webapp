import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class RequestOptionsBuilder {
    /**
     * Assess the value to see if it should be included in the request options.
     * If it's null or an "empty" string, it shouldn't be.
     *
     * @param value The value to be assessed.
     */
    static includeParam(value) {
        if (value) {
            if (typeof (value) === 'string') {
                return value.trim().length > 0;
            }
            return true;
        }
        return false;
    }
    buildOptions(metaCriteria, caseCriteria, view) {
        // TODO: This should probably be the now built-in URLSearchParams but it
        // requires a bigger refactor and there are bigger fish to fry right now.
        let params = new HttpParams();
        if (view) {
            params = params.set('view', view);
        }
        if (metaCriteria) {
            for (const criterion of Object.keys(metaCriteria)) {
                // EUI-3490. Make sure the parameter should be included for adding it.
                // This was already handled by the old URLSearchParams mechanism.
                if (RequestOptionsBuilder.includeParam(metaCriteria[criterion])) {
                    params = params.set(criterion, metaCriteria[criterion]);
                }
            }
        }
        if (caseCriteria) {
            for (const criterion of Object.keys(caseCriteria)) {
                if (RequestOptionsBuilder.includeParam(caseCriteria[criterion])) {
                    const key = RequestOptionsBuilder.FIELD_PREFIX + criterion;
                    const value = caseCriteria[criterion].trim ? caseCriteria[criterion].trim() : caseCriteria[criterion];
                    params = params.set(key, value.replace(/’/i, `'`));
                }
            }
        }
        const options = { params, observe: 'body' };
        return options;
    }
}
RequestOptionsBuilder.FIELD_PREFIX = 'case.';
RequestOptionsBuilder.ɵfac = function RequestOptionsBuilder_Factory(t) { return new (t || RequestOptionsBuilder)(); };
RequestOptionsBuilder.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RequestOptionsBuilder, factory: RequestOptionsBuilder.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequestOptionsBuilder, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5vcHRpb25zLmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL3JlcXVlc3QvcmVxdWVzdC5vcHRpb25zLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxxQkFBcUI7SUFJOUI7Ozs7O09BS0c7SUFDSyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQVU7UUFDcEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDaEM7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sWUFBWSxDQUFDLFlBQW9CLEVBQUUsWUFBb0IsRUFBRSxJQUFpQjtRQUMvRSx3RUFBd0U7UUFDeEUseUVBQXlFO1FBQ3pFLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFFOUIsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLFlBQVksRUFBRTtZQUNoQixLQUFLLE1BQU0sU0FBUyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pELHNFQUFzRTtnQkFDdEUsaUVBQWlFO2dCQUNqRSxJQUFJLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtvQkFDL0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUN6RDthQUNGO1NBQ0Y7UUFFRCxJQUFJLFlBQVksRUFBRTtZQUNoQixLQUFLLE1BQU0sU0FBUyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pELElBQUkscUJBQXFCLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO29CQUMvRCxNQUFNLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO29CQUMzRCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdEcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3BEO2FBQ0Y7U0FDRjtRQUVELE1BQU0sT0FBTyxHQUFnQixFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFDeEQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7QUFqRHNCLGtDQUFZLEdBQUcsT0FBTyxDQUFDOzBGQUZyQyxxQkFBcUI7MkVBQXJCLHFCQUFxQixXQUFyQixxQkFBcUI7dUZBQXJCLHFCQUFxQjtjQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT3B0aW9uc1R5cGUgfSBmcm9tICcuLic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0T3B0aW9uc0J1aWxkZXIge1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBGSUVMRF9QUkVGSVggPSAnY2FzZS4nO1xuXG4gICAgLyoqXG4gICAgICogQXNzZXNzIHRoZSB2YWx1ZSB0byBzZWUgaWYgaXQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSByZXF1ZXN0IG9wdGlvbnMuXG4gICAgICogSWYgaXQncyBudWxsIG9yIGFuIFwiZW1wdHlcIiBzdHJpbmcsIGl0IHNob3VsZG4ndCBiZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gYmUgYXNzZXNzZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5jbHVkZVBhcmFtKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGJ1aWxkT3B0aW9ucyhtZXRhQ3JpdGVyaWE6IG9iamVjdCwgY2FzZUNyaXRlcmlhOiBvYmplY3QsIHZpZXc/OiBTZWFyY2hWaWV3KTogT3B0aW9uc1R5cGUge1xuICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGQgcHJvYmFibHkgYmUgdGhlIG5vdyBidWlsdC1pbiBVUkxTZWFyY2hQYXJhbXMgYnV0IGl0XG4gICAgICAvLyByZXF1aXJlcyBhIGJpZ2dlciByZWZhY3RvciBhbmQgdGhlcmUgYXJlIGJpZ2dlciBmaXNoIHRvIGZyeSByaWdodCBub3cuXG4gICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgndmlldycsIHZpZXcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWV0YUNyaXRlcmlhKSB7XG4gICAgICAgIGZvciAoY29uc3QgY3JpdGVyaW9uIG9mIE9iamVjdC5rZXlzKG1ldGFDcml0ZXJpYSkpIHtcbiAgICAgICAgICAvLyBFVUktMzQ5MC4gTWFrZSBzdXJlIHRoZSBwYXJhbWV0ZXIgc2hvdWxkIGJlIGluY2x1ZGVkIGZvciBhZGRpbmcgaXQuXG4gICAgICAgICAgLy8gVGhpcyB3YXMgYWxyZWFkeSBoYW5kbGVkIGJ5IHRoZSBvbGQgVVJMU2VhcmNoUGFyYW1zIG1lY2hhbmlzbS5cbiAgICAgICAgICBpZiAoUmVxdWVzdE9wdGlvbnNCdWlsZGVyLmluY2x1ZGVQYXJhbShtZXRhQ3JpdGVyaWFbY3JpdGVyaW9uXSkpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoY3JpdGVyaW9uLCBtZXRhQ3JpdGVyaWFbY3JpdGVyaW9uXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjYXNlQ3JpdGVyaWEpIHtcbiAgICAgICAgZm9yIChjb25zdCBjcml0ZXJpb24gb2YgT2JqZWN0LmtleXMoY2FzZUNyaXRlcmlhKSkge1xuICAgICAgICAgIGlmIChSZXF1ZXN0T3B0aW9uc0J1aWxkZXIuaW5jbHVkZVBhcmFtKGNhc2VDcml0ZXJpYVtjcml0ZXJpb25dKSkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gUmVxdWVzdE9wdGlvbnNCdWlsZGVyLkZJRUxEX1BSRUZJWCArIGNyaXRlcmlvbjtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2FzZUNyaXRlcmlhW2NyaXRlcmlvbl0udHJpbSA/IGNhc2VDcml0ZXJpYVtjcml0ZXJpb25dLnRyaW0oKSA6IGNhc2VDcml0ZXJpYVtjcml0ZXJpb25dO1xuICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNldChrZXksIHZhbHVlLnJlcGxhY2UoL+KAmS9pLCBgJ2ApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3B0aW9uczogT3B0aW9uc1R5cGUgPSB7IHBhcmFtcywgb2JzZXJ2ZTogJ2JvZHknfTtcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxufVxuXG5leHBvcnQgdHlwZSBTZWFyY2hWaWV3ID0gJ1NFQVJDSCcgfCAnV09SS0JBU0tFVCc7XG4iXX0=