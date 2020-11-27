import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromNocStore from '../../store';
import { NocAffirmationComponent } from './noc-affirmation.component';

describe('NocAffirmationComponent', () => {
  let store: MockStore<fromNocStore.State>;
  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnDispatchToStore = jasmine.createSpy();
  let component: NocAffirmationComponent;
  let fixture: ComponentFixture<NocAffirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocAffirmationComponent ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(NocAffirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change affirmation', () => {
    const event = {
      currentTarget: {
        checked: true
      }};
    component.onChangeAffirmation(event);
    expect(spyOnDispatchToStore).toHaveBeenCalled();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
