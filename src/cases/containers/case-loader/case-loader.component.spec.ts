import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PhaseBannerComponent } from '../../../app/components/phase-banner/phase-banner.component';
import { CaseLoaderComponent } from './case-loader.component';

describe('Loader Component', () => {
  let component: CaseLoaderComponent;
  let fixture: ComponentFixture<CaseLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseLoaderComponent, PhaseBannerComponent],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseLoaderComponent);
    component = new CaseLoaderComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
