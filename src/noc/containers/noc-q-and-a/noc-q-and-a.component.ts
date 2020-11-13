import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocNavigation, NocQuestion } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-q-and-a',
  templateUrl: './noc-q-and-a.component.html',
  styleUrls: ['./noc-q-and-a.component.scss']
})
export class NocQAndAComponent implements OnInit {
  @Input()
  public questions$: Observable<NocQuestion[]>;

  @Input()
  public formGroup: FormGroup;

  @Input() navEvent: NocNavigation;

  public qAndAForm: FormGroup;

  constructor(private store: Store<fromFeature.State>) {
    this.navEvent = {
      event: null,
      timestamp: null
    };
  }

  public ngOnInit() {
    this.questions$ = this.store.pipe(select(fromFeature.questions));
    this.qAndAForm = new FormGroup({});
  }

}
