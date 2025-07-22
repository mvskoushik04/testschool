document.addEventListener('DOMContentLoaded', () => {
  // Initialize testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    let currentTestimonial = 0;
    const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
      });
    }
    
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      showTestimonial(currentTestimonial);
    }
    
    // For mobile view, show all testimonials stacked
    if (window.innerWidth <= 768) {
      testimonials.forEach(testimonial => {
        testimonial.style.display = 'block';
      });
    } else {
      // For desktop, show one at a time with auto-rotation
      showTestimonial(0);
      setInterval(nextTestimonial, 5000);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        testimonials.forEach(testimonial => {
          testimonial.style.display = 'block';
        });
      } else {
        showTestimonial(currentTestimonial);
      }
    });
  }
  
  // Add intersection observer for animations
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

  document.querySelectorAll('.facilities-intro, .facilities-grid, .campus-tour, .testimonials').forEach(section => {
    observer.observe(section);
  });
});