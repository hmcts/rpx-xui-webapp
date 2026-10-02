import { SitemapComponent } from './components';
import { ROUTES } from './app.routes';

describe('AppRoutes', () => {
  it('should register the sitemap page', () => {
    expect(ROUTES).toContain(
      jasmine.objectContaining({
        path: 'sitemap',
        component: SitemapComponent,
        data: { title: 'Site map' },
      })
    );
  });
});
