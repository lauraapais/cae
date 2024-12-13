const subscribeSpan = document.getElementById('subscribeSpan');
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.style.opacity = '0';
newsletterForm.style.transition = 'opacity 0.5s ease'; 

subscribeSpan.addEventListener('click', () => {
    if (newsletterForm.style.opacity === '0') {
        newsletterForm.style.opacity = '1'; 
    } else {
        newsletterForm.style.opacity = '0'; 
    }
});