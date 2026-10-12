(() => {
  const wrap = document.querySelector('.booking-wrap');
  const handle = wrap.querySelector('.blade-handle');
  let pointer = null;
  let offset = 0;
  function setWidth(value) {
    const width = Math.min(50, Math.max(12, value));
    wrap.style.setProperty('--blade-width', `${width}%`);
    wrap.style.setProperty('--blade-edge', `${width}%`);
    handle.setAttribute('aria-valuenow', String(Math.round(width)));
  }
  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    const rect = wrap.getBoundingClientRect();
    offset = event.clientX - (rect.right - rect.width * Number(handle.getAttribute('aria-valuenow')) / 100);
    pointer = event.pointerId;
    handle.setPointerCapture(pointer);
    wrap.classList.add('is-dragging');
  });
  handle.addEventListener('pointermove', event => {
    if (pointer !== event.pointerId) return;
    const rect = wrap.getBoundingClientRect();
    setWidth((rect.right - event.clientX + offset) / rect.width * 100);
  });
  function finish() { pointer = null; wrap.classList.remove('is-dragging'); }
  handle.addEventListener('pointerup', finish);
  handle.addEventListener('pointercancel', finish);
  handle.addEventListener('lostpointercapture', finish);
  handle.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); });
  handle.addEventListener('keydown', event => {
    const value = Number(handle.getAttribute('aria-valuenow'));
    const values = {ArrowLeft:value + 2, ArrowRight:value - 2, Home:12, End:50};
    if (!(event.key in values)) return;
    event.preventDefault(); setWidth(values[event.key]);
  });
})();
