import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseUIToolkitModule, AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseHomeComponent } from '..';
import { ExUITitleService } from 'src/app/shared/services/exui-title.service';
import { AlertComponent } from 'src/cases/components';

describe('CaseHomeComponent', () => {
  let component: CaseHomeComponent;
  let fixture: ComponentFixture<CaseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule
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
