document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".imageBackgroundLanding img");
    const svgs = document.querySelectorAll(".imageLandingNextDesktop .numberPhotos");
    const svgsMobile = document.querySelectorAll(".imageLandingNextMobile .numberPhotos");

    const titles = document.querySelectorAll(".titleLandingContainer");
    const structreLandingRows = document.querySelectorAll('.structreLandingRow');
    const colorMapping = ["#E3D24D", "#38ABBA", "#664728"]; // Colors for each image

    const imageLandingNext = document.getElementById("imageLandingNext");

    let columnNumber = window.innerWidth <= 700 ? 7 : 20; // Adjust columns for mobile
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
        // Atualizar imagens
        images.forEach((img, i) => {
            img.style.transition = 'opacity 0.5s ease-in-out'; // Aplicar transição a todas as imagens
            img.style.opacity = (i === index) ? '1' : '0';
            img.style.zIndex = (i === index) ? '1' : '0'; // Definir z-index para camadas
        });
    
        // Atualizar textos
        titles.forEach((title, i) => {
            title.style.display = (i === index) ? 'flex' : 'none';
            title.style.justifyContent = (i === index) ? 'space-between' : '';
        });
    
        // Atualizar SVGs
        svgs.forEach(svg => svg.classList.remove("selected"));
        svgs[index].classList.add("selected");

        // Atualizar SVGs
        svgsMobile.forEach(svg => svg.classList.remove("selected"));
        svgsMobile[index].classList.add("selected");
    
        // Atualizar cores das colunas
        const backgroundColor = colorMapping[index % colorMapping.length];
        structreLandingColumns.forEach(column => {
            column.style.backgroundColor = backgroundColor;
        });
    
        // Randomizar colunas
        randomizeColumns();
    };

    const randomizeColumns = () => {
        const totalColumns = structreLandingColumns.length;
        const isMobile = window.innerWidth <= 700; // Verifica se é mobile
        
        // Ajustar limites de preenchimento
        const minFilled = isMobile ? Math.ceil(totalColumns * 0.3) : Math.ceil(totalColumns * 0.4);
        const maxFilled = isMobile ? Math.floor(totalColumns * 0.6) : Math.floor(totalColumns * 0.7);
        const maxConsecutive = isMobile ? 2 : 3; // Limite de colunas consecutivas
        let filledCount = 0;
    
        // Resetar todas as colunas
        structreLandingColumns.forEach(column => {
            column.classList.remove('expand', 'collapse');
            column.classList.add('collapse');
        });
    
        const canExpand = (index) => {
            let leftCount = 0, rightCount = 0;
    
            // Contar consecutivas à esquerda
            for (let i = index - 1; i >= 0; i--) {
                if (structreLandingColumns[i].classList.contains('expand')) leftCount++;
                else break;
            }
    
            // Contar consecutivas à direita
            for (let i = index + 1; i < totalColumns; i++) {
                if (structreLandingColumns[i].classList.contains('expand')) rightCount++;
                else break;
            }
    
            // Verifica se adicionar esta coluna ultrapassa o limite
            return (leftCount + 1 + rightCount) <= maxConsecutive;
        };
    
        // Expandir colunas obedecendo os limites
        for (let i = 0; i < totalColumns; i++) {
            if (filledCount >= maxFilled) break;
    
            if (Math.random() > (isMobile ? 0.3 : 0.6) && canExpand(i)) {
                structreLandingColumns[i].classList.remove('collapse');
                structreLandingColumns[i].classList.add('expand');
                filledCount++;
            }
        }
    
        // Garantir o preenchimento mínimo
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
    
        // Ajuste específico para a segunda linha no desktop
        const secondRowColumns = structreLandingRows[1]?.children; // Segunda row
        if (secondRowColumns && !isMobile) {
            // Garantir o preenchimento correto
            secondRowColumns[0]?.classList.replace('expand', 'collapse'); // Primeira coluna - collapse
            secondRowColumns[1]?.classList.replace('collapse', 'expand'); // Segunda coluna - expand
            secondRowColumns[2]?.classList.replace('collapse', 'expand'); // Terceira coluna - expand
            secondRowColumns[3]?.classList.replace('collapse', 'expand'); // Quarta coluna - expand
            secondRowColumns[4]?.classList.replace('expand', 'collapse'); // Quinta coluna - collapse
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

    // Handle window resize
    window.addEventListener('resize', () => {
        const newColumnNumber = window.innerWidth <= 700 ? 7 : 20;
        if (newColumnNumber !== columnNumber) {
            columnNumber = newColumnNumber;
            createColumns();
            showImage(currentIndex);
        }
    });

    createColumns();

    // Display the first image immediately without transition
    images[0].style.opacity = '1';
    images[0].style.transition = 'none';
    showImage(currentIndex);

    startAutoSlide();
});
