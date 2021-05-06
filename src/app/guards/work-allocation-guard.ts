import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { WorkAllocationFeatureService } from '../../work-allocation-2/services/work-allocation-feature.service';

@Injectable({
    providedIn: 'root'
})
export class WorkAllocationGuard implements CanActivate {
    constructor(private readonly service: WorkAllocationFeatureService) {}
    public canActivate(): Observable<boolean> {
        return this.service.getActiveWAFeature().pipe(map(currentFeatureName => currentFeatureName === 'WorkAllocationRelease2'));
    }
}
