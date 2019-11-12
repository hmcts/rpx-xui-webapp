import { Component, OnInit, OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import { ToolbarEventService, ToolbarButtonVisibilityService } from '@hmcts/media-viewer';
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
    public readonly toolbarButtons: ToolbarButtonVisibilityService
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.toolbarEvents.setCurrentPage.subscribe(pageNumber => this.setCurrentPage(pageNumber)),
      this.toolbarEvents.setCurrentPageInputValue.subscribe(pageNumber => this.pageNumber = pageNumber)
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  // Handler onClick Event of the Highlight Mode Button
  onClickHighlightToggle() {
    // Emit an event that HighlightMode has been enabled/disabled
    this.toolbarEvents.toggleHighlightMode();
  }
  // Handler onClick Event of the Draw Mode Button
  onClickDrawToggle() {
    // Emit an event that HighlightMode has been enabled/disabled
    this.toolbarEvents.toggleDrawMode();
  }

  toggleSideBar() {
    this.toolbarButtons.sidebarOpen.next(!this.toolbarButtons.sidebarOpen.getValue());
  }

  toggleSearchBar() {
    this.toolbarButtons.searchBarHidden.next(!this.toolbarButtons.searchBarHidden.getValue());
  }

  increasePageNumber() {
    this.toolbarEvents.changePageByDelta.next(1);
  }

  decreasePageNumber() {
    this.toolbarEvents.changePageByDelta.next(-1);
  }

  onPageNumberInputChange(pageNumber: string) {
    this.toolbarEvents.setCurrentPage.next(Number.parseInt(pageNumber, 0));
  }

  private setCurrentPage(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  rotate(rotation: number) {
    this.toolbarEvents.rotate.next(rotation);
  }

  toggleSecondaryToolbar() {
    this.toolbarButtons.subToolbarHidden.next(!this.toolbarButtons.subToolbarHidden.getValue());
  }

  printFile() {
    this.toolbarEvents.print.next();
  }

  downloadFile() {
    this.toolbarEvents.download.next();
  }

  zoom(zoomFactor: string) {
    this.toolbarEvents.zoom.next(+zoomFactor);
  }

  stepZoom(zoomFactor: number) {
    this.toolbarEvents.stepZoom.next(zoomFactor);
    this.zoomSelect.nativeElement.selected = 'selected';
  }


}
