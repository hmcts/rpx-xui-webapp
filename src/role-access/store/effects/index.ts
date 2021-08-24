import { AllocateRoleEffects } from './allocate-role.effects';
import { ExclusionEffects } from './exclusion.effects';

export const effects: any[] = [ExclusionEffects, AllocateRoleEffects];

export * from './exclusion.effects';
export * from './allocate-role.effects';
