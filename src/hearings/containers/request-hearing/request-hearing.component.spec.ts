import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HearingsService } from '../../../hearings/services/hearings.service';
import { RequestHearingComponent } from './request-hearing.component';
import createSpyObj = jasmine.createSpyObj;

describe('RequestHearingComponent', () => {
  let component: RequestHearingComponent;
  let fixture: ComponentFixture<RequestHearingComponent>;
  let mockStore: any;
  let hearingsService: HearingsService;
  beforeEach(() => {
    hearingsService = createSpyObj<any>('hearingsService', ['getAllHearings', 'loadHearingValues','onFormSubmission']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RequestHearingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore(),
        { provide: HearingsService, useValue: hearingsService }
      ]
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture = TestBed.createComponent(RequestHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check submit menthod', () => {
    component.onSubmit();
    expect(hearingsService.onFormSubmission).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
