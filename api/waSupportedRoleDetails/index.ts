import { NextFunction, Response, Router } from 'express';
import { getConfigValue } from '../configuration';
import { WA_SUPPORTED_ROLE_CATEGORIES, WA_SUPPORTED_ROLE_TYPES } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';

// Only used within node layer
export async function getWASupportedRoleCategoriesList(req: EnhancedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const roleCategories = getConfigValue(WA_SUPPORTED_ROLE_CATEGORIES);
    const roleCategoriesArray = roleCategories.split(',');
    res.status(200).send(roleCategoriesArray);
  } catch (error) {
    next(error);
  }
}

// Only used within node layer
export async function getWASupportedRoleTypesList(req: EnhancedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const roleTypes = getConfigValue(WA_SUPPORTED_ROLE_TYPES);
    const roleTypesArray = roleTypes.split(',');
    res.status(200).send(roleTypesArray);
  } catch (error) {
    next(error);
  }
}

export const router = Router({ mergeParams: true });

router.get('/getRoleCategories', getWASupportedRoleCategoriesList);
router.get('/getRoleTypes', getWASupportedRoleTypesList);

export default router;
