import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkTableModule } from '@angular/cdk/table';
import { StaffDataFilterService } from '../../services/staff-data-filter.service';
import { StaffUserListComponent } from './staff-user-list.component';

describe('StaffUserListComponent', () => {
  let component: StaffUserListComponent;
  let fixture: ComponentFixture<StaffUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffUserListComponent ],
      imports: [CdkTableModule],
      providers: [StaffDataFilterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
