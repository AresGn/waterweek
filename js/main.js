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
    
    // Menu mobile
    initMobileMenu();
    
    // Formulaire de contact
    initContactForm();
    
    // Formulaire d'inscription à la newsletter
    initNewsletterForm();
    
    // Animation au défilement
    setupScrollAnimations();
    
    // Fonction pour gérer le bouton "Retour en haut"
    initBackToTop();

    // Initialization code for Swiper Gallery
    var swiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Gallery tabs filtering
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const gallerySlides = document.querySelectorAll('.swiper-slide');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (filter === 'all') {
                gallerySlides.forEach(slide => {
                    slide.style.display = 'block';
                });
            } else {
                gallerySlides.forEach(slide => {
                    if (slide.classList.contains(filter)) {
                        slide.style.display = 'block';
                    } else {
                        slide.style.display = 'none';
                    }
                });
            }
            
            swiper.update();
            swiper.slideTo(0);
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.menu-sm.dropdown-content');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('open');
            }
        });
    }

    // Submenu toggle for mobile
    const mobileSubmenus = document.querySelectorAll('.dropdown > a');
    
    mobileSubmenus.forEach(submenu => {
        submenu.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                this.classList.toggle('submenu-open');
                const dropdownContent = this.nextElementSibling;
                dropdownContent.classList.toggle('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Countdown timer
    function updateCountdown() {
        const eventDate = new Date('June 3, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = eventDate - now;
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                const animation = element.getAttribute('data-animation');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add(animation);
                    element.style.opacity = 1;
                }, delay);
            }
        });
    }
    
    // Initialize element states
    animatedElements.forEach(element => {
        element.style.opacity = 0;
    });
    
    // Check positions on page load and scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Program tabs
    const programTabs = document.querySelectorAll('.tab-btn');
    const programDays = document.querySelectorAll('.day-program');
    
    programTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.getAttribute('data-day');
            
            programTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            programDays.forEach(dayProgram => {
                dayProgram.classList.remove('active');
            });
            
            document.getElementById(`day-${day}`).classList.add('active');
        });
    });
});

// Fonction pour gérer le menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (!mobileMenuToggle) return;
    
    // Fonction pour ouvrir/fermer le menu
    function toggleMenu() {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Click sur le bouton hamburger
    mobileMenuToggle.addEventListener('click', toggleMenu);
    
    // Fermer le menu après un clic sur un lien (sur mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Fermer le menu si la fenêtre est redimensionnée au-delà de 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
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
    const targetDate = new Date("June 3, 2025 00:00:00").getTime();
    
    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").textContent = days.toString().padStart(3, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            const currentLang = localStorage.getItem('language') || 'fr';
            if (currentLang === 'fr') {
                document.getElementById("countdown-timer").innerHTML = "L'événement a commencé!";
            } else {
                document.getElementById("countdown-timer").innerHTML = "The event has started!";
            }
        }
    }, 1000);
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
            
            if (!isValid) {
                const currentLang = localStorage.getItem('language') || 'fr';
                const errorMsg = currentLang === 'fr' 
                    ? 'Veuillez remplir correctement tous les champs obligatoires.' 
                    : 'Please fill in all required fields correctly.';
                alert(errorMsg);
                return;
            }
            
            // Simuler l'envoi du formulaire (à remplacer par l'API réelle)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            const currentLang = localStorage.getItem('language') || 'fr';
            
            submitButton.disabled = true;
            submitButton.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                contactForm.reset();
                
                const successMsg = currentLang === 'fr' 
                    ? 'Votre message a été envoyé avec succès !' 
                    : 'Your message has been sent successfully!';
                alert(successMsg);
            }, 1500);
        });
    }
}

// Fonction pour initialiser le formulaire de newsletter
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            // Validation de l'email
            if (!emailInput.value.trim()) {
                emailInput.style.borderColor = 'red';
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                return;
            }
            
            emailInput.style.borderColor = '';
            
            // Simuler l'abonnement (à remplacer par l'API réelle)
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            const currentLang = localStorage.getItem('language') || 'fr';
            
            submitButton.disabled = true;
            submitButton.textContent = currentLang === 'fr' ? 'Traitement...' : 'Processing...';
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                newsletterForm.reset();
                
                const successMsg = currentLang === 'fr' 
                    ? 'Vous êtes maintenant inscrit à notre newsletter !' 
                    : 'You are now subscribed to our newsletter!';
                alert(successMsg);
            }, 1500);
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