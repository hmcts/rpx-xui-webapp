import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DescribeExclusionContainerComponent } from './describe-exclusion-container.component';

describe('DescribeExclusionComponent', () => {
  let component: DescribeExclusionContainerComponent;
  let fixture: ComponentFixture<DescribeExclusionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DescribeExclusionContainerComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeExclusionContainerComponent);
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
