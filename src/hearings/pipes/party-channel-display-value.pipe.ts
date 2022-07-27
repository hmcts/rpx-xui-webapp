import { Pipe, PipeTransform } from '@angular/core';
import { LovRefDataModel } from '../models/lovRefData.model';

@Pipe({
  name: 'partyChannelDisplayValue'
})
export class PartyChannelDisplayValuePipe implements PipeTransform {

  private static getValue(key: string, partyChannels?: LovRefDataModel[]): string {
    for (const partyChannel of partyChannels) {
      if (partyChannel.child_nodes && partyChannel.child_nodes.length) {
        return PartyChannelDisplayValuePipe.getValue(key, partyChannel.child_nodes);
      }
      if (partyChannel.key === key) {
        return partyChannel.value_en;
      }
    }
    return '';
  }

  public transform(key: string, partyChannels?: LovRefDataModel[]): any {
    return PartyChannelDisplayValuePipe.getValue(key, partyChannels);
  }
}
