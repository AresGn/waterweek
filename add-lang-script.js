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

// Référence au script à ajouter
const scriptTagHTML = `<script src="js/language-switcher.js"></script>`;

// Fonction pour mettre à jour un fichier HTML
function updateFile(filePath) {
  try {
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Ajouter le script avant la fermeture </body>
    if (!content.includes('language-switcher.js')) {
      content = content.replace(
        /<\/body>/,
        `    ${scriptTagHTML}\n</body>`
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

console.log('Ajout du script language-switcher.js terminé!'); 