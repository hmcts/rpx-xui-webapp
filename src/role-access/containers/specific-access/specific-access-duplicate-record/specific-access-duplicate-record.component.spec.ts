import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { getMockTasks } from '../../../../work-allocation/tests/utils.spec';
import { SpecificAccessDuplicateRecordComponent } from './specific-access-duplicate-record.component';

describe('SpecificAccessDuplicateRecordComponent', () => {
  let component: SpecificAccessDuplicateRecordComponent;
  let fixture: ComponentFixture<SpecificAccessDuplicateRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificAccessDuplicateRecordComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                taskAndRole: {
                  task: {
                    task: getMockTasks()[0]
                  },
                  role: []
                }
              }
            }
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificAccessDuplicateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
