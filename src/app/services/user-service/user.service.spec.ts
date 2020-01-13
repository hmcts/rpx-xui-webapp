import { inject, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {UserService} from './user.service';

describe('User Details Service', () => {
  const httpClientMock = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientMock },
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('getUserDetails function', () => {
    it('should should have logout get call', inject([UserService], (service: UserService) => {
      service.getUserDetails();
      expect(httpClientMock.get).toHaveBeenCalledWith(`/api/user/details`);
    }));
  });

});
