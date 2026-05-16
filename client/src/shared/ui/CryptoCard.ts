import { cryptocurrencies } from '../../mock/crypto';

export const createCryptoCard = () => {
  const listLeft = document.querySelector('.crypto-list--left');
  const listRight = document.querySelector('.crypto-list--right');

  const leftArray = cryptocurrencies.slice(0, 7);
  const rightArray = cryptocurrencies.slice(7, cryptocurrencies.length);

  leftArray.forEach((data, index) => {
    const centerPos = Math.ceil(rightArray.length / 2);

    const element = document.createElement('div');
    element.classList.add('crypto-item');
    element.setAttribute('data-symbol', data.symbol + 'USDT');
    element.innerHTML = `<span class="price">$0</span>
                    <span class="name">${data.name}</span>
                    <img src="${data.image}" class="icon"  />`;

    if (index + 1 <= centerPos && index !== 0) {
      element.style.paddingRight = `${index * 30 + 15}px`;
    }

    if (index + 1 > centerPos && index + 1 !== leftArray.length) {
      element.style.paddingRight = `${(leftArray.length - 1 - index) * 30 + 15}px`;

      if (index === 0 || index === leftArray.length - 1) {
        element.style.paddingRight = `5px`;
      }
    }

    listLeft.appendChild(element);
  });

  rightArray.forEach((data, index) => {
    const centerPos = Math.ceil(rightArray.length / 2);

    const element = document.createElement('div');
    element.classList.add('crypto-item');
    element.setAttribute('data-symbol', data.symbol + 'USDT');
    element.innerHTML = `<img src="${data.image}" class="icon" />
                    <span class="name">${data.name}</span>
                    <span class="price">$0</span>
                    `;

    if (index + 1 <= centerPos && index !== 0) {
      element.style.paddingLeft = `${index * 30 + 15}px`;
    }

    if (index + 1 > centerPos && index + 1 !== rightArray.length) {
      element.style.paddingLeft = `${(rightArray.length - 1 - index) * 30 + 15}px`;
    }

    if (index === 0 || index === rightArray.length - 1) {
      element.style.paddingLeft = `5px`;
    }

    listRight.appendChild(element);
  });

  return;
};
