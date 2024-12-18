var scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

new ResizeObserver(() => scroller.update()).observe(document.querySelector("[data-scroll-container]"));