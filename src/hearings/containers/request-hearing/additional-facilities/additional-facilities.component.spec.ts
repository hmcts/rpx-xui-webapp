import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalFacilitiesComponent } from './additional-facilities.component';
import {provideMockStore} from '@ngrx/store/testing';

fdescribe('AdditionalFacilitiesComponent', () => {
  let component: AdditionalFacilitiesComponent;
  let fixture: ComponentFixture<AdditionalFacilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalFacilitiesComponent ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AdditionalFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
