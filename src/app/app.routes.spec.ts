import { SessionStorageGuard } from '@hmcts/ccd-case-ui-toolkit';
import { ROUTES } from './app.routes';
import { SitemapComponent } from './components';
import { AuthGuard } from './services/auth/auth.guard';

describe('AppRoutes', () => {
  it('should register the sitemap page behind the standard application guards', () => {
    expect(ROUTES).toContain(
      jasmine.objectContaining({
        path: 'sitemap',
        canActivate: [AuthGuard, SessionStorageGuard],
        component: SitemapComponent,
        data: { title: 'Site map' },
      })
    );
  });
});
