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



