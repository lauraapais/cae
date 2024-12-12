document.addEventListener('DOMContentLoaded', () => {
    const structreLandingRows = document.querySelectorAll('.structreLandingRow');
    const columnNumber = 20;

    // Criação das colunas
    structreLandingRows.forEach(row => {
        for (let j = 0; j < columnNumber; j++) {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'structreLandingColumn';
            row.appendChild(columnDiv);
        }
    });

    const columnWidth = 100 / (columnNumber + 1);
    document.querySelectorAll('.structreLandingColumn').forEach(column => {
        column.style.width = `${columnWidth}vw`;
    });

    const structreLandingColumns = document.querySelectorAll(".structreLandingColumn");

// Função para randomizar as colunas
function randomizeColumns() {
    const totalColumns = structreLandingColumns.length;
    const minFilled = Math.ceil(totalColumns * 0.2);
    const maxFilled = Math.floor(totalColumns * 0.4);
    let filledCount = 0;

    // Primeiro, reseta todas as colunas
    structreLandingColumns.forEach(column => {
        column.classList.remove('expand', 'collapse');
        column.classList.add('collapse'); // Colapsa todas inicialmente
    });

    // Adiciona a classe expand a colunas aleatórias, garantindo não mais que 3 consecutivas
    let consecutiveCount = 0;
    structreLandingColumns.forEach((column, index) => {
        // Aumenta o limiar da probabilidade para reduzir a chance de preencher a coluna
        if (filledCount < maxFilled && Math.random() > 0.8) {
            const prevExpanded = index > 0 && structreLandingColumns[index - 1].classList.contains('expand');
            const nextExpanded = index < totalColumns - 1 && structreLandingColumns[index + 1].classList.contains('expand');

            if (prevExpanded) consecutiveCount++;
            else consecutiveCount = 1;

            if (consecutiveCount <= 3) {
                column.classList.remove('collapse');
                column.classList.add('expand');
                filledCount++;
            }
        }
    });

    // Garante o número mínimo de colunas preenchidas
    while (filledCount < minFilled) {
        const remainingColumns = Array.from(structreLandingColumns).filter(
            col => col.classList.contains('collapse')
        );
        const randomColumn = remainingColumns[Math.floor(Math.random() * remainingColumns.length)];
        randomColumn.classList.remove('collapse');
        randomColumn.classList.add('expand');
        filledCount++;
    }

    // Manter a primeira e quinta colunas da segunda fila sem cor e segunda, terceira e quarta preenchidas
    const secondRowColumns = structreLandingRows[1].children; // Obtém as colunas da segunda fila
    secondRowColumns[0].classList.remove('expand');
    secondRowColumns[0].classList.add('collapse');
    secondRowColumns[1].classList.remove('collapse');
    secondRowColumns[1].classList.add('expand');
    secondRowColumns[2].classList.remove('collapse');
    secondRowColumns[2].classList.add('expand');
    secondRowColumns[3].classList.remove('collapse');
    secondRowColumns[3].classList.add('expand');
    secondRowColumns[4].classList.remove('expand');
    secondRowColumns[4].classList.add('collapse');
}

    // Controle de tempo entre transições
    function scheduleTransitions() {
        randomizeColumns(); // Randomiza as colunas imediatamente
        setTimeout(() => {
            setTimeout(scheduleTransitions, 1000); // Aguarda 2 segundos antes de iniciar o próximo ciclo
        }, 1000); // Durações das animações ou tempo de espera
    }

    // Inicia o ciclo de randomizações
    scheduleTransitions();
});




document.getElementById('openMenu').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const closeIcon = document.getElementById('closeMenu');
    
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
      closeIcon.style.display = 'none';
      this.style.display = 'block';
    } else {
      menu.classList.add('show');
      closeIcon.style.display = 'block';
      this.style.display = 'none';
    }
  });
  
  document.getElementById('closeMenu').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const openButton = document.getElementById('openMenu');
    
    menu.classList.remove('show');
    this.style.display = 'none';
    openButton.style.display = 'block';
  });
  


  document.addEventListener('DOMContentLoaded', (event) => {
    const svgs = document.querySelectorAll('.numberPhotos');
    const images = document.querySelectorAll('.landingImage');

    svgs.forEach((svg, index) => {
        svg.addEventListener('click', () => {
            // Hide all images
            images.forEach(img => img.style.display = 'none');
            // Show the clicked image
            images[index].style.display = 'block';

            // Remove 'selected' class from all SVGs
            svgs.forEach(svg => svg.classList.remove('selected'));
            // Add 'selected' class to the clicked SVG
            svg.classList.add('selected');
        });
    });
});
