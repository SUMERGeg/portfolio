import { builderBlocks, builderDefaults, builderStorageKey, validBuilderBlocks, type BuilderBlockId } from '../data/builder';

class SiteBuilder extends HTMLElement {
  private order: BuilderBlockId[] = [...builderDefaults];
  private selected: BuilderBlockId | null = 'hero';
  private device = 'desktop';
  private controller?: AbortController;
  private dragged: BuilderBlockId | null = null;
  private pointer?: { id: number; startX: number; startY: number; source: HTMLElement; block: BuilderBlockId };
  private ghost?: HTMLElement;
  private suppressClickUntil = 0;
  private reduced = matchMedia('(prefers-reduced-motion: reduce)');

  connectedCallback() {
    this.controller?.abort();
    this.controller = new AbortController();
    try {
      const saved = JSON.parse(localStorage.getItem(builderStorageKey) || 'null');
      if (saved && Array.isArray(saved.order) && saved.order.every((id: unknown) => typeof id === 'string')) {
        this.order = validBuilderBlocks(saved.order);
        this.selected = this.order.includes(saved.selected) ? saved.selected : this.order[0] ?? null;
        this.device = saved.device === 'mobile' ? 'mobile' : 'desktop';
      }
    } catch { /* A blocked or unavailable storage never prevents editing. */ }
    this.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.disabled = false);
    this.classList.add('is-ready');
    const signal = this.controller.signal;
    this.addEventListener('click', this.onClick, { signal });
    this.addEventListener('pointerdown', this.onPointerDown, { signal });
    window.addEventListener('pointermove', this.onPointerMove, { signal });
    window.addEventListener('pointerup', this.onPointerUp, { signal });
    window.addEventListener('pointercancel', this.endDrag, { signal });
    window.addEventListener('blur', this.endDrag, { signal });
    this.addEventListener('keydown', event => { if (event.key === 'Escape') this.endDrag(); }, { signal });
    this.render(false);
  }

  disconnectedCallback() { this.endDrag(); this.controller?.abort(); }

  private block(id: string | undefined) { return builderBlocks.find(block => block.id === id); }

  private announce(message: string) { this.querySelector('[data-status]')!.textContent = message; }

  private onClick = (event: Event) => {
    if (performance.now() < this.suppressClickUntil) { event.preventDefault(); return; }
    const control = (event.target as Element).closest<HTMLElement>('button, [data-discuss]');
    if (!control || !this.contains(control)) return;
    if (control.hasAttribute('data-discuss') && !this.order.length) { event.preventDefault(); return; }
    const added = this.block(control.dataset.add);
    if (added) {
      if (!this.order.includes(added.id)) { this.order.push(added.id); this.announce(`Добавлен раздел «${added.title}».`); }
      this.selected = added.id;
    } else if (control.dataset.select) {
      this.selected = this.block(control.dataset.select)?.id ?? this.selected;
    } else if (control.dataset.remove) {
      const block = this.block(control.dataset.remove)!;
      const index = this.order.indexOf(block.id);
      this.order = this.order.filter(id => id !== block.id);
      if (this.selected === block.id) this.selected = this.order[Math.min(index, this.order.length - 1)] ?? null;
      this.announce(`Удалён раздел «${block.title}».`);
      this.render();
      (this.selected ? this.querySelector<HTMLButtonElement>(`.builder-order [data-select="${this.selected}"]`) : this.querySelector<HTMLButtonElement>('[data-add]'))?.focus({ preventScroll: true });
      return;
    } else if (control.dataset.move) {
      const block = this.block(control.dataset.id)!;
      const index = this.order.indexOf(block.id);
      const target = index + (control.dataset.move === 'up' ? -1 : 1);
      if (target < 0 || target >= this.order.length) return;
      [this.order[index], this.order[target]] = [this.order[target], this.order[index]];
      this.selected = block.id;
      this.announce(`«${block.title}»: позиция ${target + 1} из ${this.order.length}.`);
    } else if (control.dataset.deviceButton) {
      this.device = control.dataset.deviceButton;
    } else if (control.hasAttribute('data-reset')) {
      this.order = [...builderDefaults];
      this.selected = 'hero';
      this.device = 'desktop';
      this.announce('Восстановлена начальная структура из четырёх разделов.');
    } else return;
    this.render();
  };

  private render(animate = true) {
    const items = [...this.querySelectorAll<HTMLElement>('[data-row], [data-preview]')];
    items.forEach(item => item.getAnimations().forEach(animation => animation.cancel()));
    const before = new Map(items.filter(item => !item.hidden).map(item => [item, item.getBoundingClientRect()]));
    const focus = document.activeElement instanceof HTMLElement && this.contains(document.activeElement) ? document.activeElement : null;
    const orderList = this.querySelector('.builder-order')!;
    const previewList = this.querySelector('.builder-canvas-blocks')!;
    items.forEach(item => {
      const id = (item.dataset.row || item.dataset.preview) as BuilderBlockId;
      item.hidden = !this.order.includes(id);
      item.classList.toggle('is-selected', id === this.selected);
    });
    this.order.forEach((id, index) => {
      const row = this.querySelector<HTMLElement>(`[data-row="${id}"]`)!;
      const preview = this.querySelector<HTMLElement>(`[data-preview="${id}"]`)!;
      if (orderList.children[index] !== row) orderList.insertBefore(row, orderList.children[index] ?? null);
      if (previewList.children[index] !== preview) previewList.insertBefore(preview, previewList.children[index] ?? null);
      row.querySelector('.builder-number')!.textContent = String(index + 1).padStart(2, '0');
      row.querySelector<HTMLButtonElement>('[data-move="up"]')!.disabled = index === 0;
      row.querySelector<HTMLButtonElement>('[data-move="down"]')!.disabled = index === this.order.length - 1;
    });
    this.querySelectorAll<HTMLButtonElement>('[data-add]').forEach(button => {
      const block = this.block(button.dataset.add)!;
      const active = this.order.includes(block.id);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', `${active ? 'Выбрать' : 'Добавить'}: ${block.title}`);
      button.classList.toggle('is-selected', block.id === this.selected);
    });
    this.querySelectorAll<HTMLButtonElement>('[data-select]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.select === this.selected)));
    this.querySelectorAll<HTMLButtonElement>('[data-device-button]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.deviceButton === this.device)));
    this.querySelector<HTMLElement>('.builder-canvas')!.dataset.device = this.device;
    this.querySelectorAll<HTMLElement>('[data-empty]').forEach(item => item.hidden = this.order.length !== 0);
    const block = this.block(this.selected ?? undefined);
    const info = this.querySelector<HTMLElement>('[data-info]')!;
    info.hidden = !block;
    this.querySelector<HTMLElement>('[data-info-empty]')!.hidden = Boolean(block);
    if (block) {
      const fields = { title: block.title, purpose: block.purpose, content: block.content, prepare: block.prepare, action: block.action };
      const changed = this.querySelector('[data-info-title]')!.textContent !== block.title;
      Object.entries(fields).forEach(([key, value]) => this.querySelector(`[data-info-${key}]`)!.textContent = value);
      if (changed && animate && !this.reduced.matches) info.animate([{ opacity: .4, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
    }
    const count = this.order.length;
    this.querySelector('[data-count]')!.textContent = `${count} ${count === 1 ? 'раздел' : count > 1 && count < 5 ? 'раздела' : 'разделов'}`;
    this.querySelector('[data-advice]')!.textContent = !count ? 'Добавьте хотя бы один раздел, чтобы обсудить набросок.'
      : !this.order.includes('contact') ? 'Добавьте контакты, чтобы посетитель мог связаться.'
      : !this.order.includes('hero') ? 'Первый экран поможет сразу объяснить ваше предложение.'
      : 'Основа готова. Содержание и детали обсудим вместе.';
    const discuss = this.querySelector<HTMLAnchorElement>('[data-discuss]')!;
    discuss.href = `${this.dataset.contactUrl}&blocks=${encodeURIComponent(this.order.join(','))}`;
    discuss.setAttribute('aria-disabled', String(!count));
    discuss.tabIndex = count ? 0 : -1;
    try { localStorage.setItem(builderStorageKey, JSON.stringify({ order: this.order, selected: this.selected, device: this.device })); } catch { /* Editing still works without persistence. */ }
    if (focus && focus.isConnected && !focus.closest('[hidden]')) {
      if (focus instanceof HTMLButtonElement && focus.disabled) focus.closest('[data-row]')?.querySelector<HTMLButtonElement>('[data-select]')?.focus({ preventScroll: true });
      else focus.focus({ preventScroll: true });
    }
    if (this.selected) {
      const stage = this.querySelector<HTMLElement>('.builder-stage')!;
      const preview = this.querySelector<HTMLElement>(`[data-preview="${this.selected}"]`)!;
      const area = stage.getBoundingClientRect();
      const position = preview.getBoundingClientRect();
      if (position.top < area.top || position.bottom > area.bottom) stage.scrollTo({ top: stage.scrollTop + position.top - area.top - 12, behavior: animate && !this.reduced.matches ? 'smooth' : 'instant' });
    }
    if (animate && !this.reduced.matches) items.filter(item => !item.hidden).forEach(item => {
      const previous = before.get(item);
      const next = item.getBoundingClientRect();
      if (previous && (Math.abs(previous.top - next.top) > 1 || Math.abs(previous.left - next.left) > 1)) {
        item.animate([{ transform: `translate(${previous.left - next.left}px, ${previous.top - next.top}px)` }, { transform: 'translate(0, 0)' }], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
      } else if (!previous) item.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 240, easing: 'ease-out' });
    });
  }

  private onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || event.pointerType !== 'mouse') return;
    const source = (event.target as Element).closest<HTMLElement>('[data-add], .builder-row-select');
    const block = this.block(source?.dataset.add || source?.dataset.select);
    if (!source || !block) return;
    this.pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, source, block: block.id };
  };

  private dropTarget(x: number, y: number) {
    const element = document.elementFromPoint(x, y);
    if (!element || !this.contains(element) || !element.closest('.builder-order, .builder-canvas-blocks, .builder-canvas-empty, .builder-empty')) return null;
    const item = element.closest<HTMLElement>('[data-row], [data-preview]');
    return { item, id: item?.dataset.row || item?.dataset.preview, after: item ? y > item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2 : true };
  }

  private clearDrop() { this.querySelectorAll('.drop-before, .drop-after').forEach(item => item.classList.remove('drop-before', 'drop-after')); }

  private onPointerMove = (event: PointerEvent) => {
    if (!this.pointer || event.pointerId !== this.pointer.id) return;
    if (!this.dragged) {
      if (Math.hypot(event.clientX - this.pointer.startX, event.clientY - this.pointer.startY) < 7) return;
      this.dragged = this.pointer.block;
      this.pointer.source.setPointerCapture(event.pointerId);
      this.pointer.source.classList.add('is-dragging');
      this.classList.add('is-drag-active');
      this.ghost = document.createElement('div');
      this.ghost.className = 'builder-drag-ghost';
      this.ghost.setAttribute('aria-hidden', 'true');
      this.ghost.textContent = this.block(this.dragged)!.title;
      this.append(this.ghost);
    }
    event.preventDefault();
    this.ghost!.style.transform = `translate(${event.clientX + 14}px, ${event.clientY + 14}px) rotate(-1deg)`;
    if (event.clientY < 45) window.scrollBy(0, -12);
    else if (event.clientY > innerHeight - 45) window.scrollBy(0, 12);
    const target = this.dropTarget(event.clientX, event.clientY);
    this.clearDrop();
    target?.item?.classList.add(target.after ? 'drop-after' : 'drop-before');
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.pointer || event.pointerId !== this.pointer.id) return;
    if (!this.dragged) { this.endDrag(); return; }
    this.suppressClickUntil = performance.now() + 350;
    const target = this.dropTarget(event.clientX, event.clientY);
    if (!target) { this.endDrag(); return; }
    event.preventDefault();
    const id = this.dragged;
    if (target.id !== id) {
      this.order = this.order.filter(item => item !== id);
      const index = target.id ? this.order.indexOf(target.id as BuilderBlockId) + (target.after ? 1 : 0) : this.order.length;
      this.order.splice(index, 0, id);
    }
    this.selected = id;
    this.endDrag();
    this.render();
    this.announce(`«${this.block(id)!.title}»: позиция ${this.order.indexOf(id) + 1} из ${this.order.length}.`);
  };

  private endDrag = () => {
    if (this.dragged) this.suppressClickUntil = performance.now() + 350;
    if (this.pointer?.source.hasPointerCapture(this.pointer.id)) this.pointer.source.releasePointerCapture(this.pointer.id);
    this.pointer = undefined;
    this.ghost?.remove();
    this.ghost = undefined;
    this.dragged = null;
    this.classList.remove('is-drag-active');
    this.querySelectorAll('.is-dragging').forEach(item => item.classList.remove('is-dragging'));
    this.clearDrop();
  };
}

if (!customElements.get('site-builder')) customElements.define('site-builder', SiteBuilder);
