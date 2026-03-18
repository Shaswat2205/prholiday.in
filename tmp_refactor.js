const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk('c:/Users/shasw/prholiday.in/prholiday.in/client/src');
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Replace single quotes 'http://localhost:5000/...' with `${import.meta.env.VITE_API_URL}/...`
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, "`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");
    
    // Replace double quotes "http://localhost:5000/..." with `${import.meta.env.VITE_API_URL}/...`
    content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, "`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");

    // Replace ANY remaining default template literal embedded `http://localhost:5000` with exactly `${...}`
    // But be careful not to nest them if they're already transformed! 
    // To be safe, we only replace it if it's NOT part of the logic we just inserted.
    content = content.replace(/(?<!\$\{import\.meta\.env\.VITE_API_URL \|\| ')http:\/\/localhost:5000/g, "${import.meta.env.VITE_API_URL || 'http://localhost:5000'}");

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
        console.log('Updated', file);
    }
});
console.log(`Refactored ${count} files.`);
