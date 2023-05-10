export interface LocationModel {
    court_venue_id: string;
    site_name: string;
    court_name?: string;
    epimms_id: string;
    open_for_public?: string;
    court_type_id: string;
    court_type: string;
    region_id: string;
    region: string;
    cluster_id?: string;
    cluster_name?: string;
    court_status?: string;
    court_open_date?: string;
    closed_date?: string;
    postcode: string;
    court_address: string;
    phone_number?: string;
    court_location_code?: string;
    dx_address?: string;
    welsh_site_name?: string;
    welsh_court_address?: string;
    venue_name?: string;
    is_case_management_location: string;
    is_hearing_location: string;
  }

export interface LocationByEPIMMSModel {
  epimms_id: string;
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
}

export function toEpimmsLocation(locationModel: LocationModel): LocationByEPIMMSModel {
  return {
    epimms_id: locationModel.epimms_id,
    site_name: locationModel.site_name,
    court_name: locationModel.court_name,
    open_for_public: locationModel.open_for_public,
    region_id: locationModel.region_id,
    region: locationModel.region,
    cluster_id: locationModel.cluster_id,
    cluster_name: locationModel.cluster_name,
    court_status: locationModel.court_status,
    court_open_date: locationModel.court_open_date,
    closed_date: locationModel.closed_date,
    postcode: locationModel.postcode,
    court_address: locationModel.court_address,
    phone_number: locationModel.phone_number,
    court_location_code: locationModel.court_location_code,
    dx_address: locationModel.dx_address,
    welsh_site_name: locationModel.welsh_site_name,
    welsh_court_address: locationModel.welsh_court_address,
    venue_name: locationModel.venue_name,
    is_case_management_location: locationModel.is_case_management_location,
    is_hearing_location: locationModel.is_hearing_location
  };
}
