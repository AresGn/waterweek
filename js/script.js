// Fonction pour le compte à rebours
function initCountdown() {
    const targetDate = new Date('June 3, 2025 09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Calcul des jours, heures, minutes et secondes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mise à jour de l'affichage
        document.getElementById('days').innerHTML = days.toString().padStart(3, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    }
    
    // Mettre à jour toutes les secondes
    setInterval(updateCountdown, 1000);
    
    // Mise à jour immédiate
    updateCountdown();
}

// Fonction pour le menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }
}

// Fonction pour les onglets du programme
function initProgramTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Masquer tous les contenus de jour
            const dayPrograms = document.querySelectorAll('.day-program');
            dayPrograms.forEach(program => {
                program.classList.remove('active');
            });
            
            // Afficher le contenu du jour correspondant
            const day = button.getAttribute('data-day');
            document.getElementById(`day-${day}`).classList.add('active');
        });
    });
}

// Fonction pour les animations au scroll
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('[data-animation]');
    
    function checkIfInView() {
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Vérifier si l'élément est visible dans la fenêtre
            if (elementPosition.top < windowHeight * 0.85) {
                const animation = element.getAttribute('data-animation');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add(animation);
                    element.classList.add('animated');
                }, delay);
            }
        });
    }
    
    // Vérifier lors du défilement
    window.addEventListener('scroll', checkIfInView);
    
    // Vérifier au chargement de la page
    checkIfInView();
}

// Fonction pour changer la navigation au scroll
function initScrollHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Fonction pour les filtres de galerie
function initGalleryFilters() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            tab.classList.add('active');
            
            // Filtrer les éléments de la galerie
            const category = tab.getAttribute('data-tab');
            
            if (category === 'all') {
                galleryItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                galleryItems.forEach(item => {
                    if (item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
}

// Bouton retour en haut
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animation des éléments du programme
function initProgramAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
}

// Initialiser toutes les fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initMobileMenu();
    initProgramTabs();
    initScrollAnimations();
    initScrollHeader();
    initGalleryFilters();
    initBackToTop();
    initProgramAnimation();
}); 