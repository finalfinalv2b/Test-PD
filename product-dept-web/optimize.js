const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths relative to product-dept-web
const inDir = path.join(__dirname, 'public/frames');
const outDir = path.join(__dirname, 'public/frames-mobile');

// Create mobile out directory if not exist
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function optimize() {
    console.log('Initiating Mobile Frame Downscaling...');
    const files = fs.readdirSync(inDir).filter(f => f.endsWith('.jpg'));
    console.log(`Found ${files.length} native frames for compression.`);
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputPath = path.join(inDir, file);
        // Ensure webp filename
        const newFilename = file.replace('.jpg', '.webp');
        const outputPath = path.join(outDir, newFilename);
        
        await sharp(inputPath)
            .resize({ width: 600 })
            .webp({ quality: 65 })
            .toFile(outputPath);
            
        if (i % 25 === 0) {
            console.log(`[${i}/${files.length}] Processed...`);
        }
    }
    
    console.log('Mobile frame compression complete!');
}

optimize().catch(console.error);
