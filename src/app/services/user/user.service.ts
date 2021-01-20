import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../../../app/store/reducers/app-config.reducer';

// TODO: Write unit tests
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  public getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`api/user/details`);
  }
}
