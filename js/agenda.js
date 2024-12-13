function addEmptySlots() {
  const containers = document.querySelectorAll('.agendaItemMain');

  containers.forEach(container => {
    if (!container) return;

    const items = Array.from(container.children).filter(item => !item.classList.contains('empty-slot'));

    const computedStyle = window.getComputedStyle(container);
    const columns = computedStyle.getPropertyValue('grid-template-columns').split(' ').length;

    if (container.dataset.lastColumns && parseInt(container.dataset.lastColumns, 10) === columns) {
      return;
    }

    container.dataset.lastColumns = columns;

    const itemsPerRow = columns;
    const rows = Math.ceil(items.length / itemsPerRow);

    const newItems = [...items];

    const emptyPositions = Array(columns).fill(false);

    for (let i = 0; i < rows; i++) {
      const startIndex = i * itemsPerRow; 

      let emptySlots = 0;
      if (columns === 4) {
        emptySlots = 1;
        //emptySlots = Math.floor(Math.random() * 2) + 1; 
      } else if (columns === 3) {
        emptySlots = 1;
      } else if (columns <= 2) {
        emptySlots = 0; 
      }

      let addedSlots = 0;
      while (addedSlots < emptySlots) {
        const insertPosition = Math.floor(Math.random() * itemsPerRow);
        const globalIndex = startIndex + insertPosition;

        if (!emptyPositions[insertPosition] && globalIndex < newItems.length) {
          const emptyDiv = document.createElement('div');
          emptyDiv.classList.add('agendaItem'); 
          emptyDiv.classList.add('empty-slot');

          newItems.splice(globalIndex, 0, emptyDiv);

          emptyPositions[insertPosition] = true;
          addedSlots++;
        }
      }
    }

    container.innerHTML = '';
    newItems.forEach(item => container.appendChild(item));
  });
}

function initializeEmptySlotsHandler() {
  addEmptySlots();
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(addEmptySlots, 200); 
  });
}

document.addEventListener('DOMContentLoaded', initializeEmptySlotsHandler);
