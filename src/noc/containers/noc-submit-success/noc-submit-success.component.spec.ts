import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RpxTranslationConfig, RpxTranslationModule, RpxTranslationService } from 'rpx-xui-translation';
import * as fromNocStore from '../../store';
import { UtilsModule } from '../noc-field/utils/utils.module';
import { NocSubmitSuccessComponent } from './noc-submit-success.component';


describe('NocSubmitSuccessComponent', () => {
  let store;
  let component: NocSubmitSuccessComponent;
  let fixture: ComponentFixture<NocSubmitSuccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NocSubmitSuccessComponent ],
      imports: [
        UtilsModule,
        RpxTranslationModule.forChild(),
      ],
      providers: [
        provideMockStore(),
        RpxTranslationService,
        RpxTranslationConfig,
      ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
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
