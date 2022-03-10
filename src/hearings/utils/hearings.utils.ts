import { HttpError } from '../../models/httpError.model';
import {HearingConditions} from '../models/hearingConditions';

export class HearingsUtils {
  public static hasPropertyAndValue(conditions: HearingConditions, propertyName: string, propertyValue: any): boolean {
    return conditions && conditions.hasOwnProperty(propertyName) && conditions[propertyName] === propertyValue;
  }

  public static handleFatalErrors(error: HttpError): void {
    debugger;
    switch (error.status) {
      case 401:
      case 403:
        break;
      case 500:
      case 503:
        break;
      case 400:
        break;
      default:
        break;
    }
  };
}
