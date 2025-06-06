import fs from 'fs';
import path from 'path';

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Copy all files and subdirectories
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    // Copy file
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

async function copyPublicFolder() {
  console.log('📁 Copying public folder to build output...');

  const publicDir = path.join(process.cwd(), 'public');
  const buildDir = path.join(process.cwd(), '.next');

  if (fs.existsSync(publicDir)) {
    // Copy public folder contents to .next directory
    fs.readdirSync(publicDir).forEach(function(item) {
      const srcPath = path.join(publicDir, item);
      const destPath = path.join(buildDir, item);
      
      copyRecursiveSync(srcPath, destPath);
      console.log(`✅ Copied ${item} to build output`);
    });
    
    console.log('🎉 Public folder copied successfully!');
  } else {
    console.log('⚠️  Public folder not found');
  }
}

// Run the function directly
copyPublicFolder().catch(console.error);

export { copyPublicFolder }; 