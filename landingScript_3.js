document.addEventListener('DOMContentLoaded', () => {
    const structreLandingRows = document.querySelectorAll('.structreLandingRow');
    const columnNumber = 20;

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

    const structreLandingColumns = Array.from(document.querySelectorAll(".structreLandingColumn"));

    const totalColumns = structreLandingColumns.length;
    const minFilled = Math.ceil(totalColumns * 0.2);
    const maxFilled = Math.floor(totalColumns * 0.4);
    let filledColumns = [];

    function initializeFilledColumns() {
        while (filledColumns.length < minFilled) {
            const randomIndex = Math.floor(Math.random() * totalColumns);
            if (!filledColumns.includes(randomIndex)) {
                filledColumns.push(randomIndex);
            }
        }
        filledColumns.sort((a, b) => a - b); 
        updateColumnStyles();
    }

    function updateColumnStyles() {
        structreLandingColumns.forEach((column, index) => {
            if (filledColumns.includes(index)) {
                column.style.backgroundColor = "#503B3B";
                column.style.opacity = 1;
            } else {
                column.style.backgroundColor = "transparent";
                column.style.opacity = 0;
            }
        });
    }

    function shiftColumns() {
        const newFilledColumns = new Set();
        filledColumns.forEach(index => {
            let newIndex;
            do {
                const shift = Math.random() > 0.5 ? 1 : -1; 
                newIndex = index + shift;

            } while (newIndex < 0 || newIndex >= totalColumns || newFilledColumns.has(newIndex));
            newFilledColumns.add(newIndex);
        });
        filledColumns = Array.from(newFilledColumns).sort((a, b) => a - b); 
        updateColumnStyles();
    }

    initializeFilledColumns();
    setInterval(shiftColumns, 2000);
});
