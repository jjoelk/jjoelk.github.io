const stageTabs = Array.from(document.querySelectorAll('.pipeline [role="tab"]'));

function selectStage(nextTab) {
  for (const tab of stageTabs) {
    const selected = tab === nextTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  }
}

stageTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStage(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % stageTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + stageTabs.length) % stageTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = stageTabs.length - 1;
    else return;
    event.preventDefault();
    selectStage(stageTabs[nextIndex]);
    stageTabs[nextIndex].focus();
  });
});

const sectionLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of sectionLinks) {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, {rootMargin: '-15% 0px -55% 0px'});
  for (const link of sectionLinks) {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) observer.observe(section);
  }
}
