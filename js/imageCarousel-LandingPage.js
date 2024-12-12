document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".imageBackgroundLanding img");
    const svgs = document.querySelectorAll(".imageLandingNext .numberPhotos");
    const titles = document.querySelectorAll(".titleLandingContainer");
    let currentIndex = 0;
    let autoSlideInterval;

    const showImage = (index) => {
        // Atualiza as imagens
        images.forEach((img, i) => {
            img.classList.remove("active");
            if (i === index) {
                img.classList.add("active");
            }
        });

        // Atualiza os SVGs
        svgs.forEach(svg => svg.classList.remove("selected"));
        svgs[index].classList.add("selected");

        // Atualiza os títulos
        titles.forEach((title, i) => {
            title.classList.remove("active");
            if (i === index) {
                title.classList.add("active");
            }
        });
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length; // Incrementa ou reseta o índice
            showImage(currentIndex);
        }, 5000); // Troca a cada 5 segundos
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Adiciona os eventos de clique nos SVGs
    svgs.forEach((svg, index) => {
        svg.addEventListener("click", () => {
            stopAutoSlide(); // Pausa o auto slider ao clicar
            currentIndex = index; // Atualiza o índice atual
            showImage(currentIndex);
            startAutoSlide(); // Reinicia o auto slider após a interação
        });
    });

    // Inicializa o slider
    showImage(currentIndex); // Mostra a primeira imagem e título
    startAutoSlide(); // Começa o auto slider
});
