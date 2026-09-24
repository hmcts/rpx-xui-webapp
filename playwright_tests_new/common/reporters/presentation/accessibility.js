/* Filter and navigate the existing automated evidence. */
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
})();
