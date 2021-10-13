import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { MonitoringService, IMonitoringService, MonitorConfig } from './monitoring.service';
import { Observable, of } from 'rxjs';

describe('Monitoring service', () => {
    const mockedHttpClient = jasmine.createSpyObj('mockedHttpClient', {get: of({key: 'Some Value'})});
    const mockedAppInsights = jasmine.createSpyObj('mockedAppInsights', ['downloadAndSetup', 'trackException', 'trackEvent',
    'trackPageView']);
    const mockedConfig = new MonitorConfig();

    it('should be Truthy', () => {
        const service = new MonitoringService(mockedHttpClient);
        expect(service).toBeTruthy();
    });

    it('should be able to LogException and Should not call the http service', () => {
        mockedConfig.instrumentationKey = 'somevalue';
        const service = new MonitoringService(mockedHttpClient, mockedConfig, mockedAppInsights);
        expect(service).toBeTruthy();
        service.logException(new Error('Some ErrorMesssage'));
        expect(mockedHttpClient.get).not.toHaveBeenCalled();
        expect(mockedAppInsights.downloadAndSetup).not.toHaveBeenCalled();
        expect(mockedAppInsights.trackException).toHaveBeenCalled();
    });

    it('should be able to LogEvent', () => {
        mockedConfig.instrumentationKey = 'somevalue';
        const service = new MonitoringService(mockedHttpClient, mockedConfig, mockedAppInsights);
        expect(service).toBeTruthy();
        service.logEvent('name', [], []);
        expect(mockedHttpClient.get).not.toHaveBeenCalled();
        expect(mockedAppInsights.downloadAndSetup).not.toHaveBeenCalled();
        expect(mockedAppInsights.trackEvent).toHaveBeenCalled();
    });

    it('should be able to LogPageview', () => {
        mockedConfig.instrumentationKey = 'somevalue';
        const service = new MonitoringService(mockedHttpClient, mockedConfig, mockedAppInsights);
        expect(service).toBeTruthy();
        service.logPageView('name', null, [], [], 1);
        expect(mockedHttpClient.get).not.toHaveBeenCalled();
        expect(mockedAppInsights.downloadAndSetup).not.toHaveBeenCalled();
        expect(mockedAppInsights.trackPageView).toHaveBeenCalled();
    });

    it('should be able to LogPageview', () => {
        mockedConfig.instrumentationKey = null;
        const service = new MonitoringService(mockedHttpClient, mockedConfig, mockedAppInsights);
        expect(service).toBeTruthy();
        service.logPageView('name', null, [], [], 1);
        expect(mockedHttpClient.get).toHaveBeenCalled();
    });

    describe('enableCookies()', () => {

        it('should set areCookiesEnabled to true', () => {
            const service = new MonitoringService(mockedHttpClient, mockedConfig, mockedAppInsights);
            service.enableCookies();
            expect(service.areCookiesEnabled).toBeTruthy();
        });
    });
});
