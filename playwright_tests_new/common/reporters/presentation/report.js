/* Progressive presentation only: native Odhín remains the source of result data. */
(() => {
  const dashboard = document.querySelector('#TabDashboard > .container-fluid > .row');
  if (!dashboard) return;
  dashboard.classList.add('report-grid');
  document.body.classList.add('report-compact');
  const density = document.createElement('button');
  density.type = 'button';
  density.className = 'report-density';
  density.textContent = 'Compact view';
  density.setAttribute('aria-pressed', 'true');
  density.addEventListener('click', () => {
    const compact = document.body.classList.toggle('report-compact');
    density.setAttribute('aria-pressed', String(compact));
  });
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'report-reset';
  reset.textContent = 'Reset layout';
  reset.addEventListener('click', () => {
    resetPanelOrder();
    dashboard.querySelectorAll('.report-panel').forEach((panel) => {
      panel.style.removeProperty('--panel-width');
      panel.style.removeProperty('--panel-height');
      panel.classList.remove('panel-sized', 'panel-expanded');
      const expand = panel.querySelector('.panel-expand');
      expand.setAttribute('aria-pressed', 'false');
      expand.setAttribute('aria-label', `Expand ${expand.dataset.title}`);
      expand.textContent = '↗';
    });
  });
  document.querySelector('.tab').append(density, reset);
  [...dashboard.children]
    .find((panel) => panel.querySelector('.info-box-header')?.textContent.trim() === 'Status by test file')
    ?.remove();
  [...dashboard.children].filter((column) => !column.querySelector('.info-box-header')).forEach((column) => column.remove());
  const cards = [...dashboard.children];
  cards.forEach((column, index) => {
    column.classList.add('report-panel');
    if (index >= 4) column.classList.add('report-panel-wide');
    column.dataset.panel = index;
    const header = column.querySelector('.info-box-header');
    if (!header) return;
    const title = header.textContent.trim();
    const expand = document.createElement('button');
    expand.type = 'button';
    expand.dataset.title = title;
    expand.className = 'panel-expand';
    expand.textContent = '↗';
    expand.setAttribute('aria-label', `Expand ${title}`);
    expand.setAttribute('aria-pressed', 'false');
    expand.addEventListener('click', () => {
      const expanded = column.classList.toggle('panel-expanded');
      expand.setAttribute('aria-pressed', String(expanded));
      expand.setAttribute('aria-label', `${expanded ? 'Restore' : 'Expand'} ${title}`);
      expand.textContent = expanded ? '↙' : '↗';
    });
    header.append(expand);
    const resize = document.createElement('button');
    resize.type = 'button';
    resize.className = 'panel-resize';
    resize.textContent = '◢';
    resize.setAttribute('aria-label', `Resize ${title}`);
    resize.title = 'Drag to resize. Arrow keys adjust size; Home resets this panel.';
    const setSize = (width, height) => {
      column.classList.remove('panel-expanded');
      column.classList.add('panel-sized');
      expand.setAttribute('aria-pressed', 'false');
      expand.setAttribute('aria-label', `Expand ${title}`);
      expand.textContent = '↗';
      column.style.setProperty('--panel-width', `${Math.min(dashboard.clientWidth, Math.max(320, width))}px`);
      column.style.setProperty('--panel-height', `${Math.max(180, height)}px`);
    };
    resize.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      resize.focus();
      const start = column.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;
      resize.setPointerCapture(event.pointerId);
      document.body.classList.add('report-resizing');
      resize.onpointermove = (move) => setSize(start.width + move.clientX - x, start.height + move.clientY - y);
      resize.onlostpointercapture = () => {
        resize.onpointermove = null;
        document.body.classList.remove('report-resizing');
      };
    });
    resize.addEventListener('keydown', (event) => {
      if (event.key === 'Home') {
        column.style.removeProperty('--panel-width');
        column.style.removeProperty('--panel-height');
        column.classList.remove('panel-sized');
      } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const bounds = column.getBoundingClientRect();
        setSize(
          bounds.width + (event.key === 'ArrowRight' ? 24 : event.key === 'ArrowLeft' ? -24 : 0),
          bounds.height + (event.key === 'ArrowDown' ? 24 : event.key === 'ArrowUp' ? -24 : 0)
        );
      } else return;
      event.preventDefault();
    });
    column.querySelector('.odhin-thin-border').append(resize);
  });

  // Store only panel order; report data remains untouched.
  const defaultOrder = cards.slice().sort((a, b) => Number(getComputedStyle(a).order) - Number(getComputedStyle(b).order));
  const orderKey = `odhin-panel-order:${location.pathname}`;
  const applyOrder = (panels) =>
    panels.forEach((panel) => {
      panel.style.order = '0';
      dashboard.append(panel);
    });
  const saveOrder = () => {
    try {
      localStorage.setItem(orderKey, JSON.stringify([...dashboard.children].map((panel) => panel.dataset.panel)));
    } catch {
      /* Storage may be disabled in published reports. */
    }
  };
  const resetPanelOrder = () => {
    applyOrder(defaultOrder);
    try {
      localStorage.removeItem(orderKey);
    } catch {
      /* Layout still resets in memory. */
    }
  };
  applyOrder(defaultOrder);
  try {
    const saved = JSON.parse(localStorage.getItem(orderKey));
    if (
      Array.isArray(saved) &&
      saved.length === cards.length &&
      new Set(saved).size === cards.length &&
      saved.every((id) => cards.some((panel) => panel.dataset.panel === id))
    ) {
      applyOrder(saved.map((id) => cards.find((panel) => panel.dataset.panel === id)));
    }
  } catch {
    /* Ignore unavailable or outdated saved layout. */
  }
  const announcement = document.createElement('span');
  announcement.className = 'visually-hidden';
  announcement.setAttribute('aria-live', 'polite');
  dashboard.before(announcement);
  cards.forEach((panel) => {
    const header = panel.querySelector('.info-box-header');
    const title = panel.querySelector('.panel-expand').dataset.title;
    const move = document.createElement('button');
    move.type = 'button';
    move.className = 'panel-move';
    move.textContent = '⠿';
    move.setAttribute('aria-label', `Move ${title}`);
    move.title = 'Drag to rearrange. Arrow keys move this panel earlier or later.';
    header.insertBefore(move, header.querySelector('.panel-expand'));
    const finish = () => {
      saveOrder();
      move.focus({ preventScroll: true });
      announcement.textContent = `${title}: panel ${[...dashboard.children].indexOf(panel) + 1} of ${cards.length}`;
    };
    move.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const earlier = ['ArrowLeft', 'ArrowUp'].includes(event.key);
      const neighbour = earlier ? panel.previousElementSibling : panel.nextElementSibling;
      if (!neighbour) return;
      dashboard.insertBefore(panel, earlier ? neighbour : neighbour.nextElementSibling);
      finish();
      move.scrollIntoView({ block: 'center' });
    });
    move.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      move.setPointerCapture(event.pointerId);
      const startX = event.clientX,
        startY = event.clientY;
      let target, after;
      const clean = () => {
        panel.classList.remove('panel-dragging');
        panel.style.removeProperty('transform');
        target?.classList.remove('panel-drop-target');
        move.onpointermove = move.onpointerup = move.onpointercancel = move.onlostpointercapture = null;
      };
      move.onpointermove = (pointer) => {
        panel.classList.add('panel-dragging');
        panel.style.transform = `translate(${pointer.clientX - startX}px, ${pointer.clientY - startY}px)`;
        target?.classList.remove('panel-drop-target');
        target = document.elementFromPoint(pointer.clientX, pointer.clientY)?.closest('.report-panel');
        if (!target || target === panel || target.parentElement !== dashboard) {
          target = null;
          return;
        }
        const bounds = target.getBoundingClientRect();
        after = pointer.clientY > bounds.y + bounds.height / 2;
        target.classList.add('panel-drop-target');
      };
      move.onpointerup = () => {
        if (target) dashboard.insertBefore(panel, after ? target.nextElementSibling : target);
        clean();
        finish();
      };
      move.onpointercancel = move.onlostpointercapture = clean;
    });
  });

  const summary = document.querySelector('#chart-status')?.closest('.odhin-thin-border');
  if (summary) {
    const count = (status) => Number(summary.querySelector(`.chart-status-${status}-info`)?.textContent.trim() || 0);
    const passed = count('passed');
    const total = ['passed', 'failed', 'timedOut', 'skipped', 'interrupted', 'flaky'].reduce(
      (sum, status) => sum + count(status),
      0
    );
    const attention = count('failed') + count('timedOut') + count('interrupted') + count('flaky');
    if (total > 0 && passed === total) {
      summary.querySelector('#chart-status').closest('table').parentElement.classList.add('report-redundant-chart');
    }
    const duration = cards[0]?.querySelector('tr:last-child td')?.textContent.trim() || '—';
    const metrics = document.createElement('section');
    metrics.className = 'report-metrics';
    metrics.setAttribute('aria-label', 'Run at a glance');
    [
      ['Tests in this run', String(total), 'Across all projects'],
      [
        'Pass rate',
        total ? `${Math.round((passed / total) * 1000) / 10}%` : '—',
        `${passed} passed · ${count('skipped')} skipped`,
      ],
      ['Needs attention', String(attention), 'Failed · timed out · interrupted · flaky'],
      ['Execution time', duration, 'Total elapsed time'],
    ].forEach(([label, value, detail], index) => {
      const metric = document.createElement('div');
      metric.className = `report-metric metric-${index}`;
      if (index === 2 && attention > 0) metric.classList.add('has-attention');
      [label, value, detail].forEach((text, part) => {
        const element = document.createElement(part === 1 ? 'strong' : 'span');
        element.textContent = text;
        metric.append(element);
      });
      metrics.append(metric);
    });
    dashboard.before(metrics);
  }

  // Decorate only dashboard status totals; keep native text for charts and filtering.
  document
    .querySelectorAll('#TabDashboard td[class*="result-status-"], #TabDashboard td[class*="chart-status-"]')
    .forEach((cell) => {
      if (!/^0(?:\s*\(0(?:\.0+)?%\)|(?:\.0+)?%)?$/.test(cell.textContent.trim())) return;
      cell.classList.add('report-zero');
      cell.setAttribute('aria-label', cell.textContent.trim());
    });

  // Make native div-based controls operable with the keyboard without replacing their handlers.
  [
    ['#theme-toggle', 'Toggle colour theme'],
    ['.modal-info-btn', 'About this report'],
  ].forEach(([selector, label]) => {
    const control = document.querySelector(selector);
    if (!control) return;
    control.setAttribute('role', 'button');
    control.setAttribute('aria-label', label);
    control.tabIndex = 0;
    control.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        control.click();
      }
    });
  });
  document.querySelectorAll('#test-list-table .test-row-result').forEach((row) => {
    const title = row.cells[0];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'test-detail-link';
    button.setAttribute('aria-haspopup', 'dialog');
    button.append(...title.childNodes);
    title.append(button);
  });
  document.querySelectorAll('#TabDashboard .table-responsive').forEach((region) => {
    region.tabIndex = 0;
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', 'Scrollable report table');
  });
})();

// Use the existing DataTables instance so filters compose with search, sorting and pagination.
if (window.jQuery)
  $(document).ready(() => {
    if (!document.querySelector('#test-list-table')) return;
    const table = $('#test-list-table').DataTable();
    $('#test-list-table').wrap(
      '<div class="report-test-scroll" role="region" aria-label="Scrollable test results" tabindex="0"></div>'
    );
    // The native initializer sets 100 rows; keep any explicit saved page length.
    const durationColumn = table
      .columns()
      .header()
      .toArray()
      .findIndex((header) => header.textContent.trim() === 'Duration');
    // Keep detail navigation inside the filtered, sorted result set, including other pages.
    table
      .rows()
      .nodes()
      .toArray()
      .forEach((row) => {
        const modal = document.getElementById(row.dataset.bsTarget.slice(1));
        if (!modal) return;
        const navigation = document.createElement('nav');
        navigation.className = 'test-detail-navigation';
        navigation.setAttribute('aria-label', 'Test navigation');
        const back = document.createElement('button');
        back.type = 'button';
        back.textContent = '← Back to filtered results';
        back.dataset.bsDismiss = 'modal';
        const position = document.createElement('span');
        position.setAttribute('aria-live', 'polite');
        const previous = document.createElement('button');
        previous.type = 'button';
        previous.textContent = '← Previous test';
        const next = document.createElement('button');
        next.type = 'button';
        next.textContent = 'Next test →';
        let moving = false;
        const matchingRows = () => table.rows({ search: 'applied', order: 'applied' }).nodes().toArray();
        modal.addEventListener('show.bs.modal', () => {
          const rows = matchingRows();
          const index = rows.indexOf(row);
          position.textContent = `Test ${index + 1} of ${rows.length} matching tests`;
          previous.disabled = index <= 0;
          next.disabled = index === rows.length - 1;
        });
        modal.addEventListener('shown.bs.modal', () => back.focus());
        modal.addEventListener('hidden.bs.modal', () => {
          document.body.classList.remove('hide-scroll');
          if (moving) return;
          const index = matchingRows().indexOf(row);
          if (index >= 0 && table.page.len() > 0) table.page(Math.floor(index / table.page.len())).draw('page');
          row.querySelector('.test-detail-link').focus();
        });
        [previous, next].forEach((button, index) =>
          button.addEventListener('click', () => {
            const rows = matchingRows();
            const target = rows[rows.indexOf(row) + (index === 0 ? -1 : 1)];
            if (!target) return;
            moving = true;
            modal.addEventListener(
              'hidden.bs.modal',
              () => {
                moving = false;
                bootstrap.Modal.getOrCreateInstance(document.getElementById(target.dataset.bsTarget.slice(1))).show();
              },
              { once: true }
            );
            bootstrap.Modal.getOrCreateInstance(modal).hide();
          })
        );
        navigation.append(back, position, previous, next);
        modal.querySelector('.modal-content').prepend(navigation);
        modal.querySelector('.close-btn')?.remove();
      });
    const filters = document.createElement('div');
    filters.className = 'report-filters';
    filters.setAttribute('role', 'group');
    filters.setAttribute('aria-label', 'Filter tests');
    const selects = [];
    table.columns().every(function (index) {
      const name = this.header().textContent.trim();
      if (name === 'Project') {
        this.header().classList.add('report-project-column');
        this.footer()?.classList.add('report-project-column');
        this.nodes()
          .toArray()
          .forEach((cell) => cell.classList.add('report-project-column'));
      }
      if (!['Status', 'Project', 'File', 'Feature', 'Tags', 'Attempt'].includes(name)) return;
      const label = document.createElement('label');
      label.textContent = name === 'File' ? 'Test file' : name;
      const select = document.createElement('select');
      select.setAttribute('aria-label', name === 'File' ? 'Test file' : name);
      select.dataset.filter = name;
      select.add(new Option(`All ${name === 'Status' ? 'statuses' : name.toLowerCase() + 's'}`, ''));
      const values =
        name === 'Status'
          ? ['passed', 'failed', 'timedOut', 'skipped', 'interrupted', 'flaky']
          : [
              ...new Set(
                this.nodes()
                  .toArray()
                  .flatMap((cell) => (name === 'Tags' ? cell.textContent.split(', ').filter(Boolean) : [cell.textContent.trim()]))
              ),
            ].sort();
      values.filter(Boolean).forEach((value) => select.add(new Option(value, value)));
      const searchPattern = (value) => {
        const escaped = $.fn.dataTable.util.escapeRegex(value);
        return value ? (name === 'Tags' ? `(^|, )${escaped}(, |$)` : `^\\s*${escaped}\\s*$`) : '';
      };
      const restored = values.find((value) => searchPattern(value) === this.search());
      if (restored) select.value = restored;
      select.addEventListener('change', () => {
        table.column(index).search(searchPattern(select.value), true, false).draw();
      });
      selects.push(select);
      label.append(select);
      filters.append(label);
    });
    const clear = document.createElement('button');
    clear.type = 'button';
    clear.textContent = 'Clear filters';
    clear.addEventListener('click', () => {
      selects.forEach((select) => {
        select.value = '';
      });
      filters.querySelector('input[type=search]').value = '';
      table.search('').columns().search('').draw();
    });
    const search = document.querySelector('#test-list-table_filter label');
    if (search) {
      search.classList.add('report-search');
      search.querySelector('input').setAttribute('aria-label', 'Search tests');
      filters.append(search);
      document.querySelector('#test-list-table_filter').remove();
    }
    filters.append(clear);
    document.querySelector('#test-list-table_wrapper').prepend(filters);
    document.querySelector('#status-filter-row')?.remove();
    const drillDown = (cell, field, value) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'report-drilldown';
      button.textContent = cell.textContent.trim();
      button.title = `Show tests: ${value}`;
      button.addEventListener('click', () => {
        clear.click();
        const select = selects.find((control) => control.dataset.filter === field);
        select.value = value;
        select.dispatchEvent(new Event('change'));
        document.querySelector('.main-tablinks[onclick*="TabTests"]').click();
        select.focus();
      });
      cell.replaceChildren(button);
    };
    const featureColumn = table
      .columns()
      .header()
      .toArray()
      .findIndex((header) => header.textContent.trim() === 'Feature');
    document.querySelectorAll('#odhin-feature-summary tbody tr').forEach((row, index) => {
      if (featureColumn < 0) return;
      const name = row.cells[0].textContent.trim();
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'feature-toggle';
      toggle.textContent = name;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', `feature-tests-${index}`);
      row.cells[0].replaceChildren(toggle);
      drillDown(row.cells[1], 'Feature', name);
      const details = document.createElement('tr');
      details.id = `feature-tests-${index}`;
      details.hidden = true;
      details.className = 'feature-tests';
      const cell = details.insertCell();
      cell.colSpan = row.cells.length;
      const list = document.createElement('ul');
      list.setAttribute('aria-label', `${name} tests`);
      table
        .rows()
        .nodes()
        .toArray()
        .filter((test) => test.cells[featureColumn].textContent.trim() === name)
        .forEach((test) => {
          const item = document.createElement('li');
          const link = document.createElement('button');
          link.type = 'button';
          link.className = 'test-detail-link';
          link.textContent = test.cells[0].textContent.trim();
          link.setAttribute('aria-haspopup', 'dialog');
          const modal = document.getElementById(test.dataset.bsTarget.slice(1));
          const openDetails = (tab) => {
            row.cells[1].querySelector('button').click();
            tab?.click();
            bootstrap.Modal.getOrCreateInstance(modal).show();
          };
          link.addEventListener('click', () => openDetails());
          const context = document.createElement('span');
          context.className = 'feature-test-summary';
          context.textContent = `${test.cells[1].textContent.trim()} · ${test.cells[durationColumn]?.textContent.trim() ?? ''}`;
          const steps = document.createElement('button');
          steps.type = 'button';
          steps.className = 'feature-test-steps';
          steps.textContent = 'View steps';
          steps.addEventListener('click', () =>
            openDetails(
              [...modal.querySelectorAll('.result-tab-header button')].find((tab) => tab.textContent.trim() === 'Steps')
            )
          );
          item.append(link, context, steps);
          list.append(item);
        });
      cell.append(list);
      row.after(details);
      toggle.addEventListener('click', () => {
        details.hidden = !details.hidden;
        toggle.setAttribute('aria-expanded', String(!details.hidden));
      });
      const share = row.cells[row.cells.length - 1];
      share.classList.add('feature-share');
      share.style.setProperty('--feature-share', `${Math.min(100, Math.max(0, parseFloat(share.textContent) || 0))}%`);
    });
    ['passed', 'failed', 'timedOut', 'skipped', 'interrupted', 'flaky'].forEach((status) => {
      const cell = document.querySelector(`#TabDashboard .chart-status-${status}`);
      if (cell) drillDown(cell, 'Status', status);
    });
    const styleCharts = () => {
      if (!window.Chart) return;
      const style = getComputedStyle(document.documentElement);
      Object.values(Chart.instances).forEach((chart) => {
        const colors =
          chart.canvas.id === 'chart-status'
            ? chart.data.labels.map((label) => {
                const name = label.split(' ')[0];
                const status = name[0].toLowerCase() + name.slice(1);
                return style.getPropertyValue(`--odhin-${status}-status-color`).trim();
              })
            : ['#7663e6', '#3f9cb2', '#bb72c5', '#538ad4'];
        chart.data.datasets[0].backgroundColor = colors;
        chart.data.datasets[0].borderWidth = 0;
        chart.options.cutoutPercentage = 74;
        chart.options.animation.duration = 0;
        chart.update(0);
      });
    };
    styleCharts();
    document.querySelector('#theme-toggle')?.addEventListener('click', styleCharts);
  });

// Trace Viewer loads HTTP(S) URLs directly; local and embedded traces need file selection.
document.querySelectorAll('[id^="TabTrace-"]').forEach((panel) => {
  const download = panel.querySelector('a.download-btn[download]');
  const note = document.createElement('p');
  note.className = 'trace-help';
  if (!download) {
    note.textContent = 'No trace was retained for this test.';
    panel.append(note);
    return;
  }
  const viewer = new URL('https://trace.playwright.dev/');
  const trace = new URL(download.href, document.baseURI);
  const remote = ['http:', 'https:'].includes(trace.protocol);
  if (remote) viewer.searchParams.set('trace', trace.href);
  // Replace an upstream viewer action if present, retaining the native download.
  panel.querySelectorAll('a:not([download])').forEach((link) => {
    if (link.textContent.trim() === 'View Trace') link.remove();
  });
  const open = document.createElement('a');
  open.className = 'trace-open';
  open.textContent = 'Open in Playwright Trace Viewer';
  open.href = viewer.href;
  open.target = '_blank';
  open.rel = 'noopener noreferrer';
  download.after(open);
  note.textContent = remote
    ? 'If authentication or CORS prevents loading, download the trace and select it in the viewer.'
    : 'Download the trace, then select the downloaded file in the viewer.';
  download.parentElement.append(note);
});

// Perfetto's documented PING/PONG handshake avoids a race while its new tab loads.
document.querySelectorAll('.perfetto-open').forEach((button) => {
  button.addEventListener('click', async () => {
    const origin = 'https://ui.perfetto.dev';
    const file = button.closest('.perfetto-file');
    const download = file.querySelector('a[download]');
    const status = file.querySelector('.perfetto-status');
    const popup = window.open(origin, '_blank');
    if (!popup) {
      status.textContent = 'Allow pop-ups to open Perfetto, or use Download JSON.';
      return;
    }
    button.disabled = true;
    status.textContent = 'Opening timeline…';
    const controller = new AbortController();
    let onMessage;
    let interval;
    let timeout;
    try {
      let cancellationError;
      let perfettoReady = false;
      const ready = new Promise((resolve, reject) => {
        const cancelOperation = (message) => {
          cancellationError = new Error(message);
          controller.abort();
          reject(cancellationError);
        };
        onMessage = (event) => {
          if (event.origin === origin && event.source === popup && event.data === 'PONG') {
            perfettoReady = true;
            resolve();
          }
        };
        window.addEventListener('message', onMessage);
        interval = setInterval(() => {
          if (popup.closed) cancelOperation('Perfetto was closed.');
          else popup.postMessage('PING', origin);
        }, 250);
        timeout = setTimeout(
          () => cancelOperation(perfettoReady ? 'Trace download did not finish.' : 'Perfetto did not respond.'),
          30_000
        );
      });
      const [buffer] = await Promise.all([
        fetch(download.href, { signal: controller.signal }).then((response) => {
          if (!response.ok) throw new Error(`Trace download failed (${response.status}).`);
          return response.arrayBuffer();
        }).catch((error) => {
          throw cancellationError || error;
        }),
        ready,
      ]);
      popup.postMessage({ perfetto: { buffer, title: download.download, fileName: download.download } }, origin);
      status.textContent = 'Timeline sent to Perfetto. Continue in the new tab.';
    } catch (error) {
      status.textContent = `${error.message} Use Download JSON, then open the file in Perfetto.`;
    } finally {
      controller.abort();
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('message', onMessage);
      button.disabled = false;
    }
  });
});
