(function () {
  var root = document.documentElement;
  var HEADER = 80;

  // Scroll helper for app code: glides with Lenis when on, native otherwise.
  window.smoothScrollTo = function (target, opts) {
    var center = opts && opts.block === 'center';
    var el = typeof target === 'number' ? null : target;
    if (window.lenis) {
      var offset = -HEADER;
      if (el && center) offset = -(innerHeight - el.getBoundingClientRect().height) / 2;
      window.lenis.scrollTo(el || target, { offset: el ? offset : 0, duration: 1.15 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: center ? 'center' : 'start' });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  if (typeof Lenis === 'undefined') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var lenis = new Lenis({
    lerp: false,
    duration: 1.15,
    easing: function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    smoothWheel: true,
    syncTouch: false,
    anchors: { offset: -HEADER },
    prevent: function (node) {
      return !!(node.closest && node.closest('.drawer, .reader, .source-modal-overlay, [data-lenis-prevent]'));
    }
  });
  window.lenis = lenis;

  // Freeze page behind open drawers/modals.
  function checkModals() {
    var isModalOpen = root.classList.contains('modal-open') || 
                      document.querySelector('.drawer.open, .reader.open, .source-modal-overlay.open');
    if (isModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }

  var observer = new MutationObserver(checkModals);
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class', 'style'] });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
