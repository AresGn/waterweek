// Script pour améliorer le fonctionnement du sélecteur de langue
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du sélecteur de langue
    const languageSwitcher = document.querySelector('.language-switch');
    const langButtons = document.querySelectorAll('.language-switch a');
    
    if (!languageSwitcher || !langButtons.length) return;
    
    // S'assurer que le sélecteur maintient son état actif
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Stocker la langue sélectionnée
            const lang = this.getAttribute('data-lang');
            if (!lang) return;
            
            // Mettre à jour l'état visuel
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Si le système i18n est déjà configuré, il prendra le relais
            // Sinon, on peut mettre à jour manuellement l'attribut lang
            document.documentElement.lang = lang;
        });
    });
}); 