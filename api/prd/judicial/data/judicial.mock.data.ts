import { JudicialUserModel, RawJudicialUserModel } from '../models/judicialUser.model';

export const RAW_JUDICIAL_USERS: RawJudicialUserModel[] = [
  {
    sidam_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1',
    object_id: '8cf0cafa-b95b-11eb-836e-3e30bdb78f20',
    known_as: 'Hearing Judge',
    surname: 'Collins',
    personal_code: 'p1000000',
    full_name: 'Jacky Collins',
    post_nominals: '',
    email_id: 'jacky.collins@judicial.com',
    title: 'Mr',
    is_judge: 'Y',
    is_panel_number: 'Y',
    is_magistrate: 'Y'
  },
  {
    sidam_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c2',
    object_id: '8cf0cafa-b95c-11eb-836e-3e30bdb78f20',
    known_as: 'Lead Judge',
    surname: 'Chiswell',
    personal_code: 'p1000001',
    full_name: 'Jasmine Chiswell',
    post_nominals: '',
    email_id: 'jasmine.chiswell@judicial.com',
    title: 'Mr',
    is_judge: 'Y',
    is_panel_number: 'Y',
    is_magistrate: 'Y'
  },
  {
    sidam_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c3',
    object_id: '8cf0cafa-b95d-11eb-836e-3e30bdb78f20',
    known_as: 'Lead Judge',
    surname: 'Vardy',
    personal_code: 'p1000002',
    full_name: 'Jamie Vardy',
    post_nominals: '',
    email_id: 'jamie.vardy@judicial.com',
    title: 'Mr',
    is_judge: 'Y',
    is_panel_number: 'Y',
    is_magistrate: 'Y'
  },
  {
    sidam_id: '38eb0c5e-29c7-453e-b92d-f2029aaed6c4',
    object_id: '8cf0cafa-b95e-11eb-836e-3e30bdb78f20',
    known_as: 'Hearing Judge',
    surname: 'Priest',
    personal_code: 'p1000003',
    full_name: 'James Priest',
    post_nominals: '',
    email_id: 'james.priest@judicial.com',
    title: 'Mr',
    is_judge: 'Y',
    is_panel_number: 'Y',
    is_magistrate: 'Y'
  }
];

export const ALL_JUDICIAL_USERS: JudicialUserModel[] = [
  {
    title: 'Mr',
    knownAs: 'Hearing Judge',
    surname: 'Collins',
    fullName: 'Jacky Collins',
    initials: 'JC',
    postNominals: 'JP',
    emailId: 'jacky.collins@judicial.com',
    personalCode: 'p1000000',
    idamId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c1'
  },
  {
    title: 'Mr',
    knownAs: 'Lead Judge',
    surname: 'Chiswell',
    fullName: 'Jasmine Chiswell',
    initials: 'JC',
    postNominals: 'JP',
    emailId: 'jasmine.chiswell@judicial.com',
    personalCode: 'p1000001',
    idamId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c2'
  },
  {
    title: 'Mr',
    knownAs: 'Lead Judge',
    surname: 'Vardy',
    fullName: 'Jamie Vardy',
    initials: 'JV',
    postNominals: 'JP',
    emailId: 'jamie.vardy@judicial.com',
    personalCode: 'p1000002',
    idamId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c3'
  },
  {
    title: 'Mr',
    knownAs: 'Hearing Judge',
    surname: 'Priest',
    fullName: 'James Priest',
    initials: 'JP',
    postNominals: 'JP',
    emailId: 'james.priest@judicial.com',
    personalCode: 'p1000003',
    idamId: '38eb0c5e-29c7-453e-b92d-f2029aaed6c4'
  }
];
