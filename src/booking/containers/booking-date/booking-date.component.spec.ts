import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { BookingTimePageText } from '../../models';
import { BookingDateComponent } from './booking-date.component';

describe('BookingDateComponent', () => {
  let component: BookingDateComponent;
  let fixture: ComponentFixture<BookingDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule , ExuiCommonLibModule , FormsModule],
      declarations: [ BookingDateComponent ],
      providers: [ FormBuilder]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BookingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and show the \"booking date\" info message banner', () => {
    expect(component).toBeDefined();
    const infoBannerElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(infoBannerElement.textContent).toContain(BookingTimePageText.CAPTION);
    const headingElement = fixture.debugElement.nativeElement.querySelector('.govuk-fieldset__heading');
    expect(headingElement.textContent).toContain(BookingTimePageText.TITLE);
  });
});
