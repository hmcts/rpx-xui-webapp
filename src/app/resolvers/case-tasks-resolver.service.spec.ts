import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { TaskList } from '../../work-allocation/models/dtos';
import { CaseTasksResolverService } from './case-tasks-resolver.service';

describe('CaseTasksResolverService', () => {
  let service: CaseTasksResolverService;
  let httpClient: HttpClient;
  let router: Router;
  
  const TASKS: TaskList = {
    tasks: [
      {
        assignee: {
          userId: 'user123',
          userName: 'John Doe'
        },
        caseData: {
          category: 'EEA',
          location: {
            id: '231596',
            locationName: 'Birmingham'
          },
          name: 'Kimberly Julian',
          reference: '1620409659381330'
        },
        dueDate: new Date('2029-05-05T16:00:00.000+0000'),
        name: 'Review FTPA application',
        state: 'assigned'
      },
      {
        assignee: {
          userId: 'user456',
          userName: 'Jane Smith'
        },
        caseData: {
          category: 'Protection',
          location: {
            id: '366559',
            locationName: 'Glasgow'
          },
          name: 'James Carter',
          reference: '1620409659381330'
        },
        dueDate: new Date('2029-05-12T16:00:00.000+0000'),
        name: 'Review FTPA application',
        state: 'unassigned'
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        CaseTasksResolverService,
        { provide: APP_BASE_HREF, useValue: '/' },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CaseTasksResolverService);
    httpClient = TestBed.inject(HttpClient) as HttpClient;
    router = TestBed.inject(Router);
  });

  describe('resolve', () => {
    let activatedRoute: ActivatedRouteSnapshot;
    let mockParamMap: Map<string, string>;

    beforeEach(() => {
      activatedRoute = new ActivatedRouteSnapshot();
      mockParamMap = new Map<string, string>();
      spyOnProperty(activatedRoute, 'paramMap', 'get').and.returnValue({
        get: (key: string) => mockParamMap.get(key)
      } as any);
    });

    it('should return a list of tasks', (done) => {
      mockParamMap.set('cid', '1620409659381330');
      spyOn(httpClient, 'get').and.returnValue(of(TASKS));
      
      service.resolve(activatedRoute).subscribe((tasks: TaskList) => {
        expect(tasks.tasks.length).toBe(2);
        expect(httpClient.get).toHaveBeenCalledWith(
          '/workallocation/case/task/1620409659381330'
        );
        done();
      });
    });

    it('should construct the correct URL with case ID', (done) => {
      const caseId = '9876543210123456';
      mockParamMap.set('cid', caseId);
      spyOn(httpClient, 'get').and.returnValue(of(TASKS));
      
      service.resolve(activatedRoute).subscribe(() => {
        expect(httpClient.get).toHaveBeenCalledWith(
          `/workallocation/case/task/${caseId}`
        );
        done();
      });
    });

    it('should handle empty task list response', (done) => {
      mockParamMap.set('cid', '1620409659381330');
      const emptyTaskList: TaskList = { tasks: [] };
      spyOn(httpClient, 'get').and.returnValue(of(emptyTaskList));
      
      service.resolve(activatedRoute).subscribe((tasks: TaskList) => {
        expect(tasks.tasks.length).toBe(0);
        done();
      });
    });

    it('should handle null case ID', (done) => {
      mockParamMap.set('cid', null);
      spyOn(httpClient, 'get').and.returnValue(of(TASKS));
      
      service.resolve(activatedRoute).subscribe(() => {
        expect(httpClient.get).toHaveBeenCalledWith(
          '/workallocation/case/task/null'
        );
        done();
      });
    });

    it('should handle undefined case ID', (done) => {
      // Don't set cid in paramMap, so it returns undefined
      spyOn(httpClient, 'get').and.returnValue(of(TASKS));
      
      service.resolve(activatedRoute).subscribe(() => {
        expect(httpClient.get).toHaveBeenCalledWith(
          '/workallocation/case/task/undefined'
        );
        done();
      });
    });

    describe('error handling', () => {
      beforeEach(() => {
        mockParamMap.set('cid', '1620409659381330');
        spyOn(router, 'navigate');
      });

      it('should handle 400 Bad Request error', (done) => {
        const error = { status: 400 };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        service.resolve(activatedRoute).subscribe({
          next: () => fail('should have errored'),
          error: () => fail('should have been caught'),
          complete: () => {
            expect(router.navigate).toHaveBeenCalledWith(['/service-down']);
            done();
          }
        });
      });

      it('should handle 401 Unauthorized error', (done) => {
        const error = { status: 401 };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        service.resolve(activatedRoute).subscribe({
          next: () => fail('should have errored'),
          error: () => fail('should have been caught'),
          complete: () => {
            expect(router.navigate).toHaveBeenCalledWith(['/not-authorised']);
            done();
          }
        });
      });

      it('should handle 403 Forbidden error', (done) => {
        const error = { status: 403 };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        service.resolve(activatedRoute).subscribe({
          next: () => fail('should have errored'),
          error: () => fail('should have been caught'),
          complete: () => {
            expect(router.navigate).toHaveBeenCalledWith(['/not-authorised']);
            done();
          }
        });
      });

      it('should handle 404 Not Found error', (done) => {
        const error = { status: 404 };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        service.resolve(activatedRoute).subscribe({
          next: () => fail('should have errored'),
          error: () => fail('should have been caught'),
          complete: () => {
            // With WILDCARD_SERVICE_DOWN, all errors redirect to service-down
            expect(router.navigate).toHaveBeenCalledWith(['/service-down']);
            done();
          }
        });
      });

      it('should handle 500 Internal Server Error', (done) => {
        const error = { status: 500 };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        service.resolve(activatedRoute).subscribe({
          next: () => fail('should have errored'),
          error: () => fail('should have been caught'),
          complete: () => {
            expect(router.navigate).toHaveBeenCalledWith(['/service-down']);
            done();
          }
        });
      });

      it('should handle 503 Service Unavailable error', (done) => {
        const error = { status: 503 };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        service.resolve(activatedRoute).subscribe({
          next: () => fail('should have errored'),
          error: () => fail('should have been caught'),
          complete: () => {
            expect(router.navigate).toHaveBeenCalledWith(['/service-down']);
            done();
          }
        });
      });

      it('should handle error without status code', (done) => {
        const error = { message: 'Network error' };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        service.resolve(activatedRoute).subscribe({
          next: () => fail('should have errored'),
          error: () => fail('should have been caught'),
          complete: () => {
            // With WILDCARD_SERVICE_DOWN, undefined status triggers wildcard redirect
            expect(router.navigate).toHaveBeenCalledWith(['/service-down']);
            done();
          }
        });
      });

      it('should return EMPTY observable after error handling', (done) => {
        const error = { status: 500 };
        spyOn(httpClient, 'get').and.returnValue(throwError(error));
        
        const result = service.resolve(activatedRoute);
        
        result.subscribe({
          next: () => fail('should not emit any value'),
          error: () => fail('should not emit error'),
          complete: () => {
            expect(router.navigate).toHaveBeenCalled();
            done();
          }
        });
      });
    });

    it('should only emit the first value when multiple values are emitted', (done) => {
      mockParamMap.set('cid', '1620409659381330');
      const secondTaskList: TaskList = { 
        tasks: [
          {
            assignee: { userId: 'user789' },
            caseData: {
              category: 'Other',
              location: { id: '123', locationName: 'London' },
              name: 'Test Case',
              reference: '9999999999999999'
            },
            dueDate: new Date('2029-06-01T00:00:00.000Z'),
            name: 'Another Task',
            state: 'pending'
          }
        ] 
      };
      let emissionCount = 0;
      
      spyOn(httpClient, 'get').and.returnValue(
        of(TASKS, secondTaskList)
      );
      
      service.resolve(activatedRoute).subscribe({
        next: (tasks: TaskList) => {
          emissionCount++;
          expect(tasks).toEqual(TASKS);
        },
        complete: () => {
          expect(emissionCount).toBe(1);
          done();
        }
      });
    });
  });

  describe('service instantiation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have the correct static CASE_TASKS_URL', () => {
      expect(CaseTasksResolverService.CASE_TASKS_URL).toBe('/workallocation/case/task');
    });
  });
});