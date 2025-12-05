// Simple script to generate PWA icons
// This requires canvas package: npm install canvas
// Or you can use an online tool to convert SVG to PNG

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const createIconSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#646cff"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.3}" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">RH</text>
</svg>`;

// For now, we'll create SVG files
// You can convert them to PNG using an online tool or ImageMagick
const publicDir = path.join(__dirname, '..', 'public');

// Create SVG icons (will need to be converted to PNG)
const icon192 = createIconSVG(192);
const icon512 = createIconSVG(512);

fs.writeFileSync(path.join(publicDir, 'icon-192x192.svg'), icon192);
fs.writeFileSync(path.join(publicDir, 'icon-512x512.svg'), icon512);

console.log('SVG icons created. Please convert to PNG:');
console.log('icon-192x192.svg -> icon-192x192.png');
console.log('icon-512x512.svg -> icon-512x512.png');
console.log('You can use an online tool like https://cloudconvert.com/svg-to-png');

