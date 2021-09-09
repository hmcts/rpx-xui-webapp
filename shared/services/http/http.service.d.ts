import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpError } from '../../domain/http';
import { HttpErrorService } from './http-error.service';
export declare class HttpService {
    private httpclient;
    private httpErrorService;
    private static readonly HEADER_ACCEPT;
    private static readonly HEADER_CONTENT_TYPE;
    constructor(httpclient: HttpClient, httpErrorService: HttpErrorService);
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    get(url: string, options?: OptionsType, redirectIfNotAuthorised?: boolean, errorHandler?: (error: HttpErrorResponse) => HttpError): Observable<any>;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    post(url: string, body: any, options?: OptionsType, redirectIfNotAuthorised?: boolean): Observable<any>;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    put(url: string, body: any, options?: OptionsType): Observable<any>;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options
     * @returns {Observable<any>}
     * @see UrlResolverService
     */
    delete(url: string, options?: OptionsType): Observable<any>;
    setDefaultValue(options?: OptionsType): OptionsType;
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
