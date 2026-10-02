export interface ContactLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Егор Данилов',
  title: 'Егор Данилов — сайты для бизнеса',
  description:
    'Дизайн, разработка и понятная структура сайтов для малого и среднего бизнеса.',
};

export const navigation = [
  { label: 'Проекты', href: '/work/' },
  { label: 'Услуги', href: '/services/' },
  { label: 'Процесс', href: '/#process' },
  { label: 'О себе', href: '/about/' },
  { label: 'Контакты', href: '/contact/' },
] as const;

// Добавлять только подтверждённые владельцем способы связи.
export const contacts: ContactLink[] = [
  { label: 'Telegram · @stapg', href: 'https://t.me/stapg' },
  { label: 'egor.danilov.mob@gmail.com', href: 'mailto:egor.danilov.mob@gmail.com' },
];

export const services = [
  {
    title: 'Сайт с нуля',
    description: 'Структура, дизайн, адаптивная разработка и подготовка к запуску.',
  },
  {
    title: 'Редизайн',
    description: 'Обновление структуры и визуальной подачи существующего сайта.',
  },
  {
    title: 'Доработка',
    description: 'Новые страницы, блоки и улучшение конкретных пользовательских сценариев.',
  },
] as const;

export const process = [
  { title: 'Разбираемся', description: 'Цель, аудитория и главное действие посетителя.' },
  { title: 'Проектируем', description: 'Структура, сценарии и визуальное направление.' },
  { title: 'Собираем', description: 'Страницы, адаптивность и взаимодействия.' },
  { title: 'Запускаем', description: 'Проверка, публикация и передача проекта.' },
] as const;
