// ===== SMOOTH SCROLL ===== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== NAVBAR ACTIVE LINK ===== 
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active link on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ===== ANIMATION ON SCROLL ===== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .download-card, .mission-card, .feature-detail, .faq-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===== FAQ TOGGLE ===== 
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Initialize FAQ on page load
document.addEventListener('DOMContentLoaded', initFAQ);

// ===== GLITCH TEXT ANIMATION ===== 
function initGlitchText() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(element => {
        const text = element.textContent;
        
        element.addEventListener('mouseenter', () => {
            let count = 0;
            const interval = setInterval(() => {
                element.textContent = text
                    .split('')
                    .map((char, index) => {
                        if (Math.random() > 0.8) {
                            return String.fromCharCode(33 + Math.random() * 94);
                        }
                        return char;
                    })
                    .join('');
                
                count++;
                if (count > 5) {
                    element.textContent = text;
                    clearInterval(interval);
                }
            }, 50);
        });
    });
}

// Initialize glitch text on page load
document.addEventListener('DOMContentLoaded', initGlitchText);

// ===== SCROLL ANIMATION FOR NAVBAR ===== 
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ===== BUTTON RIPPLE EFFECT ===== 
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .cta-button-large, .download-btn, .contact-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .cta-button, .cta-button-large, .download-btn, .contact-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize ripple effect on page load
document.addEventListener('DOMContentLoaded', addRippleEffect);

// ===== PARALLAX EFFECT ===== 
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero, .animated-background');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        });
    });
}

// Initialize parallax on page load
document.addEventListener('DOMContentLoaded', addParallaxEffect);

// ===== PAGE LOAD ANIMATION ===== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===== KEYBOARD NAVIGATION ===== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus if needed
    }
});

// ===== MOBILE MENU OPTIMIZATION ===== 
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swiped left
    }
    if (touchEndX > touchStartX) {
        // Swiped right
    }
}

// ===== PERFORMANCE OPTIMIZATION ===== 
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== UTILITY FUNCTIONS ===== 
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-to-top button functionality
document.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// ===== INITIALIZE ALL ON DOCUMENT READY ===== 
document.addEventListener('DOMContentLoaded', () => {
    console.log('Glitch Music website loaded successfully!');
});

// ===== ERROR HANDLING ===== 
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
});

// ===== OFFLINE DETECTION ===== 
window.addEventListener('offline', () => {
    console.warn('You are offline');
});

window.addEventListener('online', () => {
    console.log('You are online');
});
