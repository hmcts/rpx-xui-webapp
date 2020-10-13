import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NocEvent } from '../models/noc-event.interface';
import { NocQuestion } from '../models/noc-question.interface';

@Injectable()
export class NocService {

  constructor(
  ) { }

  getNoCQuestions(caseId: string): Observable<NocQuestion[]> {

    return null;
  }

  validateNoCAnswers(nocEvent: NocEvent): Observable<boolean> {

    return null;
  }

  submitNoCEvent(nocEvent: NocEvent): Observable<any> {

    return null;
  }
}
