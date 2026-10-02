# Портфолио — Егор Данилов

Актуальные документы и основной дизайн-референс: [docs/portfolio/README.md](docs/portfolio/README.md).

Проекты портфолио: **NOIR (автодетейлинг), СЕЗОН (цветочный магазин), Lost&Found (городской сервис)**. Визуальное направление — тёмный Digital Grid по выбранному пользователем изображению.

Сайт опубликован: **[sumergeg.github.io/portfolio](https://sumergeg.github.io/portfolio/)**. Astro + TypeScript + CSS, девять страниц, галереи кейсов, иллюстрации услуг, анимации и реальные контакты. [Приёмка](docs/portfolio/ACCEPTANCE-REPORT.md) завершена; [публикация и результаты проверки](docs/portfolio/DEPLOYMENT.md).

## Запуск сайта

Требуется Node.js 22.12+ в ветке 22 либо Node.js 24+.

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

`dev` запускает разработку, `check` проверяет типы, `build` создаёт статический сайт в `dist/`, `preview` открывает собранную версию. Локальный просмотр сохраняет `noindex`; workflow GitHub Pages настраивает публичный адрес, базовый путь и индексацию автоматически.

Далее — справочная информация об установленном Codex Portfolio Kit. Для начала разработки использовать актуальные [требования](docs/portfolio/portfolio-project-context.md), [архитектуру](docs/portfolio/ARCHITECTURE.md) и [план](docs/portfolio/IMPLEMENTATION-ROADMAP.md).

## Codex Portfolio Kit

Project-scoped Codex setup for building a polished, reliable, technically strong portfolio website for **«Егор Данилов — сайты для бизнеса»**.

The kit follows current Codex conventions:

- persistent repo guidance in `AGENTS.md`;
- reusable skills in `.agents/skills/<skill>/SKILL.md`;
- custom subagents in `.codex/agents/*.toml`;
- project-scoped subagent registration in `.codex/config.toml`.

## What this kit is optimized for

The target is not “a website that compiles”. The target is a portfolio that simultaneously feels:

- visually authored rather than templated;
- commercially clear for small and medium businesses;
- responsive by composition, not by shrinking desktop;
- maintainable and technically conservative;
- accessible and fast;
- easy to review and iterate in Codex.

The visual direction is **Digital Grid**: dark graphite surfaces, strong typography, electric blue accents, restrained system details, large project presentation, and deliberate motion.

## Install

1. Unzip this archive somewhere outside your repo first.
2. Review the contents.
3. Copy these items into the **repository root**:
   - `AGENTS.md`
   - `.codex/`
   - `.agents/`
   - `docs/portfolio/`
4. If your repo already has `AGENTS.md` or `.codex/config.toml`, **merge them instead of overwriting them**.
5. Start Codex from the repository root.
6. In Codex, confirm the configuration with:
   - `/status`
   - `/debug-config`
   - `/skills`
7. For the strongest results, use a capable reasoning model available to your account and use high reasoning for architecture/review tasks.

Codex automatically discovers repo skills from `.agents/skills`. The custom agents are registered by `.codex/config.toml`.

## First prompt to use

Open `PROMPTS.md` and use **Prompt 1 — Start / audit the project**.

If the repository is empty or nearly empty, let Codex inspect the repo before choosing dependencies. The kit deliberately does not force a framework when a project already exists.

## Key project sources

The canonical product/design context lives in:

- `docs/portfolio/portfolio-project-context.md`
- `docs/portfolio/portfolio-design-brief.md`
- `docs/portfolio/figma-agent-portfolio-prompt.md`

`AGENTS.md` tells Codex when these documents matter; it does not force Codex to read all of them for every tiny change.

## Agent roles

- `art_director` — visual hierarchy, composition, typographic quality, anti-generic review.
- `ux_architect` — information architecture, conversion clarity, content hierarchy.
- `frontend_architect` — implementation boundaries, component architecture, technical risk.
- `implementation_worker` — focused code changes after requirements are clear.
- `responsive_qa` — breakpoints, overflow, text collisions, viewport behavior.
- `a11y_perf_reviewer` — accessibility, semantics, performance and SEO risks.
- `final_reviewer` — final holistic acceptance review.

Read-heavy agents are intentionally read-only. This reduces conflicting edits when Codex delegates in parallel.

## Skills

- `$portfolio-orchestration`
- `$portfolio-visual-direction`
- `$portfolio-design-system`
- `$portfolio-responsive-composition`
- `$portfolio-frontend-craft`
- `$portfolio-motion`
- `$portfolio-content-ux`
- `$portfolio-quality-gate`

Use a skill explicitly with `$skill-name` when you want to force that workflow, or let Codex select it from your task.

## Safe delegation model

Parallelize independent analysis and review work. Avoid multiple agents editing the same files at the same time.

A good pattern is:

1. `art_director` + `ux_architect` + `frontend_architect` inspect independently.
2. Main agent decides the implementation plan.
3. One `implementation_worker` owns a bounded change.
4. `responsive_qa` and `a11y_perf_reviewer` validate in parallel.
5. Main agent fixes findings.
6. `final_reviewer` performs the acceptance gate.

## Do not treat screenshots as implementation

A screenshot/reference is a design target, not a bitmap to paste into the page. Rebuild the interface with real layout, text, components, and responsive behavior.

## If Figma/browser tooling exists

Use it. The skills explicitly tell Codex to prefer real screenshots, DOM inspection, console evidence, computed layout and measured behavior over guesses.

If those tools are unavailable, Codex should still implement and validate with the repo’s existing test/build tooling, then state what could not be visually verified.
