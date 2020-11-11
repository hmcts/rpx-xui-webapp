import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocQuestion } from '../../models';
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

  constructor(private store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.questions$ = this.store.pipe(select(fromFeature.questions));
    this.formGroup = new FormGroup({});
  }

}
