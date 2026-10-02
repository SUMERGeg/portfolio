import type { ImageMetadata } from 'astro';
import noir from '../assets/projects/noir/home-desktop.jpg';
import sezon from '../assets/projects/sezon/home-desktop.jpg';
import lostfound from '../assets/projects/lostfound/feed-desktop.jpg';
import noirMobile from '../assets/projects/noir/home-mobile.jpg';
import noirPricing from '../assets/projects/noir/pricing-desktop.jpg';
import noirPricingMobile from '../assets/projects/noir/pricing-mobile.jpg';
import sezonMobile from '../assets/projects/sezon/home-mobile.jpg';
import sezonCatalog from '../assets/projects/sezon/catalog-desktop.jpg';
import sezonCatalogMobile from '../assets/projects/sezon/catalog-mobile.jpg';
import sezonProduct from '../assets/projects/sezon/product-desktop.jpg';
import sezonProductMobile from '../assets/projects/sezon/product-mobile.jpg';
import lostfoundMobile from '../assets/projects/lostfound/feed-mobile.jpg';
import lostfoundDetail from '../assets/projects/lostfound/detail-desktop.jpg';
import lostfoundDetailMobile from '../assets/projects/lostfound/detail-mobile.jpg';
import lostfoundMap from '../assets/projects/lostfound/map-desktop.jpg';
import lostfoundMapMobile from '../assets/projects/lostfound/map-mobile.jpg';

export const projectCovers: Record<string, { image: ImageMetadata; alt: string }> = {
  noir: { image: noir, alt: 'Главная NOIR: контрастная типографика и серебристый автомобиль' },
  sezon: { image: sezon, alt: 'Главная СЕЗОН: светлая композиция с букетами и природными оттенками' },
  lostfound: { image: lostfound, alt: 'Lost&Found: зелёный интерфейс с карточками потерянных и найденных вещей' },
};

export interface CaseScreen {
  id: string;
  title: string;
  description: string;
  desktop: ImageMetadata;
  mobile: ImageMetadata;
}

export const projectScreens: Record<string, CaseScreen[]> = {
  noir: [
    { id: 'home', title: 'Автомобиль — в центре внимания', description: 'Главная строится на контрасте крупной фотографии, лаконичного заголовка и спокойной навигации. На телефоне содержание сохраняет последовательный поток.', desktop: noir, mobile: noirMobile },
    { id: 'pricing', title: 'От услуги к объёму защиты', description: 'Пакеты и схема кузова помогают сравнить варианты. Переключение пакета меняет состав защиты и ориентировочную стоимость; окончательный расчёт предполагает обсуждение автомобиля.', desktop: noirPricing, mobile: noirPricingMobile },
  ],
  sezon: [
    { id: 'home', title: 'Спокойное знакомство с магазином', description: 'Светлая основа, антиква и природные оттенки оставляют внимание на цветах. Изображения букетов созданы с AI для демонстрации концепции.', desktop: sezon, mobile: sezonMobile },
    { id: 'catalog', title: 'Выбор без лишнего шума', description: 'Каталог объединяет букеты и композиции. Фильтры по типу, поводу, гамме и цене организуют выбор; выбранные условия можно сбросить и вернуться ко всему ассортименту.', desktop: sezonCatalog, mobile: sezonCatalogMobile },
    { id: 'product', title: 'Букет в деталях', description: 'Карточка объединяет изображение, описание и размеры. Выбор доступного размера обновляет цену, а выбранный вариант можно добавить в демонстрационную корзину.', desktop: sezonProduct, mobile: sezonProductMobile },
  ],
  lostfound: [
    { id: 'feed', title: 'Сначала — важные сведения', description: 'В ленте видны тип объявления, категория, время и описание. Тёмно-зелёная основа и лайм задают характер сервиса, а карточки поддерживают плотную информационную структуру.', desktop: lostfound, mobile: lostfoundMobile },
    { id: 'detail', title: 'От карточки к подробностям', description: 'Страница объявления раскрывает описание, место и фотографии. Пример о Моне вымышленный; связаться с автором в демоверсии нельзя.', desktop: lostfoundDetail, mobile: lostfoundDetailMobile },
    { id: 'map', title: 'Другой способ посмотреть объявления', description: 'Условная схема Москвы дополняет ленту и показывает точки пропаж и находок. Это демонстрационная схема, предназначенная для просмотра, а не для навигации.', desktop: lostfoundMap, mobile: lostfoundMapMobile },
  ],
};
