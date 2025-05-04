// i18n.js - Internationalization handler

// Default language
let currentLanguage = 'fr';

// Available languages
const languages = ['fr', 'en'];

// Load translations
const translations = {
    fr: {},
    en: {}
};

// Initialize i18n system
async function initI18n() {
    // Try to load browser language or fallback to French
    const browserLang = navigator.language.split('-')[0];
    currentLanguage = languages.includes(browserLang) ? browserLang : 'fr';
    
    // Retrieve language from localStorage if available
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang && languages.includes(storedLang)) {
        currentLanguage = storedLang;
    }
    
    // Load translation files
    try {
        for (const lang of languages) {
            const response = await fetch(`locales/${lang}.json`);
            translations[lang] = await response.json();
        }
        
        // Apply translations
        translatePage();
        
        // Setup language switchers
        setupLanguageSwitchers();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Apply translations to the page
function translatePage() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Set active class on language switcher
    document.querySelectorAll('.language-switch a').forEach(el => {
        if (el.getAttribute('data-lang') === currentLanguage) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translations[currentLanguage][key];
            } else if (element.tagName === 'IMG') {
                element.alt = translations[currentLanguage][key];
            } else {
                element.innerHTML = translations[currentLanguage][key];
            }
        }
    });
    
    // Translate all elements with data-i18n-attr (for attributes like titles, placeholders)
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
        const data = element.getAttribute('data-i18n-attr').split(',');
        data.forEach(item => {
            const [attr, key] = item.trim().split(':');
            if (attr && key && translations[currentLanguage][key]) {
                element.setAttribute(attr, translations[currentLanguage][key]);
            }
        });
    });
    
    // Update URLs for language-specific resources
    document.querySelectorAll('[data-i18n-href]').forEach(element => {
        const base = element.getAttribute('data-i18n-href');
        const langPrefix = currentLanguage === 'fr' ? '' : 'en-';
        element.href = `${langPrefix}${base}`;
    });
}

// Set up language switchers
function setupLanguageSwitchers() {
    document.querySelectorAll('.language-switch a').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang && languages.includes(lang) && lang !== currentLanguage) {
                // Save preference
                localStorage.setItem('preferred-language', lang);
                currentLanguage = lang;
                
                // Apply translations
                translatePage();
            }
        });
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initI18n); 