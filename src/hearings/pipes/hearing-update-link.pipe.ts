import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hearingUpdateLink'
})
export class HearingUpdateLinkPipe implements PipeTransform {

  public transform(link: string, hearingId: string): any {
    return link.replace('{id}', hearingId);
  }
}
