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

// Référence au CSS à ajouter
const cssLinkHTML = `<link rel="stylesheet" href="css/menu-fixes.css">`;

// Fonction pour mettre à jour un fichier HTML
function updateFile(filePath) {
  try {
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Ajouter le lien vers le CSS si pas déjà présent
    if (!content.includes('menu-fixes.css')) {
      content = content.replace(
        /<link rel="stylesheet" href="css\/language-switch.css">/,
        `<link rel="stylesheet" href="css/language-switch.css">\n    ${cssLinkHTML}`
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

// Traiter chaque fichier HTML
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