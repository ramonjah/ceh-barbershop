(() => {
  const hero = document.querySelector('.hero');
  const logo = document.querySelector('.hero-brand');
  const header = document.querySelector('.eyebrow');
  const word = header.querySelector('.header-word');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let initialCenter = 0;
  let distance = 1;
  function measure() {
    const rect = hero.getBoundingClientRect();
    initialCenter = rect.top + scrollY + rect.height / 2;
    distance = Math.max(100, initialCenter - 34);
    update();
  }
  function update() {
    frame = 0;
    const progress = Math.min(1, Math.max(0, scrollY / distance));
    const blend = Math.min(1, Math.max(0, (progress - .55) / .45));
    const center = initialCenter - scrollY;
    const lift = (34 - center) * progress;
    logo.style.transform = reduced.matches ? 'none' : `translateY(${lift}px) scale(${1 - progress * .65})`;
    logo.style.opacity = String(1 - blend);
    word.style.opacity = String(blend);
    header.classList.toggle('is-collapsed', progress > .85);
  }
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, {passive:true});
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  reduced.addEventListener('change', update);
  measure();
})();
