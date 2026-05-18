import { cryptoState } from '../main';
import { connectCryptoWebSocket, type CryptoPrice } from '../shared/utils/connectWs';
import { effect } from '../shared/utils/reactive';

export const initCryptoCards = () => {
  const listLeft = document.querySelector('.crypto-list--left');
  const listRight = document.querySelector('.crypto-list--right');
  if (!listLeft || !listRight) return;

  // ЛЕВЫЙ СТОЛБЕЦ
  const leftArray = cryptoState.cryptoItems.slice(0, 6);
  listLeft.innerHTML = '';
  leftArray.forEach((data, index) => {
    listLeft.appendChild(createCardElement(data, index, 'left', leftArray.length));
  });

  // ПРАВЫЙ СТОЛБЕЦ
  const renderedCards = new Map<string, HTMLElement>();
  effect(() => {
    const rightArray = cryptoState.cryptoItems.slice(6);
    const currentIds = new Set(rightArray.map((item) => item.id));

    for (const [id, el] of renderedCards) {
      if (!currentIds.has(id)) {
        el.remove();
        renderedCards.delete(id);
      }
    }

    renderedCards.forEach((el, id) => {
      const item = rightArray.find((i) => i.id === id);
      if (item) {
        const newIndex = rightArray.indexOf(item);
        applyPadding(el, newIndex, 'right', rightArray.length);
      }
    });

    rightArray.forEach((data, index) => {
      if (!renderedCards.has(data.id)) {
        const el = createCardElement(data, index, 'right', rightArray.length);
        el.dataset.id = data.id;
        el.classList.add('crypto-item--animate');
        el.style.setProperty('--i', String(index));
        listRight.appendChild(el);
        renderedCards.set(data.id, el);
        el.addEventListener(
          'animationend',
          () => {
            el.classList.remove('crypto-item--animate');
            el.style.removeProperty('--i');
          },
          { once: true },
        );
      }
    });
  });

  const disconnectWS = connectCryptoWebSocket((prices: Map<string, CryptoPrice>) => {
    updatePricesInDOM(prices, [listLeft, listRight]);
  });

  return () => {
    disconnectWS();
    renderedCards.clear();
  };
};

const createCardElement = (
  data: any,
  index: number,
  side: 'left' | 'right',
  totalCount: number,
) => {
  const el = document.createElement('div');
  el.classList.add('crypto-item');
  el.classList.add(side === 'left' ? 'crypto-item--left' : 'crypto-item--right');

  el.setAttribute('data-symbol', `${data.symbol}USDT`);

  el.innerHTML =
    side === 'left'
      ? `<span class="price">$0</span><span class="name">${data.name}</span><img src="${data.image}" class="icon" />`
      : `<img src="${data.image}" class="icon" /><span class="name">${data.name}</span><span class="price">$0</span>`;

  applyPadding(el, index, side, totalCount);

  return el;
};

const applyPadding = (
  el: HTMLElement,
  index: number,
  side: 'left' | 'right',
  totalCount: number,
) => {
  const centerPos = Math.ceil(totalCount / 2);
  const isEdge = index === 0 || index === totalCount - 1;

  if (side === 'left') {
    if (index + 1 <= centerPos && !isEdge) {
      el.style.paddingRight = `${index * 30 + 15}px`;
    } else if (index + 1 > centerPos && !isEdge) {
      el.style.paddingRight = `${(totalCount - 1 - index) * 30 + 15}px`;
    } else {
      el.style.paddingRight = '5px';
    }
  } else {
    if (index + 1 <= centerPos && !isEdge) {
      el.style.paddingLeft = `${index * 30 + 15}px`;
    } else if (index + 1 > centerPos && !isEdge) {
      el.style.paddingLeft = `${(totalCount - 1 - index) * 30 + 15}px`;
    } else {
      el.style.paddingLeft = '5px';
    }
  }
};

const updatePricesInDOM = (prices: Map<string, CryptoPrice>, containers: Element[]) => {
  containers.forEach((container) => {
    const cards = container.querySelectorAll<HTMLElement>('.crypto-item');

    cards.forEach((card) => {
      const symbol = card.getAttribute('data-symbol');
      if (!symbol) return;

      const priceData = prices.get(symbol);
      if (!priceData) return;

      const priceEl = card.querySelector<HTMLElement>('.price');
      if (!priceEl) return;

      const oldPrice = parseFloat(priceEl.dataset.price || '0');
      const newPrice = priceData.price;

      const formattedPrice =
        newPrice < 1
          ? `$${newPrice.toFixed(4)}`
          : `$${newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      priceEl.dataset.price = String(newPrice);

      if (oldPrice > 0 && oldPrice !== newPrice) {
        priceEl.classList.remove('price--up', 'price--down');
        priceEl.classList.add(newPrice > oldPrice ? 'price--up' : 'price--down');

        setTimeout(() => priceEl.classList.remove('price--up', 'price--down'), 1200);
      }

      priceEl.textContent = formattedPrice;
    });
  });
};
