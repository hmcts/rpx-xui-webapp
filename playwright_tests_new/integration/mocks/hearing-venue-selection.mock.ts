/** Local browser fixture for the venue input and its detached autocomplete overlays. */
export function hearingVenueSelectionMarkup(
  options: {
    relation?: 'aria-owns' | 'aria-controls';
    stalePanel?: boolean;
    missingAssociation?: boolean;
    focusedOffscreen?: boolean;
    wrongSelection?: boolean;
    noResults?: boolean;
    unrelatedNoResults?: boolean;
    delayedResults?: boolean;
    delayedAssociation?: boolean;
  } = {}
): string {
  return `<!doctype html><style>
    body { margin: 0; min-height: 2200px; }
    .search-location { margin-top: ${options.focusedOffscreen ? 1000 : 100}px; }
    input { height: 32px; }
    .cdk-overlay-pane { position: fixed; left: 20px; }
    [role=option] { display: block; height: 32px; background: white; }
  </style>
  ${options.stalePanel ? '<div class="cdk-overlay-pane" style="top: -400px"><div role="listbox" id="unrelated-options"><button role="option">Basingstoke stale court</button></div></div>' : ''}
  ${options.unrelatedNoResults ? '<div class="cdk-overlay-pane" style="top: 0"><div role="listbox" id="unrelated-empty"><div role="option">No results found</div></div></div>' : ''}
  <div class="search-location"><input id="searchVenueLocation" role="combobox"><a href="#"> Add location </a></div>
  <div id="selected"><a href="#"><span class="sr-only">Click to remove:</span> Existing court</a></div>
  <script>
    const input = document.querySelector('input');
    let selected = '';
    input.addEventListener('input', () => {
      document.querySelector('#owned-pane')?.remove();
      const pane = document.createElement('div');
      pane.id = 'owned-pane'; pane.className = 'cdk-overlay-pane';
      pane.style.top = input.getBoundingClientRect().bottom + 'px';
      pane.innerHTML = '<div role="listbox" id="owned-options"><button role="option">${options.noResults || options.delayedResults ? 'No results found' : 'Basingstoke County Court'}</button></div>';
      document.body.appendChild(pane);
      ${options.missingAssociation ? '' : options.delayedAssociation ? `setTimeout(() => input.setAttribute('${options.relation ?? 'aria-owns'}', 'owned-options'), 1500);` : `input.setAttribute('${options.relation ?? 'aria-owns'}', 'owned-options');`}
      ${options.delayedResults ? "setTimeout(() => { pane.querySelector('button').textContent = 'Basingstoke County Court'; }, 100);" : ''}
      const selectVenue = () => {
        selected = '${options.wrongSelection ? 'Different court' : 'Basingstoke County Court'}';
        input.value = 'Basingstoke County Court';
        pane.remove();
      };
      const option = pane.querySelector('button');
      option.id = 'owned-option';
      input.setAttribute('aria-activedescendant', option.id);
      option.addEventListener('click', selectVenue);
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') selectVenue();
      }, { once: true });
    });
    document.querySelector('.search-location a').addEventListener('click', (event) => {
      event.preventDefault();
      if (!selected) return;
      const tag = document.createElement('a'); tag.href = '#';
      tag.innerHTML = '<span class="sr-only">Click to remove:</span> ' + selected;
      document.querySelector('#selected').appendChild(tag);
    });
    ${options.focusedOffscreen ? 'input.focus({ preventScroll: true });' : ''}
  </script>`;
}
