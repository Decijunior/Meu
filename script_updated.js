// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Manejar las preguntas frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar todas las otras preguntas
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar la clase active en el elemento actual
            item.classList.toggle('active');
        });
    });
    
    // Manejar los enlaces de navegación suave
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.problem-item, .benefit-item, .step, .testimonial, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Ejecutar la animación al cargar la página
    animateOnScroll();
    
    // Ejecutar la animación al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Contador de tiempo limitado para crear urgencia
    function startCountdown() {
        // Establecer la fecha límite (24 horas desde ahora)
        const now = new Date();
        const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        // Actualizar el contador cada segundo
        const countdownInterval = setInterval(function() {
            const currentTime = new Date();
            const timeLeft = deadline - currentTime;
            
            // Calcular horas, minutos y segundos restantes
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Actualizar el elemento HTML con el tiempo restante
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            // Si el tiempo ha expirado, detener el contador
            if (timeLeft < 0) {
                clearInterval(countdownInterval);
                if (countdownElement) {
                    countdownElement.innerHTML = '00:00:00';
                }
            }
        }, 1000);
    }
    
    // Iniciar el contador si existe el elemento
    if (document.getElementById('countdown')) {
        startCountdown();
    }
    
    // Validación simple para el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Validar nombre
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Por favor, ingrese su nombre');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Por favor, ingrese un email válido');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Validar mensaje
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Por favor, ingrese su mensaje');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // Si todo es válido, mostrar mensaje de éxito
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Eliminar el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Funciones auxiliares para la validación del formulario
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        
        formControl.className = 'form-control error';
    }
    
    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        formControl.className = 'form-control';
    }
    
    // Efecto de resaltado para los botones de precios
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
    
    // Añadir efecto de paralaje a las secciones con fondo
    window.addEventListener('scroll', function() {
        const parallaxSections = document.querySelectorAll('.benefits, .pricing, .final-cta');
        
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
                const yPos = -(scrollPosition - sectionTop) / 10;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
    
    // Animación para el botón de WhatsApp
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        // Añadir un pequeño efecto de pulso
        setInterval(() => {
            whatsappButton.classList.add('pulse');
            setTimeout(() => {
                whatsappButton.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }
});
