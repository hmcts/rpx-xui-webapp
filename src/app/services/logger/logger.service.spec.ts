import { LoggerService } from './logger.service';

describe('Logger service', () => {
    const mockedMonitoringService = jasmine.createSpyObj('mockedMonitoringService', ['logEvent', 'logException']);
    const mockedNgxLogger = jasmine.createSpyObj('mockedNgxLogger', ['trace', 'debug', 'info',
    'log', 'warn', 'error', 'fatal']);
    const mockedCookieService = jasmine.createSpyObj('mockedCookieService', ['get']);
    const mockedCryptoWrapper = jasmine.createSpyObj('mockedCryptoWrapper', ['encrypt', 'decrypt']);
    const mockJwtDecodeWrapper = jasmine.createSpyObj('mockJwtDecodeWrapper', ['decode']);

    it('should be Truthy', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedCookieService,
        mockedCryptoWrapper, mockJwtDecodeWrapper);
        expect(service).toBeTruthy();
    });

    it('should be able to call info', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedCookieService,
        mockedCryptoWrapper, mockJwtDecodeWrapper);
        service.info('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(mockedNgxLogger.info).toHaveBeenCalled();
    });

    it('should be able to call warn', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedCookieService,
        mockedCryptoWrapper, mockJwtDecodeWrapper);
        service.warn('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(mockedNgxLogger.warn).toHaveBeenCalled();
    });

    it('should be able to call error', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedCookieService,
        mockedCryptoWrapper, mockJwtDecodeWrapper);
        service.error('message');
        expect(mockedMonitoringService.logException).toHaveBeenCalled();
        expect(mockedNgxLogger.error).toHaveBeenCalled();
    });

    it('should be able to call fatal', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedCookieService,
        mockedCryptoWrapper, mockJwtDecodeWrapper);
        service.fatal('message');
        expect(mockedMonitoringService.logException).toHaveBeenCalled();
        expect(mockedNgxLogger.fatal).toHaveBeenCalled();
    });

    it('should be able to call debug', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedCookieService,
        mockedCryptoWrapper, mockJwtDecodeWrapper);
        service.debug('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
    });

    it('should be able to call trace', () => {
        const service = new LoggerService(mockedMonitoringService, mockedNgxLogger, mockedCookieService,
        mockedCryptoWrapper, mockJwtDecodeWrapper);
        service.trace('message');
        expect(mockedMonitoringService.logEvent).toHaveBeenCalled();
        expect(mockedNgxLogger.trace).toHaveBeenCalled();
    });
});
