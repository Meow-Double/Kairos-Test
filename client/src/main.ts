import { createButton } from './shared/ui/Button';
import './styles/index.css';

import { render, tabsState } from './components/tabs';

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

init();
