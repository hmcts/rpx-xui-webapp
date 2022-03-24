import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SpecificAccessDeniedComponent } from './specific-access-denied.component';

describe('SpecificAccessDeniedComponent', () => {
  let component: SpecificAccessDeniedComponent;
  let fixture: ComponentFixture<SpecificAccessDeniedComponent>;
  let mockStore: any;
  const pipeSubject: Subject<any> = new Subject<any>();

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    mockStore.pipe.and.returnValue(pipeSubject);

    TestBed.configureTestingModule({
      declarations: [ SpecificAccessDeniedComponent],
      providers: [
        {
          provide: Store, useValue: mockStore
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SpecificAccessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
