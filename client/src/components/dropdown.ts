import { cryptoState } from '../main';

import { initDropdown } from '../shared/ui/Dropdown';
import { effect } from '../shared/utils/reactive';

export const componentDropdown = () => {
  initDropdown({ barId: 'dropdown-bar', menuId: 'dropdown-menu' });

  const dropdownMenu = document.querySelector('#dropdown-menu');

  effect(() => {
    if (!dropdownMenu) return;

    dropdownMenu.innerHTML = '';

    if (cryptoState.dropdownList.length === 0) {
      const dropdown = document?.querySelector('.dropdown');
      if (dropdown) {
        dropdown.innerHTML = '';
      }
    }

    cryptoState.dropdownList?.forEach((item) => {
      const li = document.createElement('li');

      const btn = document.createElement('button');
      btn.className = 'dropdown__btn';
      btn.id = item.id;

      const img = document.createElement('img');
      img.className = 'dropdown__img';
      img.src = item.image;
      img.alt = item.name;

      const span = document.createElement('span');
      span.textContent = item.name;

      btn.appendChild(img);
      btn.appendChild(span);
      li.appendChild(btn);
      dropdownMenu.appendChild(li);
    });
  });
};
