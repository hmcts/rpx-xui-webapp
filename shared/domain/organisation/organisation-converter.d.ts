import { SimpleOrganisationModel } from './simple-organisation.model';
import { OrganisationVm } from '../../services/organisation';
export declare class OrganisationConverter {
    private static toSimpleAddress;
    toSimpleOrganisationModel(organisationModel: OrganisationVm): SimpleOrganisationModel;
}
