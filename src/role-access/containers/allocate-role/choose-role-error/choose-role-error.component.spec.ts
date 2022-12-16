import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ChooseRoleErrorComponent } from './choose-role-error.component';

describe('ChooseRoleErrorComponent', () => {

  let component: ChooseRoleErrorComponent;
  let fixture: ComponentFixture<ChooseRoleErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ChooseRoleErrorComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                roleCategory: 'JUDICIAL',
                jurisdiction: 'IA'
              }
            },
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRoleErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the correct message with the correct parameters', () => {
    expect(component.jurisdiction).toBe('IA');
    // Note: Do not need to test every option - getLabe() test already does this
    expect(component.roleCategory).toBe('Judicial');
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
