import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RefDataModel } from 'src/hearings/models/refData.model';
import { HearingsRefDataService } from '../../../services/hearings-ref-data.service';
import { HearingStageComponent } from './hearing-stage.component';

fdescribe('HearingStageComponent', () => {
  let component: HearingStageComponent;
  let fixture: ComponentFixture<HearingStageComponent>;
  let hearingsRefDataService: any;
  const hearingsRefDataServiceMock = jasmine.createSpyObj('HearingsRefDataService', ['getRefData']);

  const source: RefDataModel[] = [
    {
      key: 'initial',
      value_en: 'Initial',
      value_cy: '',
      hintText_EN: 'Initial',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    },
    {
      key: 'final',
      value_en: 'Final',
      value_cy: '',
      hintText_EN: 'Final',
      hintTextCY: '',
      order: 2,
      parentKey: null,
    },
    {
      key: 'substantial',
      value_en: 'Substantial',
      value_cy: '',
      hintText_EN: 'Substantial',
      hintTextCY: '',
      order: 3,
      parentKey: null,
    },
    {
      key: 'case-management',
      value_en: 'Case management',
      value_cy: '',
      hintText_EN: 'Case management',
      hintTextCY: '',
      order: 4,
      parentKey: null,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingStageComponent ],
      providers: [{ provide: HearingsRefDataService, useValue: hearingsRefDataServiceMock }, FormBuilder],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hearingsRefDataService = TestBed.get(HearingsRefDataService);
    fixture = TestBed.createComponent(HearingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hearingsRefDataService.getRefData.and.returnValue(of(source));
  });

  it('should create and initilise data', () => {
    expect(component).toBeTruthy();
    expect(hearingsRefDataService.getRefData).toHaveBeenCalledWith('HearingType', 'SSCS');
  });

  it('should be in the same order as service', () => {
    const radioLabels = fixture.debugElement.queryAll(By.css('.govuk-radios__item label'));
    expect(radioLabels.length).toBeGreaterThan(0);

    for (let index = 0; index < radioLabels.length; index++) {
      expect(radioLabels[index].nativeElement.innerText).toEqual(source[index].value_en);
    }
  });
});
