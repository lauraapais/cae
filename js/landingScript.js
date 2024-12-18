document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".imageBackgroundLanding img");
    const svgs = document.querySelectorAll(".imageLandingNextDesktop .numberPhotos");
    const svgsMobile = document.querySelectorAll(".imageLandingNextMobile .numberPhotos");

    const titles = document.querySelectorAll(".titleLandingContainer");
    const structreLandingRows = document.querySelectorAll('.structreLandingRow');
    const colorMapping = ["#E3D24D", "#38ABBA", "#664728"];

    const imageLandingNext = document.getElementById("imageLandingNext");

    let columnNumber = window.innerWidth <= 700 ? 7 : 20; 
    const structreLandingColumns = [];

    const createColumns = () => {
        structreLandingRows.forEach(row => row.innerHTML = "");
        structreLandingColumns.length = 0;

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
    
        const secondRowColumns = structreLandingRows[1]?.children; 
        if (secondRowColumns && !isMobile) {
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
});
