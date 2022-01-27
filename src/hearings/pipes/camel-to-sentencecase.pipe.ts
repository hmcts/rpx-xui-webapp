import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'camelToSentenceCase'
})
export class CamelToSentenceCasePipe implements PipeTransform {

  constructor() {}

  public transform(value: any): string {
    return this.camelCaseToSentenceCase(value);
  }

  private camelCaseToSentenceCase(input: string): string {
    if (!input) return '';
    const split = input.replace(/([A-Z])/g, ` $1`).trim();
    const result = split.charAt(0).toUpperCase() + split.slice(1);

    return result;
  }
}
