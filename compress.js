import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'certificates');

async function processImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace('.png', '.webp'));
      
      console.log(`Compressing ${file}...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .resize({ width: 1200, withoutEnlargement: true })
        .toFile(outputPath);
        
      console.log(`Saved ${outputPath}`);
      // Remove original
      fs.unlinkSync(inputPath);
    }
  }
}

processImages().catch(console.error);
