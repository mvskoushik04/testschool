document.addEventListener('DOMContentLoaded', () => {
  // Background slider
  const backgrounds = [
    'assets/bg1.jpg',
    'assets/bg2.jpg',
    'assets/bg3.webp'
  ];

  let current = 0;
  let showingBg1 = true;

  const bg1 = document.querySelector('.hero-bg1');
  const bg2 = document.querySelector('.hero-bg2');

  function preloadImages(imgs) {
    imgs.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  function changeBackground() {
    const nextImg = backgrounds[current];
    if (showingBg1) {
      bg2.style.backgroundImage = `url(${nextImg})`;
      bg2.style.opacity = 1;
      bg1.style.opacity = 0;
    } else {
      bg1.style.backgroundImage = `url(${nextImg})`;
      bg1.style.opacity = 1;
      bg2.style.opacity = 0;
    }
    showingBg1 = !showingBg1;
    current = (current + 1) % backgrounds.length;
  }

  preloadImages(backgrounds);

  // Set initial background immediately
  bg1.style.backgroundImage = `url(${backgrounds[current]})`;
  bg1.style.opacity = 1;
  current = (current + 1) % backgrounds.length;

  const bgInterval = setInterval(changeBackground, 7000);

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.manthan-section, .vasavi-style-section, .school-footer').forEach(section => {
    observer.observe(section);
  });

  // Mobile menu toggle
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navbar");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    toggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        toggle.textContent = "☰";
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
          nav.classList.remove('active');
          toggle.textContent = "☰";
        }
      }
    });
  });
});