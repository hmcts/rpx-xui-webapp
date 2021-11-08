import { TaskTypesService } from './task-types.service';

describe('TaskTypesService', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  it('should be created', () => {
    const service: TaskTypesService = new TaskTypesService(mockHttpService);
    expect(service).toBeTruthy();
  });

  it('getTypesOfWork should make correct api call', () => {
    const service = new TaskTypesService(mockHttpService);
    service.getTypesOfWork();
    expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation2/task/types-of-work');
  });
});
