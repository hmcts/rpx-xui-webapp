import { Injectable } from '@angular/core';
import { ShowCondition } from '../../../directives/conditional-show/domain/conditional-show.model';
import * as i0 from "@angular/core";
export class WizardPageFieldToCaseFieldMapper {
    mapAll(wizardPageFields, caseFields) {
        return wizardPageFields.map(wizardField => {
            return this.map(wizardField, caseFields);
        });
    }
    map(wizardPageField, caseFields) {
        const caseField = caseFields.find(e => e.id === wizardPageField.case_field_id);
        caseField.wizardProps = wizardPageField;
        caseField.order = wizardPageField.order;
        this.fixShowConditionPath(caseField, '');
        if (wizardPageField.complex_field_overrides && wizardPageField.complex_field_overrides.length > 0) {
            wizardPageField.complex_field_overrides.forEach((override) => {
                this.processComplexFieldOverride(override, caseField, caseFields);
            });
        }
        // this will fix the CaseLink type as we exclude it in ccdFieldsFilter directive
        this.hideParentIfAllChildrenHidden(caseField);
        return caseField;
    }
    processComplexFieldOverride(override, caseField, caseFields) {
        const caseFieldIds = override.complex_field_element_id.split('.');
        let caseFieldLeaf;
        const children = this.getCaseFieldChildren(caseField);
        if (children.length > 0) {
            const [_, ...tail] = caseFieldIds;
            caseFieldLeaf = this.getCaseFieldLeaf(tail, children);
        }
        else {
            caseFieldLeaf = this.getCaseFieldLeaf(caseFieldIds, caseFields);
        }
        if (override.display_context !== 'HIDDEN') {
            caseFieldLeaf.hidden = false;
            caseFieldLeaf.display_context = override.display_context;
            if (override.label && override.label.length > 0) {
                caseFieldLeaf.label = override.label;
            }
            if (override.hint_text && override.hint_text.length > 0) {
                caseFieldLeaf.hint_text = override.hint_text;
            }
            if (override.show_condition && override.show_condition.length > 0) {
                caseFieldLeaf.show_condition = override.show_condition;
            }
        }
        else {
            caseFieldLeaf.hidden = true;
            caseFieldLeaf.display_context = override.display_context;
        }
    }
    fixShowConditionPath(caseField, pathPrefix) {
        if (caseField.show_condition) {
            caseField.show_condition = ShowCondition.addPathPrefixToCondition(caseField.show_condition, pathPrefix);
        }
        const childrenCaseFields = this.getCaseFieldChildren(caseField);
        childrenCaseFields.forEach(collectionCaseField => {
            this.fixShowConditionPath(collectionCaseField, this.preparePathPrefix(pathPrefix, caseField.id));
        });
    }
    preparePathPrefix(pathPrefix, caseField) {
        return pathPrefix.length === 0 ? caseField : `${pathPrefix}.${caseField}`;
    }
    getCaseFieldLeaf(caseFieldId, caseFields) {
        const [head, ...tail] = caseFieldId;
        if (caseFieldId.length === 1) {
            const caseLeaf = caseFields.find(e => e.id === head);
            if (!caseLeaf) {
                throw new Error(`Cannot find leaf for caseFieldId ${caseFieldId.join('.')}`);
            }
            return caseLeaf;
        }
        else if (caseFieldId.length > 1) {
            const caseField = caseFields.find(e => e.id === head);
            const children = this.getCaseFieldChildren(caseField);
            if (children.length === 0) {
                throw new Error(`field_type or complex_fields missing for ${caseFieldId.join('.')}`);
            }
            return this.getCaseFieldLeaf(tail, children);
        }
        else {
            throw new Error(`Cannot find leaf for caseFieldId ${caseFieldId.join('.')}`);
        }
    }
    hideParentIfAllChildrenHidden(caseField) {
        const childrenCaseFields = this.getCaseFieldChildren(caseField);
        childrenCaseFields.forEach(e => this.hideParentIfAllChildrenHidden(e));
        if (childrenCaseFields.length > 0 && this.allCaseFieldsHidden(childrenCaseFields)) {
            caseField.hidden = true;
        }
    }
    getCaseFieldChildren(caseField) {
        let childrenCaseFields = [];
        if (caseField.isCollection()) {
            childrenCaseFields = caseField.field_type.collection_field_type.complex_fields || [];
        }
        else if (caseField.isComplex()) {
            childrenCaseFields = caseField.field_type.complex_fields || [];
        }
        return childrenCaseFields;
    }
    allCaseFieldsHidden(children) {
        return !children.some(e => e.hidden !== true);
    }
}
WizardPageFieldToCaseFieldMapper.ɵfac = function WizardPageFieldToCaseFieldMapper_Factory(t) { return new (t || WizardPageFieldToCaseFieldMapper)(); };
WizardPageFieldToCaseFieldMapper.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WizardPageFieldToCaseFieldMapper, factory: WizardPageFieldToCaseFieldMapper.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WizardPageFieldToCaseFieldMapper, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXBhZ2UtZmllbGQtdG8tY2FzZS1maWVsZC5tYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3Ivc2VydmljZXMvd2l6YXJkLXBhZ2UtZmllbGQtdG8tY2FzZS1maWVsZC5tYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0VBQW9FLENBQUM7O0FBUW5HLE1BQU0sT0FBTyxnQ0FBZ0M7SUFDcEMsTUFBTSxDQUFDLGdCQUFtQyxFQUFFLFVBQXVCO1FBQ3hFLE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sR0FBRyxDQUFDLGVBQWdDLEVBQUUsVUFBdUI7UUFDbkUsTUFBTSxTQUFTLEdBQWMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFGLFNBQVMsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUV4QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXpDLElBQUksZUFBZSxDQUFDLHVCQUF1QixJQUFJLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pHLGVBQWUsQ0FBQyx1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QUFTLENBQUMsQ0FBQztRQUVoRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RSxJQUFJLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDakYsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU8sb0JBQW9CLENBQUMsU0FBb0I7UUFDL0MsSUFBSSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDNUIsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO1NBQ3RGO2FBQU0sSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDaEMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO1NBQ2hFO1FBQ0QsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBRU8sbUJBQW1CLENBQUMsUUFBcUI7UUFDL0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7O2dIQXBIVSxnQ0FBZ0M7c0ZBQWhDLGdDQUFnQyxXQUFoQyxnQ0FBZ0MsbUJBRi9CLE1BQU07dUZBRVAsZ0NBQWdDO2NBSDVDLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dDb25kaXRpb24gfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL2NvbmRpdGlvbmFsLXNob3cvZG9tYWluL2NvbmRpdGlvbmFsLXNob3cubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBDb21wbGV4RmllbGRPdmVycmlkZSB9IGZyb20gJy4uL2RvbWFpbi93aXphcmQtcGFnZS1maWVsZC1jb21wbGV4LW92ZXJyaWRlLm1vZGVsJztcbmltcG9ydCB7IFdpemFyZFBhZ2VGaWVsZCB9IGZyb20gJy4uL2RvbWFpbi93aXphcmQtcGFnZS1maWVsZC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBXaXphcmRQYWdlRmllbGRUb0Nhc2VGaWVsZE1hcHBlciB7XG4gIHB1YmxpYyBtYXBBbGwod2l6YXJkUGFnZUZpZWxkczogV2l6YXJkUGFnZUZpZWxkW10sIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdKTogQ2FzZUZpZWxkW10ge1xuICAgIHJldHVybiB3aXphcmRQYWdlRmllbGRzLm1hcCh3aXphcmRGaWVsZCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAod2l6YXJkRmllbGQsIGNhc2VGaWVsZHMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXAod2l6YXJkUGFnZUZpZWxkOiBXaXphcmRQYWdlRmllbGQsIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdKTogQ2FzZUZpZWxkIHtcbiAgICBjb25zdCBjYXNlRmllbGQ6IENhc2VGaWVsZCA9IGNhc2VGaWVsZHMuZmluZChlID0+IGUuaWQgPT09IHdpemFyZFBhZ2VGaWVsZC5jYXNlX2ZpZWxkX2lkKTtcbiAgICBjYXNlRmllbGQud2l6YXJkUHJvcHMgPSB3aXphcmRQYWdlRmllbGQ7XG4gICAgY2FzZUZpZWxkLm9yZGVyID0gd2l6YXJkUGFnZUZpZWxkLm9yZGVyO1xuXG4gICAgdGhpcy5maXhTaG93Q29uZGl0aW9uUGF0aChjYXNlRmllbGQsICcnKTtcblxuICAgIGlmICh3aXphcmRQYWdlRmllbGQuY29tcGxleF9maWVsZF9vdmVycmlkZXMgJiYgd2l6YXJkUGFnZUZpZWxkLmNvbXBsZXhfZmllbGRfb3ZlcnJpZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHdpemFyZFBhZ2VGaWVsZC5jb21wbGV4X2ZpZWxkX292ZXJyaWRlcy5mb3JFYWNoKChvdmVycmlkZTogQ29tcGxleEZpZWxkT3ZlcnJpZGUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29tcGxleEZpZWxkT3ZlcnJpZGUob3ZlcnJpZGUsIGNhc2VGaWVsZCwgY2FzZUZpZWxkcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIHdpbGwgZml4IHRoZSBDYXNlTGluayB0eXBlIGFzIHdlIGV4Y2x1ZGUgaXQgaW4gY2NkRmllbGRzRmlsdGVyIGRpcmVjdGl2ZVxuICAgIHRoaXMuaGlkZVBhcmVudElmQWxsQ2hpbGRyZW5IaWRkZW4oY2FzZUZpZWxkKTtcblxuICAgIHJldHVybiBjYXNlRmllbGQ7XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NDb21wbGV4RmllbGRPdmVycmlkZShvdmVycmlkZTogQ29tcGxleEZpZWxkT3ZlcnJpZGUsIGNhc2VGaWVsZDogQ2FzZUZpZWxkLCBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSkge1xuICAgIGNvbnN0IGNhc2VGaWVsZElkcyA9IG92ZXJyaWRlLmNvbXBsZXhfZmllbGRfZWxlbWVudF9pZC5zcGxpdCgnLicpO1xuICAgIGxldCBjYXNlRmllbGRMZWFmOiBDYXNlRmllbGQ7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZ2V0Q2FzZUZpZWxkQ2hpbGRyZW4oY2FzZUZpZWxkKTtcblxuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBbXywgLi4udGFpbF0gPSBjYXNlRmllbGRJZHM7XG4gICAgICBjYXNlRmllbGRMZWFmID0gdGhpcy5nZXRDYXNlRmllbGRMZWFmKHRhaWwsIGNoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FzZUZpZWxkTGVhZiA9IHRoaXMuZ2V0Q2FzZUZpZWxkTGVhZihjYXNlRmllbGRJZHMsIGNhc2VGaWVsZHMpO1xuICAgIH1cblxuICAgIGlmIChvdmVycmlkZS5kaXNwbGF5X2NvbnRleHQgIT09ICdISURERU4nKSB7XG4gICAgICBjYXNlRmllbGRMZWFmLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgY2FzZUZpZWxkTGVhZi5kaXNwbGF5X2NvbnRleHQgPSBvdmVycmlkZS5kaXNwbGF5X2NvbnRleHQ7XG4gICAgICBpZiAob3ZlcnJpZGUubGFiZWwgJiYgb3ZlcnJpZGUubGFiZWwubGVuZ3RoID4gMCkge1xuICAgICAgICBjYXNlRmllbGRMZWFmLmxhYmVsID0gb3ZlcnJpZGUubGFiZWw7XG4gICAgICB9XG4gICAgICBpZiAob3ZlcnJpZGUuaGludF90ZXh0ICYmIG92ZXJyaWRlLmhpbnRfdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNhc2VGaWVsZExlYWYuaGludF90ZXh0ID0gb3ZlcnJpZGUuaGludF90ZXh0O1xuICAgICAgfVxuICAgICAgaWYgKG92ZXJyaWRlLnNob3dfY29uZGl0aW9uICYmIG92ZXJyaWRlLnNob3dfY29uZGl0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2FzZUZpZWxkTGVhZi5zaG93X2NvbmRpdGlvbiA9IG92ZXJyaWRlLnNob3dfY29uZGl0aW9uO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYXNlRmllbGRMZWFmLmhpZGRlbiA9IHRydWU7XG4gICAgICBjYXNlRmllbGRMZWFmLmRpc3BsYXlfY29udGV4dCA9IG92ZXJyaWRlLmRpc3BsYXlfY29udGV4dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpeFNob3dDb25kaXRpb25QYXRoKGNhc2VGaWVsZDogQ2FzZUZpZWxkLCBwYXRoUHJlZml4OiBzdHJpbmcpIHtcbiAgICBpZiAoY2FzZUZpZWxkLnNob3dfY29uZGl0aW9uKSB7XG4gICAgICBjYXNlRmllbGQuc2hvd19jb25kaXRpb24gPSBTaG93Q29uZGl0aW9uLmFkZFBhdGhQcmVmaXhUb0NvbmRpdGlvbihjYXNlRmllbGQuc2hvd19jb25kaXRpb24sIHBhdGhQcmVmaXgpO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuQ2FzZUZpZWxkcyA9IHRoaXMuZ2V0Q2FzZUZpZWxkQ2hpbGRyZW4oY2FzZUZpZWxkKTtcblxuICAgIGNoaWxkcmVuQ2FzZUZpZWxkcy5mb3JFYWNoKGNvbGxlY3Rpb25DYXNlRmllbGQgPT4ge1xuICAgICAgdGhpcy5maXhTaG93Q29uZGl0aW9uUGF0aChjb2xsZWN0aW9uQ2FzZUZpZWxkLCB0aGlzLnByZXBhcmVQYXRoUHJlZml4KHBhdGhQcmVmaXgsIGNhc2VGaWVsZC5pZCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUGF0aFByZWZpeChwYXRoUHJlZml4OiBzdHJpbmcsIGNhc2VGaWVsZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhdGhQcmVmaXgubGVuZ3RoID09PSAwID8gY2FzZUZpZWxkIDogYCR7cGF0aFByZWZpeH0uJHtjYXNlRmllbGR9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2FzZUZpZWxkTGVhZihjYXNlRmllbGRJZDogc3RyaW5nW10sIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdKTogQ2FzZUZpZWxkIHtcbiAgICBjb25zdCBbaGVhZCwgLi4udGFpbF0gPSBjYXNlRmllbGRJZDtcbiAgICBpZiAoY2FzZUZpZWxkSWQubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjYXNlTGVhZiA9IGNhc2VGaWVsZHMuZmluZChlID0+IGUuaWQgPT09IGhlYWQpO1xuICAgICAgaWYgKCFjYXNlTGVhZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGxlYWYgZm9yIGNhc2VGaWVsZElkICR7Y2FzZUZpZWxkSWQuam9pbignLicpfWApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhc2VMZWFmO1xuICAgIH0gZWxzZSBpZiAoY2FzZUZpZWxkSWQubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgY2FzZUZpZWxkID0gY2FzZUZpZWxkcy5maW5kKGUgPT4gZS5pZCA9PT0gaGVhZCk7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZ2V0Q2FzZUZpZWxkQ2hpbGRyZW4oY2FzZUZpZWxkKTtcblxuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZpZWxkX3R5cGUgb3IgY29tcGxleF9maWVsZHMgbWlzc2luZyBmb3IgJHtjYXNlRmllbGRJZC5qb2luKCcuJyl9YCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5nZXRDYXNlRmllbGRMZWFmKHRhaWwsIGNoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBsZWFmIGZvciBjYXNlRmllbGRJZCAke2Nhc2VGaWVsZElkLmpvaW4oJy4nKX1gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGVQYXJlbnRJZkFsbENoaWxkcmVuSGlkZGVuKGNhc2VGaWVsZDogQ2FzZUZpZWxkKSB7XG4gICAgY29uc3QgY2hpbGRyZW5DYXNlRmllbGRzID0gdGhpcy5nZXRDYXNlRmllbGRDaGlsZHJlbihjYXNlRmllbGQpO1xuXG4gICAgY2hpbGRyZW5DYXNlRmllbGRzLmZvckVhY2goZSA9PiB0aGlzLmhpZGVQYXJlbnRJZkFsbENoaWxkcmVuSGlkZGVuKGUpKTtcblxuICAgIGlmIChjaGlsZHJlbkNhc2VGaWVsZHMubGVuZ3RoID4gMCAmJiB0aGlzLmFsbENhc2VGaWVsZHNIaWRkZW4oY2hpbGRyZW5DYXNlRmllbGRzKSkge1xuICAgICAgY2FzZUZpZWxkLmhpZGRlbiA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXNlRmllbGRDaGlsZHJlbihjYXNlRmllbGQ6IENhc2VGaWVsZCkge1xuICAgIGxldCBjaGlsZHJlbkNhc2VGaWVsZHMgPSBbXTtcbiAgICBpZiAoY2FzZUZpZWxkLmlzQ29sbGVjdGlvbigpKSB7XG4gICAgICBjaGlsZHJlbkNhc2VGaWVsZHMgPSBjYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMgfHwgW107XG4gICAgfSBlbHNlIGlmIChjYXNlRmllbGQuaXNDb21wbGV4KCkpIHtcbiAgICAgIGNoaWxkcmVuQ2FzZUZpZWxkcyA9IGNhc2VGaWVsZC5maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzIHx8IFtdO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW5DYXNlRmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBhbGxDYXNlRmllbGRzSGlkZGVuKGNoaWxkcmVuOiBDYXNlRmllbGRbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhY2hpbGRyZW4uc29tZShlID0+IGUuaGlkZGVuICE9PSB0cnVlKTtcbiAgfVxufVxuIl19