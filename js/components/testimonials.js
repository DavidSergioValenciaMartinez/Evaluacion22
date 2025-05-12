// Script para el slider de testimonios

document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que se cargue el componente de testimonios
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail.id === 'testimonials-container') {
            initTestimonialsSlider();
        }
    });
});

function initTestimonialsSlider() {
    const container = document.getElementById('testimonios-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const testimonios = container.querySelectorAll('.testimonio');
    let currentIndex = 0;
    
    // Función para mostrar un testimonio específico
    function showTestimonio(index) {
        // Asegurarse de que el índice esté dentro del rango
        if (index < 0) index = testimonios.length - 1;
        if (index >= testimonios.length) index = 0;
        
        // Actualizar el índice actual
        currentIndex = index;
        
        // Mover el contenedor para mostrar el testimonio actual
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar los dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Event listeners para los botones
    prevBtn.addEventListener('click', () => {
        showTestimonio(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showTestimonio(currentIndex + 1);
    });
    
    // Event listeners para los dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showTestimonio(i);
        });
    });
    
    // Cambiar automáticamente cada 5 segundos
    setInterval(() => {
        showTestimonio(currentIndex + 1);
    }, 5000);
}