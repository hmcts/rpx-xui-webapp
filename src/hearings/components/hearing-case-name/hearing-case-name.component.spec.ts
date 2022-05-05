import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../hearing.test.data';
import { HearingCaseNameComponent } from './hearing-case-name.component';

describe('HearingPartiesTitleComponent', () => {
  let component: HearingCaseNameComponent;
  let fixture: ComponentFixture<HearingCaseNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingCaseNameComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingCaseNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return title', () => {
    expect(component.caseName).toBe('Jane vs DWP');
  });

  it('should destroy subscription', () => {
    const unsubscribeSpy = spyOn(component.serviceValueSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
