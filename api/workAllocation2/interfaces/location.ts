export interface Location {
    id: string;
    locationName: string;
}

export interface LocationResponse {
    court_venues: CourtVenue [];
}

export interface CourtVenue {
    is_case_management_location: string;
    epimms_id: string;
    site_name: string;
    venue_name: string;
}
