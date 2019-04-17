import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExuiOrganisationComponent } from './exui-organisation.component';

describe('ExuiOrganisationComponent', () => {
  let component: ExuiOrganisationComponent;
  let fixture: ComponentFixture<ExuiOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExuiOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
