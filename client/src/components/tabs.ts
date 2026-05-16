import { createButton } from '../shared/ui/Button';
import { createTabs } from '../shared/ui/Tabs';
import GoogleIcon from '../shared/icons/GoogleIcon.svg';
import { createInput } from '../shared/ui/Input';

export const tabsState = createTabs({
  activeTabId: 'tab-1',
  tabs: [
    {
      id: 'tab-1',
      content: `       <div class="header__form-sign-btn"></div>
                <p class="header__form-subtitle">Start Your Journey Now</p>
                <span class="header__form-decorator">or</span>
                <div class="header__form-sign-create-btn"></div>`,
    },
    {
      id: 'tab-2',
      content: `
               <div class="header__form-input"></div>
                <div class="header__form-sign-email"></div>
                <span class="tab-2-decor"></span>
                <span class="header__form-span-2">Forgot Password?</span>`,
    },
  ],
});

const container = document.querySelector('.header__form-sign')!;

export const render = () => {
  const active = tabsState.getActive();
  if (active) {
    container.innerHTML = typeof active.content === 'string' ? active.content : '';

    document.querySelectorAll('.btn-switch').forEach((element) => {
      element.classList.remove('active');

      const dataTabId = element.getAttributeNode('data-tab').value || '';
      if (dataTabId === active.id) {
        element.classList.add('active');
      }
    });
  }

  //TAB-1 !!!
  const googleBtn = createButton({
    text: 'Google',
    variant: 'secondary',
    className: 'btn-google',
    icon: GoogleIcon,
  });

  document?.querySelector('.header__form-sign-btn')?.appendChild(googleBtn);

  const createAccountBtn = createButton({
    text: 'Create account',
    variant: 'secondary-outline',
    className: 'btn-create',
    type: 'button',
  });
  document?.querySelector('.header__form-sign-create-btn')?.appendChild(createAccountBtn);

  //TAB-2
  const input = createInput({
    className: 'form-input',
    placeholder: 'Enter Email',
  });
  document?.querySelector('.header__form-input')?.appendChild(input);

  const enterEmailBtn = createButton({
    text: 'Sigh in with email',
    variant: 'secondary',
    className: 'btn-email',
  });
  document?.querySelector('.header__form-sign-email')?.appendChild(enterEmailBtn);
};
