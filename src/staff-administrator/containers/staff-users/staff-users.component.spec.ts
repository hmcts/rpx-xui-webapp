import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  StaffDataFilterService
} from '../../components/staff-users/services/staff-data-filter/staff-data-filter.service';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';
import { StaffUsersComponent } from './staff-users.component';

describe('StaffUsersComponent', () => {
  let component: StaffUsersComponent;
  let fixture: ComponentFixture<StaffUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        StaffUsersComponent
      ],
      providers: [
        StaffDataFilterService,
        StaffDataAccessService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
