import { NocErrorComponent } from './noc-errors/noc-error.component';
import { NocHomeComponent } from './noc-home/noc-home.component';
import { NocNavigationComponent } from './noc-navigation/noc-navigation.component';

export const containers: any[] = [
  NocHomeComponent,
  NocNavigationComponent,
  NocErrorComponent
];

export * from './noc-home/noc-home.component';
export * from './noc-navigation/noc-navigation.component';
export * from './noc-errors/noc-error.component';
