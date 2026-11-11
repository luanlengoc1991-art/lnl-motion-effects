// Thư mục dist/ cho Cloudflare: trang thư viện + video, ảnh bìa, mã cảnh, hướng dẫn của từng hiệu ứng.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
fs.rmSync(DIST, { recursive: true, force: true });
const cp = (rel) => { const to = path.join(DIST, rel); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(path.join(ROOT, rel), to); };
['index.html', '404.html', '_headers'].forEach(cp);
let n = 0;
for (const slug of fs.readdirSync(path.join(ROOT, 'effects'))) {
  for (const f of ['preview.mp4', 'poster.jpg', 'spec.md', 'index.html', 'compositions/fx.html']) { cp(`effects/${slug}/${f}`); n++; }
}
console.log('dist:', n + 3, 'tệp');
