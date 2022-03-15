import { Pipe, PipeTransform } from '@angular/core';
import { LovRefDataModel } from '../models/lovRefData.model';

@Pipe({
  name: 'partyRoleDisplayValue'
})
export class PartyRoleDisplayValuePipe implements PipeTransform {

  private static getValue(key: string, roles?: LovRefDataModel[]): string {
    for (const role of roles) {
      if (role.child_nodes && role.child_nodes.length) {
        return PartyRoleDisplayValuePipe.getValue(key, role.child_nodes);
      }
      if (role.key === key) {
        return role.value_en;
      }
    }
    return '';
  }

  public transform(key: string, roles?: any): any {
    return PartyRoleDisplayValuePipe.getValue(key, roles);
  }

}
