import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WASupportedRoleDetailsService {
  public static readonly roleDetailsUrl: string = '/api/wa-supported-role-details';
  public constructor(private readonly http: HttpClient) {}

  public getWASupportedRoleCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${WASupportedRoleDetailsService.roleDetailsUrl}/getRoleCategories`);
  }

  public getWASupportedRoleTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${WASupportedRoleDetailsService.roleDetailsUrl}/getRoleTypes`);
  }
}
