import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarEventService, ToolbarButtonVisibilityService } from '@hmcts/media-viewer';
import { MediaViewerToolbarComponent } from './media-viewer-toolbar.component';
import { By } from '@angular/platform-browser';

describe('MediaViewerToolbarComponent', () => {
  let component: MediaViewerToolbarComponent;
  let fixture: ComponentFixture<MediaViewerToolbarComponent>;
  let toolbarService: ToolbarEventService;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ MediaViewerToolbarComponent ],
      providers: [ ToolbarEventService, ToolbarButtonVisibilityService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerToolbarComponent);
    component = fixture.componentInstance;
    toolbarService = TestBed.get(ToolbarEventService);
    component.toolbarButtons.showHighlightButton = true;
    component.toolbarButtons.showDrawButton = true;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get the page number of the current page', () => {
    component.ngOnInit();
    toolbarService.setCurrentPageInputValue.next(2);
    expect(component.pageNumber).toEqual(2);
  });

  it('should not show sidebar', async(() => {
    component.toolbarButtons.sidebarOpen.asObservable()
      .subscribe(sidebarOpen => expect(sidebarOpen).toBeFalsy());
  }));

  it('should toggle sidebar open', async(() => {
    component.toggleSideBar();
    component.toolbarButtons.sidebarOpen.asObservable()
      .subscribe(sidebarOpen => expect(sidebarOpen).toBeTruthy());
  }));

  it('should not show searchbar', async(() => {
    component.toolbarButtons.searchBarHidden.asObservable()
      .subscribe(searchBarHidden => expect(searchBarHidden).toBeTruthy());
  }));
  
});
