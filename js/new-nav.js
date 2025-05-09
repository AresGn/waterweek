// Simplified Navigation Script for Reliable Dropdown Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Direct DOM manipulation approach
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const dropdownLinks = document.querySelectorAll('.nav-link.has-dropdown');
  const body = document.body;
  
  // Force close any existing dropdowns from other JS
  function forceCloseDropdowns() {
    // Find all dropdown menus in the document
    const allDropdowns = document.querySelectorAll('.dropdown-menu');
    
    // Force proper display style
    allDropdowns.forEach(dropdown => {
      dropdown.style.display = 'none';
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      
      // For mobile
      if (window.innerWidth <= 992) {
        dropdown.style.maxHeight = '0';
      }
    });
    
    // Remove active classes
    const activeLinks = document.querySelectorAll('.dropdown-active');
    activeLinks.forEach(link => {
      link.classList.remove('dropdown-active');
    });
  }
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      this.classList.toggle('active');
      siteNav.classList.toggle('active');
      
      if (siteNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
        forceCloseDropdowns();
      }
    });
  }
  
  // Desktop: Handle hover for dropdown menus
  if (window.innerWidth > 992) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      const hasDropdown = item.querySelector('.nav-link.has-dropdown');
      const dropdownMenu = item.querySelector('.dropdown-menu');
      
      if (hasDropdown && dropdownMenu) {
        // Mouse enter
        item.addEventListener('mouseenter', function() {
          forceCloseDropdowns(); // Close other dropdowns
          
          dropdownMenu.style.display = 'flex';
          dropdownMenu.style.visibility = 'visible';
          dropdownMenu.style.opacity = '1';
          dropdownMenu.style.transform = 'translateY(0)';
          
          hasDropdown.classList.add('dropdown-active');
        });
        
        // Mouse leave
        item.addEventListener('mouseleave', function() {
          hasDropdown.classList.remove('dropdown-active');
          
          dropdownMenu.style.display = 'none';
          dropdownMenu.style.visibility = 'hidden';
          dropdownMenu.style.opacity = '0';
          dropdownMenu.style.transform = 'translateY(10px)';
        });
        
        // Click for accessibility
        hasDropdown.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          if (window.innerWidth > 992) {
            // Simply toggle for better accessibility on desktop
            this.classList.toggle('dropdown-active');
            
            if (this.classList.contains('dropdown-active')) {
              dropdownMenu.style.display = 'flex';
              dropdownMenu.style.visibility = 'visible';
              dropdownMenu.style.opacity = '1';
              dropdownMenu.style.transform = 'translateY(0)';
            } else {
              dropdownMenu.style.display = 'none';
              dropdownMenu.style.visibility = 'hidden';
              dropdownMenu.style.opacity = '0';
              dropdownMenu.style.transform = 'translateY(10px)';
            }
          }
        });
      }
    });
  }
  
  // Mobile: Handle click for dropdown menus
  if (window.innerWidth <= 992) {
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdownMenu = this.nextElementSibling;
        
        // Close other dropdowns first
        dropdownLinks.forEach(otherLink => {
          if (otherLink !== this && otherLink.classList.contains('dropdown-active')) {
            otherLink.classList.remove('dropdown-active');
            
            const otherMenu = otherLink.nextElementSibling;
            if (otherMenu) {
              otherMenu.style.maxHeight = '0';
              otherMenu.style.padding = '0';
              otherMenu.style.opacity = '0';
            }
          }
        });
        
        // Toggle current dropdown
        this.classList.toggle('dropdown-active');
        
        if (dropdownMenu) {
          if (this.classList.contains('dropdown-active')) {
            dropdownMenu.style.maxHeight = '1000px';
            dropdownMenu.style.padding = '0.5rem 0 0.5rem 1rem';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
          } else {
            dropdownMenu.style.maxHeight = '0';
            dropdownMenu.style.padding = '0';
            dropdownMenu.style.opacity = '0';
          }
        }
      });
    });
  }
  
  // Close menus when clicking outside
  document.addEventListener('click', function(e) {
    if (!siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
      // Close mobile menu if open
      if (window.innerWidth <= 992 && siteNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        siteNav.classList.remove('active');
        body.style.overflow = '';
      }
      
      // Close all dropdowns
      forceCloseDropdowns();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    // Reset everything on window resize
    forceCloseDropdowns();
    
    if (window.innerWidth > 992) {
      menuToggle.classList.remove('active');
      siteNav.classList.remove('active');
      body.style.overflow = '';
    }
  });
  
  // Run initialization to clean any previous state
  forceCloseDropdowns();
}); 