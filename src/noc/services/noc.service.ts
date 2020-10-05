import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoCAnswer, NocEvent, NocQuestion } from '../models/noc.state';

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
