import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class JwtDecodeWrapper {
    public decode<T = any>(jwt: string): T {
        return jwtDecode(jwt);
    }
}
