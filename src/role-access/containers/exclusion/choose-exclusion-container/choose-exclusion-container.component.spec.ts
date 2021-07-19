import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { ChooseExclusionComponent } from './choose-exclusion-container.component';

describe('ChooseExclusionComponent', () => {
  let component: ChooseExclusionComponent;
  let fixture: ComponentFixture<ChooseExclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseExclusionComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseExclusionComponent);
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
