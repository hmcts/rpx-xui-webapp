import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RpxTranslationService } from 'rpx-xui-translation';
import { of } from 'rxjs';
import { PrivacyPolicyComponent } from '..';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;

  const translationServiceMock = {
    language: 'cy'
  };

  class MockActivatedRoute {
    public get fragment() {
      return of('overview');
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [PrivacyPolicyComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RpxTranslationService, useValue: translationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the fragment section', async () => {
    const documenentQuery = spyOn(document, 'querySelector').and.callThrough();
    component.ngOnInit();
    await fixture.whenStable();
    expect(documenentQuery).toHaveBeenCalledWith('#overview');
  });

  describe('showWelshTranslation', () => {
    it('should be true', async () => {
      expect(component.showWelshTranslation).toEqual(true);
    });

    it('should be false', async () => {
      translationServiceMock.language = 'en';
      expect(component.showWelshTranslation).toEqual(false);
    });
  });
});
