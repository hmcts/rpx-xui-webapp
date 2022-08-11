import { Injectable } from '@angular/core';

@Injectable()
export class YesNoService {
  private static readonly YES_INPUTS: string[] = [
    'Y',
    'YES'
  ];
  private static readonly NO_INPUTS: string[] = [
    'N',
    'NO'
  ];
  private static readonly YES = 'Yes';
  private static readonly NO = 'No';
  private static readonly EMPTY = null;

  public format(value: any): string {

    if (this.isYes(value)) {
      return YesNoService.YES;
    } else if (this.isNo(value)) {
      return YesNoService.NO;
    }

    return YesNoService.EMPTY;
  }

  private isYes(value: any): boolean {
    switch (typeof(value)) {
      case 'boolean':
        return value;
      case 'string':
        return YesNoService.YES_INPUTS.indexOf(value.toUpperCase()) !== -1;
      default:
        return false;
    }
  }

  private isNo(value: any): boolean {
    switch (typeof(value)) {
      case 'boolean':
        return !value;
      case 'string':
        return YesNoService.NO_INPUTS.indexOf(value.toUpperCase()) !== -1;
      default:
        return false;
    }
  }
}
