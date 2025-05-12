// Script para el login

document.addEventListener('DOMContentLoaded', function() {
    initLogin();
});

function initLogin() {
    // Elementos del DOM
    const loginBtn = document.getElementById('login-btn');
    const loginOverlay = document.getElementById('login-overlay');
    const closeLoginBtn = document.getElementById('close-login');
    const loginForm = document.getElementById('login-form');
    
    if (!loginBtn || !loginOverlay || !closeLoginBtn || !loginForm) {
        console.error('Elementos del login no encontrados');
        return;
    }
    
    // Abrir el modal de login
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
    });
    
    // Cerrar el modal de login
    closeLoginBtn.addEventListener('click', function() {
        loginOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    });
    
    // Cerrar el modal al hacer clic fuera del contenedor
    loginOverlay.addEventListener('click', function(e) {
        if (e.target === loginOverlay) {
            loginOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Manejar el envío del formulario de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Validar el formulario
        if (!email || !password) {
            showAlert('Por favor, completa todos los campos.', 'error');
            return;
        }
        
        // Simular envío del formulario
        showAlert('Iniciando sesión...', 'info');
        
        // Simular respuesta del servidor después de 2 segundos
        setTimeout(function() {
            // Mostrar mensaje de éxito
            showAlert('¡Inicio de sesión exitoso!', 'success');
            
            // Cerrar el modal
            loginOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Limpiar el formulario
            loginForm.reset();
            
            // Actualizar el botón de login
            loginBtn.innerHTML = '<i class="fas fa-user"></i> Mi Cuenta';
        }, 2000);
    });
}

// Función para mostrar alertas (si no está definida en contact.js)
if (typeof showAlert !== 'function') {
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
}