export interface Caseworker {
    firstName: string;
    lastName: string;
    idamId: string;
    email: string;
    location: Location;
    roleCategory: string;
    service?: string;
}
export interface CaseworkersByService {
    service: string;
    caseworkers: Caseworker[];
}
//# sourceMappingURL=case-worker.model.d.ts.map