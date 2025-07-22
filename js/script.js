// ==================== MOBILE MENU TOGGLE FUNCTIONALITY ====================
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".navbar");

if (toggle && nav) {
    // Handle menu toggle
    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        nav.classList.toggle("active");
        toggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                toggle.textContent = "☰";
                document.body.style.overflow = "auto";
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.textContent = "☰";
            document.body.style.overflow = "auto";
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            toggle.textContent = "☰";
            document.body.style.overflow = "auto";
        }
    });
}

// ==================== SMOOTH SCROLLING FOR NAVIGATION LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ==================== SCROLL-BASED HEADER BACKGROUND ====================
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.backdropFilter = 'blur(5px)';
        }
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section, .card, .feature-item, .event-card, .facility-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== FORM HANDLING (if contact form exists) ====================
const contactForm = document.querySelector('#contact-form, .contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = this.querySelector('input[name="name"], #name')?.value;
        const email = this.querySelector('input[name="email"], #email')?.value;
        const message = this.querySelector('textarea[name="message"], #message')?.value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// ==================== IMAGE LAZY LOADING ====================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==================== CAROUSEL/SLIDER FUNCTIONALITY ====================
function initializeCarousel() {
    const carousel = document.querySelector('.carousel, .slider');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.slide, .carousel-item');
    const prevBtn = document.querySelector('.carousel-prev, .prev-btn');
    const nextBtn = document.querySelector('.carousel-next, .next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.style.opacity = i === index ? '1' : '0';
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play
    setInterval(nextSlide, 5000);
    
    // Initialize
    showSlide(0);
}

// ==================== MODAL FUNCTIONALITY ====================
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close, .close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchInput = document.querySelector('#search, .search-input');
    const searchableItems = document.querySelectorAll('.searchable, .event-card, .news-item');
    
    if (searchInput && searchableItems.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// ==================== BACK TO TOP BUTTON ====================
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top, #back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== INITIALIZE ALL FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    lazyLoadImages();
    initializeCarousel();
    initializeModals();
    initializeSearch();
    initializeBackToTop();
    
    // Set initial header background
    handleHeaderScroll();
    
    console.log('All website functionality initialized successfully!');
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.log('JavaScript error occurred:', e.error);
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(handleHeaderScroll, 10));
