import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { ToolbarEventService, ToolbarButtonVisibilityService } from '@hmcts/media-viewer';
import { DOCUMENT } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
    selector: 'exui-media-viewer-toolbar',
    templateUrl: './media-viewer-toolbar.component.html',
    styleUrls: ['./media-viewer-toolbar.component.scss']
})

export class MediaViewerToolbarComponent implements OnInit, OnDestroy  {
  @ViewChild('zoomSelect') zoomSelect: ElementRef;

  public pageNumber = 1;
  private subscriptions: Subscription[] = [];

  public constructor(
    public readonly toolbarEvents: ToolbarEventService,
    public readonly toolbarButtons: ToolbarButtonVisibilityService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
  }

  public ngOnInit() {
    this.subscriptions.push(
      this.toolbarEvents.setCurrentPageSubject.subscribe(pageNumber => this.setCurrentPage(pageNumber)),
      this.toolbarEvents.setCurrentPageInputValueSubject.subscribe(pageNumber => this.pageNumber = pageNumber)
    );
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.text = 'function xuiMediaViewerDropdown() {var x = document.getElementById("mv-toolbar-right-exui");if (x.className === "mv-toolbar-right") {x.className += " responsive";} else {x.className = "mv-toolbar-right";}}';
    this.renderer2.appendChild(this._document.body, s);
  }

  public ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  // Handler onClick Event of the Highlight Mode Button
  public onClickHighlightToggle() {
    // Emit an event that HighlightMode has been enabled/disabled
    this.toolbarEvents.toggleHighlightMode();
  }
  // Handler onClick Event of the Draw Mode Button
  public onClickDrawToggle() {
    // Emit an event that HighlightMode has been enabled/disabled
    this.toolbarEvents.toggleDrawMode();
  }

  public toggleSideBar() {
    this.toolbarButtons.sidebarOpen.next(!this.toolbarButtons.sidebarOpen.getValue());
  }

  public toggleSearchBar() {
    this.toolbarButtons.searchBarHidden.next(!this.toolbarButtons.searchBarHidden.getValue());
  }

  public increasePageNumber() {
    this.toolbarEvents.changePageByDeltaSubject.next(1);
  }

  decreasePageNumber() {
    this.toolbarEvents.changePageByDeltaSubject.next(-1);
  }

  public onPageNumberInputChange(pageNumber: string) {
    this.toolbarEvents.setCurrentPageSubject.next(Number.parseInt(pageNumber, 0));
  }

  private setCurrentPage(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  public rotate(rotation: number) {
    this.toolbarEvents.rotate(rotation);
  }

  public printFile() {
    this.toolbarEvents.print();
  }

  public downloadFile() {
    this.toolbarEvents.download();
  }

  public zoom(zoomFactor: string) {
    this.toolbarEvents.zoom(+zoomFactor);
  }

  public stepZoom(zoomFactor: number) {
    this.toolbarEvents.stepZoom(zoomFactor);
    this.zoomSelect.nativeElement.selected = 'selected';
  }


}
