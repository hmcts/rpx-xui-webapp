import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllocateRoleContainerComponent } from '..';

describe('AllocateRoleContainerComponent', () => {
  let component: AllocateRoleContainerComponent;
  let fixture: ComponentFixture<AllocateRoleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule
      ],
      declarations: [AllocateRoleContainerComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoleContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  describe('entering page', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });

});
