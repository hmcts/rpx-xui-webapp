import { Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToolbarEventService, ToolbarButtonVisibilityService } from '@hmcts/media-viewer';
import { Subscription } from 'rxjs';
import { SearchResultsCount } from '@hmcts/media-viewer/lib/toolbar/toolbar-event.service';

@Component({
  selector: 'exui-media-viewer-search',
  templateUrl: './media-viewer-search.component.html',
  styleUrls: ['./media-viewer-search.component.scss']
})
export class MediaViewerSearchComponent implements OnInit, OnDestroy {

  @ViewChild('findInput') findInput: ElementRef<HTMLInputElement>;

  public highlightAll = true;
  public matchCase = false;
  public wholeWord = false;
  public resultsText = '';
  public searchText = '';
  public haveResults = false;
  public isAdvanced = false;

  private subscriptions: Subscription[] = [];

  constructor(
    public readonly toolbarButtons: ToolbarButtonVisibilityService,
    public readonly toolbarEvents: ToolbarEventService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.toolbarEvents.searchResultsCountSubject.subscribe(results => this.setSearchResultsCount(results))
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public onWindowKeyDown(e: KeyboardEvent): void {
    if (e.code === 'F3' || (e.ctrlKey && e.code === 'KeyF')) {
      e.preventDefault();

      this.toolbarButtons.searchBarHidden.next(false);
      setTimeout(() => this.findInput.nativeElement.focus(), 200);
    }
  }

  public searchNext(): void {
    this.toolbarEvents.search({
      searchTerm: this.searchText,
      highlightAll: this.highlightAll,
      matchCase: this.matchCase,
      wholeWord: this.wholeWord,
      previous: false,
      reset: false
    });
  }

  public searchPrev(): void {
    this.toolbarEvents.search({
      searchTerm: this.searchText,
      highlightAll: this.highlightAll,
      matchCase: this.matchCase,
      wholeWord: this.wholeWord,
      previous: true,
      reset: false
    });
  }

  public search(): void {
    this.toolbarEvents.search({
      searchTerm: this.searchText,
      highlightAll: this.highlightAll,
      matchCase: this.matchCase,
      wholeWord: this.wholeWord,
      previous: false,
      reset: true
    });
  }

  private setSearchResultsCount(results: SearchResultsCount): void {
    this.haveResults = results.total > 0;
    this.resultsText = this.haveResults
      ? `Found ${results.current} of ${results.total}`
      : 'Phrase not found';
  }

  public onInputKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.toolbarButtons.searchBarHidden.next(true);
    }
  }

  public advanced(): void {
    this.isAdvanced = !this.isAdvanced;
  }
}
