import { TaskDataService } from './task-data.service';

describe('TaskDataService', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  it('should be created', () => {
    const service: TaskDataService = new TaskDataService(mockHttpService);
    expect(service).toBeTruthy();
  });

  it('getTypesOfWork should make correct api call', () => {
    const service = new TaskDataService(mockHttpService);
    service.getTypesOfWork();
    expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation2/task/types-of-work');
  });
});
