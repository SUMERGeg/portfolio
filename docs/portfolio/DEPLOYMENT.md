# Публикация на GitHub Pages

Площадка выбрана пользователем: GitHub Pages без собственного домена. Репозиторий: [SUMERGeg/portfolio](https://github.com/SUMERGeg/portfolio). Публичный адрес: `https://sumergeg.github.io/portfolio/`.

`.github/workflows/deploy.yml` собирает сайт при push в main или ручном запуске: Node 24, установка по lockfile, проверка типов, production build и загрузка Pages-артефакта. Использованы [официальные рекомендации Astro для GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).

Настройки публичной сборки:

```text
PUBLIC_SITE_URL=https://sumergeg.github.io
PUBLIC_BASE_PATH=/portfolio
PUBLIC_ENABLE_INDEXING=true
```

В Actions адрес и base вычисляются из имени владельца и репозитория. Локальный dev/preview работает в корне без этих переменных и остаётся noindex. `.env.example` — пример настроек; копировать его для обычного локального просмотра не требуется. Канонические адреса, Open Graph и Twitter metadata добавлены в общий layout; публичная сборка разрешает индексацию, 404 остаётся noindex. Sitemap содержит восемь содержательных страниц и исключает 404. Превью ссылок использует настоящий снимок главной `public/portfolio-preview.jpg`.

GitHub Pages должен иметь Source = GitHub Actions. Файл `404.html` входит в Pages-артефакт. Сборка статическая, без серверных форм и секретов приложения.

Проверено локально: 26 файлов без ошибок типов; публичная и локальная сборки проходят. Для `/portfolio/` проверены 270 внутренних адресов/ресурсов, canonical, изображение превью, robots и все восемь адресов sitemap. Публичные HTTP-статусы и запуск workflow проверяются после отправки в GitHub.
