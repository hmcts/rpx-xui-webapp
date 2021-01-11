import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromNocStore from '../../store';
import { UtilsModule } from '../noc-field/utils/utils.module';
import { NocSubmitSuccessComponent } from './noc-submit-success.component';

describe('NocSubmitSuccessComponent', () => {
  let store: MockStore<fromNocStore.State>;
  let component: NocSubmitSuccessComponent;
  let fixture: ComponentFixture<NocSubmitSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocSubmitSuccessComponent ],
      imports: [
        UtilsModule
      ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'pipe').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocSubmitSuccessComponent);
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
