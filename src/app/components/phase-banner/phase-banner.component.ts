import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exui-phase-banner',
  templateUrl: './phase-banner.component.html'
})
export class PhaseBannerComponent implements OnInit {
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
