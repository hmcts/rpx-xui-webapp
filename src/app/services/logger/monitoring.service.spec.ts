import { MonitoringService } from './monitoring.service';

describe('Monitoring service', () => {
    let mockedEnvService: any;
    let mockedAppInsights: any;

    beforeEach(() => {
        mockedEnvService = jasmine.createSpyObj('mockedEnvService', ['get']);
        mockedAppInsights = jasmine.createSpyObj('mockedAppInsights', ['downloadAndSetup', 'trackException', 'trackEvent',
        'trackPageView']);
    })

    it('should be Truthy', () => {
        const service = new MonitoringService(mockedEnvService);
        expect(service).toBeTruthy();
    });

    it('should be able to LogException when AppInsights is enabled', () => {
        const service = new MonitoringService(mockedEnvService, mockedAppInsights);
        expect(service).toBeTruthy();
        mockedEnvService.get.and.returnValue(true);
        service.logException(new Error('Some ErrorMesssage'));
        expect(mockedEnvService.get).toHaveBeenCalled();
        expect(mockedAppInsights.downloadAndSetup).not.toHaveBeenCalled();
        expect(mockedAppInsights.trackException).toHaveBeenCalled();
    });

    it('should be able to LogEvent', () => {
        const service = new MonitoringService(mockedEnvService, mockedAppInsights);
        expect(service).toBeTruthy();
        mockedEnvService.get.and.returnValue(true);
        service.logEvent('name', [], []);
        expect(mockedEnvService.get).toHaveBeenCalled();
        expect(mockedAppInsights.downloadAndSetup).not.toHaveBeenCalled();
        expect(mockedAppInsights.trackEvent).toHaveBeenCalled();
    });

    it('should be able to LogPageview', () => {
        const service = new MonitoringService(mockedEnvService, mockedAppInsights);
        expect(service).toBeTruthy();
        mockedEnvService.get.and.returnValue(true);
        service.logPageView('name', null, [], []);
        expect(mockedEnvService.get).toHaveBeenCalled();
        expect(mockedAppInsights.downloadAndSetup).not.toHaveBeenCalled();
        expect(mockedAppInsights.trackPageView).toHaveBeenCalled();
    });

    it('should be able to LogPageview', () => {
        const service = new MonitoringService(mockedEnvService, mockedAppInsights);
        expect(service).toBeTruthy();
        service.logPageView('name', null, [], []);
        expect(mockedEnvService.get).toHaveBeenCalled();
    });
});
