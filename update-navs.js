const fs = require('fs');
const path = require('path');

// Directory to search for HTML files
const baseDir = './';

// Nouveau header à ajouter
const newHeader = `<header class="site-header">
    <div class="site-logo">
        <img src="https://sbpe.bj/img/logos-liens-utiles/logo-gouv.png" alt="C2EA">
        <img src="https://bouba.mondoblog.org/files/2014/11/bouba.mondoblog.org_.png" alt="C2EA">
        <img src="https://i.ibb.co/8nLpXxbm/Logo-INE.png" alt="Water Week Logo">
        <img src="https://i.ibb.co/rGL6BZs2/logo-C2-EA.png" alt="C2EA">
    </div>
    
    <button class="menu-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    
    <nav class="site-nav">
        <ul class="nav-list">
            <li class="nav-item">
                <a href="index.html" class="nav-link" data-i18n="nav_home">Accueil</a>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0);" class="nav-link has-dropdown" data-i18n="nav_program">Programme</a>
                <div class="dropdown-menu">
                    <a href="themes.html" class="dropdown-item" data-i18n="nav_topics">Thématique</a>
                    <a href="panelistes.html" class="dropdown-item">Panélistes</a>
                    <a href="call-papers.html" class="dropdown-item" data-i18n="nav_call_papers">Appel à communications</a>
                    <a href="call-stands.html" class="dropdown-item" data-i18n="nav_call_stands">Appel à Stands</a>
                    <a href="program.html" class="dropdown-item" data-i18n="nav_program">Programme</a>
                    <a href="speakers.html" class="dropdown-item" data-i18n="nav_speakers">Intervenants</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0);" class="nav-link has-dropdown" data-i18n="nav_info_media">Infos & Médias</a>
                <div class="dropdown-menu">
                    <a href="practical-info.html" class="dropdown-item" data-i18n="nav_practical_info">Infos pratiques</a>
                    <a href="partners.html" class="dropdown-item" data-i18n="nav_partners">Partenaires</a>
                    <a href="news.html" class="dropdown-item" data-i18n="nav_news">Actualités</a>
                    <a href="gallery.html" class="dropdown-item" data-i18n="nav_gallery">Galerie</a>
                    <a href="contact.html" class="dropdown-item" data-i18n="nav_contact">Contact</a>
                </div>
            </li>
        </ul>
        
        <div class="language-switch">
            <a href="#" data-lang="fr" class="active">FR</a>
            <span>|</span>
            <a href="#" data-lang="en">EN</a>
        </div>
    </nav>
</header>`;

// Fonction pour modifier un fichier HTML
function updateFile(filePath) {
  try {
    console.log(`Traitement du fichier: ${filePath}`);
    
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Ajouter la référence au CSS de la nouvelle navbar
    content = content.replace(
      /<link rel="stylesheet" href="css\/mobile-menu.css">/,
      '<link rel="stylesheet" href="css/new-nav.css">'
    );
    
    // 2. Ajouter le lien vers le CSS du sélecteur de langue
    if (!content.includes('language-switch.css')) {
      content = content.replace(
        /<link rel="stylesheet" href="css\/new-nav.css">/,
        '<link rel="stylesheet" href="css/new-nav.css">\n    <link rel="stylesheet" href="css/language-switch.css">'
      );
    }
    
    // 3. Remplacer l'entête existant
    const headerRegex = /<header.*?<\/header>/s;
    content = content.replace(headerRegex, newHeader);
    
    // 4. Supprimer le code JS pour le menu mobile
    const mobileMenuJSRegex = /\/\/ Menu mobile[\s\S]*?nav\.classList\.toggle\('active'\);[\s\S]*?\}\);/;
    content = content.replace(mobileMenuJSRegex, '');
    
    // 5. Ajouter la référence au nouveau script de navigation
    if (!content.includes('new-nav.js')) {
      content = content.replace(
        /<\/body>/,
        '    <script src="js/new-nav.js"></script>\n</body>'
      );
    }
    
    // Écrire les modifications dans le fichier
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fichier ${filePath} mis à jour avec succès`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de ${filePath}:`, error);
    return false;
  }
}

// Liste des fichiers HTML à modifier
const htmlFiles = [
  'index.html',
  'call-papers.html',
  'call-stands.html',
  'contact.html',
  'gallery.html',
  'news.html',
  'partners.html',
  'practical-info.html',
  'program.html',
  'speakers.html',
  'themes.html',
  'panelistes.html'
];

// Traiter chaque fichier
let successCount = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    if (updateFile(filePath)) {
      successCount++;
    }
  } else {
    console.warn(`⚠️ Fichier ${file} introuvable`);
  }
});

console.log(`Mise à jour terminée: ${successCount}/${htmlFiles.length} fichiers modifiés avec succès.`); 