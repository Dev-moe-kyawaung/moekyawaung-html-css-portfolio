/**
 * Scroll Animation JavaScript
 * Handles scroll-based animations
 */

class ScrollAnimation {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupCountUpAnimation();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements that should be animated
        document.querySelectorAll(
            '.skill-card, .portfolio-card, .testimonial-card, .contact-method, ' +
            '.timeline-item, .about-text, .stat-item'
        ).forEach(el => observer.observe(el));
    }
    
    triggerAnimation(element) {
        const delay = Array.from(element.parentElement.children).indexOf(element) * 100;
        element.style.animation = `fadeInUp 0.8s ease-out ${delay}ms forwards`;
    }
    
    setupCountUpAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const countUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseInt(element.textContent);
                    this.countUp(element, finalValue);
                    countUpObserver.unobserve(element);
                }
            });
        });
        
        statNumbers.forEach(stat => countUpObserver.observe(stat));
    }
    
    countUp(element, finalValue) {
        let currentValue = 0;
        const increment = finalValue / 30;
        
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(interval);
            }
            element.textContent = Math.floor(currentValue) + '+';
        }, 30);
    }
}

// Initialize ScrollAnimation
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimation();
});
