interface SVGSectionOptions {
  sectionSelector: string;
  svgSelector: string;
  threshold?: number;
  once?: boolean;
  delay?: number;
}

export const initSVGSectionTrigger = (options: SVGSectionOptions) => {
  const { sectionSelector, svgSelector, threshold = 0.5, once = true, delay = 0 } = options;

  const section = document.querySelector<HTMLElement>(sectionSelector);
  if (!section) return console.warn(`Секция "${sectionSelector}" не найдена`);

  const paths = section.querySelectorAll<SVGPathElement>(svgSelector);
  if (!paths.length) return console.warn(`Пути "${svgSelector}" не найдены в секции`);

  const preparePaths = () => {
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = 'stroke-dashoffset 0.8s ease-out';
    });
  };

  const drawPaths = () => {
    paths.forEach((path) => {
      const index = Array.from(paths).indexOf(path);
      setTimeout(
        () => {
          path.style.strokeDashoffset = '0';
        },
        delay + index * 100,
      );
    });
  };

  const resetPaths = () => {
    paths.forEach((path) => {
      path.style.transition = 'none';

      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 0.8s ease-out';
      }, 0);
    });
  };

  preparePaths();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          drawPaths();
          if (once) observer.unobserve(section);
        } else if (!once) {
          resetPaths();
        }
      });
    },
    { threshold },
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    resetPaths();
  };
};
