import { cryptoState } from '../main';
import { dropdownList } from '../shared/consts/dropdownList';

export const dropdownListInit = () => {
  const dropdownMenu = document.querySelector('#dropdown-menu');
  if (!dropdownMenu) return console.warn('#dropdown-menu не найдено');

  dropdownMenu.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.dropdown__btn');
    if (!btn) return;

    const coinId = btn.id;
    const currentCoin = dropdownList.find((c) => c.id === coinId);

    if (currentCoin) {
      cryptoState.cryptoItems = [...cryptoState.cryptoItems, currentCoin];
      cryptoState.dropdownList = cryptoState.dropdownList.filter((c) => c.id !== coinId);
    }
  });
};
