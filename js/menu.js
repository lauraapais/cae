/*Menu*/
document.getElementById('openMenu').addEventListener('click', function() {
  const menu = document.getElementById('menu');
  const closeIcon = document.getElementById('closeMenu');
  
  if (menu.classList.contains('show')) {
    menu.classList.remove('show');
    closeIcon.style.display = 'none';
    this.style.display = 'block';
  } else {
    menu.classList.add('show');
    closeIcon.style.display = 'block';
    this.style.display = 'none';
  }
});

document.getElementById('closeMenu').addEventListener('click', function() {
  const menu = document.getElementById('menu');
  const openButton = document.getElementById('openMenu');
  
  menu.classList.remove('show');
  this.style.display = 'none';
  openButton.style.display = 'block';
});



const headerDiv = document.querySelector('.headerDiv');

headerDiv.addEventListener('mouseenter', () => {
    gsap.to("#Rectangle_309", { x: 5, duration: 0.5 });
    gsap.to("#Rectangle_310", { x: 15, duration: 0.5 });
    gsap.to("#Rectangle_311", { x: 35, duration: 0.5 });
    gsap.to("#Rectangle_312", { x: 55, duration: 0.5 });
    gsap.to("#Rectangle_313", { x: 0, y: 0, duration: 0.5 });
    gsap.to("#Rectangle_314", { x: 25, duration: 0.5 });
    gsap.to("#Rectangle_315", { x: 30, duration: 0.5 });
    gsap.to("#Rectangle_316", { x: 45, duration: 0.5 });
});

headerDiv.addEventListener('mouseleave', () => {
    gsap.to("#Rectangle_309", { x: 0, duration: 0.5 });
    gsap.to("#Rectangle_310", { x: 10, duration: 0.5 });
    gsap.to("#Rectangle_311", { x: 30, duration: 0.5 });
    gsap.to("#Rectangle_312", { x: 45, duration: 0.5 });
    gsap.to("#Rectangle_313", { x: 5, y: 0, duration: 0.5 });
    gsap.to("#Rectangle_314", { x: 20, duration: 0.5 });
    gsap.to("#Rectangle_315", { x: 35, duration: 0.5 });
    gsap.to("#Rectangle_316", { x: 50, duration: 0.5 });
});
