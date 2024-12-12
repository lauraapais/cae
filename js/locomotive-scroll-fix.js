var scroller;

window.addEventListener('load', (event) => {
    scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
    //scroller.init();
    scroller.start();

    let loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.classList.remove('loading');
        
    });
});

//scroller.stop();


window.onload = function () {
    scroller.update();
}


const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);

        if (targetElement) {
            scroller.scrollTo(targetElement);
        }
    });
});


function scrollerMenu() {
    if (!menu.classList.contains("active")) {
        scroller.start();
        onScrollMenu(scroller.scroll.instance.scroll.y);
    } else {
        scroller.stop();
        if (nav.classList.contains("scroll")) {
            nav.classList.remove("scroll");
        }
    }
}