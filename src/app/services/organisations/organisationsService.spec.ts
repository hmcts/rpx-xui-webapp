import { of } from 'rxjs';
import { Organisation } from '../../../cases/store/index';
import { OrganisationsService } from './organisationsService';

describe('OrganisationsService', () => {
    it('getActiveOrganisations', () => {
        const httpMock = jasmine.createSpyObj('http', ['get']);
        const organisations = new Array<Organisation>();
        httpMock.get.and.returnValue(of(organisations));
        const organisationsService = new OrganisationsService(httpMock);
        const organisations$ = organisationsService.getActiveOrganisations();
        expect(httpMock.get).toHaveBeenCalledWith(organisationsService.url);
        organisations$.subscribe(orgs => expect(orgs).toEqual(organisations));
    });
});
