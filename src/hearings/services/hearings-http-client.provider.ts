import { provideHttpClient, withInterceptors, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { hearingsJourneyInterceptor } from './hearings-journey.interceptor';

/** Keep feature HTTP handling independent, but include the root Hearings correlation policy. */
export function provideHearingsHttpClient() {
  return provideHttpClient(withXhr(), withInterceptors([hearingsJourneyInterceptor]), withInterceptorsFromDi());
}
