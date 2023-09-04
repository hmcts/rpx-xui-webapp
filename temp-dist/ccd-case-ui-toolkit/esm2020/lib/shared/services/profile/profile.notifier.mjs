import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../../domain/profile/profile.model';
import * as i0 from "@angular/core";
export class ProfileNotifier {
    constructor() {
        this.profileSource = new BehaviorSubject(new Profile());
        this.profile = this.profileSource.asObservable();
    }
    announceProfile(profile) {
        this.profileSource.next(profile);
    }
}
ProfileNotifier.ɵfac = function ProfileNotifier_Factory(t) { return new (t || ProfileNotifier)(); };
ProfileNotifier.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProfileNotifier, factory: ProfileNotifier.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfileNotifier, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5ub3RpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvcHJvZmlsZS9wcm9maWxlLm5vdGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBRzdELE1BQU0sT0FBTyxlQUFlO0lBRDVCO1FBRWtCLGtCQUFhLEdBQTZCLElBQUksZUFBZSxDQUFVLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMvRixZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQU1wRDtJQUpRLGVBQWUsQ0FBQyxPQUFnQjtRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs4RUFOVSxlQUFlO3FFQUFmLGVBQWUsV0FBZixlQUFlO3VGQUFmLGVBQWU7Y0FEM0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUHJvZmlsZSB9IGZyb20gJy4uLy4uL2RvbWFpbi9wcm9maWxlL3Byb2ZpbGUubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvZmlsZU5vdGlmaWVyIHtcbiAgcHVibGljIHJlYWRvbmx5IHByb2ZpbGVTb3VyY2U6IEJlaGF2aW9yU3ViamVjdDxQcm9maWxlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZmlsZT4obmV3IFByb2ZpbGUoKSk7XG4gIHB1YmxpYyBwcm9maWxlID0gdGhpcy5wcm9maWxlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHB1YmxpYyBhbm5vdW5jZVByb2ZpbGUocHJvZmlsZTogUHJvZmlsZSkge1xuICAgIHRoaXMucHJvZmlsZVNvdXJjZS5uZXh0KHByb2ZpbGUpO1xuICB9XG5cbn1cbiJdfQ==