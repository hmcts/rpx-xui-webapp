import { AllocateRoleEffects } from './allocate-role.effects';
import { ExclusionEffects } from './exclusion.effects';
import { SpecificAccessEffects } from './specific-access.effects';

export const effects: any[] = [ExclusionEffects, AllocateRoleEffects, SpecificAccessEffects];

export * from './exclusion.effects';
export * from './allocate-role.effects';
export * from './specific-access.effects';
