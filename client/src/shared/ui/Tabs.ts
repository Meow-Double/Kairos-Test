export interface TabItem {
  id: string;
  content: HTMLElement | string;
}

interface CreateTabsProps {
  tabs: TabItem[];
  activeTabId: string;
}

export const createTabs = (props: CreateTabsProps) => {
  const { activeTabId, tabs } = props;

  let currentTab = props.tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  const setActiveTab = (tabId: string) => {
    const nextTab = props.tabs.find((tab) => tab.id === tabId);
    if (nextTab) {
      currentTab = nextTab;
    }
  };

  return {
    getActive: () => currentTab,
    setActive: setActiveTab,
  };
};
