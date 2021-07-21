import { ExclusionNavigationEvent } from './exclusion-navigation-event.enum';

export interface ExclusionNavigation {
  event: ExclusionNavigationEvent;
  timestamp: number;
}
