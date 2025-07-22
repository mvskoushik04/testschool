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