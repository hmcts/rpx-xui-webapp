import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpError } from '../../domain/http/http-error.model';
import { HttpErrorService } from './http-error.service';
import * as i0 from "@angular/core";
export declare class HttpService {
    private readonly httpclient;
    private readonly httpErrorService;
    private static readonly HEADER_ACCEPT;
    private static readonly HEADER_CONTENT_TYPE;
    constructor(httpclient: HttpClient, httpErrorService: HttpErrorService);
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    get(url: string, options?: OptionsType, redirectIfNotAuthorised?: boolean, errorHandler?: (error: HttpErrorResponse) => HttpError): Observable<any>;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body Body for post
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    post(url: string, body: any, options?: OptionsType, redirectIfNotAuthorised?: boolean): Observable<any>;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body Body for post
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    put(url: string, body: any, options?: OptionsType): Observable<any>;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options OptionsType
     * @returns Observable<any> return value
     * @see UrlResolverService
     */
    delete(url: string, options?: OptionsType): Observable<any>;
    setDefaultValue(options?: OptionsType): OptionsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpService>;
}
export interface OptionsType {
    headers?: HttpHeaders;
    observe: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
//# sourceMappingURL=http.service.d.ts.map