import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocAffirmationComponent } from './noc-affirmation.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromNocStore from '../../store';
import { Store } from '@ngrx/store';

describe('NocAffirmationComponent', () => {
  let store: MockStore<fromNocStore.State>;
  let spyOnPipeToStore = jasmine.createSpy();
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
    fixture = TestBed.createComponent(NocAffirmationComponent);
    component = fixture.componentInstance;
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
