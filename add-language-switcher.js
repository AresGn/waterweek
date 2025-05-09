const fs = require('fs');
const path = require('path');

// Liste des fichiers HTML à modifier
const htmlFiles = [
  'index.html',
  'call-papers.html',
  'contact.html',
  'gallery.html',
  'news.html',
  'partners.html',
  'practical-info.html',
  'program.html',
  'speakers.html',
  'themes.html'
];

// Code HTML du sélecteur de langue à ajouter
const languageSwitcherHTML = `
        <!-- Sélecteur de langue -->
        <div class="language-switch">
            <a href="#" data-lang="fr" class="active">FR</a>
            <span>|</span>
            <a href="#" data-lang="en">EN</a>
        </div>
    </nav>`;

// Référence au lien CSS à ajouter dans le head
const cssLinkHTML = `<link rel="stylesheet" href="css/language-switch.css">`;

// Fonction pour mettre à jour un fichier HTML
function updateFile(filePath) {
  try {
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Ajouter le sélecteur de langue avant la fermeture de la balise nav
    content = content.replace(
      /<\/nav>/,
      languageSwitcherHTML
    );
    
    // 2. Ajouter la référence CSS dans le head (avant la première balise </head>)
    if (!content.includes('language-switch.css')) {
      content = content.replace(
        /<\/head>/,
        `    ${cssLinkHTML}\n</head>`
      );
    }
    
    // Écrire les modifications dans le fichier
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fichier ${filePath} mis à jour avec succès`);
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de ${filePath}:`, error);
  }
}

// Traiter chaque fichier HTML
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    updateFile(filePath);
  } else {
    console.warn(`⚠️ Fichier ${file} introuvable`);
  }
});

console.log('Ajout du sélecteur de langue terminé!'); 