import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UtilsModule } from '../../../../noc/containers/noc-field/utils/utils.module';
import * as fromFeature from '../../../store';
import * as fromContainers from '../../add-exclusion';
import { SpecificAccessHomeComponent } from './specific-access-home.component';
import { SpecificAccessState } from '../../../models';
import { of } from 'rxjs';

describe('SpecificAccessHomeComponent', () => {
  let component: SpecificAccessHomeComponent;
  let fixture: ComponentFixture<SpecificAccessHomeComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  let store: MockStore<fromFeature.State>;
  let storePipeMock: any;

  const specificAccessStateData = {
    caseId: '111111',
    state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        UtilsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        SpecificAccessHomeComponent,
        ...fromContainers.containers
      ],
      providers: [
        provideMockStore(),
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                caseId: '111111',
              }
            }
          }
        },
      ]
    })
      .compileComponents();
    store = TestBed.get(Store);
    storePipeMock = spyOn(store, 'pipe');
    storePipeMock.and.returnValue(of(specificAccessStateData));
    fixture = TestBed.createComponent(SpecificAccessHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
