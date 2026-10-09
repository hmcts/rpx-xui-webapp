import { ROUTES } from './noc.routes';

describe('Noc routes', () => {
  it('uses the Notice of Change page title', () => {
    expect(ROUTES[0].children?.[0].data?.title).toBe('Notice of Change');
  });
});
