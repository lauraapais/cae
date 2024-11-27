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
        let consecutiveBrown = 0;

        structreLandingColumns.forEach(column => {
            column.style.backgroundColor = "transparent";
            column.style.opacity = 0;
        });

        structreLandingColumns.forEach(column => {
            if (
                filledCount < maxFilled &&
                Math.random() > 0.5 &&
                consecutiveBrown < 3
            ) {
                column.style.backgroundColor = "#503B3B";
                column.style.opacity = 1;
                filledCount++;
                consecutiveBrown++;
            } else {
                column.style.backgroundColor = "transparent";
                column.style.opacity = 0;
                consecutiveBrown = 0;
            }
        });

        while (filledCount < minFilled) {
            const remainingColumns = Array.from(structreLandingColumns).filter(
                col => col.style.backgroundColor === "transparent"
            );
            const randomColumn = remainingColumns[Math.floor(Math.random() * remainingColumns.length)];
            randomColumn.style.backgroundColor = "#503B3B";
            randomColumn.style.opacity = 1;
            filledCount++;
        }

        verifyConsecutiveBrowns();
    }

    function verifyConsecutiveBrowns() {
        let count = 0;
        structreLandingColumns.forEach((column, index) => {
            if (column.style.backgroundColor === "rgb(80, 59, 59)") { 
                count++;
                if (count > 3) {
                    column.style.backgroundColor = "transparent";
                    column.style.opacity = 0;
                    count = 1;
                }
            } else {
                count = 0;
            }
        });
    }

    randomizeColumns();

    setInterval(randomizeColumns, 1000);
});
