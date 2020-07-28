import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// TODO: Write unit tests
@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private readonly http: HttpClient) {}

    public getUserDetails(): Observable<boolean> {
        return this.http.get<boolean>(`api/user/details`);
    }
}
