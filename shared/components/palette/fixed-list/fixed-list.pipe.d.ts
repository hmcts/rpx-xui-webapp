import { PipeTransform } from '@angular/core';
import { FixedListItem } from '../../../domain/definition/fixed-list-item.model';
export declare class FixedListPipe implements PipeTransform {
    private static readonly EMPTY;
    transform(value: string, items: FixedListItem[]): any;
}
