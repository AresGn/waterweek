// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active
    setActiveNavItem();
    
    // Fonctionnalité du compte à rebours
    startCountdown();
    
    // Fonctionnalité des onglets du programme
    setupTabs();
    
    // Fonctionnalité des onglets de la galerie
    setupGalleryTabs();
    
    // Navigation fluide
    initSmoothScroll();
    
    // Header fixe avec effet de fond au défilement
    initHeaderScroll();
    
    // Check if we're using the new navigation system by looking for its elements
    const isUsingNewNav = document.querySelector('.site-header') !== null;
    
    // Menu mobile - vérifier si menu.js est chargé avant d'initialiser
    const isMenuJsLoaded = Array.from(document.querySelectorAll('script')).some(script => 
        script.src && script.src.includes('menu.js')
    );
    
    if (!isMenuJsLoaded && !isUsingNewNav) {
        console.log('Neither menu.js nor new-nav.js detected, initializing mobile menu from main.js');
    initMobileMenu();
    } else {
        console.log('Menu system already initialized, main.js will not initialize its own mobile menu logic.');
    }
    
    // Formulaire de contact
    initContactForm();
    
    // Formulaire d'inscription à la newsletter
    initNewsletterForm();
    
    // Animation au défilement
    setupScrollAnimations();
    
    // Fonction pour gérer le bouton "Retour en haut"
    initBackToTop();
    
    // S'assurer que le compte à rebours est correctement formaté même au chargement initial
    updateCountdownDisplay();
    
    // Mettre à jour l'affichage du compte à rebours quand la fenêtre est redimensionnée
    window.addEventListener('resize', updateCountdownDisplay);
});

// Fonction pour gérer le menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (!mobileMenuToggle) {
        console.error('Menu mobile toggle not found by main.js');
        return;
    }
    
    if (!nav) {
        console.error('Navigation not found by main.js');
        return;
    }
    
    console.log('Mobile menu initialized by main.js (because menu.js was not found)');
    
    // Fonction pour ouvrir/fermer le menu
    function toggleMenu(e) {
        if (e) e.preventDefault();
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (!nav.classList.contains('active')) {
            dropdowns.forEach(dropdown => {
                const dropdownLink = dropdown.querySelector('a');
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownLink && dropdownContent) {
                    dropdownLink.classList.remove('dropdown-active');
                    dropdownContent.classList.remove('show');
                    // In a scenario where main.js handles this, ensure CSS handles display via .show
                }
            });
        }
    }
    
    mobileMenuToggle.addEventListener('click', toggleMenu);
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (!dropdownLink || !dropdownContent) return;
        dropdownLink.classList.add('has-dropdown');
        
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherLink = otherDropdown.querySelector('a');
                        const otherContent = otherDropdown.querySelector('.dropdown-content');
                        if (otherLink && otherContent) {
                            otherLink.classList.remove('dropdown-active');
                            otherContent.classList.remove('show');
                        }
                    }
                });
                
                this.classList.toggle('dropdown-active');
                dropdownContent.classList.toggle('show');
            }
        });
    });
    
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992 && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    navLinks.forEach(link => {
        if (!link.parentElement.classList.contains('dropdown')) {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992 && nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && nav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            dropdowns.forEach(dropdown => {
                const dropdownLink = dropdown.querySelector('a');
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownLink && dropdownContent) {
                    dropdownLink.classList.remove('dropdown-active');
                    dropdownContent.classList.remove('show');
                }
            });
        }
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && e.target !== mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
                toggleMenu();
            }
        }
    });
    
    if (window.innerWidth <= 992) {
        mobileMenuToggle.style.display = 'flex';
        document.querySelectorAll('.dropdown > a').forEach(link => {
            link.classList.add('has-dropdown');
        });
    }
}

// Fonction pour définir l'élément de navigation actif
function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Fonction pour gérer le compte à rebours
function startCountdown() {
    // Date cible pour le compte à rebours (3 juin 2025)
    const targetDate = new Date("June 3, 2025 00:00:00").getTime();
    const countdownElement = document.getElementById("countdown-timer");
    
    if (!countdownElement) {
        console.error("Countdown element not found!");
        return;
    }
    
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error("One or more countdown unit elements not found!");
        return;
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Calcul des jours, heures, minutes et secondes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mise à jour des valeurs avec un padding
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Si la date est dépassée
        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "<div class='time-unit event-started'><span>L'événement a commencé!</span></div>";
        }
    }
    
    // Appel initial pour éviter le délai d'1 seconde
    updateCountdown();
    
    // Mise à jour toutes les secondes
    const countdownTimer = setInterval(updateCountdown, 1000);
}

// Gestion des onglets du programme
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            
            // Retirer la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.day-program').forEach(program => program.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué et au contenu correspondant
            this.classList.add('active');
            document.getElementById(`day-${day}`).classList.add('active');
        });
    });
}

// Fonction pour le filtrage des éléments de la galerie
function setupGalleryTabs() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryTabs.length || !galleryItems.length) return;
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Enlever la classe active de tous les onglets
            galleryTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie
            const category = this.getAttribute('data-tab');
            
            // Filtrer les éléments
            galleryItems.forEach(item => {
                if (category === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Fonction pour le défilement fluide des ancres
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fonction pour l'effet de fond du header au défilement
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Vérifier la position initiale au chargement
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
}

// Fonction pour initialiser le formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Validation simple des champs
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
                
                // Validation spécifique pour l'email
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.style.borderColor = 'red';
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Simulation d'envoi de données (à remplacer par l'appel API réel)
                console.log('Données du formulaire de contact:', formDataObj);
                
                // Réinitialisation du formulaire et affichage d'un message de succès
                contactForm.reset();
                alert('Votre message a été envoyé avec succès !');
            } else {
                alert('Veuillez corriger les erreurs dans le formulaire.');
            }
        });
    }
}

// Fonction pour initialiser le formulaire d'inscription à la newsletter
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailRegex.test(emailInput.value)) {
                    // Simulation d'envoi de données (à remplacer par l'appel API réel)
                    console.log('Inscription à la newsletter:', emailInput.value);
                    
                    // Réinitialisation du formulaire et affichage d'un message de succès
                    newsletterForm.reset();
                    alert('Vous êtes inscrit à la newsletter !');
                } else {
                    alert('Veuillez entrer une adresse email valide.');
                    emailInput.style.borderColor = 'red';
                }
            } else {
                alert('Veuillez entrer votre adresse email.');
                if (emailInput) {
                    emailInput.style.borderColor = 'red';
                }
            }
        });
    }
}

// Fonction pour le chargement paresseux des images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Exécuter le chargement paresseux une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Animation au défilement
function setupScrollAnimations() {
    // Cette fonction va gérer les animations au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const animateOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter une classe pour déclencher l'animation
                entry.target.classList.add('animate');
                // Désinscrire après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec animation
    const animatedElements = document.querySelectorAll('.theme-card, .speaker-card, .gallery-item, .news-card, .contact-form .form-group, nav ul li');
    animatedElements.forEach((element, index) => {
        // Ajouter un délai progressif pour les éléments de la navbar
        if (element.closest('nav')) {
            element.style.transitionDelay = `${index * 0.05}s`;
        }
        animateOnScroll.observe(element);
    });
}

// Animations lors du chargement initial de la page
window.addEventListener('load', function() {
    // Animation immédiate pour les éléments visibles sans défilement
    document.querySelectorAll('.hero-content h1, .hero-content p, .countdown, .cta-buttons').forEach(el => {
        el.style.opacity = '1';
    });
});

// Fonction pour gérer le bouton "Retour en haut"
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction pour mettre à jour l'affichage du compte à rebours en fonction de la taille de l'écran
function updateCountdownDisplay() {
    const countdownTimer = document.getElementById('countdown-timer');
    if (!countdownTimer) return;
    
    const timeUnits = countdownTimer.querySelectorAll('.time-unit');
    if (!timeUnits.length) return;
    
    // Ajuster la disposition en fonction de la largeur de l'écran
    if (window.innerWidth <= 480) {
        // Pour les très petits écrans mobiles
        timeUnits.forEach(unit => {
            unit.style.width = 'calc(50% - 0.8rem)';
            unit.style.minWidth = '65px';
            unit.style.padding = '0.8rem 0.5rem';
        });
    } else if (window.innerWidth <= 768) {
        // Pour les tablettes et petits écrans
        timeUnits.forEach(unit => {
            unit.style.width = 'calc(50% - 1rem)';
            unit.style.minWidth = '80px';
            unit.style.padding = '1rem';
        });
    } else {
        // Pour les grands écrans
        timeUnits.forEach(unit => {
            unit.style.width = 'auto';
            unit.style.minWidth = '100px';
            unit.style.padding = '1.2rem';
        });
    }
}

// Force l'initialisation du menu mobile quand la page est chargée
window.addEventListener('load', function() {
    // S'assurer que le menu mobile est correctement initialisé
    // This part might also conflict if menu.js is handling the display of the toggle
    // and has-dropdown classes. It's better to let menu.js manage this fully.
    // if (window.innerWidth <= 992) {
    //     const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    //     if (mobileMenuToggle) {
    //         mobileMenuToggle.style.display = 'flex';
    //     }
    //     
    //     // S'assurer que les liens dropdown ont bien leur indicateur de flèche
    //     document.querySelectorAll('.dropdown > a').forEach(link => {
    //         link.classList.add('has-dropdown');
    //     });
    // }
    
    // Réinitialiser le compte à rebours pour s'assurer qu'il s'affiche correctement
    updateCountdownDisplay();
}); 