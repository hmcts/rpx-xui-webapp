export interface LocationByEpimmsModelWithServiceCodes {
    epimms_id: string;
    location_id?: string;
    site_name?: string;
    court_name?: string;
    open_for_public?: string;
    region_id?: string;
    region?: string;
    cluster_id?: string;
    cluster_name?: string;
    court_status?: string;
    court_open_date?: string;
    closed_date?: string;
    postcode?: string;
    court_address?: string;
    phone_number?: string;
    court_location_code?: string;
    dx_address?: string;
    welsh_site_name?: string;
    welsh_court_address?: string;
    venue_name?: string;
    is_case_management_location?: string;
    is_hearing_location?: string;
    serviceCodes?: string[];
}
