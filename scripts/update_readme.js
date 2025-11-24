const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, '..', 'README.md');
const readme = fs.readFileSync(readmePath, 'utf8');

// Use Europe/Paris time
const options = { timeZone: 'Europe/Paris', hour: 'numeric', hour12: false };
const formatter = new Intl.DateTimeFormat([], options);
const hour = parseInt(formatter.format(new Date()));

let banner = 'night.svg'; // Default

if (hour >= 7 && hour < 12) {
    banner = 'morning.svg';
} else if (hour >= 12 && hour < 17) {
    banner = 'afternoon.svg';
} else if (hour >= 17 && hour < 22) {
    banner = 'sunset.svg';
} else {
    banner = 'night.svg';
}

const newSrc = `./banner/${banner}`;
console.log(`Current hour (Paris): ${hour}. Setting banner to: ${newSrc}`);

// Replace the existing banner image source
// Matches src="./github-banner.svg" or src="./banner/xyz.svg"
const updatedReadme = readme.replace(
    /src="\.\/?(github-banner\.svg|banner\/[^"]+\.svg)"/,
    `src="${newSrc}"`
);

fs.writeFileSync(readmePath, updatedReadme);
console.log('README.md updated successfully.');

