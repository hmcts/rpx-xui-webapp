import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FieldTypeSanitiser {
    /**
     * This method finds dynamiclists in a form and replaces their string
     * values, with a JSON object, as below:
     * From: 'xyz'
     * To  : {
     *   value: { code:'xyz', label:'XYZ' },
     *   list_items: [
     *     { code:'xyz', label:'XYZ'},
     *     { code:'abc', label:'ABC'}
     *   ]
     * }
     * @param caseFields The CaseFields to assess.
     * @param data The data in the form.
     */
    sanitiseLists(caseFields, data) {
        if (!data || !caseFields) {
            return;
        }
        caseFields.forEach(caseField => {
            // tslint:disable-next-line:switch-default
            switch (caseField.field_type.type) {
                case FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_MULTISELECT_LIST:
                    this.convertArrayToDynamicListOutput(caseField, data);
                    break;
                case FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_RADIO_LIST:
                case FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_LIST:
                    this.convertStringToDynamicListOutput(caseField, data);
                    break;
                case FieldTypeSanitiser.FIELD_TYPE_COMPLEX:
                    this.sanitiseLists(caseField.field_type.complex_fields, data[caseField.id]);
                    break;
                case FieldTypeSanitiser.FIELD_TYPE_COLLECTION:
                    if (Array.isArray(data[caseField.id])) {
                        data[caseField.id].forEach((formElement) => {
                            this.sanitiseLists(caseField.field_type.collection_field_type.complex_fields, formElement.value);
                        });
                    }
                    break;
            }
        });
    }
    convertArrayToDynamicListOutput(field, data) {
        const values = data[field.id];
        if (Array.isArray(values)) {
            const listItems = this.getListItems(field);
            const matches = listItems.filter(item => values.map(v => v.code).indexOf(item.code) !== -1);
            data[field.id] = {
                value: matches,
                list_items: listItems
            };
        }
    }
    convertStringToDynamicListOutput(field, data) {
        const stringValue = data[field.id];
        if (typeof stringValue === 'string') {
            const listItems = this.getListItems(field);
            const matches = listItems.filter(value => value.code === stringValue);
            if (matches && matches.length > 0) {
                data[field.id] = {
                    value: matches[0],
                    list_items: listItems
                };
            }
        }
    }
    getListItems(field) {
        if (field) {
            if (field.list_items) {
                return field.list_items;
            }
            if (field.formatted_value && field.formatted_value.list_items) {
                return field.formatted_value.list_items;
            }
        }
        return [];
    }
}
FieldTypeSanitiser.FIELD_TYPE_COMPLEX = 'Complex';
FieldTypeSanitiser.FIELD_TYPE_COLLECTION = 'Collection';
FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_LIST = 'DynamicList';
FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_RADIO_LIST = 'DynamicRadioList';
FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_MULTISELECT_LIST = 'DynamicMultiSelectList';
FieldTypeSanitiser.ɵfac = function FieldTypeSanitiser_Factory(t) { return new (t || FieldTypeSanitiser)(); };
FieldTypeSanitiser.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FieldTypeSanitiser, factory: FieldTypeSanitiser.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldTypeSanitiser, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdHlwZS1zYW5pdGlzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3NlcnZpY2VzL2Zvcm0vZmllbGQtdHlwZS1zYW5pdGlzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLGtCQUFrQjtJQU03Qjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0ssYUFBYSxDQUFDLFVBQXVCLEVBQUUsSUFBUztRQUN0RCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDN0IsMENBQTBDO1lBQzFDLFFBQVEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pDLEtBQUssa0JBQWtCLENBQUMsbUNBQW1DO29CQUN6RCxJQUFJLENBQUMsK0JBQStCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN0RCxNQUFNO2dCQUNSLEtBQUssa0JBQWtCLENBQUMsNkJBQTZCLENBQUM7Z0JBQ3RELEtBQUssa0JBQWtCLENBQUMsdUJBQXVCO29CQUM3QyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN2RCxNQUFNO2dCQUVSLEtBQUssa0JBQWtCLENBQUMsa0JBQWtCO29CQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDNUUsTUFBTTtnQkFFUixLQUFLLGtCQUFrQixDQUFDLHFCQUFxQjtvQkFDM0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTt3QkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFnQixFQUFFLEVBQUU7NEJBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNuRyxDQUFDLENBQUMsQ0FBQztxQkFDSjtvQkFDRCxNQUFNO2FBQ1Q7UUFFSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywrQkFBK0IsQ0FBQyxLQUFnQixFQUFFLElBQVM7UUFDakUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU5QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDZixLQUFLLEVBQUUsT0FBTztnQkFDZCxVQUFVLEVBQUUsU0FBUzthQUN0QixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sZ0NBQWdDLENBQUMsS0FBZ0IsRUFBRSxJQUFTO1FBQ2xFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDbkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQztZQUN0RSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRztvQkFDZixLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDakIsVUFBVSxFQUFFLFNBQVM7aUJBQ3RCLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFnQjtRQUNuQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxLQUFLLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFO2dCQUM3RCxPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO2FBQ3pDO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7O0FBeEZzQixxQ0FBa0IsR0FBa0IsU0FBUyxDQUFDO0FBQzlDLHdDQUFxQixHQUFrQixZQUFZLENBQUM7QUFDcEQsMENBQXVCLEdBQWtCLGFBQWEsQ0FBQztBQUN2RCxnREFBNkIsR0FBa0Isa0JBQWtCLENBQUM7QUFDbEUsc0RBQW1DLEdBQWtCLHdCQUF3QixDQUFDO29GQUwxRixrQkFBa0I7d0VBQWxCLGtCQUFrQixXQUFsQixrQkFBa0I7dUZBQWxCLGtCQUFrQjtjQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZFR5cGVFbnVtIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vZmllbGQtdHlwZS1lbnVtLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpZWxkVHlwZVNhbml0aXNlciB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRklFTERfVFlQRV9DT01QTEVYOiBGaWVsZFR5cGVFbnVtID0gJ0NvbXBsZXgnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEZJRUxEX1RZUEVfQ09MTEVDVElPTjogRmllbGRUeXBlRW51bSA9ICdDb2xsZWN0aW9uJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBGSUVMRF9UWVBFX0RZTkFNSUNfTElTVDogRmllbGRUeXBlRW51bSA9ICdEeW5hbWljTGlzdCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRklFTERfVFlQRV9EWU5BTUlDX1JBRElPX0xJU1Q6IEZpZWxkVHlwZUVudW0gPSAnRHluYW1pY1JhZGlvTGlzdCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRklFTERfVFlQRV9EWU5BTUlDX01VTFRJU0VMRUNUX0xJU1Q6IEZpZWxkVHlwZUVudW0gPSAnRHluYW1pY011bHRpU2VsZWN0TGlzdCc7XG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBmaW5kcyBkeW5hbWljbGlzdHMgaW4gYSBmb3JtIGFuZCByZXBsYWNlcyB0aGVpciBzdHJpbmdcbiAgICogdmFsdWVzLCB3aXRoIGEgSlNPTiBvYmplY3QsIGFzIGJlbG93OlxuICAgKiBGcm9tOiAneHl6J1xuICAgKiBUbyAgOiB7XG4gICAqICAgdmFsdWU6IHsgY29kZToneHl6JywgbGFiZWw6J1hZWicgfSxcbiAgICogICBsaXN0X2l0ZW1zOiBbXG4gICAqICAgICB7IGNvZGU6J3h5eicsIGxhYmVsOidYWVonfSxcbiAgICogICAgIHsgY29kZTonYWJjJywgbGFiZWw6J0FCQyd9XG4gICAqICAgXVxuICAgKiB9XG4gICAqIEBwYXJhbSBjYXNlRmllbGRzIFRoZSBDYXNlRmllbGRzIHRvIGFzc2Vzcy5cbiAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgaW4gdGhlIGZvcm0uXG4gICAqL1xuICAgcHVibGljIHNhbml0aXNlTGlzdHMoY2FzZUZpZWxkczogQ2FzZUZpZWxkW10sIGRhdGE6IGFueSkge1xuICAgIGlmICghZGF0YSB8fCAhY2FzZUZpZWxkcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYXNlRmllbGRzLmZvckVhY2goY2FzZUZpZWxkID0+IHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzd2l0Y2gtZGVmYXVsdFxuICAgICAgc3dpdGNoIChjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlKSB7XG4gICAgICAgIGNhc2UgRmllbGRUeXBlU2FuaXRpc2VyLkZJRUxEX1RZUEVfRFlOQU1JQ19NVUxUSVNFTEVDVF9MSVNUOlxuICAgICAgICAgIHRoaXMuY29udmVydEFycmF5VG9EeW5hbWljTGlzdE91dHB1dChjYXNlRmllbGQsIGRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEZpZWxkVHlwZVNhbml0aXNlci5GSUVMRF9UWVBFX0RZTkFNSUNfUkFESU9fTElTVDpcbiAgICAgICAgY2FzZSBGaWVsZFR5cGVTYW5pdGlzZXIuRklFTERfVFlQRV9EWU5BTUlDX0xJU1Q6XG4gICAgICAgICAgdGhpcy5jb252ZXJ0U3RyaW5nVG9EeW5hbWljTGlzdE91dHB1dChjYXNlRmllbGQsIGRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgRmllbGRUeXBlU2FuaXRpc2VyLkZJRUxEX1RZUEVfQ09NUExFWDpcbiAgICAgICAgICB0aGlzLnNhbml0aXNlTGlzdHMoY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMsIGRhdGFbY2FzZUZpZWxkLmlkXSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBGaWVsZFR5cGVTYW5pdGlzZXIuRklFTERfVFlQRV9DT0xMRUNUSU9OOlxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFbY2FzZUZpZWxkLmlkXSkpIHtcbiAgICAgICAgICAgIGRhdGFbY2FzZUZpZWxkLmlkXS5mb3JFYWNoKChmb3JtRWxlbWVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2FuaXRpc2VMaXN0cyhjYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMsIGZvcm1FbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0QXJyYXlUb0R5bmFtaWNMaXN0T3V0cHV0KGZpZWxkOiBDYXNlRmllbGQsIGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlcyA9IGRhdGFbZmllbGQuaWRdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgY29uc3QgbGlzdEl0ZW1zID0gdGhpcy5nZXRMaXN0SXRlbXMoZmllbGQpO1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IGxpc3RJdGVtcy5maWx0ZXIoaXRlbSA9PiB2YWx1ZXMubWFwKHYgPT4gdi5jb2RlKS5pbmRleE9mKGl0ZW0uY29kZSkgIT09IC0xKTtcblxuICAgICAgZGF0YVtmaWVsZC5pZF0gPSB7XG4gICAgICAgIHZhbHVlOiBtYXRjaGVzLFxuICAgICAgICBsaXN0X2l0ZW1zOiBsaXN0SXRlbXNcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0U3RyaW5nVG9EeW5hbWljTGlzdE91dHB1dChmaWVsZDogQ2FzZUZpZWxkLCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IGRhdGFbZmllbGQuaWRdO1xuICAgIGlmICh0eXBlb2Ygc3RyaW5nVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBsaXN0SXRlbXMgPSB0aGlzLmdldExpc3RJdGVtcyhmaWVsZCk7XG4gICAgICBjb25zdCBtYXRjaGVzID0gbGlzdEl0ZW1zLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZS5jb2RlID09PSBzdHJpbmdWYWx1ZSk7XG4gICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGF0YVtmaWVsZC5pZF0gPSB7XG4gICAgICAgICAgdmFsdWU6IG1hdGNoZXNbMF0sXG4gICAgICAgICAgbGlzdF9pdGVtczogbGlzdEl0ZW1zXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRMaXN0SXRlbXMoZmllbGQ6IENhc2VGaWVsZCk6IGFueVtdIHtcbiAgICBpZiAoZmllbGQpIHtcbiAgICAgIGlmIChmaWVsZC5saXN0X2l0ZW1zKSB7XG4gICAgICAgIHJldHVybiBmaWVsZC5saXN0X2l0ZW1zO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiBmaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcykge1xuICAgICAgICByZXR1cm4gZmllbGQuZm9ybWF0dGVkX3ZhbHVlLmxpc3RfaXRlbXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19