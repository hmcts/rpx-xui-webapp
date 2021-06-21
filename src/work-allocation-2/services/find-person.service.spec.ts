import { PersonDomain } from 'api/workAllocation2/interfaces/person';
import { FindAPersonService } from './find-person.service';

describe('FindAPersonService', () => {
    it('should be Truthy', () => {
        const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
        const service = new FindAPersonService(mockHttpService);
        expect(service).toBeTruthy();
    });

    it('find search', () => {
        const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
        const service = new FindAPersonService(mockHttpService);
        const searchOptions = {  searchTerm: 'term', jurisdiction: PersonDomain.CASEWORKER };
        service.find(searchOptions);
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/findPerson', { searchOptions });
    });
});
