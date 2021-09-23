import { Inject, Injector, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DefaultErrorHandler } from './defaultErrorHandler';

describe('Default Error Handler', () => {
    const mockedLoggerService = jasmine.createSpyObj('mockedLoggerService', ['error']);
    beforeEach(() => {
        spyOn(TestBed.get(Injector), 'get').and.callFake((token) => {
            return TestBed.get(token);
        });
    });
    it('Should call Default Error Handler and be returned a DEH instance', () => {
        const ngZone = TestBed.get(NgZone);
        const injector = TestBed.get(Inject);
        spyOn(ngZone, 'runOutsideAngular').and.callFake((fn: void) => {});
        const errorHandler = new DefaultErrorHandler(mockedLoggerService, injector, ngZone);
        expect(errorHandler).toBeTruthy();
    });

    it('should be able to call error', () => {
        const injector = TestBed.get(Inject);
        const ngZone = TestBed.get(NgZone);
        spyOn(ngZone, 'runOutsideAngular').and.callFake((fn: void) => {});
        const errorHandler = new DefaultErrorHandler(mockedLoggerService, injector, ngZone);
        errorHandler.handleError(new Error('Some Error Message'));
        expect(mockedLoggerService.error).toHaveBeenCalledWith(new Error('Some Error Message'));
    });
});
