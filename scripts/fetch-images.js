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

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
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
