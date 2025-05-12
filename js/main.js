// Script principal para la landing page

// Función para cargar componentes HTML
function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            // Disparar evento para notificar que el componente se ha cargado
            const event = new CustomEvent('componentLoaded', { detail: { id: containerId } });
            document.dispatchEvent(event);
        })
        .catch(error => console.error(`Error cargando ${componentPath}:`, error));
}

// Función para manejar el scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Función para detectar cuando el usuario hace scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Función para manejar el menú móvil
document.addEventListener('DOMContentLoaded', function() {
    // Cargar componentes
    loadComponent('header-container', 'components/header.html');
    loadComponent('hero-container', 'components/hero.html');
    loadComponent('products-container', 'components/products.html');
    loadComponent('footer-container', 'components/footer.html');
    
    // Configurar menú móvil después de cargar el header
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail.id === 'header-container') {
            const menuToggle = document.getElementById('mobile-menu');
            const nav = document.querySelector('nav');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    nav.classList.toggle('active');
                    menuToggle.classList.toggle('active');
                });
            }
            
            // Cerrar el menú cuando se hace clic en un enlace
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    });
    
    console.log('La página se ha cargado completamente');
});