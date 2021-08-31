import { TypeOfRole } from "../../../src/role-access/models";

export interface CaseRole {
  name: string;
  role: TypeOfRole;
  location: string;
  start: string;
  end: string;
  id: string;
  actorId: string;
  actions: Action[];
  email: string;
}

export interface Action {
  id: string;
  title: string;
}
