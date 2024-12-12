document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".imageBackgroundLanding img");
    const svgs = document.querySelectorAll(".imageLandingNext .numberPhotos");
    const titles = document.querySelectorAll(".titleLandingContainer");
    const structreLandingRows = document.querySelectorAll('.structreLandingRow');
    const colorMapping = ["#E3D24D", "#38ABBA", "#664728"]; // Colors for each image

    let columnNumber = window.innerWidth <= 768 ? 7 : 20; // Adjust columns for mobile
    const structreLandingColumns = [];

    const createColumns = () => {
        // Clear existing columns
        structreLandingRows.forEach(row => row.innerHTML = "");
        structreLandingColumns.length = 0;

        // Create dynamic columns
        structreLandingRows.forEach(row => {
            for (let j = 0; j < columnNumber; j++) {
                const columnDiv = document.createElement('div');
                columnDiv.className = 'structreLandingColumn collapse';
                row.appendChild(columnDiv);
                structreLandingColumns.push(columnDiv);
            }
        });

        const columnWidth = 100 / (columnNumber + 1);
        structreLandingColumns.forEach(column => {
            column.style.width = `${columnWidth}vw`;
        });
    };

    let currentIndex = 0;
    let autoSlideInterval;

    const showImage = (index) => {
        // Update images
        images.forEach((img, i) => {
            img.classList.remove("active");
            if (i === index) {
                img.classList.add("active");
            }
        });

        // Update SVGs
        svgs.forEach(svg => svg.classList.remove("selected"));
        svgs[index].classList.add("selected");

        // Update column background colors
        const backgroundColor = colorMapping[index % colorMapping.length];
        structreLandingColumns.forEach(column => {
            column.style.backgroundColor = backgroundColor;
        });

        // Randomize columns
        randomizeColumns();
    };

    const randomizeColumns = () => {
        const totalColumns = structreLandingColumns.length;
        const minFilled = Math.ceil(totalColumns * 0.2);
        const maxFilled = Math.floor(totalColumns * 0.4);
        let filledCount = 0;

        structreLandingColumns.forEach(column => {
            column.classList.remove('expand', 'collapse');
            column.classList.add('collapse');
        });

        let consecutiveCount = 0;
        structreLandingColumns.forEach((column, index) => {
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

        while (filledCount < minFilled) {
            const remainingColumns = structreLandingColumns.filter(col => col.classList.contains('collapse'));
            const randomColumn = remainingColumns[Math.floor(Math.random() * remainingColumns.length)];
            randomColumn.classList.remove('collapse');
            randomColumn.classList.add('expand');
            filledCount++;
        }

        const secondRowColumns = structreLandingRows[1]?.children;
        if (secondRowColumns) {
            secondRowColumns[0]?.classList.replace('expand', 'collapse');
            secondRowColumns[1]?.classList.replace('collapse', 'expand');
            secondRowColumns[2]?.classList.replace('collapse', 'expand');
            secondRowColumns[3]?.classList.replace('collapse', 'expand');
            secondRowColumns[4]?.classList.replace('expand', 'collapse');
        }
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 5000);
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    svgs.forEach((svg, index) => {
        svg.addEventListener("click", () => {
            stopAutoSlide();
            currentIndex = index;
            showImage(currentIndex);
            startAutoSlide();
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newColumnNumber = window.innerWidth <= 768 ? 7 : 20;
        if (newColumnNumber !== columnNumber) {
            columnNumber = newColumnNumber;
            createColumns();
            showImage(currentIndex);
        }
    });

    createColumns();
    showImage(currentIndex);
    startAutoSlide();
});
