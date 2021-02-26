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
    spyOn(sessionStorage, 'removeItem').and.callFake((key) => {
      delete mockStore[key];
    });
  });

  it('should allow setting the item', () => {
    const service = new SessionStorageService();
    service.setItem('exampleKey', 'exampleValue');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('exampleKey', 'exampleValue');
  });

  it('should remove an item after reading it when removeAfterRead is set to true', () => {
    const service = new SessionStorageService();
    service.getItem('exampleKey', true);
    expect(sessionStorage.getItem).toHaveBeenCalledWith('exampleKey');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('exampleKey');
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
