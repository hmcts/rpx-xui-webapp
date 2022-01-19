import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../hearing.store.state.test';
import {HearingPartiesTitleComponent} from './hearing-parties-title.component';

describe('HearingPartiesTitleComponent', () => {
  let component: HearingPartiesTitleComponent;
  let fixture: ComponentFixture<HearingPartiesTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingPartiesTitleComponent],
      providers: [
        provideMockStore({initialState}),
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingPartiesTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
