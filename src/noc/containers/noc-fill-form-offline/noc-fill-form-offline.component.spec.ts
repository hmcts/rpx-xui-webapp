import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NocFillFormOfflineComponent } from './noc-fill-form-offline.component';

@Pipe({
  standalone: false,
  name: 'rpxTranslate',
})
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
      declarations: [NocFillFormOfflineComponent, RpxTranslateMockPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocFillFormOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include a new-tab warning in every link that opens a new tab', () => {
    const links = fixture.nativeElement.querySelectorAll('a[target="_blank"]') as NodeListOf<HTMLAnchorElement>;

    expect(links.length).toBe(3);
    links.forEach((link) => expect(link.textContent).toContain(component.newTabWarningText));
  });
});
