import { inject, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { LogOutKeepAliveService } from './keep-alive.services';

describe('Keep Alive Service', () => {
  const httpClientMock = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LogOutKeepAliveService,
        { provide: HttpClient, useValue: httpClientMock },
      ]
    });
  });

  it('should be created', inject([LogOutKeepAliveService], (service: LogOutKeepAliveService) => {
    expect(service).toBeTruthy();
  }));

  describe('logOut function', () => {
    it('should should have logout get call', inject([LogOutKeepAliveService], (service: LogOutKeepAliveService) => {
      service.logOut();
      expect(httpClientMock.get).toHaveBeenCalledWith('api/logout');
    }));
  });

  describe('heartBeat function', () => {
    it('should should have logout get call', inject([LogOutKeepAliveService], (service: LogOutKeepAliveService) => {
      service.heartBeat();
      expect(httpClientMock.get).toHaveBeenCalledWith('auth/keepalive');
    }));
  });

});
