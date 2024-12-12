// Seleciona os elementos do DOM
const subscribeSpan = document.getElementById('subscribeSpan');
const newsletterForm = document.getElementById('newsletterForm');

// Define o estilo inicial para o formulário
newsletterForm.style.opacity = '0';
newsletterForm.style.transition = 'opacity 0.5s ease'; // Transição suave de 0.5 segundos

// Adiciona o evento de clique no elemento subscribeSpan
subscribeSpan.addEventListener('click', () => {
    // Verifica a opacidade atual e alterna entre 0 e 1
    if (newsletterForm.style.opacity === '0') {
        newsletterForm.style.opacity = '1'; // Torna o formulário visível
    } else {
        newsletterForm.style.opacity = '0'; // Torna o formulário invisível
    }
});