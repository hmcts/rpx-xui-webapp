import * as jwtDecode from 'jwt-decode';

export class JwtDecodeWrapper {
    decode(jwt: string): any {
        return jwtDecode(jwt);
    }
}
