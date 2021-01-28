import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../../../app/models/user-details.model';

// TODO: Write unit tests
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static userApiUrl = 'api/user/details'
  constructor(private readonly http: HttpClient) {}

  public getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(UserService.userApiUrl);
  }
}
