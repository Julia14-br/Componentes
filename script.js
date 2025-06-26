document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carrusel
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicadoresContainer = document.querySelector('.carrusel-indicadores');
    
    let currentIndex = 0;
    let intervalId;
    const slideInterval = 5000; // 5 segundos
    
    // Crear indicadores
    slides.forEach((_, index) => {
        const indicador = document.createElement('span');
        if (index === 0) indicador.classList.add('active');
        indicador.addEventListener('click', () => goToSlide(index));
        indicadoresContainer.appendChild(indicador);
    });
    
    const indicadores = document.querySelectorAll('.carrusel-indicadores span');
    
    // Función para mover el carrusel
    function goToSlide(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        carrusel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        indicadores.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
        
        // Reiniciar el intervalo
        resetInterval();
    }
    
    // Función para avanzar al siguiente slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Función para retroceder al slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Configurar intervalo para cambio automático
    function startInterval() {
        intervalId = setInterval(nextSlide, slideInterval);
    }
    
    // Reiniciar intervalo
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }
    
    // Event listeners para botones
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Iniciar el carrusel
    startInterval();
    
    // Pausar el carrusel cuando el mouse está sobre él
    carrusel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    carrusel.addEventListener('mouseleave', startInterval);
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Smooth scroll para enlaces del menú
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});