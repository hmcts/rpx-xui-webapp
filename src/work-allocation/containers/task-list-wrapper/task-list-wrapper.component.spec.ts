import { CdkTableModule } from '@angular/cdk/table';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store';

import { TaskListComponent, TaskListWrapperComponent } from '..';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';

describe('TaskListWrapperComponent', () => {
  let component: TaskListWrapperComponent;
  let fixture: ComponentFixture<TaskListWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        CdkTableModule,
        RouterTestingModule,
        StoreModule.forRoot({...reducers}),
      ],
      declarations: [TaskListWrapperComponent, TaskListComponent],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should initialise', async () => {

  });
});
