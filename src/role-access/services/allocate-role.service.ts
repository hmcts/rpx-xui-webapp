import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import { Actions, AllocateRoleStateData, CaseRole, Role, RoleCategory, RolesByService } from '../models';
import { CaseRoleDetails } from '../models/case-role-details.interface';
import { getAllRolesFromServices, getRoleSessionStorageKeyForServiceId, setRoles } from '../utils';

@Injectable({ providedIn: 'root' })
export class AllocateRoleService {
  public static allocateRoleBaseUrl = '/api/role-access/allocate-role';
  public static roleUrl = '/api/role-access/roles';
  public backUrl: string;
  constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) { }

  public confirmAllocation(allocateRoleStateData: AllocateRoleStateData) {
    const action: Actions = allocateRoleStateData.action;
    if (action === Actions.Allocate) {
      return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/confirm`, allocateRoleStateData);
    }
    if (action === Actions.Reallocate) {
      return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/reallocate`, allocateRoleStateData);
    }
  }

  public removeAllocation(assigmentId: string): Observable<any> {
    const body = {assigmentId};
    return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/delete`, body);
  }

  public getValidRoles(serviceIds: string[]): Observable<Role[]> {
    const storedServices = [];
    const newServices = [];
    const storedRolesByService = [];
    serviceIds.forEach(serviceId => {
      const serviceKey = getRoleSessionStorageKeyForServiceId(serviceId);
      if (this.sessionStorageService.getItem(serviceKey)) {
        storedServices.push(serviceId);
        storedRolesByService.push({service: serviceId, roles: JSON.parse(this.sessionStorageService.getItem(serviceKey))});
      } else {
        newServices.push(serviceId);
      }
    });
    // if all services are stored then return the stored caseworkers by service
    if (storedServices.length === serviceIds.length) {
      return of(getAllRolesFromServices(storedRolesByService) as Role[]);
    }
    // all serviceIds passed in as node layer getting used anyway and caseworkers also stored there
    return this.http.post<RolesByService[]>(`${AllocateRoleService.allocateRoleBaseUrl}/valid-roles`, {serviceIds}).pipe(
      tap(rolesByService => {
        rolesByService.forEach(roleListByService => {
          // for any new service, ensure that they are then stored in the session
          if (newServices.includes(roleListByService.service)) {
            setRoles(roleListByService.service, roleListByService.roles, this.sessionStorageService);
          }
        });
      }),
      map(rolesByService => {
        return getAllRolesFromServices(rolesByService);
      })
    );
  }

  public getCaseRoles(caseId: string, jurisdiction: string, caseType: string, assignmentId?: string): Observable<CaseRole[]> {
    return this.http.post<CaseRole[]>(`${AllocateRoleService.roleUrl}/post`, {caseId, jurisdiction, caseType, assignmentId});
  }

  public getCaseRolesUserDetails(userIds: string[], services: string[]): Observable<CaseRoleDetails[]> {
    return this.http.post<CaseRoleDetails[]>(`${AllocateRoleService.roleUrl}/getJudicialUsers`, {userIds, services});
  }
}
