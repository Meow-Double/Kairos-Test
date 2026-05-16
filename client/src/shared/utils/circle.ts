// Функция для расстановки элементов по кругу
function positionElementsAroundCircle(
  container: HTMLElement,
  elements: NodeListOf<HTMLElement>,
  radius: number,
) {
  const total = elements.length;
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;

  elements.forEach((el, index) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2; // -90° чтобы начать сверху
    const x = centerX + radius * Math.cos(angle) - el.offsetWidth / 2;
    const y = centerY + radius * Math.sin(angle) - el.offsetHeight / 2;

    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
}

// Использование
const container = document.querySelector('.crypto-container') as HTMLElement;
const items = document.querySelectorAll('.crypto-item') as NodeListOf<HTMLElement>;
positionElementsAroundCircle(container, items, 250); // 250px - радиус
