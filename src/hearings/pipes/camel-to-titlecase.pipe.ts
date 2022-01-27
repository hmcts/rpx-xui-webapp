import { TitleCasePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'camelToTitleCase'
})
export class CamelToTitleCasePipe implements PipeTransform {

  constructor(private readonly titleCasePipe: TitleCasePipe) {}

  public transform(value: any): string {
    return this.camelCaseToTitleCase(value);
  }

  private camelCaseToTitleCase(input: string): string {
    if (!input) return '';
    const split = input.replace(/([A-Z])/g, ` $1`).trim();

    return this.titleCasePipe.transform(split);
  }
}
