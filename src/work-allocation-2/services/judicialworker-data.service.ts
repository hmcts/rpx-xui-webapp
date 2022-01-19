import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CaseRoleDetails } from '../../role-access/models/case-role-details.interface';
import { SessionStorageService } from '../../app/services';
import { JudicialWorker } from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class JudicialWorkerDataService {
  public static JUDICIAL_WORKER_URL: string = '/workallocation2/judicialworker';
  public static JUDICIAL_WORKERS_KEY: string = 'judicialworkers';
  public static roleUrl = '/api/role-access/roles';
  public constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) {}

  public getCaseRolesUserDetails(userIds: string[]): Observable<CaseRoleDetails[]> {
    return this.http.post<CaseRoleDetails[]>(`${JudicialWorkerDataService.roleUrl}/getJudicialUsers`, {userIds});
  }
}
