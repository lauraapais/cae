document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".imageBackgroundLanding img");
    const svgs = document.querySelectorAll(".imageLandingNextDesktop .numberPhotos");
    const svgsMobile = document.querySelectorAll(".imageLandingNextMobile .numberPhotos");
    const titles = document.querySelectorAll(".titleLandingContainer");
    const structreLandingRows = document.querySelectorAll('.structreLandingRow');
    const colorMapping = ["#E3D24D", "#38ABBA", "#664728"];
    const imageLandingNext = document.getElementById("imageLandingNext");
    const imageLandingNextMobile = document.getElementById("imageLandingNext_Mobile");

    let columnNumber = window.innerWidth <= 700 ? 7 : 20;
    const structreLandingColumns = [];
    let currentIndex = 0;
    let autoSlideInterval;

    const createColumns = () => {
        structreLandingRows.forEach(row => row.innerHTML = "");
        structreLandingColumns.length = 0;

        structreLandingRows.forEach(row => {
            for (let j = 0; j < columnNumber; j++) {
                const columnDiv = document.createElement('div');
                columnDiv.className = 'structreLandingColumn collapse';
                columnDiv.style.transition = 'none'; // Disable transition initially
                row.appendChild(columnDiv);
                structreLandingColumns.push(columnDiv);
            }
        });

        const columnWidth = 100 / (columnNumber + 1);
        structreLandingColumns.forEach(column => {
            column.style.width = `${columnWidth}vw`;
        });
    };

    const enableTransitions = () => {
        structreLandingColumns.forEach(column => {
            column.style.transition = ''; // Enable transitions
        });
    };

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.style.transition = 'opacity 0.5s ease-in-out';
            img.style.opacity = (i === index) ? '1' : '0';
            img.style.zIndex = (i === index) ? '1' : '0';
        });

        titles.forEach((title, i) => {
            title.style.display = (i === index) ? 'flex' : 'none';
            title.style.justifyContent = (i === index) ? 'space-between' : '';
        });

        svgs.forEach(svg => svg.classList.remove("selected"));
        svgs[index].classList.add("selected");

        svgsMobile.forEach(svg => svg.classList.remove("selected"));
        svgsMobile[index].classList.add("selected");

        const backgroundColor = colorMapping[index % colorMapping.length];
        structreLandingColumns.forEach(column => {
            column.style.backgroundColor = backgroundColor;
        });

        randomizeColumns();
    };

    const randomizeColumns = () => {
        const totalColumns = structreLandingColumns.length;
        const isMobile = window.innerWidth <= 700;

        const minFilled = isMobile ? Math.ceil(totalColumns * 0.3) : Math.ceil(totalColumns * 0.4);
        const maxFilled = isMobile ? Math.floor(totalColumns * 0.6) : Math.floor(totalColumns * 0.7);
        const maxConsecutive = isMobile ? 2 : 3;
        let filledCount = 0;

        structreLandingColumns.forEach(column => {
            column.classList.remove('expand', 'collapse');
            column.classList.add('collapse');
        });

        const canExpand = (index) => {
            let leftCount = 0, rightCount = 0;

            for (let i = index - 1; i >= 0; i--) {
                if (structreLandingColumns[i].classList.contains('expand')) leftCount++;
                else break;
            }

            for (let i = index + 1; i < totalColumns; i++) {
                if (structreLandingColumns[i].classList.contains('expand')) rightCount++;
                else break;
            }

            return (leftCount + 1 + rightCount) <= maxConsecutive;
        };

        for (let i = 0; i < totalColumns; i++) {
            if (filledCount >= maxFilled) break;

            if (Math.random() > (isMobile ? 0.3 : 0.6) && canExpand(i)) {
                structreLandingColumns[i].classList.remove('collapse');
                structreLandingColumns[i].classList.add('expand');
                filledCount++;
            }
        }

        while (filledCount < minFilled) {
            for (let i = 0; i < totalColumns; i++) {
                if (structreLandingColumns[i].classList.contains('collapse') && canExpand(i)) {
                    structreLandingColumns[i].classList.remove('collapse');
                    structreLandingColumns[i].classList.add('expand');
                    filledCount++;
                    if (filledCount >= minFilled) break;
                }
            }
        }

        const firstRowColumns = structreLandingRows[0]?.children;
        if (firstRowColumns && !isMobile) {
            firstRowColumns[0]?.classList.replace('collapse', 'expand');
            firstRowColumns[1]?.classList.replace('expand', 'collapse');
            firstRowColumns[2]?.classList.replace('expand', 'collapse');
        }

            // Ensure titleLandingContainer fits in the second row
            const secondRowColumns = structreLandingRows[1]?.children;
            const titleContainer = titles[currentIndex];
            const titleWidth = titleContainer.getBoundingClientRect().width;
            const totalRowWidth = structreLandingRows[0].offsetWidth;
            const columnWidth = totalRowWidth / columnNumber;

            // Calculate the minimum required columns, but ensure it’s at least 3
            let columnsNeeded = Math.ceil(titleWidth / columnWidth);
            columnsNeeded = Math.max(columnsNeeded, 3); // Ensure at least 3 columns are filled

            if (secondRowColumns && !isMobile) {
                for (let i = 1; i <= columnsNeeded; i++) {
                    if (i < secondRowColumns.length) {
                        secondRowColumns[i]?.classList.replace('collapse', 'expand');
                    }
                }

                // Unfill the columns immediately adjacent to the titleLandingContainer
                const nextColumnLeft = 1 - 1; // Column just to the left of the start
                const nextColumnRight = columnsNeeded + 1; // Column just to the right of the end

                if (nextColumnLeft >= 0) {
                    secondRowColumns[nextColumnLeft]?.classList.replace('expand', 'collapse');
                }

                if (nextColumnRight < secondRowColumns.length) {
                    secondRowColumns[nextColumnRight]?.classList.replace('expand', 'collapse');
                }
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

    const changeImageOnClick = (direction) => {
        stopAutoSlide();
        if (direction === "next") {
            currentIndex = (currentIndex + 1) % images.length;
        } else if (direction === "prev") {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        showImage(currentIndex);
        startAutoSlide();
    };

    imageLandingNext.addEventListener("click", () => changeImageOnClick("next"));
    imageLandingNextMobile.addEventListener("click", () => changeImageOnClick("next"));

    window.addEventListener('resize', () => {
        const newColumnNumber = window.innerWidth <= 700 ? 7 : 20;
        if (newColumnNumber !== columnNumber) {
            columnNumber = newColumnNumber;
            createColumns();
            showImage(currentIndex);
        }
    });

    createColumns();

    images[0].style.opacity = '1';
    images[0].style.transition = 'none';
    showImage(currentIndex);

    startAutoSlide();

    // Enable transitions after initial load
    setTimeout(enableTransitions, 100);
});
