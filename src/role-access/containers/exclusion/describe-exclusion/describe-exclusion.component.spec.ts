import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DescribeExclusionComponent } from './describe-exclusion.component';

describe('DescribeExclusionComponent', () => {
  let component: DescribeExclusionComponent;
  let fixture: ComponentFixture<DescribeExclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DescribeExclusionComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribeExclusionComponent);
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
