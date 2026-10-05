export const builderBlocks = [
  { id: 'hero', title: 'Первый экран', purpose: 'За несколько секунд объясняет, чем вы полезны и с чего начать.', content: 'Короткий заголовок, суть предложения и одна главная кнопка.', prepare: 'Чем занимаетесь, кому помогаете и что отличает ваше предложение.', action: 'Узнать подробнее или обсудить задачу.' },
  { id: 'services', title: 'Услуги', purpose: 'Помогает сравнить предложения и выбрать подходящую услугу.', content: 'Названия, короткие описания, стоимость или условия расчёта.', prepare: 'Список услуг и их отличия. Если текста нет — сформулируем вместе.', action: 'Выбрать услугу и обратиться за подробностями.' },
  { id: 'catalog', title: 'Каталог', purpose: 'Позволяет изучить ассортимент и найти нужный товар.', content: 'Карточки товаров, категории, характеристики и цены.', prepare: 'Список товаров, фотографии и условия заказа.', action: 'Открыть товар или уточнить наличие. Заказ и оплату обсудим отдельно.' },
  { id: 'about', title: 'О компании', purpose: 'Помогает понять, кто стоит за предложением и почему вам можно доверять.', content: 'Ваш подход, команда, опыт и конкретные факты о работе.', prepare: 'Реальные сведения о компании и фотографии, если они есть.', action: 'Убедиться, что ваш подход подходит клиенту.' },
  { id: 'reviews', title: 'Отзывы', purpose: 'Показывает опыт людей, которые уже работали с вами.', content: 'Настоящие отзывы, имя автора и источник с его разрешения.', prepare: 'Отзывы, которые можно опубликовать. Если их пока нет, блок можно убрать.', action: 'Снять сомнения перед обращением.' },
  { id: 'contact', title: 'Контакты', purpose: 'Даёт понятный следующий шаг после знакомства с предложением.', content: 'Способы связи, адрес при необходимости и короткий призыв к действию.', prepare: 'Актуальные контакты и удобный для вас способ получать обращения.', action: 'Написать, позвонить или оставить заявку.' },
] as const;

export type BuilderBlockId = typeof builderBlocks[number]['id'];
export const builderDefaults: BuilderBlockId[] = ['hero', 'services', 'about', 'contact'];
export const builderStorageKey = 'portfolio-site-outline-v1';

export const builderCharacters = [
  { id: 'strict', title: 'Строгий', summary: 'Чётко и по делу', description: 'Плотная сетка, ровная типографика и чёткие границы. Всё внимание — предложению.' },
  { id: 'airy', title: 'Воздушный', summary: 'Больше пространства', description: 'Свободные отступы, мягкие формы и спокойные акценты. Сайт даёт содержанию больше воздуха.' },
  { id: 'expressive', title: 'Выразительный', summary: 'Смелые акценты', description: 'Крупные заголовки, контраст и заметные акценты. Главное предложение выходит на первый план.' },
] as const;
export type BuilderCharacterId = typeof builderCharacters[number]['id'];
export function getBuilderCharacter(value: unknown) {
  return builderCharacters.find(character => character.id === value) ?? builderCharacters[0];
}

export const builderLayouts: Record<BuilderBlockId, readonly { id: string; title: string; description: string }[]> = {
  hero: [
    { id: 'split', title: 'Текст + фото', description: 'Предложение и изображение рядом: знакомим с бизнесом с первого экрана.' },
    { id: 'centered', title: 'По центру', description: 'Крупный заголовок в центре — всё внимание на главной мысли.' },
    { id: 'compact', title: 'Акцент на кнопке', description: 'Компактное предложение и заметная кнопка для быстрого обращения.' },
  ],
  services: [
    { id: 'cards', title: 'Карточки', description: 'Несколько предложений рядом — удобно сравнить и выбрать.' },
    { id: 'rows', title: 'Строки', description: 'Последовательный список с местом для описания каждой услуги.' },
  ],
  catalog: [
    { id: 'grid', title: 'Сетка', description: 'Равное внимание товарам — подходит для знакомства с ассортиментом.' },
    { id: 'showcase', title: 'Витрина', description: 'Один товар крупно, остальные рядом — выделяем главное предложение.' },
  ],
  about: [
    { id: 'image', title: 'Фото + текст', description: 'Знакомим с командой или компанией через изображение и рассказ.' },
    { id: 'facts', title: 'Факты', description: 'Короткий рассказ и три смысловых акцента о вашем подходе.' },
  ],
  reviews: [
    { id: 'cards', title: 'Карточки', description: 'Несколько отзывов рядом — разные примеры опыта клиентов.' },
    { id: 'quote', title: 'Большая цитата', description: 'Один подробный отзыв становится главным акцентом раздела.' },
  ],
  contact: [
    { id: 'map', title: 'С картой', description: 'Связь и расположение — полезно, если к вам приезжают лично.' },
    { id: 'form', title: 'С формой', description: 'Контакты и набросок формы обращения. Поля и отправку обсудим отдельно.' },
  ],
};

export function getBuilderLayout(id: BuilderBlockId, variant?: string) {
  return builderLayouts[id].find(layout => layout.id === variant) ?? builderLayouts[id][0];
}

export function validBuilderLayouts(input: unknown): Record<BuilderBlockId, string> {
  const saved = input && typeof input === 'object' && !Array.isArray(input) ? input as Record<string, unknown> : {};
  return Object.fromEntries(builderBlocks.map(block => {
    const variant = saved[block.id];
    return [block.id, getBuilderLayout(block.id, typeof variant === 'string' ? variant : undefined).id];
  })) as Record<BuilderBlockId, string>;
}

export function parseBuilderLayouts(value: string) {
  return validBuilderLayouts(Object.fromEntries(value.split(',').slice(0, 6).map(entry => {
    const [id, variant = ''] = entry.split(':');
    return [id, variant];
  })));
}

export function validBuilderBlocks(ids: string[]): BuilderBlockId[] {
  return [...new Set(ids)].filter((id): id is BuilderBlockId => builderBlocks.some(block => block.id === id));
}
