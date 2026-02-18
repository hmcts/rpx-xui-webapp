import { AcceptTermsService } from './acceptTerms.service';

describe('Accept terms And Conditions Service', () => {
  it('should be created And Truthy', () => {
    const mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get', 'post']);
    const service = new AcceptTermsService(mockHttpClient);
    expect(service).toBeTruthy();
  });

  it('should postUserAccepted', () => {
    const mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get', 'post']);
    const service = new AcceptTermsService(mockHttpClient);
    service.postUserAccepted('userId');
    expect(mockHttpClient.post).toHaveBeenCalledWith('api/userTermsAndConditions', { userId: 'userId' });
  });

  it('should getIsUserAccepted', () => {
    const mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get', 'post']);
    const service = new AcceptTermsService(mockHttpClient);
    service.getIsUserAccepted('userId');
    expect(mockHttpClient.get).toHaveBeenCalledWith('api/userTermsAndConditions/userId');
  });

  it('should be created', () => {
    const mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get', 'post']);
    const service = new AcceptTermsService(mockHttpClient);
    service.getTermsAndConditionsContent();
    expect(mockHttpClient.get).toHaveBeenCalledWith('api/termsAndConditions');
  });
});
