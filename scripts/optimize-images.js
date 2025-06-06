import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

// Ensure optimized directory exists
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Image optimization configuration
const OPTIMIZATION_CONFIG = {
  // Responsive breakpoints
  sizes: [
    { width: 640, suffix: '-sm' },
    { width: 768, suffix: '-md' },
    { width: 1024, suffix: '-lg' },
    { width: 1280, suffix: '-xl' },
    { width: 1920, suffix: '-2xl' },
  ],
  // Output formats
  formats: ['webp', 'avif', 'jpg'],
  // Quality settings
  quality: {
    webp: 85,
    avif: 80,
    jpg: 90,
  },
};

async function optimizeImage(inputPath, outputDir, baseName) {
  console.log(`Optimizing: ${baseName}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate responsive sizes and formats
    for (const size of OPTIMIZATION_CONFIG.sizes) {
      // Skip if original is smaller than target size
      if (metadata.width && metadata.width < size.width) continue;
      
      for (const format of OPTIMIZATION_CONFIG.formats) {
        const outputName = `${baseName}${size.suffix}.${format}`;
        const outputPath = path.join(outputDir, outputName);
        
        await image
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .toFormat(format, {
            quality: OPTIMIZATION_CONFIG.quality[format],
            progressive: format === 'jpg',
            effort: format === 'avif' ? 6 : undefined,
          })
          .toFile(outputPath);
        
        console.log(`  Generated: ${outputName}`);
      }
    }
    
    // Generate low-quality placeholder (LQIP)
    const lqipPath = path.join(outputDir, `${baseName}-lqip.jpg`);
    await image
      .resize(20, null, { fit: 'inside' })
      .blur(1)
      .jpeg({ quality: 20 })
      .toFile(lqipPath);
    
    console.log(`  Generated LQIP: ${baseName}-lqip.jpg`);
    
  } catch (error) {
    console.error(`Error optimizing ${baseName}:`, error);
  }
}

async function optimizeAllImages() {
  console.log('Starting image optimization...');
  
  // Find all images in public directory
  const imageExtensions = ['.png', '.jpg', '.jpeg'];
  const files = fs.readdirSync(PUBLIC_DIR);
  
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });
  
  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to optimize.`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const baseName = path.parse(file).name;
    
    await optimizeImage(inputPath, OPTIMIZED_DIR, baseName);
  }
  
  // Generate image manifest
  const manifest = {
    generated: new Date().toISOString(),
    images: {},
  };
  
  const optimizedFiles = fs.readdirSync(OPTIMIZED_DIR);
  
  imageFiles.forEach(originalFile => {
    const baseName = path.parse(originalFile).name;
    const imageVariants = optimizedFiles.filter(file => 
      file.startsWith(baseName) && !file.includes('lqip')
    );
    
    manifest.images[baseName] = {
      original: originalFile,
      variants: imageVariants,
      lqip: `${baseName}-lqip.jpg`,
    };
  });
  
  fs.writeFileSync(
    path.join(OPTIMIZED_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Image optimization complete!');
  console.log(`Optimized images saved to: ${OPTIMIZED_DIR}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeAllImages().catch(console.error);
}

export { optimizeAllImages, optimizeImage }; 