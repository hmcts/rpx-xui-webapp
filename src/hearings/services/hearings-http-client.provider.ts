import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { hearingsJourneyInterceptor } from './hearings-journey.interceptor';

/** Keep feature HTTP handling independent, but include the root Hearings correlation policy. */
export function provideHearingsHttpClient() {
  return provideHttpClient(withInterceptors([hearingsJourneyInterceptor]), withInterceptorsFromDi());
}
