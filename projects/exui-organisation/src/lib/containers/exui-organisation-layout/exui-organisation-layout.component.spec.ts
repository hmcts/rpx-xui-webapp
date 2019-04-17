import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiOrganisationLayoutComponent } from './exui-organisation-layout.component';

describe('ExuiOrganisationLayoutComponent', () => {
  let component: ExuiOrganisationLayoutComponent;
  let fixture: ComponentFixture<ExuiOrganisationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExuiOrganisationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiOrganisationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
