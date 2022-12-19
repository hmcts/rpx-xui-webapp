import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RpxTranslationConfig, RpxTranslationModule, RpxTranslationService } from 'rpx-xui-translation';
import { NocFillFormOfflineComponent } from './noc-fill-form-offline.component';


describe('NocFillFormOfflineComponent', () => {
  let component: NocFillFormOfflineComponent;
  let fixture: ComponentFixture<NocFillFormOfflineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NocFillFormOfflineComponent ],
      imports: [
        RpxTranslationModule.forChild(),
      ],
      providers: [
        RpxTranslationService,
        RpxTranslationConfig,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocFillFormOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
