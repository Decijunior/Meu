// JavaScript para a página de vendas CNPJ Radar

document.addEventListener('DOMContentLoaded', function() {
    // Configuração de botões de compra para Kirvano
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const plan = this.getAttribute('data-plan');
            let checkoutUrl = '';
            
            // Aqui seriam configuradas as URLs reais da Kirvano
            if (plan === 'monthly') {
                // URL para plano mensal (12x de R$ 997)
                checkoutUrl = 'https://pay.kirvano.com/dae0ffb2-5920-4e5c-adda-0f9cc3959e80';
                console.log('Redirecionando para checkout do plano mensal');
            } else if (plan === 'onetime') {
                // URL para pagamento único (R$ 797)
                checkoutUrl = 'https://pay.kirvano.com/dae0ffb2-5920-4e5c-adda-0f9cc3959e80';
                console.log('Redirecionando para checkout de pagamento único');
            }
            
            // Redirecionamento para a página de checkout (comentado para desenvolvimento)
            // window.location.href = checkoutUrl;
            
            // Para desenvolvimento, mostrar alerta
            alert('Redirecionando para página de pagamento Kirvano: ' + plan);
        });
    });
    
    // Navegação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação para elementos ao fazer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .automation-card, .testimonial, .pricing-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar estilos para animação
    const elementsToAnimate = document.querySelectorAll('.feature-card, .automation-card, .testimonial, .pricing-card, .faq-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Executar animação ao carregar e ao fazer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Placeholder para vídeo
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Aqui poderia ser implementada a lógica para carregar o vídeo real
            alert('Espaço reservado para vídeo explicativo');
        });
    }
});
