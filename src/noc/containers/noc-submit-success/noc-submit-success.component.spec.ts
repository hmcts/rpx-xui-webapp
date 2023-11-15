import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { UtilsModule } from '../noc-field/utils/utils.module';
import { NocSubmitSuccessComponent } from './noc-submit-success.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocSubmitSuccessComponent', () => {
  let store;
  let component: NocSubmitSuccessComponent;
  let fixture: ComponentFixture<NocSubmitSuccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NocSubmitSuccessComponent, RpxTranslateMockPipe],
      imports: [
        UtilsModule
      ],
      providers: [
        provideMockStore()
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
