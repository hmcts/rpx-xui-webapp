import { TestBed } from '@angular/core/testing';

import { TaskDataService } from './task-data.service';

describe('TaskDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskDataService = TestBed.get(TaskDataService);
    expect(service).toBeTruthy();
  });
});
