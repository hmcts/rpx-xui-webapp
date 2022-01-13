import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { first, mergeMap } from 'rxjs/operators';
import { Caseworker, TaskList } from '../../../work-allocation-2/models/dtos';
import { Task } from '../../../work-allocation-2/models/tasks';
import { CaseworkerDataService, WorkAllocationCaseService } from '../../../work-allocation-2/services';

@Component({
  selector: 'exui-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnInit {
  public static CASE_TASKS_URL: string = '/workallocation2/case/task';

  public caseDetails: CaseView;
  public tasks: Task[] = [];
  public tasksRefreshed: boolean = false;
  public caseworkers: Caseworker[] = [];
  public warningIncluded: boolean;

  constructor(private readonly http: HttpClient, private readonly waCaseService: WorkAllocationCaseService, private readonly route: ActivatedRoute, private readonly caseworkerService: CaseworkerDataService) { }

  public ngOnInit(): void {
    // note: internal logic used to be stored in resolver - resolver removed for smoother navigation purposes
    // i.e. navigating before loading
    const caseId = this.route.snapshot.paramMap.get('cid');
    const tasks$ = this.http.get<Task[]>(`${TasksContainerComponent.CASE_TASKS_URL}/${caseId}`);
    tasks$
      .pipe(
        first(),
        mergeMap((tasks) => {
          this.tasks = tasks;
          this.warningIncluded = this.tasks.some(task => task.warnings);
          return this.caseworkerService.getCaseworkersForSpecificService(tasks[0].jurisdiction);
        })
      ).subscribe(caseworkers => {
        this.caseworkers = caseworkers;
      });
    this.caseDetails = this.route.snapshot.data.case as CaseView;
  }

  public onTaskRefreshRequired(): void {
    this.waCaseService.getTasksByCaseId(this.caseDetails.case_id).pipe(first()).subscribe(tasks => {
      this.tasks = tasks;
      this.tasksRefreshed = true;
      this.warningIncluded = this.tasks.some(task => task.warnings);
    });
  }
}
