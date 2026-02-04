// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (carousel && prevBtn && nextBtn) {
    let currentIndex = 0;
    let cards = carousel.querySelectorAll('.project-card');
    let cardWidth = cards[0]?.offsetWidth || 0;
    const gap = 32; // approx gap (2rem)
    const cardsToShow = window.innerWidth > 768 ? 3 : 1;
    let maxIndex = Math.max(0, cards.length - cardsToShow);
    
    // Smooth native scrolling
    carousel.style.scrollBehavior = 'smooth';

    function updateDimensions() {
      cards = carousel.querySelectorAll('.project-card');
      cardWidth = cards[0]?.offsetWidth || 0;
      maxIndex = Math.max(0, cards.length - cardsToShow);
    }

    function scrollToIndex(index) {
      const offset = index * (cardWidth + gap);
      carousel.scrollTo({ left: offset, behavior: 'smooth' });
      prevBtn.disabled = carousel.scrollLeft <= 5;
      nextBtn.disabled = (carousel.scrollLeft + carousel.clientWidth) >= (carousel.scrollWidth - 5);
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      scrollToIndex(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      scrollToIndex(currentIndex);
    });

    // Drag-to-scroll (desktop) / native touch works automatically on mobile
    let isDown = false, startX, scrollLeftStart;
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('dragging');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeftStart = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => { isDown = false; carousel.classList.remove('dragging'); });
    carousel.addEventListener('mouseup', () => { isDown = false; carousel.classList.remove('dragging'); });
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      carousel.scrollLeft = scrollLeftStart - walk;
    });

    // Update index when user scrolls manually
    carousel.addEventListener('scroll', () => {
      const newIndex = Math.round(carousel.scrollLeft / (cardWidth + gap));
      currentIndex = Math.min(maxIndex, Math.max(0, newIndex));
      prevBtn.disabled = carousel.scrollLeft <= 5;
      nextBtn.disabled = (carousel.scrollLeft + carousel.clientWidth) >= (carousel.scrollWidth - 5);
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
        currentIndex = 0;
        scrollToIndex(currentIndex);
      }, 250);
    });

    updateDimensions();
    scrollToIndex(0);
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

  // Normalize project excerpts to a consistent length and append an ellipsis
  (function enforceExcerptLength() {
    const MAX = 260; // adjust if you want shorter/longer excerpts
    document.querySelectorAll('.project-excerpt').forEach(el => {
      const txt = el.innerText.trim().replace(/\s+/g, ' ');
      if (!txt) return;
      if (txt.length > MAX) {
        el.innerText = txt.slice(0, MAX).trim() + '…';
      } else {
        el.innerText = txt + '…';
      }
    });
  })();
  
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

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', (e) => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
    // close when a nav link is clicked
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }));
    // close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

});
