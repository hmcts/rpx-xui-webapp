import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LogOutKeepAliveService {
  constructor(private http: HttpClient) { }

  logOut(): Observable<any> {
    return this.http.get('api/logout');
  }

  heartBeat(): Observable<any> {
    return this.http.get('auth/keepalive');
  }
}
