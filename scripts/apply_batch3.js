const fs = require('fs');
const results = require('./results-batch3.json');

let content = fs.readFileSync('script.js', 'utf8');

const missing = [];
const updated = [];

for (const r of results) {
  const re = new RegExp('\\{ id: ' + r.id + ', name: "[^"]*", lat: [^,]+, lng: [^}]+ \\}');
  const match = content.match(re);
  if (!match) {
    missing.push(r);
    continue;
  }
  const oldStr = match[0];
  const nameMatch = oldStr.match(/name: "([^"]*)"/);
  const name = nameMatch ? nameMatch[1] : '???';
  const newStr = `{ id: ${r.id}, name: "${name}", lat: ${r.lat}, lng: ${r.lng} }`;
  content = content.replace(oldStr, newStr);
  updated.push({ id: r.id, name, oldStr, newStr });
}

fs.writeFileSync('script.js', content, 'utf8');

console.log('Updated:', updated.length);
updated.forEach(u => console.log(' ', u.id, u.name, '->', u.newStr));
console.log('Missing:', missing.length);
missing.forEach(m => console.log('  MISSING:', m.id, m.name));
