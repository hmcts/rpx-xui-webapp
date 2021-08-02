import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../../../app/store/reducers';
import { ChooseRadioOptionComponent } from '../../../components';
import { CHOOSE_ALLOCATE_TO } from '../../../constants';
import { ChooseAllocateToComponent } from './choose-allocate-to.component';

describe('ChooseAllocateToComponent', () => {
  const radioOptionControl: FormControl = new FormControl('');
  const formGroup: FormGroup = new FormGroup({[CHOOSE_ALLOCATE_TO]: radioOptionControl});

  let component: ChooseAllocateToComponent;
  let fixture: ComponentFixture<ChooseAllocateToComponent>;
  let store: MockStore<State>;

  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnStoreDispatch = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ChooseRadioOptionComponent, ChooseAllocateToComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    spyOnStoreDispatch = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ChooseAllocateToComponent);
    component = fixture.componentInstance;
    component.formGroup = formGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
