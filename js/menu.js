// Mobile Menu Script - Simplified and Robust Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu script initialized');
    
    // Essential elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Exit if essential elements don't exist
    if (!menuToggle || !nav) {
        console.error('Mobile menu: Essential elements not found');
        return;
    }
    
    // Force visibility of toggle button on mobile
    if (window.innerWidth <= 992) {
        menuToggle.style.display = 'flex';
    }
    
    // 1. Toggle menu open/close
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle classes
        this.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Control body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            
            // Close all dropdowns when closing the menu
            closeAllDropdowns();
        }
        
        console.log('Menu toggle clicked, nav active:', nav.classList.contains('active'));
    });
    
    // Function to close all dropdowns
    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownLink && dropdownContent) {
                dropdownLink.classList.remove('dropdown-active');
                dropdownContent.classList.remove('show');
                dropdownContent.style.display = 'none';
            }
        });
    }
    
    // 2. Handle dropdown functionality
    dropdowns.forEach(function(dropdown) {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (!dropdownLink || !dropdownContent) return;
        
        // Add has-dropdown class to all dropdown links
        dropdownLink.classList.add('has-dropdown');
        
        // Handle dropdown clicks
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns first
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherLink = otherDropdown.querySelector('a');
                        const otherContent = otherDropdown.querySelector('.dropdown-content');
                        if (otherLink && otherContent) {
                            otherLink.classList.remove('dropdown-active');
                            otherContent.classList.remove('show');
                            otherContent.style.display = 'none';
                        }
                    }
                });
                
                // Toggle dropdown state
                this.classList.toggle('dropdown-active');
                dropdownContent.classList.toggle('show');
                
                // Explicitly manage display property along with show class
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.style.display = 'block';
                } else {
                    dropdownContent.style.display = 'none';
                }
                
                console.log('Dropdown clicked:', dropdown);
            }
        });
    });
    
    // Make dropdown content links clickable
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu after clicking a submenu link
            if (window.innerWidth <= 992 && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
                closeAllDropdowns();
            }
        });
    });
    
    // 3. Handle clicks outside the menu to close it
    document.addEventListener('click', function(e) {
        // Close menu when clicking outside it
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            closeAllDropdowns();
        }
    });
    
    // 4. Window resize handling
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            // Reset menu state on large screens
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            
            // Make sure toggle button visibility is correct
            menuToggle.style.display = 'none';
            
            // Reset dropdown styles for desktop
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = '';
                }
            });
        } else {
            // Ensure toggle is visible on small screens
            menuToggle.style.display = 'flex';
            
            // Make sure dropdowns are properly hidden on mobile
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                const dropdownLink = dropdown.querySelector('a');
                if (dropdownContent && !dropdownLink.classList.contains('dropdown-active')) {
                    dropdownContent.style.display = 'none';
                }
            });
        }
    });
    
    // Initialize dropdown display states on page load
    if (window.innerWidth <= 992) {
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });
    }
}); 