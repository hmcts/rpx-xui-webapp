import { Entity } from './entity';
describe('AppComponent', () => {

  it('should create the app', () => {
    const entity = new Entity({});
    expect(entity).toBeTruthy();
  });

  it('should create the app', () => {
    const entity = new Entity([{id: 5}]);
    expect(entity['5']).toBeDefined();
  });
});
