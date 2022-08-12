import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RpxTranslationConfig, RpxTranslationModule, RpxTranslationService } from 'rpx-xui-translation';

import { NocFillFormOfflineComponent } from './noc-fill-form-offline.component';

describe('NocFillFormOfflineComponent', () => {
  let component: NocFillFormOfflineComponent;
  let fixture: ComponentFixture<NocFillFormOfflineComponent>;

  beforeEach(async(() => {
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
