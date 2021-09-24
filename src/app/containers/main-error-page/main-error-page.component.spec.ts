import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { FooterComponent } from '../footer/footer.component';

import { MainErrorPageComponent } from './main-error-page.component';

describe('MainErrorPageComponent', () => {
  let component: MainErrorPageComponent;
  let fixture: ComponentFixture<MainErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ExuiCommonLibModule ],
      declarations: [ MainErrorPageComponent, FooterComponent, AppHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
