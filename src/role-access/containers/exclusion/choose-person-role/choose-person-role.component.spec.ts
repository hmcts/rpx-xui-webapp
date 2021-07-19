import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { ChoosePersonRoleComponent } from './choose-person-role.component';

describe('ChoosePersonRoleComponent', () => {
  let component: ChoosePersonRoleComponent;
  let fixture: ComponentFixture<ChoosePersonRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosePersonRoleComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePersonRoleComponent);
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
