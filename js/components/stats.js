// Función para animar el contador de estadísticas
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    
    // Iniciar las animaciones cuando las estadísticas estén en el viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observar la sección de estadísticas
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Función para animar los contadores
    function startCounters() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-counter'));
            const duration = 2000; // Duración de la animación en ms
            const step = target / 100; // Incremento por paso
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                stat.textContent = Math.round(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, duration / 100);
        });
    }
});

// Preloader y botón de ir arriba
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hide');
            }, 800);
        });
    }
    
    // Botón de ir arriba
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 200) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 