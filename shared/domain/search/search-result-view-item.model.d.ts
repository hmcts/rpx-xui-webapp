import { CaseField } from '../definition';
export declare class SearchResultViewItem {
    case_id: string;
    case_fields: object;
    hydrated_case_fields?: CaseField[];
    columns?: object;
    supplementary_data?: any;
    display_context_parameter?: any;
}
