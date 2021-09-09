import { PipeTransform } from '@angular/core';
export declare class AlertIconClassPipe implements PipeTransform {
    private static readonly CLASS_WARNING;
    private static readonly CLASS_SUCCESS;
    transform(type: string): string;
}
