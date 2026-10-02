const header = document.querySelector<HTMLElement>('.site-header');
const toggle = header?.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = header?.querySelector<HTMLElement>('#primary-navigation');

if (header && toggle && navigation) {
  const desktop = window.matchMedia('(min-width: 75rem)');

  function setExpanded(expanded: boolean): void {
    if (!header || !toggle || !navigation) return;
    const isExpanded = expanded && !desktop.matches;

    if (!isExpanded && !desktop.matches && navigation.contains(document.activeElement)) {
      toggle.focus();
    }

    toggle.setAttribute('aria-expanded', String(isExpanded));
    navigation.hidden = !desktop.matches && !isExpanded;
  }

  header.classList.add('menu-ready');
  toggle.hidden = false;
  setExpanded(false);

  toggle.addEventListener('click', () => {
    setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setExpanded(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setExpanded(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !header.contains(event.target)) setExpanded(false);
  });

  desktop.addEventListener('change', () => setExpanded(false));
}
