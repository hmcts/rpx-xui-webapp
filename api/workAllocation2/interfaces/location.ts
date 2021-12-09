export interface Location {
    id: string;
    locationName: string;
}

export interface LocationResponse {
    court_venues: CourtVenue [];
}

export interface CourtVenue {
    epimms_id: string;
    site_name: string;
}
