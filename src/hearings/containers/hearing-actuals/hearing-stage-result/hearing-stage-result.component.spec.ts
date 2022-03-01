import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { HearingsService } from '../../../services/hearings.service';
import { initialState } from '../../../hearing.test.data';
import { HearingStageResultComponent } from './hearing-stage-result.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HearingStageResultComponent', () => {
  let component: HearingStageResultComponent;
  let fixture: ComponentFixture<HearingStageResultComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HearingStageResultComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingStageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.sub = new Observable().subscribe();
    spyOn(component.sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should not display hearing result dropdowns by default', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    expect(nativeElement.querySelector('#adjourned-reason')).toBeNull();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeNull();
  });

  it('should display dropdown when selecting a radio button', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const firstRadioButtonElement = nativeElement.querySelector('#completed');
    firstRadioButtonElement.click();
    fixture.detectChanges();

    expect(nativeElement.querySelector('#adjourned-reason')).toBeNull();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeNull();

    const secondRadioButtonElement = nativeElement.querySelector('#adjourned');
    secondRadioButtonElement.click();
    fixture.detectChanges();
    expect(nativeElement.querySelector('#adjourned-reason')).toBeDefined();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeNull();

    const thirdRadioButtonElement = nativeElement.querySelector('#cancelled');
    thirdRadioButtonElement.click();
    fixture.detectChanges();
    expect(nativeElement.querySelector('#adjourned-reason')).toBeNull();
    expect(nativeElement.querySelector('#cancelled-reason')).toBeDefined();
  });
});
