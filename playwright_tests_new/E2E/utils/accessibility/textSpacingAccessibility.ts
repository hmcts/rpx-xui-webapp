import type { Page } from '@playwright/test';

/** Layout heuristic for WCAG 1.4.12, not a complete conformance check. */
export async function collectTextSpacingClipping(page: Page) {
  return page.evaluate(() => {
    const elements = Array.from(document.body.querySelectorAll<HTMLElement>('*'));
    const texts = [document.body, ...elements].flatMap((element) =>
      Array.from(element.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
    );
    const clipped = (node: Node): boolean => {
      const parent = node.parentElement!;
      if (!parent.getClientRects().length || window.getComputedStyle(parent).visibility !== 'visible') return false;
      let rects: DOMRect[] | undefined;
      for (let ancestor: HTMLElement | null = parent; ancestor; ancestor = ancestor.parentElement) {
        const style = window.getComputedStyle(ancestor);
        const clipsX = ['hidden', 'clip'].includes(style.overflowX);
        const clipsY = ['hidden', 'clip'].includes(style.overflowY);
        if (!clipsX && !clipsY) continue;
        if (!rects) {
          const range = document.createRange();
          range.selectNodeContents(node);
          rects = Array.from(range.getClientRects());
        }
        const box = ancestor.getBoundingClientRect();
        const left = box.left + ancestor.clientLeft;
        const top = box.top + ancestor.clientTop;
        if (
          rects.some(
            (rect) =>
              (clipsX && (rect.left < left - 1 || rect.right > left + ancestor.clientWidth + 1)) ||
              (clipsY && (rect.top < top - 1 || rect.bottom > top + ancestor.clientHeight + 1))
          )
        )
          return true;
      }
      return false;
    };
    // Compare the same text nodes, excluding existing clipping (including visually hidden labels).
    const baseline = new Map(texts.map((node) => [node, clipped(node)]));
    const scrollPositions = [document.documentElement, document.body, ...elements]
      .filter((element) => element.scrollTop || element.scrollLeft)
      .map((element) => ({ element, top: element.scrollTop, left: element.scrollLeft }));
    const style = document.createElement('style');
    style.dataset.textSpacingProbe = 'true';
    style.textContent = `
      * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
      p { margin-bottom: 2em !important; }
    `;
    try {
      document.head.appendChild(style);
      const affected = new Set(texts.filter((node) => !baseline.get(node) && clipped(node)).map((node) => node.parentElement!));
      return Array.from(affected, (element) => {
        const parts: string[] = [];
        for (let current: Element | null = element; current; current = current.parentElement) {
          if (current.id) {
            parts.unshift(`#${CSS.escape(current.id)}`);
            break;
          }
          const siblings = Array.from(current.parentElement?.children ?? []).filter(
            (sibling) => sibling.tagName === current!.tagName
          );
          parts.unshift(
            current.parentElement
              ? `${current.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(current) + 1})`
              : current.tagName.toLowerCase()
          );
        }
        return {
          rule: 'text-spacing-clipping',
          message:
            'Text becomes clipped by overflow:hidden/clip after WCAG 1.4.12 spacing overrides (layout heuristic; confirm visually).',
          advice:
            'Allow the container to grow or wrap text. Recheck with line height 1.5, paragraph spacing 2em, letter spacing 0.12em and word spacing 0.16em. The highlighted screenshot shows the restored layout.',
          selector: parts.join(' > '),
          html: element.outerHTML.slice(0, 500),
          codeLocation: { tag: element.tagName.toLowerCase(), ...(element.id ? { id: element.id } : {}) },
        };
      });
    } finally {
      style.remove();
      for (const { element, top, left } of scrollPositions) {
        element.scrollTop = top;
        element.scrollLeft = left;
      }
    }
  });
}
