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

  public ngOnInit() {
    this.subscriptions.push(
      this.toolbarEvents.setCurrentPage.subscribe(pageNumber => this.setCurrentPage(pageNumber)),
      this.toolbarEvents.setCurrentPageInputValue.subscribe(pageNumber => this.pageNumber = pageNumber)
    );
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
    this.toolbarEvents.changePageByDelta.next(1);
  }

  decreasePageNumber() {
    this.toolbarEvents.changePageByDelta.next(-1);
  }

  public onPageNumberInputChange(pageNumber: string) {
    this.toolbarEvents.setCurrentPage.next(Number.parseInt(pageNumber, 0));
  }

  private setCurrentPage(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  public rotate(rotation: number) {
    this.toolbarEvents.rotate.next(rotation);
  }

  public toggleSecondaryToolbar() {
    this.toolbarButtons.subToolbarHidden.next(!this.toolbarButtons.subToolbarHidden.getValue());
  }

  public printFile() {
    this.toolbarEvents.print.next();
  }

  public downloadFile() {
    this.toolbarEvents.download.next();
  }

  public zoom(zoomFactor: string) {
    this.toolbarEvents.zoom.next(+zoomFactor);
  }

  public stepZoom(zoomFactor: number) {
    this.toolbarEvents.stepZoom.next(zoomFactor);
    this.zoomSelect.nativeElement.selected = 'selected';
  }


}
