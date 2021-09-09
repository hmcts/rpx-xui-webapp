import { PipeTransform } from '@angular/core';
import { AbstractAppConfig } from '../../../../app.config';
export declare class DocumentUrlPipe implements PipeTransform {
    private appConfig;
    constructor(appConfig: AbstractAppConfig);
    transform(value: string): string;
}
