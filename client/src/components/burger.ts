import { BURGER_ICONS } from '../shared/consts/burger';

export const initBurgerMenu = () => {
  let open = true;
  const burgerBtn = document.createElement('button');
  burgerBtn.classList.add('btn--close');
  burgerBtn.classList.add('burger-btn');

  const navbarMenuWrapper = document.querySelector('.navbar__menu-wrapper');
  const navbarInner = document.querySelector('.navbar__inner');
  burgerBtn.innerHTML = BURGER_ICONS.close;

  navbarInner.appendChild(burgerBtn);
  const overlay = document.createElement('div');

  burgerBtn.addEventListener('click', () => {
    if (open) {
      navbarMenuWrapper.classList.add('burger');
      burgerBtn.innerHTML = BURGER_ICONS.open;
      navbarInner.appendChild(overlay);
      overlay.classList.add('burger-overlay');
      document.body.style.overflowY = 'hidden';
    } else {
      navbarMenuWrapper.classList.remove('burger');
      burgerBtn.innerHTML = BURGER_ICONS.close;
      overlay.classList.remove('burger-overlay');
      overlay.remove();
      document.body.style.overflowY = 'auto';
    }

    open = !open;
  });
};
