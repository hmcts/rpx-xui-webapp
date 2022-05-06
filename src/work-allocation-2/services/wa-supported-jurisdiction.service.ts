import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WASupportedJurisdictionsService {
  public static jurisdictionUrl: string = '/api/wa-supported-jurisdiction/get';
  public constructor(private readonly http: HttpClient) {}

  public getWASupportedJurisdictions(): Observable<string[]> {
    return this.http.get<string[]>(WASupportedJurisdictionsService.jurisdictionUrl);
  }
  public testService(): Observable<any> {
    return this.http.post<any>('/api/task/createTask', {caseId: '1641997006934665', jurisdiction: 'IA', caseType: 'asylum'});
  }
}
