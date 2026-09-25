/* Filter and navigate the existing automated evidence. */
(() => {
  const root = document.querySelector('.a11y-workspace');
  if (!root) return;
  const get = (id) => root.querySelector(`#a11y-${id}`);
  const cards = [...root.querySelectorAll('.a11y-evidence-card')];
  const groups = [...root.querySelectorAll('.a11y-issue-group')];
  function filter() {
    const query = get('search').value.trim().toLowerCase();
    for (const card of cards) {
      card.hidden =
        !card.textContent.toLowerCase().includes(query) ||
        (get('source').value && card.dataset.source !== get('source').value) ||
        (get('status').value &&
          card.dataset.status !== get('status').value &&
          !(get('status').value === 'needs-review' && card.dataset.needsReview === 'true'));
    }
    for (const group of groups) {
      group.hidden =
        (get('status').value && group.dataset.status !== get('status').value) ||
        ![...group.querySelectorAll('.a11y-evidence-card')].some((card) => !card.hidden);
    }
    const records = [...get('all-records').querySelectorAll('.a11y-evidence-card')];
    const visibleGroups = groups.filter((group) => !group.hidden).length;
    get('results').textContent =
      `${visibleGroups} of ${groups.length} issue groups · ${records.filter((card) => !card.hidden).length} of ${records.length} evidence records match`;
    get('empty').hidden = visibleGroups > 0;
  }
  ['search', 'source', 'status'].forEach((id) => get(id).addEventListener('input', filter));
  get('clear').addEventListener('click', () => {
    ['search', 'source', 'status'].forEach((id) => {
      get(id).value = '';
    });
    filter();
    get('search').focus();
  });
  filter();
  root.querySelectorAll('nav a').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const heading = root.querySelector(`${link.getAttribute('href')} h2`);
      heading.tabIndex = -1;
      heading.focus();
      heading.scrollIntoView({ block: 'center' });
    })
  );
})();
