/** Reproduces Material's translated, overflow-clipped tab strip with native paging buttons. */
export function caseDetailsTabsMarkup(offset = 400, pagination = true, blocked = false, tabWidth = 300): string {
  return `<!doctype html><style>
    exui-case-details-home, mat-tab-header { display: block; }
    mat-tab-header { display: flex; width: 360px; margin: 30px; overflow: hidden; }
    .mat-tab-label-container { width: 300px; overflow: hidden; }
    [role=tablist] { display: flex; width: ${3 * tabWidth}px; transform: translateX(-${offset}px); transition: transform 500ms; }
    [role=tab] { flex: 0 0 ${tabWidth}px; height: 40px; }
    .mat-tab-header-pagination { width: 30px; flex-shrink: 0; }
    [hidden] { display: none; }
  </style>
  <exui-case-details-home><mat-tab-header>
    ${pagination ? `<button class="mat-tab-header-pagination mat-tab-header-pagination-before" ${blocked ? 'disabled' : ''}>Previous</button>` : ''}
    <div class="mat-tab-label-container"><div role="tablist">
      <button role="tab" aria-controls="documents" aria-selected="false">Documents</button>
      <button role="tab" aria-controls="history" aria-selected="false">History</button>
      <button role="tab" aria-controls="flags" aria-selected="false">Flags</button>
    </div></div>
    ${pagination ? '<button class="mat-tab-header-pagination mat-tab-header-pagination-after">Next</button>' : ''}
  </mat-tab-header>
  <div role="tabpanel" id="documents" hidden>Uploaded document</div>
  <div role="tabpanel" id="history" hidden>Event history</div>
  <div role="tabpanel" id="flags" hidden>Case flags</div>
  </exui-case-details-home>
  <script>
    let offset = ${offset};
    document.querySelectorAll('.mat-tab-header-pagination').forEach(button => button.addEventListener('click', () => {
      offset = Math.max(0, Math.min(${3 * tabWidth - 300}, offset + (button.textContent === 'Previous' ? -100 : 100)));
      document.querySelector('[role=tablist]').style.transform = 'translateX(-' + offset + 'px)';
    }));
    document.querySelectorAll('[role=tab]').forEach(tab => tab.addEventListener('click', () => {
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    }));
  </script>`;
}
