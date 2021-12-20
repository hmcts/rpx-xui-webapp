import { Case } from '../models/cases';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, forkJoin, of } from 'rxjs';
import { CaseSearchParameters, SearchCaseRequest } from '../models/dtos';
import { switchMap, concatMap, map } from 'rxjs/operators';
import { casesRouting } from 'src/cases/case-feature.routes';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { valueOrNull } from 'api/lib/util';

const BASE_URL: string = '/workallocation2/case';
export enum ACTION {
  ASSIGN = 'assign',
  CANCEL = 'cancel',
  CLAIM = 'claim',
  COMPLETE = 'complete',
  UNCLAIM = 'unclaim'
}

@Injectable({ providedIn: 'root' })
export class WorkAllocationCaseService {
  constructor(private readonly http: HttpClient, private readonly featureToggleService: FeatureToggleService) { }

  public getCase(caseId: string): Observable<Case> {
    const url = `${BASE_URL}/${caseId}`;
    return this.http.get<Case>(url);
  }

  public postCase(caseParams: CaseSearchParameters): Observable<Response> {
    return this.http.post<any>(`${BASE_URL}`, caseParams);
  }

  public searchCase(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>(`${BASE_URL}`, body);
  }

  public getMyCases(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>(`/workallocation2/my-work/cases`, body);
  }

  public getMyAccess(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return  this.http.post<Case[]>(`/workallocation2/my-work/cases`, body).pipe(
      switchMap((caseList) => {

        return  this.featureToggleService.getValue('case-access-management-specific-access-mock', false).pipe(
          switchMap((result:any) => {

            let refinedList= caseList['cases'].filter((item:any)=> result.scenarios.myAccess.includes(item.case_id));
            debugger;
            refinedList= refinedList.map((v,i) =>
              (
                {
                  ...v,
                  actions: {},
                  dateSubmitted: result.data.myAccess.filter(item=> item.id==v.case_id)[0].dateSubmitted,
                  access: result.data.myAccess.filter(item=> item.id==v.case_id)[0].accessProcess
                }
              )
            )
           caseList['cases'] = refinedList;
           caseList['total']= refinedList.length;
           caseList['total_records']= refinedList.length;

            return of(caseList);
          })
        )

      })
    )

  }

  // public getMyAccess(body: { searchRequest: SearchCaseRequest, view: string }):  Observable<any> {
  //  // return this.http.post<Case[]>(`/workallocation2/my-work/cases`, body);


  // //  return this.http.post<Case[]>(`/workallocation2/my-work/cases`, body).pipe(
  // //   concatMap( result1 : Case[] => {
  // //      this.featureToggleService.getValue('case-access-management-specific-access-mock', false)
  // //     .pipe(
  // //       map() ()=>
  // //       {
  // //         return value;
  // //       }
  // //     )

  // //     )
  // //     )



  // return this.http.post<Case[]>(`/workallocation2/my-work/cases`, body).pipe(
  //  // tap(character => this.characterWithoutHomeworld = character), // setting some "in-between" variable
  //   switchMap((cases,index  )=> {
  //     this.featureToggleService.getValue('case-access-management-specific-access-mock', false).pipe(
  //         map(result =>
  //           of(cases)
  //                     //,result: result

  //         )
  //     )
  //   })
  // )


  // //  return this.http.post<Case[]>(`/workallocation2/my-work/cases`, body).pipe(
  // //     switchMap(
  // //         cases => forkJoin(cases =>
  // //         this.featureToggleService.getValue('case-access-management-specific-access-mock', false).pipe(
  // //           map(results =>  {
  // //           debugger;
  // //           return of(cases);
  // //              // /* add results to matching items.subItems and */returnitem;
  // //         })
  // //     ))
  // // ));


  //   // this.featureToggleService.getValue('case-access-management-specific-access-mock', false);
  //   // this.specificAccess$.subscribe(data => {
  //   //   //bu datadaki idleri alacaksin, su servisden donen caseleri filtreliyeceksin.this.caseService.getMyCases({searchRequest, view: this.view});
  //   //   // bunuda aslinda bu servisin icinde yapacaksin burada direk onun sonucunu doneceksin
  //   //   debugger;
  //   //   return data;
  //   // }
  //   // );

  // }

  public getCases(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>(`/workallocation2/all-work/cases`, body);
  }

  public getActionUrl(caseId: string, action: ACTION): string {
    return `${BASE_URL}/${caseId}/${action}`;
  }

  /**
   * Call the API to complete a case.
   * @param caseId specifies which case should be completed.
   */
  public completeCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.COMPLETE);
  }

  public cancelCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.CANCEL);
  }

  /**
   * Call the API to assign a case to a user.
   * @param caseId specifies which case should be assigned.
   * @param user specifies who this case should be assigned to.
   */
  public assignCase(caseId: string, user: any): Observable<Response> {
    // Make a POST with the specified assignee in the payload.
    return this.http.post<any>(this.getActionUrl(caseId, ACTION.ASSIGN), user);
  }

  public claimCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.CLAIM);
  }

  public unclaimCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.UNCLAIM);
  }

  public performActionOnCase(caseId: string, action: ACTION): Observable<Response> {
    // Make a POST with an empty payload.
    return this.http.post<any>(this.getActionUrl(caseId, action), {});
  }
}
