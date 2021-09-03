import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { State } from '../../../../app/store';
import { ChooseRadioOptionComponent } from '../../../components';
import { EXCLUSION_OPTION } from '../../../constants';
import { ExcludeOption, ExclusionNavigationEvent } from '../../../models';
import { ChooseExclusionComponent } from './choose-exclusion.component';

describe('ChooseExclusionComponent', () => {
  const radioOptionControl: FormControl = new FormControl('');
  const formGroup: FormGroup = new FormGroup({[EXCLUSION_OPTION]: radioOptionControl});

  let component: ChooseExclusionComponent;
  let fixture: ComponentFixture<ChooseExclusionComponent>;
  let store: MockStore<State>;

  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnStoreDispatch = jasmine.createSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ChooseRadioOptionComponent, ChooseExclusionComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    spyOnStoreDispatch = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ChooseExclusionComponent);
    component = fixture.componentInstance;
    component.formGroup = formGroup;
    spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: true}, {}]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check whether user is a case allocator', () => {
    expect(component.optionsList.length).toBe(2);
    spyOnPipeToStore.and.returnValue(of([{isCaseAllocator: false}, {}]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.optionsList.length).toBe(1);
  });

  it('should correctly navigate on click of continue', () => {
    const navEvent = ExclusionNavigationEvent.CONTINUE;
    component.radioOptionControl.setValue(ExcludeOption.EXCLUDE_ME);
    component.navigationHandler(navEvent);
    expect(spyOnStoreDispatch).toHaveBeenCalled();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
