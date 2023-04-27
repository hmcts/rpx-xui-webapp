import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NocAffirmationComponent } from './noc-affirmation.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocAffirmationComponent', () => {
  let store;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let spyOnPipeToStore = jasmine.createSpy();
  let spyOnDispatchToStore = jasmine.createSpy();
  let component: NocAffirmationComponent;
  let fixture: ComponentFixture<NocAffirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NocAffirmationComponent, RpxTranslateMockPipe],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);

    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(NocAffirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change affirmation', () => {
    const event = {
      currentTarget: {
        checked: true
      } };
    component.onChangeAffirmation(event);
    expect(spyOnDispatchToStore).toHaveBeenCalled();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
