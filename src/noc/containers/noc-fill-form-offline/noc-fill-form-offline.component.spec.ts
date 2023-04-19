import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NocFillFormOfflineComponent } from './noc-fill-form-offline.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocFillFormOfflineComponent', () => {
  let component: NocFillFormOfflineComponent;
  let fixture: ComponentFixture<NocFillFormOfflineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NocFillFormOfflineComponent, RpxTranslateMockPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocFillFormOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
