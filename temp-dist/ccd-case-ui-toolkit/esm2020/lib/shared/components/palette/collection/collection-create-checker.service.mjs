import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CollectionCreateCheckerService {
    setDisplayContextForChildren(caseField, profile) {
        const children = this.getCaseFieldChildren(caseField);
        if (children && children.length > 0) {
            children.forEach(child => {
                if (!!profile.user.idam.roles.find(role => this.hasCreateAccess(child, role))) {
                    child.display_context = caseField.display_context;
                }
                if (this.isCollection(child) || this.isComplex(child)) {
                    this.setDisplayContextForChildren(child, profile);
                }
            });
        }
    }
    getCaseFieldChildren(caseField) {
        let childrenCaseFields = [];
        if (this.isCollection(caseField)) {
            childrenCaseFields = caseField.field_type.collection_field_type.complex_fields || [];
        }
        else if (this.isComplex(caseField)) {
            childrenCaseFields = caseField.field_type.complex_fields || [];
        }
        return childrenCaseFields;
    }
    isComplex(caseField) {
        return caseField.field_type.type === 'Complex';
    }
    isCollection(caseField) {
        return caseField.field_type.type === 'Collection';
    }
    hasCreateAccess(caseField, role) {
        return !!caseField.acls.find(acl => acl.role === role && acl.create === true);
    }
}
CollectionCreateCheckerService.ɵfac = function CollectionCreateCheckerService_Factory(t) { return new (t || CollectionCreateCheckerService)(); };
CollectionCreateCheckerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CollectionCreateCheckerService, factory: CollectionCreateCheckerService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CollectionCreateCheckerService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1jcmVhdGUtY2hlY2tlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY29sbGVjdGlvbi9jb2xsZWN0aW9uLWNyZWF0ZS1jaGVja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLDhCQUE4QjtJQUNsQyw0QkFBNEIsQ0FBQyxTQUFvQixFQUFFLE9BQWdCO1FBQ3hFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0RCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDN0UsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDO2lCQUNuRDtnQkFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDckQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDbkQ7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFNBQW9CO1FBQy9DLElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoQyxrQkFBa0IsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUM7U0FDdEY7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO1NBQ2hFO1FBQ0QsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBRU8sU0FBUyxDQUFDLFNBQW9CO1FBQ3BDLE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQ2pELENBQUM7SUFFTyxZQUFZLENBQUMsU0FBb0I7UUFDdkMsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUM7SUFDcEQsQ0FBQztJQUVPLGVBQWUsQ0FBQyxTQUFvQixFQUFFLElBQVM7UUFDckQsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7OzRHQXBDVSw4QkFBOEI7b0ZBQTlCLDhCQUE4QixXQUE5Qiw4QkFBOEI7dUZBQTlCLDhCQUE4QjtjQUQxQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24nO1xuaW1wb3J0IHsgUHJvZmlsZSB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9wcm9maWxlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25DcmVhdGVDaGVja2VyU2VydmljZSB7XG4gIHB1YmxpYyBzZXREaXNwbGF5Q29udGV4dEZvckNoaWxkcmVuKGNhc2VGaWVsZDogQ2FzZUZpZWxkLCBwcm9maWxlOiBQcm9maWxlKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmdldENhc2VGaWVsZENoaWxkcmVuKGNhc2VGaWVsZCk7XG5cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGlmICghIXByb2ZpbGUudXNlci5pZGFtLnJvbGVzLmZpbmQocm9sZSA9PiB0aGlzLmhhc0NyZWF0ZUFjY2VzcyhjaGlsZCwgcm9sZSkpKSB7XG4gICAgICAgICAgY2hpbGQuZGlzcGxheV9jb250ZXh0ID0gY2FzZUZpZWxkLmRpc3BsYXlfY29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0NvbGxlY3Rpb24oY2hpbGQpIHx8IHRoaXMuaXNDb21wbGV4KGNoaWxkKSkge1xuICAgICAgICAgIHRoaXMuc2V0RGlzcGxheUNvbnRleHRGb3JDaGlsZHJlbihjaGlsZCwgcHJvZmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2FzZUZpZWxkQ2hpbGRyZW4oY2FzZUZpZWxkOiBDYXNlRmllbGQpOiBDYXNlRmllbGRbXSB7XG4gICAgbGV0IGNoaWxkcmVuQ2FzZUZpZWxkcyA9IFtdO1xuICAgIGlmICh0aGlzLmlzQ29sbGVjdGlvbihjYXNlRmllbGQpKSB7XG4gICAgICBjaGlsZHJlbkNhc2VGaWVsZHMgPSBjYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMgfHwgW107XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzQ29tcGxleChjYXNlRmllbGQpKSB7XG4gICAgICBjaGlsZHJlbkNhc2VGaWVsZHMgPSBjYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcyB8fCBbXTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuQ2FzZUZpZWxkcztcbiAgfVxuXG4gIHByaXZhdGUgaXNDb21wbGV4KGNhc2VGaWVsZDogQ2FzZUZpZWxkKSB7XG4gICAgcmV0dXJuIGNhc2VGaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdDb21wbGV4JztcbiAgfVxuXG4gIHByaXZhdGUgaXNDb2xsZWN0aW9uKGNhc2VGaWVsZDogQ2FzZUZpZWxkKSB7XG4gICAgcmV0dXJuIGNhc2VGaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdDb2xsZWN0aW9uJztcbiAgfVxuXG4gIHByaXZhdGUgaGFzQ3JlYXRlQWNjZXNzKGNhc2VGaWVsZDogQ2FzZUZpZWxkLCByb2xlOiBhbnkpIHtcbiAgICByZXR1cm4gISFjYXNlRmllbGQuYWNscy5maW5kKCBhY2wgPT4gYWNsLnJvbGUgPT09IHJvbGUgJiYgYWNsLmNyZWF0ZSA9PT0gdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==