import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskAlertBannerComponent } from '..';
import { Task } from '../../../work-allocation/models/tasks';

describe('TaskAlertBannerComponent', () => {
  let component: TaskAlertBannerComponent;
  let fixture: ComponentFixture<TaskAlertBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAlertBannerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAlertBannerComponent);
    component = fixture.componentInstance;
    component.tasks = getTasks();
    fixture.detectChanges();
  });

  function getTasks(): Task[] {
    return [
      {
        assignee: null,
        assigneeName: null,
        id: '1549476532065586',
        jurisdiction: 'IA',
        description: null,
        case_id: '1549476532065586',
        taskId: '1549476532065586',
        caseName: 'Kili Muso',
        caseCategory: 'Protection',
        location: 'Taylor House',
        taskName: 'Review respondent evidence',
        dueDate: new Date(628021800000),
        warnings: true,
        warning_list: {
          values: [
            {
              warningCode: '123',
              warningText: 'this is a warning message 1'
            },
            {
              warningCode: '124',
              warningText: 'this is a warning message 2'
            }
        ]},
        actions: []
      },
      {
        assignee: null,
        assigneeName: null,
        description: null,
        id: '1549476532065587',
        jurisdiction: 'IA',
        case_id: '1549476532065587',
        taskId: '1549476532065587',
        caseName: 'Mankai Lit',
        caseCategory: 'Revocation',
        location: 'Taylor House',
        taskName: 'Review appellant case',
        dueDate: new Date(628021800000),
        warnings: true,
        warning_list: {
          values: [
            {
              warningCode: '125',
              warningText: 'this is a warning message 3'
            },
            {
              warningCode: '124',
              warningText: 'this is a warning message 2'
            }
        ]},
        actions: [
          {
            id: 'actionId2',
            title: 'Release this task',
          }
        ]
      }
    ];
  }

  it('should have the relevant text', () => {
    component.alertTitle = 'This is the title';
    component.tasks = getTasks();
    fixture.detectChanges();
    const titleElement = document.getElementById(`alertTitle`) as HTMLElement;
    expect(titleElement.innerText).toBe(component.alertTitle);
    const messageElement = document.getElementById(`alertMessage`) as HTMLElement;
    expect(messageElement.textContent.trim()).toContain('this is a warning message 1');
    expect(messageElement.textContent.trim()).toContain('this is a warning message 2');
    expect(messageElement.textContent.trim()).toContain('this is a warning message 3');
  });
});
