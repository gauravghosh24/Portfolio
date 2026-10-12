import { mkdir, cp, access } from 'node:fs/promises';
await access('public/index.html');
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
console.log('Built static portfolio in dist/');
