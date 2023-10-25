import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MockRpxTranslatePipe } from '../../../app/shared/test/mock-rpx-translate.pipe';
import { initialState } from '../../hearing.test.data';
import { HearingPartiesTitleComponent } from './hearing-parties-title.component';

describe('HearingPartiesTitleComponent', () => {
  let component: HearingPartiesTitleComponent;
  let fixture: ComponentFixture<HearingPartiesTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingPartiesTitleComponent, MockRpxTranslatePipe],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingPartiesTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return title', () => {
    expect(component.caseTitle).toBe('Jane vs DWP');
  });

  it('should destroy subscription', () => {
    component.serviceValueSub = of().subscribe();
    const unsubscribeSpy = spyOn(component.serviceValueSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
