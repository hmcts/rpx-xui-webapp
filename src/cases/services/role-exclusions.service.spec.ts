import { HttpClient } from '@angular/common/http';
import { RoleExclusionsService } from './role-exclusions.service';

describe('SearchFilterService', () => {
    let roleExclusionsService: RoleExclusionsService;
    let mockHttp: HttpClient;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj<HttpClient>('HttpService', ['get', 'post']);
        roleExclusionsService = new RoleExclusionsService(mockHttp);
    });
    it('getCurrentUserRoleExclusions', () => {
        roleExclusionsService.getCurrentUserRoleExclusions();
        expect(mockHttp.get).toHaveBeenCalledWith(RoleExclusionsService.exclusionsUrl);
    });
});
