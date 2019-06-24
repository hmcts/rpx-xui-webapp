import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exui-case-list-filters-consumer',
  template: `
   <div class="container-fluid">
      <ccd-case-list-filters
            [defaults]="defaults"
            (onApply)="applied($event)"
            (onReset)="reset($event)"
      ></ccd-case-list-filters>
   </div>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseListFilterComponent implements OnInit {
    defaults: any;
    constructor(
       private router: Router,
    ) { }

    ngOnInit() {
    }

    applied(arg: any) {
       console.log('selected:', arg);
    }

    reset() {
       console.log('reset');
    }

 }
