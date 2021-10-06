import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { GlobalSearchJurisdictionsService } from "./global-search-jurisdictions.service";

describe('Global Search Jurisdictions Service', () => {
    let httpClientGetSpy: { get: jasmine.Spy };
    let service: GlobalSearchJurisdictionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                GlobalSearchJurisdictionsService
            ]
        });

        httpClientGetSpy = jasmine.createSpyObj('HttpClient', ['get']);
    });

    it('should have configuration service', () => {
        service = TestBed.get(GlobalSearchJurisdictionsService);
        expect(service).toBeTruthy();
    });

    it('should get global search jurisdictions', () => {
        httpClientGetSpy.get.and.returnValue({});
        service.getGlobalSearchJurisdictions().subscribe(data => {
            expect(data).toBeDefined();
        });
    });
});
