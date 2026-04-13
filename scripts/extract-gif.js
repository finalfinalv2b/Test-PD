const fs = require('fs');
const path = require('path');
const gifFrames = require('gif-frames');
const sharp = require('sharp');

const gifPath = path.join(__dirname, '../assets/Tiny_world_rotates_202604122042-ezgif.com-video-to-gif-converter.gif');
const outDir = path.join(__dirname, '../product-dept-web/public/hero-sequence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Extracting frames from', gifPath, '...');

gifFrames({ url: gifPath, frames: 'all', outputType: 'jpg', cumulative: true })
  .then(async function (frameData) {
    console.log(`Extracted ${frameData.length} frames.`);
    for (let i = 0; i < frameData.length; i++) {
        const _frame = frameData[i];
        const stream = _frame.getImage();
        // Zero pad the frame number
        const frameNum = i.toString().padStart(4, '0');
        const outputPath = path.join(outDir, `frame-${frameNum}.webp`);
        
        // We pipe the stream through sharp to quickly convert to optimized webp (better for performance)
        await new Promise((resolve, reject) => {
            stream
                .pipe(sharp().webp({ quality: 60 }))
                .pipe(fs.createWriteStream(outputPath))
                .on('close', resolve)
                .on('error', reject);
        });
        
        if (i % 20 === 0) console.log(`Processed frame ${i}/${frameData.length}`);
    }
    console.log('Extraction sequence fully generated!.');
  })
  .catch((err) => {
      console.error("Error extracting gif:", err)
  });
