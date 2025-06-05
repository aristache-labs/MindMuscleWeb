const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { url: 'https://picsum.photos/id/237/1200/630', file: 'public/images/og-image.png' },
  { url: 'https://picsum.photos/id/1011/800/450.webp', file: 'public/images/screenshot1.webp' },
  { url: 'https://picsum.photos/id/1015/800/450.webp', file: 'public/images/screenshot2.webp' },
  { url: 'https://picsum.photos/id/1016/800/450.webp', file: 'public/images/screenshot3.webp' },
  { url: 'https://picsum.photos/id/1020/800/450.webp', file: 'public/images/screenshot4.webp' },
];

function download(url, dest, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    function makeRequest(currentUrl, redirectsLeft) {
      const protocol = currentUrl.startsWith('https:') ? https : require('http');
      
      protocol.get(currentUrl, res => {
        // Handle redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirectsLeft <= 0) {
            reject(new Error('Too many redirects'));
            return;
          }
          console.log(`Following redirect to: ${res.headers.location}`);
          makeRequest(res.headers.location, redirectsLeft - 1);
          return;
        }
        
        // Handle successful response
        if (res.statusCode === 200) {
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
          return;
        }
        
        // Handle error responses
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
      }).on('error', err => {
        fs.unlink(dest, () => reject(err));
      });
    }
    
    makeRequest(url, maxRedirects);
  });
}

(async () => {
  for (const { url, file } of images) {
    const dir = path.dirname(file);
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Downloading ${url} -> ${file}`);
    await download(url, file);
  }
})();
