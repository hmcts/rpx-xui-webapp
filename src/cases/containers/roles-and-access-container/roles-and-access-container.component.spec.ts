import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAndAccessContainerComponent } from './roles-and-access-container.component';

describe('RolesContainerComponent', () => {
  let component: RolesAndAccessContainerComponent;
  let fixture: ComponentFixture<RolesAndAccessContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesAndAccessContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAndAccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
