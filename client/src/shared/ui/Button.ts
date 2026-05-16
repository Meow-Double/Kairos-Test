type ButtonVariants = 'primary' | 'default' | 'secondary' | 'secondary-outline';

interface ButtonTypes extends Partial<Omit<HTMLButtonElement, 'className'>> {
  text: string;
  variant: ButtonVariants;
  onClick?: () => void;
  className?: string;
  icon?: string;
  data?: Record<string, string | number | boolean>;
}

export const createButton = (props: ButtonTypes): HTMLButtonElement => {
  const { text, variant = 'primary', onClick, className = "", icon, data, ...otherProps } = props;
  const btn = document.createElement('button');

  btn.className = `btn btn--${variant} ${className}`.trim();
  Object.assign(btn, otherProps);

  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      btn.setAttribute(`data-${key}`, String(value));
    });
  }

  if (icon) {
    // typeof на svg
    const img = document.createElement('img');
    img.src = icon;
    img.alt = '';
    img.className = 'btn__icon';
    btn.appendChild(img);
  }

  const span = document.createElement('span');
  span.className = 'btn__text';
  span.textContent = text;
  btn.appendChild(span);

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
};
