interface DropdownProps {
  barId: string;
  menuId: string;
}

export const initDropdown = (props: DropdownProps) => {
  const { barId = 'dw-bar', menuId = 'dw-menu' } = props;
  let open = false;

  const dropdownBar = document.querySelector(`#${barId}`);
  const dropdownMenu = document.querySelector(`#${menuId}`);

  const toggleDropdown = () => {
    if (open) {
      dropdownMenu?.classList.remove('dropdown__menu--open');
      dropdownBar?.classList.remove('dropdown__bar--open');
      open = false;
    } else {
      dropdownMenu?.classList.add('dropdown__menu--open');
      dropdownBar?.classList.add('dropdown__bar--open');
      open = true;
    }
  };

  dropdownBar?.addEventListener('click', toggleDropdown);

  return open;
};
