import './styles/index.css';

import { initCryptoCards } from './components/cryptoCard';

import { initBurgerMenu } from './components/burger';
import { isMobile, isTablet } from './shared/utils/getScreenType';
import { initRenderTabs } from './components/tabs';
import { initPlayer } from './components/player';
import { componentDropdown } from './components/dropdown';
import { reactive } from './shared/utils/reactive';

import { initSectionScroller } from './shared/utils/scroll';
import { initSVGSectionTrigger } from './shared/utils/svgScroll';
import { cryptoCurrencies } from './shared/consts/cryptoCurrencies';
import { dropdownList } from './shared/consts/dropdownList';
import { uploadLearMoreModal, uploadVideoModal } from './components/modal';
import { dropdownListInit } from './components/dropdownList';
import { initCryptoUpdates } from './components/crypto';

// Для анимации SVG
const initSVG = () => {
  initSVGSectionTrigger({
    sectionSelector: '#section-2',
    svgSelector: '.draw-path',
    threshold: 0.4,
    once: true,
    delay: 200,
  });
};

export const cryptoState = reactive({
  cryptoItems: cryptoCurrencies,
  dropdownList: dropdownList,
});

// Вызываем SVG (Выше)
initSVG();

// Для отрисовки табов
initRenderTabs();

// Для отрисовки модальных окон
uploadLearMoreModal();
uploadVideoModal();

// Для отрисовки dropdown + список
componentDropdown();
dropdownListInit();

// Для отрисовки и работы с криптой
initCryptoCards();
initCryptoUpdates();

// Инициализация видео плеера для контроля
initPlayer();
if (isTablet() || isMobile()) {
  initBurgerMenu();
}

// Секции для плавного скролла
const sections = document.querySelectorAll<HTMLElement>('section, .full-height');

// Настройка плавного скролла
initSectionScroller(sections, {
  duration: 800,
  threshold: 30,
  lockScroll: true,
});
