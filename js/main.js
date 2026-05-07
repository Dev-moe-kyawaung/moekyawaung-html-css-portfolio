/**
 * Main JavaScript File
 * Portfolio Website - Main Functionalities
 */

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTheme();
    setupNavigation();
    setupScrollEffects();
    setupBackToTop();
    setupFormHandling();
    setupPortfolioFilter();
    setupScrollAnimation();
}

// ============ THEME SETUP ============

function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// ============ NAVIGATION SETUP ============

function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    
    // Mobile Menu Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('scroll-lock');
        });
    }
    
    // Close menu when clicking on a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (navToggle) navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('scroll-lock');
                
                // Set active state
                navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Active link on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============ SCROLL EFFECTS ============

function setupScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Hide scroll indicator on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// ============ BACK TO TOP ============

function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============ FORM HANDLING ============

function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Submit form
        submitForm(data);
    });
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.trim().length < 2) {
        return false;
    }
    if (!emailRegex.test(data.email)) {
        return false;
    }
    if (!data.subject || data.subject.trim().length < 3) {
        return false;
    }
    if (!data.message || data.message.trim().length < 10) {
        return false;
    }
    
    return true;
}

function submitForm(data) {
    const btn = document.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission
    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        showNotification('Message sent successfully!', 'success');
        document.getElementById('contactForm').reset();
    }, 2000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ PORTFOLIO FILTER ============

function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============ SCROLL ANIMATION ============

function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-card, .project-card, .stat, .contact-method, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// ============ UTILITY FUNCTIONS ============

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============ WINDOW RESIZE HANDLER ============

window.addEventListener('resize', debounce(function() {
    // Handle resize events
    updateActiveNavLink();
}, 250));

// ============ ERROR HANDLING ============

window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled rejection:', event.reason);
});
