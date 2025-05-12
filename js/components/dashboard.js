// Dashboard.js - Funcionalidad para el panel de administración

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hide');
            }, 800);
        });
    }

    // Funcionamiento del menú en dispositivos móviles
    const toggleMobileMenu = () => {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('.top-bar').prepend(menuToggle);

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace en vista móvil
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    };

    if (window.innerWidth <= 1024) {
        toggleMobileMenu();
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1024 && !document.querySelector('.menu-toggle')) {
            toggleMobileMenu();
        }
    });

    // Establecer link activo en la navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Inicializar gráficos con Chart.js
    initCharts();
});

function initCharts() {
    // Configuraciones comunes
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.color = '#4b5563';
    Chart.defaults.plugins.legend.position = 'bottom';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 15;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(17, 24, 39, 0.8)';
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 4;
    
    // 1. Gráfico de ventas
    const salesChartCtx = document.getElementById('salesChart');
    
    if (salesChartCtx) {
        const salesChart = new Chart(salesChartCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ventas 2023',
                    data: [120000, 150000, 180000, 170000, 210000, 190000, 230000, 250000, 260000, 240000, 270000, 290000],
                    borderColor: '#3a36e0',
                    backgroundColor: 'rgba(58, 54, 224, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#3a36e0',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }, {
                    label: 'Ventas 2022',
                    data: [100000, 125000, 145000, 160000, 180000, 170000, 190000, 210000, 220000, 215000, 230000, 240000],
                    borderColor: '#34d399',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#34d399',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += new Intl.NumberFormat('es-ES', { 
                                    style: 'currency', 
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(context.parsed.y);
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString('es-ES');
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 2. Gráfico de modelos más vendidos
    const modelsChartCtx = document.getElementById('modelsChart');
    
    if (modelsChartCtx) {
        const modelsChart = new Chart(modelsChartCtx, {
            type: 'bar',
            data: {
                labels: ['Mercedes GLC', 'BMW X5', 'Audi Q5', 'Porsche Macan', 'Lexus RX'],
                datasets: [{
                    label: 'Unidades Vendidas',
                    data: [32, 27, 23, 18, 15],
                    backgroundColor: [
                        'rgba(58, 54, 224, 0.8)',
                        'rgba(52, 211, 153, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgba(58, 54, 224, 1)',
                        'rgba(52, 211, 153, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(99, 102, 241, 1)',
                        'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Unidades Vendidas: ${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
    }
    
    // 3. Gráfico de distribución de ventas
    const salesDistributionChartCtx = document.getElementById('salesDistributionChart');
    
    if (salesDistributionChartCtx) {
        const salesDistributionChart = new Chart(salesDistributionChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['SUV', 'Sedán', 'Coupé', 'Convertible', 'Eléctrico'],
                datasets: [{
                    label: 'Distribución de Ventas',
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        'rgba(58, 54, 224, 0.8)',
                        'rgba(52, 211, 153, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    hoverOffset: 4,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${percentage}% (${value} unidades)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Manipulación de opciones de período
    document.querySelectorAll('.period-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.period-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            // Aquí se podría implementar la lógica para cambiar los datos del gráfico
            // según el período seleccionado
        });
    });
}

// Función para manejar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Evento para logout
document.getElementById('logout-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Has cerrado sesión exitosamente', 'success');
    // Aquí iría la lógica real para cerrar sesión
    setTimeout(() => {
        // Redirección simulada 
        console.log('Redirigiendo al login...');
    }, 2000);
}); 