// Script para el formulario de contacto

document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que se cargue el componente de contacto
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail.id === 'contact-container') {
            initContactForm();
        }
    });
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validar el formulario
        if (!nombre || !email || !asunto || !mensaje) {
            showAlert('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Simular envío del formulario
        showAlert('Enviando mensaje...', 'info');
        
        // Simular respuesta del servidor después de 2 segundos
        setTimeout(function() {
            // Mostrar mensaje de éxito
            showAlert('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            
            // Limpiar el formulario
            contactForm.reset();
        }, 2000);
    });
}

// Función para mostrar alertas
function showAlert(message, type) {
    // Verificar si ya existe una alerta y eliminarla
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Crear elemento de alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${getAlertIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar la alerta al DOM
    document.body.appendChild(alert);
    
    // Mostrar la alerta con animación
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    // Configurar el cierre de la alerta
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    });
    
    // Cerrar automáticamente después de 5 segundos (excepto para alertas de tipo info)
    if (type !== 'info') {
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    }
}

// Función para obtener el icono correspondiente al tipo de alerta
function getAlertIcon(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'info':
            return 'fa-info-circle';
        default:
            return 'fa-info-circle';
    }
}