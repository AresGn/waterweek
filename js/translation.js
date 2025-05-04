// Script pour gérer les traductions dynamiques
let translations = {};
let currentLanguage = localStorage.getItem('language') || 'fr';

// Fonction pour charger les traductions depuis le fichier JSON
async function loadTranslations() {
    try {
        console.log('Tentative de chargement des traductions...');
        // Essayons différents chemins pour le fichier JSON
        let response;
        let attemptedPaths = [];
        
        // Premier essai: chemin relatif standard
        const paths = ['translations.json', '/translations.json', './translations.json', '../translations.json'];
        
        // Essayer chaque chemin jusqu'à ce qu'un fonctionne
        for (const path of paths) {
            try {
                attemptedPaths.push(path);
                console.log(`Tentative de chargement depuis: ${path}`);
                response = await fetch(path);
                if (response.ok) {
                    console.log(`Succès avec le chemin: ${path}`);
                    break;
                }
            } catch (e) {
                console.log(`Échec avec le chemin: ${path}`, e);
            }
        }
        
        if (!response || !response.ok) {
            throw new Error(`Erreur HTTP: Impossible de charger les traductions depuis les chemins: ${attemptedPaths.join(', ')}`);
        }
        
        translations = await response.json();
        console.log('Traductions chargées avec succès:', translations);
        
        // Vérification de base pour s'assurer que le format est correct
        if (!translations.navigation || !translations.navigation.fr) {
            console.error('Format de fichier de traduction invalide:', translations);
            throw new Error('Format de fichier de traduction invalide');
        }
        
        applyTranslations();
        updateLanguageSwitch();
    } catch (error) {
        console.error('Erreur lors du chargement des traductions:', error);
        // Afficher l'erreur de manière plus visible pour le débogage
        // À commenter en production
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '0';
        errorDiv.style.left = '0';
        errorDiv.style.right = '0';
        errorDiv.style.backgroundColor = 'red';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '10px';
        errorDiv.style.zIndex = '9999';
        errorDiv.textContent = 'Erreur de traduction: ' + error.message;
        document.body.appendChild(errorDiv);
    }
}

// Fonction pour changer de langue
function changeLanguage(lang) {
    console.log('Changement de langue vers:', lang);
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
    updateLanguageSwitch();
    
    // Mettre à jour l'attribut lang du document HTML
    document.documentElement.lang = lang;
    
    // Mise à jour du titre et des meta tags
    if (translations.meta && translations.meta[lang]) {
        document.title = translations.meta[lang].title;
        
        // Mettre à jour les meta tags
        let metaDescription = document.querySelector('meta[name="description"]');
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        
        if (metaDescription) metaDescription.content = translations.meta[lang].description;
        if (metaKeywords) metaKeywords.content = translations.meta[lang].keywords;
    }
}

// Fonction pour appliquer les traductions sur la page
function applyTranslations() {
    console.log('Application des traductions, langue actuelle:', currentLanguage);
    if (!translations || Object.keys(translations).length === 0) {
        console.error('Aucune traduction disponible');
        return;
    }
    
    // Compter le nombre d'éléments traduits pour le débogage
    let translatedCount = 0;
    let failedCount = 0;
    
    // Traduire les éléments avec data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const parts = key.split('.');
        
        let value = translations;
        let found = true;
        
        for (const part of parts) {
            if (value && value[part]) {
                value = value[part];
            } else {
                found = false;
                console.warn(`Partie de clé non trouvée: ${part} dans ${key}`);
                break;
            }
        }
        
        if (found && value && value[currentLanguage]) {
            if (typeof value[currentLanguage] === 'string') {
                element.textContent = value[currentLanguage];
                translatedCount++;
            } else if (value[currentLanguage].title) {
                element.textContent = value[currentLanguage].title;
                translatedCount++;
            } else {
                console.warn(`Format inattendu pour la clé: ${key}`);
                failedCount++;
            }
        } else {
            console.warn(`Traduction non trouvée pour la clé: ${key}`, value);
            failedCount++;
        }
    });
    
    console.log(`${translatedCount} éléments traduits avec succès, ${failedCount} échecs`);
    
    // Traduire les attributs (comme placeholder, alt, etc.)
    document.querySelectorAll('[data-translate-attr]').forEach(element => {
        const data = element.getAttribute('data-translate-attr').split(':');
        if (data.length === 2) {
            const attr = data[0];
            const key = data[1];
            const parts = key.split('.');
            
            let value = translations;
            for (const part of parts) {
                if (value && value[part]) {
                    value = value[part];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value && value[currentLanguage]) {
                element.setAttribute(attr, value[currentLanguage]);
            }
        }
    });
    
    // Mettre à jour l'attribut lang du document HTML
    document.documentElement.lang = currentLanguage;
    
    // Mise à jour des meta tags pour le SEO
    updateMetaTags(currentLanguage);
}

// Mettre à jour les boutons de changement de langue
function updateLanguageSwitch() {
    console.log('Mise à jour des boutons de langue');
    const langButtons = document.querySelectorAll('.language-switch a');
    langButtons.forEach(button => {
        button.classList.remove('active');
        const lang = button.getAttribute('data-lang');
        if (lang === currentLanguage) {
            button.classList.add('active');
        }
    });
}

// Mise à jour des meta tags pour le SEO
function updateMetaTags(lang) {
    if (translations.meta && translations.meta[lang]) {
        // Titre de la page
        if (translations.meta[lang].title) {
            document.title = translations.meta[lang].title;
        }
        
        // Description
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta && translations.meta[lang].description) {
            descriptionMeta.setAttribute('content', translations.meta[lang].description);
        }
        
        // Mots-clés
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta && translations.meta[lang].keywords) {
            keywordsMeta.setAttribute('content', translations.meta[lang].keywords);
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation des traductions');
    // Charger les traductions
    loadTranslations();
    
    // Ajouter les écouteurs d'événements pour les boutons de langue
    document.querySelectorAll('.language-switch a').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            console.log('Clic sur le bouton de langue:', lang);
            changeLanguage(lang);
        });
    });
});
