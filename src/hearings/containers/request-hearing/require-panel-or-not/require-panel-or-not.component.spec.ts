import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirePanelOrNotComponent } from './require-panel-or-not.component';

describe('RequirePanelOrNotComponent', () => {
  let component: RequirePanelOrNotComponent;
  let fixture: ComponentFixture<RequirePanelOrNotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirePanelOrNotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirePanelOrNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
