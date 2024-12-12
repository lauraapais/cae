function turnIntoInput(span) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Introduza o seu e-mail';
  input.value = span.innerText === 'Subscrever Newsletter' ? '' : span.innerText;
  input.className = span.className;
  
  span.parentNode.replaceChild(input, span);
  input.focus();
  
  input.addEventListener('blur', function() {
    turnIntoSpan(input);
  });
}



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

