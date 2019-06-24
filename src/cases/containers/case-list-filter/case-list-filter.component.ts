import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exui-case-list-filters-consumer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'case-list-filter.component.html',
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
