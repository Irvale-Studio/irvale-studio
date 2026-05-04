import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.resolve('public/images/projects');

const files = await readdir(DIR);
const newPngs = files.filter(
  (f) =>
    f.endsWith('.png') &&
    /^(crystal|reya|dynamic|commu|realspace-marketing-v2|zatrovo)/.test(f)
);

for (const f of newPngs) {
  const src = path.join(DIR, f);
  const dst = src.replace(/\.png$/, '.webp');
  await sharp(src).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dst);
  await unlink(src);
  console.log(`${f} -> ${path.basename(dst)}`);
}
console.log('done');
