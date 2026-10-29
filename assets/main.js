// Nav: mobile menu + Rooms dropdown (click/keyboard; hover handled in CSS)
const burger = document.querySelector('.burger'), nav = document.getElementById('nav'), dd = document.querySelector('.dd'), ddBtn = dd.querySelector('button');
burger.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
ddBtn.addEventListener('click', () => { const o = dd.classList.toggle('open'); ddBtn.setAttribute('aria-expanded', o); });
document.addEventListener('click', e => { if (!dd.contains(e.target)) { dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', false); } });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (dd.classList.contains('open')) { dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', false); ddBtn.focus(); }
  if (nav.classList.contains('open')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); burger.focus(); }
});
dd.addEventListener('focusout', e => { if (!dd.contains(e.relatedTarget)) { dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', false); } });

// Gallery lightbox
const gal = document.querySelector('.gal'), lb = document.querySelector('.lb');
if (gal && lb) {
  const items = [...gal.querySelectorAll('button')], img = lb.querySelector('img'), num = lb.querySelector('.n');
  let i = 0, last;
  const show = k => { i = (k + items.length) % items.length; const s = items[i].querySelector('img'); img.src = s.src; img.alt = s.alt; num.textContent = `${i + 1} / ${items.length}`; };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; last && last.focus(); };
  items.forEach((b, k) => b.addEventListener('click', () => { last = b; show(k); lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.querySelector('.x').focus(); }));
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.pv').onclick = () => show(i - 1);
  lb.querySelector('.nx').onclick = () => show(i + 1);
  lb.addEventListener('click', e => e.target === lb && close());
  document.addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  let sx = 0;
  lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(i + (d < 0 ? 1 : -1)); });
}
