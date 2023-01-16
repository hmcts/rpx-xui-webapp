import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { staffUserDetailsTestData } from 'src/staff-administrator/test-data/staff-user-details.test.data';
import { StaffStatusComponent } from '../staff-status/staff-status.component';
import { StaffUserDetailsComponent } from './staff-user-details.component';

@Component({
  selector: 'exui-stub-component',
  template: ``,
})
class StubComponent {}

describe('StaffUserDetailsComponent', () => {
  let component: StaffUserDetailsComponent;
  let fixture: ComponentFixture<StaffUserDetailsComponent>;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffUserDetailsComponent, StaffStatusComponent, StubComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '/staff', component: StubComponent },
          { path: '/staff/update-user', component: StubComponent },
        ]),
        HttpClientTestingModule
      ],
      providers: [{
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                staffUserDetails: staffUserDetailsTestData
              }
            },
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
