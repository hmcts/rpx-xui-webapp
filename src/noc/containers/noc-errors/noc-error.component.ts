import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exui-noc-error',
    templateUrl: 'noc-error.component.html'
  })

export class NocErrorComponent implements OnInit {
  public ngOnInit(): void {
    console.log('NocErrorComponent');
  }
}
