import { environment } from '../../../environments/environment';
import { ApplicationTheme } from '../../models/theming.model';
import { getUserRolesExcludingSpecificAccessApprover } from './role.utils';

export function getApplicationThemeForUserRoles(userRoles: string[] = []): ApplicationTheme {
  const availableThemes = environment.themes;
  const userRolesForTheme = getUserRolesExcludingSpecificAccessApprover(userRoles);
  const themeRegex =
    Object.keys(availableThemes).find((key) => userRolesForTheme.some((role) => new RegExp(key).test(role))) || '.+';

  return availableThemes[themeRegex] as ApplicationTheme;
}
