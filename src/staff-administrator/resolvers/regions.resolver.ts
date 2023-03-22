import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Region } from '../../work-allocation/models/dtos';
import { LocationDataService } from '../../work-allocation/services';

@Injectable({
  providedIn: 'root'
})
export class RegionResolver implements Resolve<Region[]> {

  constructor(private locationService: LocationDataService) {
  }

  public resolve(route?: ActivatedRouteSnapshot) {
    return this.locationService.getRegions();
  }
}