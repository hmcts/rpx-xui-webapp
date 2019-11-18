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

  it('should update page number', () => {
    component.toolbarEvents.setCurrentPage.next(4);
    expect(component.pageNumber).toEqual(4);
  });

  it('should go to selected page', () => {
    const pageChangerSpy = spyOn(component.toolbarEvents.setCurrentPage, 'next');
    component.onPageNumberInputChange('4');
    expect(pageChangerSpy).toHaveBeenCalledWith(4);
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

  it('should call toggleSideBar when the index button click', () => {
    spyOn(component, 'toggleSideBar').and.callThrough();
    const indexBtn = fixture.debugElement.query(By.css('#mvIndexBtn')).nativeElement;
    indexBtn.click();
    fixture.detectChanges();
    expect(component.toggleSideBar).toHaveBeenCalled();
  });

  it('should call onClickDrawToggle when the draw button click', () => {
    spyOn(component, 'onClickDrawToggle').and.callThrough();
    const mvDrawBtn = fixture.debugElement.query(By.css('#mvDrawBtn')).nativeElement;
    mvDrawBtn.click();
    fixture.detectChanges();
    expect(component.onClickDrawToggle).toHaveBeenCalled();
  });


  it('should call onClickHighlightToggle when the hightlight button click', () => {
    spyOn(component, 'onClickHighlightToggle').and.callThrough();
    const mvHighlightBtn = fixture.debugElement.query(By.css('#mvHighlightBtn')).nativeElement;
    mvHighlightBtn.click();
    fixture.detectChanges();
    expect(component.onClickHighlightToggle).toHaveBeenCalled();
  });

  it('should call decreasePageNumber when the down button click', () => {
    spyOn(component, 'decreasePageNumber').and.callThrough();
    const mvDownBtn = fixture.debugElement.query(By.css('#mvDownBtn')).nativeElement;
    mvDownBtn.click();
    fixture.detectChanges();
    expect(component.decreasePageNumber).toHaveBeenCalled();
  });

  it('should call increasePageNumber when the up button click', () => {
    spyOn(component, 'increasePageNumber').and.callThrough();
    const mvUpBtn = fixture.debugElement.query(By.css('#mvUpBtn')).nativeElement;
    mvUpBtn.click();
    fixture.detectChanges();
    expect(component.increasePageNumber).toHaveBeenCalled();
  });

  it('should call stepZoom when the zoom minus or plus button click', () => {
    spyOn(component, 'stepZoom').and.callThrough();
    const mvMinusBtn = fixture.debugElement.query(By.css('#mvMinusBtn')).nativeElement;
    mvMinusBtn.click();
    fixture.detectChanges();
    expect(component.stepZoom).toHaveBeenCalledWith(-0.1);

    const mvPlusBtn = fixture.debugElement.query(By.css('#mvPlusBtn')).nativeElement;
    mvPlusBtn.click();
    fixture.detectChanges();
    expect(component.stepZoom).toHaveBeenCalledWith(0.1);
  });

  it('should call rotate when the rotate button click', () => {
    spyOn(component, 'rotate').and.callThrough();
    const mvRotateBtn = fixture.debugElement.query(By.css('#mvRotateBtn')).nativeElement;
    mvRotateBtn.click();
    fixture.detectChanges();
    expect(component.rotate).toHaveBeenCalledWith(90);
  });

  it('should call downloadFile when the download button click', () => {
    spyOn(component, 'downloadFile').and.callThrough();
    const mvDownloadBtn = fixture.debugElement.query(By.css('#mvDownloadBtn')).nativeElement;
    mvDownloadBtn.click();
    fixture.detectChanges();
    expect(component.downloadFile).toHaveBeenCalled();
  });

  it('should call printFile when the print button click', () => {
    spyOn(component, 'printFile').and.callThrough();
    const mvPrintBtn = fixture.debugElement.query(By.css('#mvPrintBtn')).nativeElement;
    mvPrintBtn.click();
    fixture.detectChanges();
    expect(component.printFile).toHaveBeenCalled();
  });

  it('should call toggleSearchBar when the search button click', () => {
    spyOn(component, 'toggleSearchBar').and.callThrough();
    const mvSearcgBtn = fixture.debugElement.query(By.css('#mvSearcgBtn')).nativeElement;
    mvSearcgBtn.click();
    fixture.detectChanges();
    expect(component.toggleSearchBar).toHaveBeenCalled();
  });

});
