import { PipeTransform } from '@angular/core';
import { FixedListItem } from '../../../domain/definition/fixed-list-item.model';
export declare class DynamicListPipe implements PipeTransform {
    private static readonly EMPTY;
    transform(value: string, items: FixedListItem[]): any;
}
