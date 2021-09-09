import { PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
export declare class FirstErrorPipe implements PipeTransform {
    transform(value: ValidationErrors, args?: string): string;
}
