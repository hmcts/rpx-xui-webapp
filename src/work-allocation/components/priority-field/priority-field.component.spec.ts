import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { PriorityFieldComponent } from './priority-field.component';

describe('PriorityFieldComponent', () => {
  let component: PriorityFieldComponent;
  let fixture: ComponentFixture<PriorityFieldComponent>;
  let mockFeatureToggleService: jasmine.SpyObj<FeatureToggleService>;

  beforeEach(async () => {
    mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['getValue']);
    mockFeatureToggleService.getValue.and.returnValue(
      of({ configurations: [{ serviceName: 'IA', releaseVersion: '4' }] })
    );

    await TestBed.configureTestingModule({
      declarations: [PriorityFieldComponent],
      providers: [{ provide: FeatureToggleService, useValue: mockFeatureToggleService }]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isRelease4$ to true if release version is >= 4', () => {
    mockFeatureToggleService.getValue.and.returnValue(
      of({ configurations: [{ serviceName: 'IA', releaseVersion: '4' }] })
    );
    component.jurisdiction = 'IA';
    component.ngOnInit();

    component.isRelease4$.subscribe((isRelease4) => {
      expect(isRelease4).toBe(true);
    });
  });

  it('should set isRelease4$ to false if release version is < 4', () => {
    mockFeatureToggleService.getValue.and.returnValue(
      of({ configurations: [{ serviceName: 'IA', releaseVersion: '3' }] })
    );
    component.jurisdiction = 'IA';
    component.ngOnInit();

    component.isRelease4$.subscribe((isRelease4) => {
      expect(isRelease4).toBe(false);
    });
  });
});
