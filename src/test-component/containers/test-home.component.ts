import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exui-test-hom',
    templateUrl: './test-home.component.html'
  })

export class TestHomeComponent {
  public dueDate: Date;
  public dueDateText: string;

  public highUrgencyCutoff: number = 0;
  public highUrgencyCutoffText: string = '0';

  public mediumUrgencyCutoff: number = 2;
  public mediumUrgencyCutoffText: string = '2';


  public updateDueDate(value: string): void {
    const parts: string[] = value.split('/');
    if (parts.length == 3) {
      const parsedDate: number = Date.parse(parts.reverse().join('-'));
      if (isNaN(parsedDate) == false) {
        this.dueDate = new Date(parsedDate);
      }
    }
  }

  public updateHighUrgencyCutoff(value: string): void {
    // tslint:disable-next-line: radix
    this.highUrgencyCutoff = parseInt(value);
  }

  public updateMediumUrgencyCutoff(value: string): void {
    // tslint:disable-next-line: radix
    this.mediumUrgencyCutoff = parseInt(value);
  }
}
