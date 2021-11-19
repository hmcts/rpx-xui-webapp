import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exui-request-hearing',
  templateUrl: './request-hearing.component.html',
  styleUrls: ['./request-hearing.component.scss']
})
export class RequestHearingComponent implements OnInit {
  public backLink: string;

  constructor() { }

  public ngOnInit(): void {
  }

  /**
   * Determines whether submit on
   * @returns void if invalid form
   */
  public onSubmit(): void {
  }

}
