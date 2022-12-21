import { SearchModule } from './search.module';

describe('SearchModule', () => {
  let searchModule: SearchModule;

  beforeEach(() => {
    searchModule = new SearchModule();
  });

  it('should create an instance', () => {
    expect(searchModule).toBeTruthy();
  });
});
