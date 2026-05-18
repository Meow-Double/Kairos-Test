interface SectionScrollerOptions {
  duration?: number;
  threshold?: number;
  lockScroll?: boolean;
}

export const initSectionScroller = (
  sections: NodeListOf<HTMLElement>,
  options: SectionScrollerOptions = {},
) => {
  const { duration = 700, threshold = 50, lockScroll = true } = options;

  let currentSection = 0;
  let isScrolling = false;
  let wheelTimeout: ReturnType<typeof setTimeout>;

  const isScrollEnabled = (): boolean => {
    const html = document.documentElement;
    const body = document.body;

    const htmlOverflow = getComputedStyle(html).overflowY;
    const bodyOverflow = getComputedStyle(body).overflowY;

    return htmlOverflow !== 'hidden' && bodyOverflow !== 'hidden';
  };

  const detectCurrentSection = (): number => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return i;
      }
    }
    return 0;
  };

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;

    const targetSection = sections[index];
    const startY = window.scrollY;
    const targetY = targetSection.offsetTop;
    const distance = targetY - startY;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easedProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isScrolling = false;
        currentSection = index;

        sections.forEach((s, i) => {
          s.classList.toggle('is-active', i === index);
        });
      }
    };

    isScrolling = true;
    requestAnimationFrame(animate);
  };

  const handleWheel = (e: WheelEvent) => {
    if (!isScrollEnabled()) return;

    e.preventDefault();

    if (lockScroll && isScrolling) return;

    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      const deltaY = e.deltaY;

      if (Math.abs(deltaY) < threshold) return;

      if (deltaY > 0 && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    }, 50);
  };

  const init = () => {
    if (sections.length === 0) {
      console.warn('[SectionScroller] No sections found');
      return;
    }

    currentSection = detectCurrentSection();

    sections.forEach((s, i) => {
      s.classList.toggle('is-active', i === currentSection);
    });

    window.addEventListener('wheel', handleWheel, { passive: false });
  };

  const destroy = () => {
    window.removeEventListener('wheel', handleWheel);
  };

  const pause = () => {
    window.removeEventListener('wheel', handleWheel);
  };

  const resume = () => {
    window.addEventListener('wheel', handleWheel, { passive: false });
  };

  init();

  return { destroy, pause, resume };
};
