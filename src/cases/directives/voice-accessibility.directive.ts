import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

const RESULT_SORT_LABEL = '.search-result-column-label';
const RICH_TEXT_EDITOR = '.ccd-rich-text-area__editor .ProseMirror[contenteditable="true"]';

/**
 * Adds native-control semantics to CCD toolkit controls that are rendered dynamically.
 * The toolkit currently renders sortable result headings as clickable divs, which are
 * difficult to target with speech control and are not keyboard operable by default.
 */
@Directive({
  standalone: false,
  selector: 'ccd-search-result, ccd-workbasket-filters, ccd-search-filters-wrapper, ccd-case-edit',
})
export class VoiceAccessibilityDirective implements OnInit, OnDestroy {
  private observer: MutationObserver | undefined;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    this.updateControls();
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => this.updateControls());
      this.observer.observe(this.elementRef.nativeElement, { childList: true, subtree: true, characterData: true });
    }
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.matches(RESULT_SORT_LABEL)) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      target.click();
    }
  }

  private updateControls(): void {
    const host = this.elementRef.nativeElement;

    host.querySelectorAll<HTMLElement>(RESULT_SORT_LABEL).forEach((heading) => {
      const label = heading.textContent?.trim();
      if (!label) {
        return;
      }
      heading.setAttribute('role', 'button');
      heading.setAttribute('tabindex', '0');
      heading.setAttribute('aria-label', `Sort by ${label}`);
    });

    host
      .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')
      .forEach((control) => {
        if (this.hasAccessibleName(control)) {
          return;
        }

        const associatedLabels = Array.from(control.labels ?? [])
          .map((element) => element.textContent?.trim() ?? '')
          .filter(Boolean);
        const groupLabels = Array.from(control.closest('.form-group')?.querySelectorAll('label') ?? [])
          .map((element) => element.textContent?.trim() ?? '')
          .filter(Boolean);
        const label = associatedLabels.join(' ') || (groupLabels.length === 1 ? groupLabels[0] : '');
        if (label) {
          control.setAttribute('aria-label', label);
        }
      });

    host.querySelectorAll<HTMLElement>(RICH_TEXT_EDITOR).forEach((editor) => {
      editor.setAttribute('role', 'textbox');
      editor.setAttribute('aria-multiline', 'true');
      editor.setAttribute('tabindex', '0');
      editor.setAttribute('spellcheck', 'true');
      editor.setAttribute('autocorrect', 'on');

      if (!this.hasAccessibleName(editor)) {
        const label = editor.closest('.ccd-rich-text-area')?.querySelector('.form-label')?.textContent?.trim();
        if (label) {
          editor.setAttribute('aria-label', label);
        }
      }
    });

    host
      .querySelectorAll<HTMLAnchorElement>('a[routerLink], a[aria-label^="go to case with Case reference:"]')
      .forEach((link) => {
        const caseReference = link
          .getAttribute('aria-label')
          ?.replace(/^go to case with Case reference:\s*/i, '')
          .trim();
        if (caseReference) {
          link.setAttribute('aria-label', `Open case ${caseReference}`);
        }
      });
  }

  private hasAccessibleName(control: HTMLElement): boolean {
    if (control.getAttribute('aria-label')?.trim()) {
      return true;
    }

    const labelledBy = control.getAttribute('aria-labelledby');
    return Boolean(
      labelledBy
        ?.split(/\s+/)
        .map((id) => control.ownerDocument.getElementById(id)?.textContent?.trim() ?? '')
        .filter(Boolean)
        .join(' ')
    );
  }
}
