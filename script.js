// Add zoom controls to the page
document.addEventListener('DOMContentLoaded', function() {
  // Create zoom controls
  const zoomControls = document.createElement('div');
  zoomControls.className = 'zoom-controls';
  
  const zoomInButton = document.createElement('button');
  zoomInButton.innerHTML = '+';
  zoomInButton.setAttribute('aria-label', 'Zoom in');
  
  const zoomOutButton = document.createElement('button');
  zoomOutButton.innerHTML = '-';
  zoomOutButton.setAttribute('aria-label', 'Zoom out');
  
  const resetZoomButton = document.createElement('button');
  resetZoomButton.innerHTML = '↺';
  resetZoomButton.setAttribute('aria-label', 'Reset zoom');
  
  zoomControls.appendChild(zoomInButton);
  zoomControls.appendChild(zoomOutButton);
  zoomControls.appendChild(resetZoomButton);
  
  document.body.appendChild(zoomControls);
  
  // Set initial zoom level
  let currentZoom = 1;
  const zoomFactor = 0.1;
  const minZoom = 0.5;
  const maxZoom = 2;
  
  // Zoom in function
  zoomInButton.addEventListener('click', function() {
    if (currentZoom < maxZoom) {
      currentZoom += zoomFactor;
      applyZoom();
    }
  });
  
  // Zoom out function
  zoomOutButton.addEventListener('click', function() {
    if (currentZoom > minZoom) {
      currentZoom -= zoomFactor;
      applyZoom();
    }
  });
  
  // Reset zoom function
  resetZoomButton.addEventListener('click', function() {
    currentZoom = 1;
    applyZoom();
  });
  
  // Apply zoom to body
  function applyZoom() {
    document.body.style.transform = `scale(${currentZoom})`;
    document.body.classList.add('zoomed');
    
    // Adjust body width to prevent horizontal scrollbar at higher zoom levels
    if (currentZoom > 1) {
      document.body.style.width = `${100 / currentZoom}%`;
    } else {
      document.body.style.width = '100%';
    }
  }
  
  // Pinch zoom functionality for touch devices
  let initialDistance = 0;
  let initialZoom = 1;
  
  document.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      initialZoom = currentZoom;
    }
  });
  
  document.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent default pinch zoom
      
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      
      const distanceRatio = currentDistance / initialDistance;
      currentZoom = Math.min(Math.max(initialZoom * distanceRatio, minZoom), maxZoom);
      
      applyZoom();
    }
  }, { passive: false });
  
  // Add typing animation to hero text
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero h2');
  
  if (heroTitle && heroSubtitle) {
    heroTitle.style.opacity = '0';
    heroSubtitle.style.opacity = '0';
    
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.classList.add('typing-animation');
      
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.classList.add('typing-animation');
      }, 1500);
    }, 500);
  }
  
  // Add parallax effect to figures
  const figures = document.querySelectorAll('.figure');
  
  window.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    figures.forEach(figure => {
      const offsetX = (mouseX - 0.5) * 20;
      const offsetY = (mouseY - 0.5) * 20;
      
      figure.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
  
  // Add animated border to project cards on hover
  const projects = document.querySelectorAll('.project');
  
  projects.forEach(project => {
    project.addEventListener('mouseenter', function() {
      this.classList.add('animated-border');
    });
    
    project.addEventListener('mouseleave', function() {
      this.classList.remove('animated-border');
    });
  });
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
  navLinks.classList.toggle('active');
  
  // Transform hamburger to X
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => bar.classList.toggle('x'));
});

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', function() {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      
      // Revert X back to hamburger
      const bars = document.querySelectorAll('.bar');
      bars.forEach(bar => bar.classList.remove('x'));
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Account for fixed header
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Here you would normally send this data to a server
  // For demo purposes, we'll just log it and show an alert
  console.log('Form submission:', { name, email, message });
  
  // Show success message
  alert('Thank you for your message! I will get back to you soon.');
  
  // Reset form
  contactForm.reset();
});

// Add scroll animation for elements
function revealOnScroll() {
  const elements = document.querySelectorAll('.projects .project, .skills, .contact-form, .contact-info, .figure, .floating-element');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (elementPosition < windowHeight - revealPoint) {
      element.classList.add('fade-in');
    }
  });
}

// Run on load and scroll
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// Add X animation for mobile menu
const bars = document.querySelectorAll('.bar');
document.querySelector('.menu-toggle').addEventListener('click', function() {
  bars[0].classList.toggle('rotate-down');
  bars[1].classList.toggle('fade-out');
  bars[2].classList.toggle('rotate-up');
});

// Add X animation style
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .bar.rotate-down {
      transform: translateY(8px) rotate(45deg);
    }
    
    .bar.fade-out {
      opacity: 0;
    }
    
    .bar.rotate-up {
      transform: translateY(-8px) rotate(-45deg);
    }
  </style>
`);

// Add animated background color to skill tags
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#C4B5AB';
    this.style.color = 'white';
  });
  
  tag.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '';
    this.style.color = '';
  });
});

// Add subtle hover effect to nav links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Enhanced animations for figures
const figures = document.querySelectorAll('.figure');
  
figures.forEach(figure => {
  figure.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.opacity = '0.9';
    this.style.transition = 'all 0.3s ease';
  });
  
  figure.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.opacity = '0.7';
    this.style.transition = 'all 0.3s ease';
  });
});