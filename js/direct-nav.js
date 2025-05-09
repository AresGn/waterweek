/**
 * Direct Navigation JavaScript
 * A simple, direct implementation of dropdown functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Direct navigation script loaded');
  
  // Mark that we've initialized menu functionality
  window.menuAlreadyInitialized = true;
  
  // Force close any open dropdowns first
  document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
    dropdown.style.display = 'none';
  });
  
  // Direct implementation of mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if (menuToggle && siteNav) {
    // Initial state - make sure menu toggle is visible on mobile
    if (window.innerWidth <= 992) {
      menuToggle.style.display = 'flex';
    }
    
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle active class for hamburger animation
      menuToggle.classList.toggle('active');
      
      // Toggle mobile menu visibility with transform
      if (menuToggle.classList.contains('active')) {
        siteNav.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      } else {
        siteNav.style.transform = 'translateX(-100%)';
        document.body.style.overflow = ''; // Allow scrolling again
      }
    });
  }
  
  // Desktop dropdown handling
  const dropdownLinks = document.querySelectorAll('.nav-link.has-dropdown');
  
  // Function to close all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.style.display = 'none';
      menu.style.opacity = '0';
      menu.style.visibility = 'hidden';
    });
  }
  
  // Handle all dropdown links
  dropdownLinks.forEach(link => {
    const dropdownMenu = link.nextElementSibling;
    if (!dropdownMenu) return;
    
    // Ensure dropdown menu has the correct class
    dropdownMenu.classList.add('dropdown-menu');
    
    // Desktop: use hover
    if (window.innerWidth > 992) {
      const navItem = link.closest('.nav-item');
      
      // On mouse enter: show dropdown
      navItem.addEventListener('mouseenter', function() {
        // Close any other open dropdowns first
        closeAllDropdowns();
        
        // Show this dropdown
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
      });
      
      // On mouse leave: hide dropdown
      navItem.addEventListener('mouseleave', function() {
        dropdownMenu.style.display = 'none';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
      });
    }
    
    // Both mobile and desktop: use click (for accessibility)
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Mobile: full dropdown toggle logic
      if (window.innerWidth <= 992) {
        // Toggle current dropdown
        if (dropdownMenu.style.display === 'block') {
          dropdownMenu.style.display = 'none';
          link.classList.remove('dropdown-active');
        } else {
          // Close all other dropdowns first
          closeAllDropdowns();
          dropdownLinks.forEach(otherLink => otherLink.classList.remove('dropdown-active'));
          
          // Open this dropdown
          dropdownMenu.style.display = 'block';
          link.classList.add('dropdown-active');
        }
      } else {
        // Desktop: toggle for accessibility (in addition to hover)
        if (dropdownMenu.style.display === 'block') {
          dropdownMenu.style.display = 'none';
          dropdownMenu.style.opacity = '0';
          dropdownMenu.style.visibility = 'hidden';
          link.classList.remove('dropdown-active');
        } else {
          // Close all other dropdowns first
          closeAllDropdowns();
          dropdownLinks.forEach(otherLink => otherLink.classList.remove('dropdown-active'));
          
          // Open this dropdown
          dropdownMenu.style.display = 'block';
          dropdownMenu.style.opacity = '1';
          dropdownMenu.style.visibility = 'visible';
          link.classList.add('dropdown-active');
        }
      }
    });
  });
  
  // Handle click outside to close dropdowns/mobile menu
  document.addEventListener('click', function(e) {
    // If clicking outside nav, close dropdowns and mobile menu
    const isClickInsideNav = e.target.closest('.site-nav');
    const isClickOnToggle = e.target.closest('.menu-toggle');
    
    if (!isClickInsideNav && !isClickOnToggle) {
      // Close all dropdowns
      closeAllDropdowns();
      dropdownLinks.forEach(link => link.classList.remove('dropdown-active'));
      
      // Close mobile menu
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        siteNav.style.transform = 'translateX(-100%)';
        document.body.style.overflow = '';
      }
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      // On desktop: reset mobile menu
      if (menuToggle) {
        menuToggle.style.display = 'none';
        
        if (menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          siteNav.style.transform = '';
          document.body.style.overflow = '';
        }
      }
    } else {
      // On mobile: ensure toggle is visible
      if (menuToggle) {
        menuToggle.style.display = 'flex';
      }
    }
    
    // Close all dropdowns on resize
    closeAllDropdowns();
    dropdownLinks.forEach(link => link.classList.remove('dropdown-active'));
  });
}); 