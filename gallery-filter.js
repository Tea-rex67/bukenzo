(function () {
  function initGalleryFilters() {
    const gallery = document.querySelector('.clients-gallery');
    if (!gallery) return;

    const buttons = Array.from(gallery.querySelectorAll('[data-gallery-filter]'));
    if (!buttons.length) return;

    const targets = Array.from(gallery.querySelectorAll('[data-gallery-group]'));

    function setActiveButton(filter) {
      buttons.forEach((btn) => {
        const isActive = btn.getAttribute('data-gallery-filter') === filter;
        btn.classList.toggle('is-active', isActive);
      });
    }

    function applyFilter(filter) {
      if (!filter || filter === 'all') {
        setActiveButton('all');
        gallery.classList.add('is-filter-all');
        targets.forEach((el) => el.classList.remove('is-hidden'));
        return;
      }

      setActiveButton(filter);
      gallery.classList.remove('is-filter-all');

      // Hide every group except the selected one
      targets.forEach((el) => {
        const group = el.getAttribute('data-gallery-group');
        const shouldShow = group === filter;
        el.classList.toggle('is-hidden', !shouldShow);
      });
    }

    // Initial state
    applyFilter('all');

    // Click handlers
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-gallery-filter') || 'all';
        applyFilter(filter);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryFilters);
  } else {
    initGalleryFilters();
  }
})();

