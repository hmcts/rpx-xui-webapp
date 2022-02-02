import {ComponentFixture, TestBed} from '@angular/core/testing';
import {caseFlagsRefData, serviceHearingValuesModel} from '../../hearing.store.state.test';
import {CaseFlagType} from '../../models/hearings.enum';
import {CaseFlagsComponent} from './case-flags.component';

describe('CaseFlagsComponent', () => {
  let component: CaseFlagsComponent;
  let fixture: ComponentFixture<CaseFlagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseFlagsComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CaseFlagsComponent);
    component = fixture.componentInstance;
    component.caseFlagsRefData = caseFlagsRefData;
    component.hearingValueModel = serviceHearingValuesModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show REASONABLE_ADJUSTMENT', () => {
    component.caseFlagType = CaseFlagType.REASONABLE_ADJUSTMENT;
    component.ngOnInit();
    expect(component.caseFlagsGroup.length).toBe(2);
  });

  it('should show NON_REASONABLE_ADJUSTMENT', () => {
    component.caseFlagType = CaseFlagType.NON_REASONABLE_ADJUSTMENT;
    component.ngOnInit();
    expect(component.caseFlagsGroup.length).toBe(3);
  });

});
