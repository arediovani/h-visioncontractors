// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (carousel && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = carousel.querySelectorAll('.project-card');
    const cardWidth = cards[0]?.offsetWidth || 0;
    const gap = 32; // 2rem gap
    const cardsToShow = window.innerWidth > 768 ? 3 : 1;
    const maxIndex = Math.max(0, cards.length - cardsToShow);
    
    function updateCarousel() {
      const offset = currentIndex * (cardWidth + gap);
      carousel.style.transform = `translateX(-${offset}px)`;
      
      // Disable buttons at boundaries
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        currentIndex = 0;
        updateCarousel();
      }, 250);
    });
    
    updateCarousel();
  }
  
  // Gallery functionality for project detail pages
  const galleryMain = document.querySelector('.gallery-main img');
  const thumbs = document.querySelectorAll('.gallery-thumbs img');
  
  if (galleryMain && thumbs.length > 0) {
    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        // Update main image
        galleryMain.src = thumb.src;
        
        // Update active state
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
    
    // Set first thumb as active
    thumbs[0].classList.add('active');
  }
  
  // Form submission handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // In production, you would send this to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! We will get back to you shortly.');
      this.reset();
    });
  }
  
  // Smooth scrolling for anchor links
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
});
