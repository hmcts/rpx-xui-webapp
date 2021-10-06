import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { JurisdictionsService } from "./jurisdictions.service";

describe('Jurisdictions Service', () => {
    let httpClientGetSpy: { get: jasmine.Spy };
    let service: JurisdictionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                JurisdictionsService
            ]
        });

        httpClientGetSpy = jasmine.createSpyObj('HttpClient', ['get']);
    });

    it('should have configuration service', () => {
        service = TestBed.get(JurisdictionsService);
        expect(service).toBeTruthy();
    });

    it('should get jurisdictions', () => {
        httpClientGetSpy.get.and.returnValue({});
        service.getJurisdictions().subscribe(data => {
            expect(data).toBeDefined();
        });
    });

    it('should get global search jurisdictions', () => {
        httpClientGetSpy.get.and.returnValue({});
        service.getGlobalSearchJurisdictions().subscribe(data => {
            expect(data).toBeDefined();
        });
    });
});
