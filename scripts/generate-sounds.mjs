import fs from 'fs/promises';

const files = await fs.readdir('./public/sounds');
const output = `export const soundFiles = ${JSON.stringify(files)};`;

// Create the directory if it doesn't exist
await fs.mkdir('./generated', { recursive: true });
await fs.writeFile('./generated/sounds.ts', output);
console.log('Sound list generated:', files);