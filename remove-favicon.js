const fs = require('fs');
const path = require('path');

const faviconPath = path.join(__dirname, 'src', 'app', 'favicon.ico');

try {
  if (fs.existsSync(faviconPath)) {
    fs.unlinkSync(faviconPath);
    console.log('✓ Removed Next.js default favicon');
  } else {
    console.log('✓ Favicon already removed');
  }
} catch (error) {
  console.error('Error:', error.message);
}
