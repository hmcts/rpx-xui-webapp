import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import { JudicialWorker } from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class JudicialWorkerDataService {
  public static JUDICIAL_WORKER_URL: string = '/workallocation2/judicialworker';
  public static JUDICIAL_WORKERS_KEY: string = 'judicialworkers';
  public constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) {}

  public getAll(): Observable<JudicialWorker[]> {
    if (this.sessionStorageService.getItem(JudicialWorkerDataService.JUDICIAL_WORKERS_KEY)) {
      const judicialWorkers = JSON.parse(this.sessionStorageService.getItem(JudicialWorkerDataService.JUDICIAL_WORKERS_KEY));
      return of(judicialWorkers as JudicialWorker[]);
    }
    return this.http.get<JudicialWorker[]>(JudicialWorkerDataService.JUDICIAL_WORKER_URL).pipe(
      tap(judicialWorkers => this.sessionStorageService.setItem(JudicialWorkerDataService.JUDICIAL_WORKERS_KEY, JSON.stringify(judicialWorkers)))
    );
  }
}
