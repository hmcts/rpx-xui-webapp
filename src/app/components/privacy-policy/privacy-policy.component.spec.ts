import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPolicyComponent } from '..';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;


  class MockActivatedRoute {
    get fragment() {
      return of('overview');
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
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
});
