import { SessionStorageService } from './session-storage.service';

describe('Session storage service', () => {
  let mockStore = {};
  beforeEach(() => {
    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return mockStore[key];
    });
    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      return mockStore[key] = value + '';
    });
    spyOn(sessionStorage, 'clear').and.callFake(() => {
      mockStore = {};
    });
  });

  it('should allow setting the item', () => {
    const service = new SessionStorageService();
    service.setItem('exampleKey', 'exampleValue');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('exampleKey', 'exampleValue');
  });

  it('should allow getting the item', () => {
    const service = new SessionStorageService();
    service.getItem('exampleKey');
    expect(sessionStorage.getItem).toHaveBeenCalledWith('exampleKey');
  });

  it('should allow clearing the store', () => {
    const service = new SessionStorageService();
    service.clear();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
