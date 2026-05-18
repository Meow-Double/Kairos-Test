export const WIDNOW_SIZES = {
  MOBILE: 768, // < 768px
  TABLET: 1024, // 768–1023px
  DESKTOP: 1024, // >= 1024px
} as const;

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export const getScreenType = (): ScreenSize => {
  const width = window.innerWidth;

  if (width < WIDNOW_SIZES.MOBILE) return 'mobile';
  if (width < WIDNOW_SIZES.TABLET) return 'tablet';
  return 'desktop';
};

export const isDesktop = () => {
  const screenType = getScreenType();
  if (screenType === 'desktop') return true;

  return false;
};

export const isTablet = () => {
  const screenType = getScreenType();
  if (screenType === 'tablet') return true;

  return false;
};

export const isMobile = () => {
  const screenType = getScreenType();
  if (screenType === 'mobile') return true;

  return false;
};
