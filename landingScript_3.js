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
    document.querySelector('header').style.width = `${columnWidth}vw`;

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

        // Adiciona a classe expand a colunas aleatórias
        structreLandingColumns.forEach(column => {
            if (filledCount < maxFilled && Math.random() > 0.5) {
                column.classList.remove('collapse');
                column.classList.add('expand');
                filledCount++;
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
