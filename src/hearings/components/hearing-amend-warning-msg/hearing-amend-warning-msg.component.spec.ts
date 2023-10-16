import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../hearing.test.data';
import { HearingAmendWarningMsgComponent } from './hearing-amend-warning-msg.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('HearingAmendWarningMsgComponent', () => {
  let component: HearingAmendWarningMsgComponent;
  let fixture: ComponentFixture<HearingAmendWarningMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingAmendWarningMsgComponent, RpxTranslateMockPipe],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingAmendWarningMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if not view-edit mode', () => {
    expect(component.isViewEditMode).toBeFalsy();
  });

  it('should unsubscribe', () => {
    const unsubscribeSpy = spyOn(component.hearingConditionsSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
