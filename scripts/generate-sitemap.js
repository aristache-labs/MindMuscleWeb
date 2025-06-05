const fs = require('fs');
const path = require('path');

const baseUrl = process.env.SITE_URL || 'https://localhost';
const routes = ['/', '/privacy', '/terms'];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map(route => `  <url><loc>${baseUrl}${route}</loc></url>`).join('\n') +
  '\n</urlset>\n';

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml);
console.log(`Sitemap generated at ${outputPath}`);

