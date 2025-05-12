// Script para el slider de la sección hero

document.addEventListener('DOMContentLoaded', function() {
    // Configuración del slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    // Función para cambiar de slide
    function nextSlide() {
        // Quitar clase active del slide actual
        slides[currentSlide].classList.remove('active');
        
        // Calcular el siguiente slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Añadir clase active al nuevo slide
        slides[currentSlide].classList.add('active');
    }
    
    // Cambiar slide cada 5 segundos
    setInterval(nextSlide, 5000);
});