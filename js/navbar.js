/**
 * Navbar JavaScript
 * Handles navigation bar functionality
 */

class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navLinks = document.getElementById('navLinks');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        if (this.navLinks) {
            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
        
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }
    
    openMenu() {
        this.navToggle.classList.add('active');
        this.navLinks.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = '';
    }
    
    handleOutsideClick(e) {
        if (this.isOpen && !this.navbar.contains(e.target)) {
            this.closeMenu();
        }
    }
    
    handleScroll() {
        if (!this.navbar) return;
        
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Initialize Navbar
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
});
