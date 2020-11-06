import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromFeature from '../../store';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { NocQuestion } from '../../models';

@Component({
  selector: 'exui-noc-q-and-a',
  templateUrl: './noc-q-and-a.component.html',
  styleUrls: ['./noc-q-and-a.component.scss']
})
export class NocQAndAComponent implements OnInit {
  @Input()
  question: NocQuestion;

  @Input()
  questions: NocQuestion[] = [];

  @Input()
  formGroup: FormGroup;

  public questions$: Observable<any>;
  constructor(private store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.questions$ = this.store.pipe(select(fromFeature.questions));
    this.questions$.subscribe(ques => console.log('ques=' + JSON.stringify(ques)));
  }

}
