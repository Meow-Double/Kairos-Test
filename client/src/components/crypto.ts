import { connectCryptoWebSocket } from '../shared/utils/connectWs';

const priceElements = new Map<string, HTMLElement>();

export const initCryptoUpdates = () => {
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
      }
    });
  });

  window.addEventListener('beforeunload', cleanup);
};
