import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseUIToolkitModule, AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseHomeComponent } from '..';
import { ExUITitleService } from 'src/app/shared/services/exui-title.service';
import { AlertComponent } from 'src/cases/components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { reducers } from 'src/app/store';
import * as fromFeature from '../../store';

describe('CaseHomeComponent', () => {
  let component: CaseHomeComponent;
  let fixture: ComponentFixture<CaseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        StoreModule.forRoot({...reducers, cases: combineReducers(fromFeature.reducers)}),
      ],
      declarations: [CaseHomeComponent, AlertComponent],
      providers: [
        ExUITitleService,
        AlertService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

});
