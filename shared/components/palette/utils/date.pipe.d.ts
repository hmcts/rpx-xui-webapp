import { PipeTransform } from '@angular/core';
import { FormatTranslatorService } from '../../../services/case-fields/format-translator.service';
export declare class DatePipe implements PipeTransform {
    private formatTrans;
    private static readonly DATE_FORMAT_REGEXP;
    private static readonly MONTHS;
    /**
     * constructor to allow format translator to be injected
     * @param formatTrans
     */
    constructor(formatTrans: FormatTranslatorService);
    transform(value: string, zone: string, format: string): string;
    private translateDateFormat;
    private getOffsetDate;
    private getDate;
    private getHour;
    private toInt;
    private pad;
}
