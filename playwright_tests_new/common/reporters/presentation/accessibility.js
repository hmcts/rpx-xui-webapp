/* Report-local worksheet. No remote requests or browser storage of review notes. */
(() => {
  const root = document.querySelector('.a11y-workspace');
  if (!root) return;
  const get = (id) => root.querySelector(`#a11y-${id}`);
  const cards = [...root.querySelectorAll('.a11y-evidence-card')];
  function filter() {
    const query = get('search').value.trim().toLowerCase();
    for (const card of cards) {
      card.hidden =
        !card.textContent.toLowerCase().includes(query) ||
        (get('source').value && card.dataset.source !== get('source').value) ||
        (get('status').value && card.dataset.status !== get('status').value);
    }
    get('results').textContent = `${cards.filter((card) => !card.hidden).length} of ${cards.length} evidence records shown`;
  }
  ['search', 'source', 'status'].forEach((id) => get(id).addEventListener('input', filter));
  get('clear').addEventListener('click', () => {
    ['search', 'source', 'status'].forEach((id) => {
      get(id).value = '';
    });
    filter();
    get('search').focus();
  });
  root.querySelectorAll('nav a').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const heading = root.querySelector(`${link.getAttribute('href')} h2`);
      heading.tabIndex = -1;
      heading.focus();
      heading.scrollIntoView({ block: 'center' });
    })
  );
  const form = get('review-form');
  const fields = [...form.elements].filter((field) => field.name);
  const statuses = ['not-run', 'passed', 'failed', 'blocked', 'not-applicable'];
  const empty = () => Object.fromEntries(fields.map((field) => [field.name, field.tagName === 'SELECT' ? 'not-run' : '']));
  let reviews = [...get('scenario').options].map((option) => ({ scenario: option.textContent, ...empty() }));
  let selected = 0;
  let dirty = false;
  const message = (text) => {
    get('review-message').textContent = text;
  };
  function validate(review) {
    for (const field of fields) {
      const value = review[field.name];
      if (typeof value !== 'string' || value.length > (field.maxLength > 0 ? field.maxLength : 100))
        throw Error('Invalid review field.');
      if (field.tagName === 'SELECT' && !statuses.includes(value)) throw Error('Invalid review outcome.');
    }
    const completed = fields.filter((field) => field.tagName === 'SELECT' && review[field.name] !== 'not-run');
    if (
      completed.length &&
      (!review.reviewer.trim() ||
        !/^\d{4}-\d{2}-\d{2}$/.test(review.date) ||
        !Number.isFinite(Date.parse(review.date)) ||
        new Date(review.date).toISOString().slice(0, 10) !== review.date ||
        !review.environment.trim())
    ) {
      throw Error('Record reviewer, date and browser/tool versions before recording an outcome.');
    }
    if (completed.some((field) => !review[field.name.replace('-status', '-notes')].trim())) {
      throw Error('Add observations or evidence for each completed check, including not-applicable results.');
    }
  }
  function refresh() {
    const counts = Object.fromEntries(statuses.map((status) => [status, 0]));
    for (const review of reviews)
      for (const field of fields.filter((item) => item.tagName === 'SELECT')) counts[review[field.name]]++;
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    get('manual-count').textContent = `${total - counts['not-run']} / ${total}`;
    get('review-results').textContent = statuses.map((status) => `${status}: ${counts[status]}`).join(' · ');
  }
  function load() {
    fields.forEach((field) => {
      field.value = reviews[selected][field.name];
    });
    dirty = false;
  }
  form.addEventListener('input', () => {
    dirty = true;
    message('Unrecorded changes. Record this review before switching journeys or exporting.');
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const review = { scenario: reviews[selected].scenario, ...Object.fromEntries(new FormData(form)) };
    try {
      validate(review);
      reviews[selected] = review;
      dirty = false;
      refresh();
      message('Review recorded for this session. Export to keep or share it.');
    } catch (error) {
      message(error.message);
    }
  });
  get('scenario').addEventListener('change', () => {
    if (dirty) {
      get('scenario').value = String(selected);
      message('Record your changes before switching journey.');
      return;
    }
    selected = Number(get('scenario').value);
    load();
    message('Loaded selected journey review.');
  });
  get('export').addEventListener('click', () => {
    if (dirty) {
      message('Record your changes before exporting.');
      return;
    }
    const content = { version: 1, reportId: root.dataset.reportId, exportedAt: new Date().toISOString(), reviews };
    const url = URL.createObjectURL(new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'accessibility-manual-review.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    message('Worksheet exported, including checks not yet run. Keep it alongside this report.');
  });
  get('import').addEventListener('change', async () => {
    try {
      if (dirty) throw Error('Record your changes before importing.');
      const file = get('import').files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) throw Error('Worksheet must be smaller than 5 MB.');
      const data = JSON.parse(await file.text());
      if (
        data.version !== 1 ||
        data.reportId !== root.dataset.reportId ||
        !Array.isArray(data.reviews) ||
        data.reviews.length !== reviews.length
      ) {
        throw Error('Worksheet does not belong to this report or has an invalid format.');
      }
      data.reviews.forEach((review, index) => {
        if (!review || review.scenario !== reviews[index].scenario) throw Error('Journey context does not match.');
        validate(review);
      });
      reviews = data.reviews.map((review) =>
        Object.fromEntries(['scenario', ...fields.map((field) => field.name)].map((key) => [key, review[key]]))
      );
      load();
      refresh();
      message('Imported recorded reviews. Outcomes are reviewer-reported, not independently verified.');
    } catch (error) {
      message(`Import failed: ${error.message}`);
    } finally {
      get('import').value = '';
    }
  });
  refresh();
})();
