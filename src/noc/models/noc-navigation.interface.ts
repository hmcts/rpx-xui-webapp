import { NocNavigationEvent } from './noc-navigation-event.enum';

export interface NocNavigation {
    event: NocNavigationEvent;
    timestamp: number;
}
