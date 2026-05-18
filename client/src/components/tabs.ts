import { createTabs } from '../shared/ui/Tabs';
import { googleAuth } from '../shared/utils/googleAuth';

export const initRenderTabs = () => {
  const tabBtns = document.querySelectorAll('.btn-switch');
  tabBtns[0].classList.add('header__form-btn--active');
  const defaultTabId = tabBtns[0].getAttribute('data-tab');

  const { setActive } = createTabs({ defaultTabId: defaultTabId ?? 'tab-1' });

  tabBtns?.forEach((element) =>
    element?.addEventListener('click', () => {
      const dataTabId = element?.getAttributeNode('data-tab')?.value || '';
      const currentActiveBtn = document.querySelector('.header__form-btn--active');
      currentActiveBtn?.classList.remove('header__form-btn--active');

      element?.classList.add('header__form-btn--active');
      setActive(dataTabId);
    }),
  );

  const btnGoogleAuth = document.querySelector('.header__form-btn-google');

  btnGoogleAuth?.addEventListener('click', () => {
    googleAuth();
  });
};
