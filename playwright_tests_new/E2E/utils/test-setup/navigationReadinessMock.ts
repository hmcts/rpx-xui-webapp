export function caseTabDocument(options: { spinner?: boolean; selected?: boolean } = {}): string {
  return `<exui-case-details-home style="display:block">
    <div role="tablist"><button role="tab" aria-controls="documents" aria-selected="${options.selected ?? false}">Case File View</button></div>
    <div role="tabpanel" id="documents"><h2>Documents (0)</h2><p>No results</p></div>
    ${options.spinner ? '<xuilib-loading-spinner style="display:block">Loading</xuilib-loading-spinner>' : ''}
  </exui-case-details-home>`;
}

export const caseActionDocument = `
  <select id="next-step"><option value="">Select an action</option><option value="uploadDocument">Upload Document</option></select>
  <div class="event-trigger"><button onclick="document.querySelector('[data-testid=click-count]').textContent = String(Number(document.querySelector('[data-testid=click-count]').textContent) + 1); document.querySelector('[data-testid=ready]').hidden = false">Go</button></div>
  <div data-testid="click-count">0</div><div data-testid="ready" hidden>Ready</div>
  <div id="overlay" style="position:fixed;inset:0;background:white;z-index:10">Loading</div>
`;
