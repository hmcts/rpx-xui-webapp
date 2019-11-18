import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarEventService, ToolbarButtonVisibilityService } from '@hmcts/media-viewer';
import { MediaViewerSearchComponent } from './media-viewer-search.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('MediaViewerSearchComponent', () => {
  let component: MediaViewerSearchComponent;
  let fixture: ComponentFixture<MediaViewerSearchComponent>;
  let toolbarService: ToolbarEventService;
  let nativeElement;
  let searchInput;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [ MediaViewerSearchComponent],
      imports: [ FormsModule ],
      providers: [ ToolbarEventService, ToolbarButtonVisibilityService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerSearchComponent);
    component = fixture.componentInstance;
    toolbarService = TestBed.get(ToolbarEventService);
    component.toolbarButtons.showHighlightButton = true;
    component.toolbarButtons.showDrawButton = true;
    nativeElement = fixture.debugElement.nativeElement;
    searchInput = component.findInput.nativeElement;
    searchInput.value = 'searchTerm';

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call search when the search button click', () => {
    spyOn(component, 'search').and.callThrough();
    const searchBtn = fixture.debugElement.query(By.css('#searchBtn')).nativeElement;
    searchBtn.click();
    fixture.detectChanges();
    expect(component.search).toHaveBeenCalled();
  });

  it('should call searchPrev when the findPrevious button click', () => {
    spyOn(component, 'searchPrev').and.callThrough();
    const findPrevious = fixture.debugElement.query(By.css('#findPrevious')).nativeElement;
    findPrevious.click();
    fixture.detectChanges();
    expect(component.searchPrev).toHaveBeenCalled();
  });

  it('should call searchNext when the findPrevious button click', () => {
    spyOn(component, 'searchNext').and.callThrough();
    const findNext = fixture.debugElement.query(By.css('#findNext')).nativeElement;
    findNext.click();
    fixture.detectChanges();
    expect(component.searchNext).toHaveBeenCalled();
  });

  it('should call advanced when the findPrevious button click', () => {
    spyOn(component, 'advanced').and.callThrough();
    const advanced = fixture.debugElement.query(By.css('#advanced')).nativeElement;
    advanced.click();
    fixture.detectChanges();
    expect(component.advanced).toHaveBeenCalled();
  });

  it('should show searchbar after f3 keypress', () => {
    component.toolbarButtons.searchBarHidden.next(true);
    fixture.detectChanges();

    const searchbar = nativeElement.querySelector('.mv-findbar');
    expect(searchbar.className).toContain('hidden');

    const event = new KeyboardEvent('keydown', { code : 'F3' });
    window.dispatchEvent(event);
    fixture.detectChanges();

    expect(searchbar.className).not.toContain('hidden');
  });

  it('should run search event', () => {
    const searchSpy = spyOn(component.toolbarEvents.search, 'next');
    component.searchText = 'searchTerm';
    const mockSearchOperation = {
      searchTerm: 'searchTerm',
      highlightAll: component.highlightAll,
      matchCase: component.matchCase,
      wholeWord: component.wholeWord,
      previous: false,
      reset: true
    };
    component.search();
    expect(searchSpy).toHaveBeenCalledWith(mockSearchOperation);
  });

  it('should close the searchbar on escape', () => {
    component.toolbarButtons.searchBarHidden.next(false);
    fixture.detectChanges();

    const searchbar = nativeElement.querySelector('.mv-findbar');
    expect(searchbar.className).not.toContain('hidden');

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    searchInput.dispatchEvent(event);
    fixture.detectChanges();

    expect(searchbar.className).toContain('hidden');
  });

});
