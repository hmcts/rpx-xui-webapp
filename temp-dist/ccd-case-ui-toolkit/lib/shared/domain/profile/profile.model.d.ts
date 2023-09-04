import { Jurisdiction } from '../definition/jurisdiction.model';
export declare class Profile {
    user: {
        idam: {
            id: string;
            email: string;
            forename: string;
            surname: string;
            roles: string[];
        };
    };
    channels: string[];
    jurisdictions: Jurisdiction[];
    default: {
        workbasket: {
            jurisdiction_id: string;
            case_type_id: string;
            state_id: string;
        };
    };
    isSolicitor(): boolean;
    isCourtAdmin(): boolean;
}
//# sourceMappingURL=profile.model.d.ts.map