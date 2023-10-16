import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiesUnavailableDatesComponent } from './parties-unavailable-dates.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('PartiesUnavailableDatesComponent', () => {
  let component: PartiesUnavailableDatesComponent;
  let fixture: ComponentFixture<PartiesUnavailableDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesUnavailableDatesComponent, RpxTranslateMockPipe]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PartiesUnavailableDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
