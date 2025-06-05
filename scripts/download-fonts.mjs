import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
fs.mkdirSync(fontsDir, { recursive: true });

const fonts = [
  {
    url: 'https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2',
    name: 'Satoshi-400.woff2'
  },
  {
    url: 'https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2',
    name: 'Satoshi-500.woff2'
  },
  {
    url: 'https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2',
    name: 'Satoshi-700.woff2'
  }
];

function download(url, dest) {
  execSync(`curl -fLo ${dest} --create-dirs ${url}`);
}

(async () => {
  for (const font of fonts) {
    const destPath = path.join(fontsDir, font.name);
    if (fs.existsSync(destPath)) continue;
    console.log(`Downloading ${font.name}...`);
    download(font.url, destPath);
  }
})();
