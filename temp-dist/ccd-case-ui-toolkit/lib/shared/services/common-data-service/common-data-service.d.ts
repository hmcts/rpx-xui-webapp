import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface LovRefDataModel {
    category_key: string;
    key: string;
    value_en: string;
    value_cy: string;
    hint_text_en: string;
    hint_text_cy: string;
    lov_order: number;
    parent_category: string;
    parent_key: string;
    active_flag: string;
    child_nodes?: LovRefDataModel[];
    from?: string;
    selected?: boolean;
}
export interface LovRefDataByServiceModel {
    list_of_values: LovRefDataModel[];
}
export declare class CommonDataService {
    private readonly http;
    constructor(http: HttpClient);
    getRefData(url: string): Observable<LovRefDataByServiceModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommonDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CommonDataService>;
}
//# sourceMappingURL=common-data-service.d.ts.map