interface CreateTabsProps {
  defaultTabId: string;
}

export const createTabs = (props: CreateTabsProps) => {
  const { defaultTabId } = props;

  const tabs = document.querySelectorAll('.header-tab');
  let currentTub = defaultTabId ?? '';

  const render = () => {
    tabs.forEach((tab) => {
      const currentTabId = tab.getAttribute('data-tab-content');

      if (currentTabId === currentTub) {
        tab.classList.add('header-tab--active');
      } else {
        tab.classList?.remove('header-tab--active');
      }
    });
  };

  const setActiveTab = (tabId: string) => {
    currentTub = tabId;
    render();
  };

  render();
  return {
    setActive: setActiveTab,
  };
};
