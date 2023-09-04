import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class WebComponentHttpClient {
    private http;
    private meta;
    constructor(http: HttpClient, meta: Meta);
    post(url: string, body: any | null, options?: any): Observable<any>;
    put(url: string, body: any | null, options?: any): Observable<any>;
    get(url: string, options?: any): Observable<any>;
    delete(url: string, options?: any): Observable<any>;
    patch(url: string, body: any | null, options?: any): Observable<any>;
    addHeaders(options: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebComponentHttpClient, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WebComponentHttpClient>;
}
//# sourceMappingURL=webcomponent.http.client.d.ts.map