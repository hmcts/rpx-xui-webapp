export interface CaseRoleDetails {
  appointments?: JudicialAppointment [];
  known_as: string;
  full_name: string;
  surname: string;
  sidam_id: string;
  idam_id: string;
  email_id: string;
}

export interface JudicialAppointment {
  epimms_id: string;
  location: string;
  service_code: string;
}
