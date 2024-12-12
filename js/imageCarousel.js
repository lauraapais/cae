document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".imageCarousel img");
    const leftArrow = document.getElementById("arrowImageEvent_Left");
    const rightArrow = document.getElementById("arrowImageEvent_Right");
    let currentIndex = 0;

    // Initialize: Show the first image and hide the others
    images.forEach((img, index) => {
        img.style.opacity = index === currentIndex ? "1" : "0";
        img.style.transition = "opacity 0.5s ease-in-out";
    });

    const updateCarousel = (direction) => {
        // Hide current image
        images[currentIndex].style.opacity = "0";

        // Update index based on direction
        if (direction === "left") {
            currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        } else if (direction === "right") {
            currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        }

        // Show new current image
        images[currentIndex].style.opacity = "1";
    };

    // Event listeners for arrows
    leftArrow.addEventListener("click", () => updateCarousel("left"));
    rightArrow.addEventListener("click", () => updateCarousel("right"));
});
