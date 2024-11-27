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

    const totalColumns = document.querySelectorAll(".structreLandingColumn").length;
    const minFilled = Math.ceil(totalColumns * 0.2);
    const maxFilled = Math.floor(totalColumns * 0.4);
    let filledCount = 0;
    let consecutiveBrown = 0;

    const structreLandingColumns = document.querySelectorAll(".structreLandingColumn");

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

    // Function to verify and adjust consecutive brown columns
    function verifyConsecutiveBrowns() {
        let count = 0;
        structreLandingColumns.forEach((column, index) => {
            if (column.style.backgroundColor === "rgb(80, 59, 59)") { // Verifica pelo valor RGB
                count++;
                if (count > 3) {
                    column.style.backgroundColor = "transparent";
                    column.style.opacity = 0;
                    count = 1; // reset count for the next sequence
                }
            } else {
                count = 0;
            }
        });
    }

    // Add event listener for mouseover to change color and verify columns
    structreLandingColumns.forEach((column, index) => {
        column.addEventListener('mouseover', () => {
            const prev = structreLandingColumns[index - 1];
            const next = structreLandingColumns[index + 1];

            const prevColor = prev && prev.style.backgroundColor === "rgb(80, 59, 59)";
            const nextColor = next && next.style.backgroundColor === "rgb(80, 59, 59)";
            const isSafeToColor = !prevColor || !nextColor || consecutiveBrown < 2;

            if (Math.random() > 0.5 && isSafeToColor) {
                column.style.backgroundColor = "#503B3B";
                column.style.opacity = 1;
            } else {
                column.style.backgroundColor = "transparent";
                column.style.opacity = 0;
            }
            verifyConsecutiveBrowns();
        });
    });

    // Initial verification to ensure no more than 3 consecutive browns
    verifyConsecutiveBrowns();
});
