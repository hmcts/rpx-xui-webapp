import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'exui-challenged-access-wrapper',
  templateUrl: './challenged-access-wrapper.component.html',
})
export class ChallengedAccessWrapperComponent implements OnInit, OnDestroy {
  private observer: MutationObserver;

  constructor(
    private readonly el: ElementRef,
    private readonly titleService: Title
  ) {}

  public ngOnInit(): void {
    this.observer = new MutationObserver(() => {
      if (this.el.nativeElement.querySelector('.govuk-error-summary')) {
        const currentTitle = this.titleService.getTitle();
        if (!currentTitle.startsWith('Error:')) {
          this.titleService.setTitle(`Error: ${currentTitle}`);
        }
      }
    });
    this.observer.observe(this.el.nativeElement, { childList: true, subtree: true });
  }

  public ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
