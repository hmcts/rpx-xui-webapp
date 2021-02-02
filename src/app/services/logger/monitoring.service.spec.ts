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

    it('should be able to not send when appInsights is not enabled', () => {
        const obj = {
            someFunction: () => {}
        };
        mockedEnvService.get.and.returnValue(false);
        const spyOnSomeFunc =  spyOn(obj, 'someFunction');
        const service = new MonitoringService(mockedEnvService, mockedAppInsights);
        service.send(mockedAppInsights, obj.someFunction);
        expect(spyOnSomeFunc).not.toHaveBeenCalled();
    });

    it('should be able to send when appInsights is enabled', () => {
        const obj = {
            someFunction: () => {}
        };
        mockedEnvService.get.and.returnValue(true);
        const spyOnSomeFunc =  spyOn(obj, 'someFunction');
        const service = new MonitoringService(mockedEnvService, mockedAppInsights);
        service.send(mockedAppInsights, obj.someFunction);
        expect(spyOnSomeFunc).toHaveBeenCalled();
    });

    it('getConfig', () => {
        const config = MonitoringService.getConfig('somekey');
        expect(config.instrumentationKey).toEqual('somekey');
        expect(config.disableTelemetry).toBeTruthy();
    });
});
