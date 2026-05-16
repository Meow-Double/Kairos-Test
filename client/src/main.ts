import { createButton } from './shared/ui/Button';
import './styles/index.css';

import { render, tabsState } from './components/tabs';
import { connectCryptoWebSocket } from './shared/utils/connectWs';
import { createCryptoCard } from './shared/ui/CryptoCard';

export function init() {
  // const primaryBtn = createButton({
  //   text: 'Hello world',
  //   variant: 'primary',
  // });

  // const primaryBtn2 = createButton({
  //   text: 'Hello world',
  //   variant: 'primary',
  // });
  // document.querySelector('.header__info-buttons').appendChild(primaryBtn);
  // document.querySelector('.header__info-buttons').appendChild(primaryBtn2);

  // ------------Form-----

  const signInBtn = createButton({
    text: 'Sign in',
    variant: 'primary',
    className: 'header__btn btn1 btn-switch',

    data: {
      tab: 'tab-1',
    },
  });

  const enterEmailBtn = createButton({
    text: 'Enter Email',
    variant: 'primary',
    className: 'header__btn btn2 btn-switch',

    data: {
      tab: 'tab-2',
    },
  });

  document.querySelector('.header__form-btns').appendChild(signInBtn);
  document.querySelector('.header__form-btns').appendChild(enterEmailBtn);

  render();

  document.querySelectorAll('.btn-switch').forEach((element) =>
    element.addEventListener('click', () => {
      const dataTabId = element.getAttributeNode('data-tab').value || '';
      tabsState.setActive(dataTabId);
      render();
    }),
  );
}

// -------------------------

// Карта для быстрого обновления DOM
const priceElements = new Map<string, HTMLElement>();

// Инициализация после рендера карточек
function initCryptoUpdates() {
  document.querySelectorAll('.crypto-item').forEach((el) => {
    const symbol = (el as HTMLElement).dataset.symbol!;
    priceElements.set(symbol, el.querySelector('.price')!);
  });

  const cleanup = connectCryptoWebSocket((prices) => {
    prices.forEach((data, symbol) => {
      const el = priceElements.get(symbol);

      if (el) {
        el.textContent = `$${data.price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
        // Опционально: подсветка при изменении
        el.classList.add('price-updated');

        setTimeout(() => el.classList.remove('price-updated'), 300);
      }
    });
  });

  // Очистка при уходе со страницы (если нужно)
  window.addEventListener('beforeunload', cleanup);
}

// Вызови после того, как HTML карточек отрендерен

// --------------------------

init();
createCryptoCard();
initCryptoUpdates();
