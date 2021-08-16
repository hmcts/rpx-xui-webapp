import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ExuiCcdConnectorComponent} from './exui-ccd-connector.component';

describe('CCD Connector Component', () => {
  let component: ExuiCcdConnectorComponent;
  let fixture: ComponentFixture<ExuiCcdConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        ExuiCcdConnectorComponent,
      ],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExuiCcdConnectorComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    component.store = null;
    component.eventsBindings = [
      {type: 'cancelled', action: 'CreateCaseReset'},
      {type: 'submitted', action: 'ApplyChange'}
    ];
    component.fromFeatureStore = null;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('simplifyFormGroup()', () => {

    it('should return an object', () => {
      const object = {
        a: 'value',
      };

      expect(component.simplifyFormGroup(object)).toEqual({a: 'value'});
    });

    it('should set the formGroupValue as the key.', () => {
      const object = {
        formGroup: 'formGroupValue',
      };

      expect(component.simplifyFormGroup(object)).toEqual({formGroup: {value: undefined}});
    });
  });

  it('should have createDispatchers() method', () => {
    expect(component.createDispatchers).toBeTruthy();
  });

  it('should have ngOnDestroy() method', () => {
    expect(component.ngOnDestroy).toBeTruthy();
  });

});
