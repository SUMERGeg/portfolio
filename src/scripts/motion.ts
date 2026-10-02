const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 56.25rem)');
const running = new Set<Animation>();
let observer: IntersectionObserver | undefined;
let stopPointer: (() => void) | undefined;

function animate(element: Element, frames: Keyframe[], duration = 760, delay = 0): void {
  if (reducedMotion.matches || typeof element.animate !== 'function') return;
  const animation = element.animate(frames, { duration, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
  running.add(animation);
  animation.finished.then(() => running.delete(animation), () => running.delete(animation));
}

function reveal(element: Element, delay = 0): void {
  animate(element, [{ opacity: 0, transform: 'translate3d(0,32px,0)' }, { opacity: 1, transform: 'none' }], 760, delay);
}

function setupPointer(): void {
  stopPointer?.();
  stopPointer = undefined;
  if (reducedMotion.matches || !precisePointer.matches) return;
  const hero = document.querySelector<HTMLElement>('.home-hero');
  const device = hero?.querySelector<HTMLElement>('.hero-device');
  if (!hero || !device) return;
  let frame = 0;
  let x = 0;
  let y = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    device.style.removeProperty('--device-x');
    device.style.removeProperty('--device-y');
    device.style.removeProperty('--device-rx');
    device.style.removeProperty('--device-ry');
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || document.hidden) return;
    const bounds = hero.getBoundingClientRect();
    x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      device.style.setProperty('--device-x', `${x * 10}px`);
      device.style.setProperty('--device-y', `${y * 6}px`);
      device.style.setProperty('--device-rx', `${-y * 3}deg`);
      device.style.setProperty('--device-ry', `${x * 5}deg`);
    });
  };
  const hide = () => { if (document.hidden) reset(); };
  hero.addEventListener('pointermove', move, { passive: true });
  hero.addEventListener('pointerleave', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', hide);
  stopPointer = () => {
    reset();
    hero.removeEventListener('pointermove', move);
    hero.removeEventListener('pointerleave', reset);
    window.removeEventListener('blur', reset);
    document.removeEventListener('visibilitychange', hide);
  };
}

function setupMotion(): void {
  observer?.disconnect();
  running.forEach(animation => animation.cancel());
  running.clear();
  document.documentElement.dataset.motion = reducedMotion.matches ? 'reduced' : 'full';
  setupPointer();
  if (reducedMotion.matches) return;

  // Restored pages keep their scroll position and never replay the hero entrance.
  const restored = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type === 'back_forward';
  if (!restored && window.scrollY < 40) {
    document.querySelectorAll('.hero-label, .hero-headline, .hero-description, .hero-actions').forEach((element, index) => reveal(element, index * 75));
    const device = document.querySelector('.hero-device');
    if (device) animate(device, [{ opacity: 0, transform: `translate3d(${precisePointer.matches ? 45 : 0}px,42px,0) scale(.91)` }, { opacity: 1, transform: 'none' }], 1100, 90);
    const caption = document.querySelector('.hero-caption');
    if (caption) reveal(caption, 200);
  }

  if (!('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer?.unobserve(entry.target);
      // Elements are visible in base CSS; no JS, missed observers and anchors remain usable.
      if (!entry.target.contains(document.activeElement)) reveal(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll<HTMLElement>('.home-section, .work-grid > li, .case-screen, .interior-service, .interior-split, .interior-cta, .case-navigation').forEach(element => {
    if (element.getBoundingClientRect().top >= window.innerHeight - 24) observer?.observe(element);
  });
}

document.addEventListener('focusin', event => {
  if (!(event.target instanceof Element)) return;
  // Keyboard navigation must never land in a temporarily transparent section.
  for (const animation of running) {
    const target = (animation.effect as KeyframeEffect | null)?.target;
    if (target instanceof Element && target.contains(event.target)) animation.cancel();
  }
});
reducedMotion.addEventListener('change', setupMotion);
precisePointer.addEventListener('change', setupPointer);
window.addEventListener('pagehide', () => {
  observer?.disconnect();
  stopPointer?.();
  running.forEach(animation => animation.cancel());
});
window.addEventListener('pageshow', event => { if (event.persisted) setupMotion(); });
setupMotion();
