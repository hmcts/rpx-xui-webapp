import { WindowLocationService } from './window-location.service';

describe('Window Location Service', () => {
  it('should return pathname', () => {
    const service = new WindowLocationService();
    
    expect(service.getPathName()).toBeTruthy();
  });
});
