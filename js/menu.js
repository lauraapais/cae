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