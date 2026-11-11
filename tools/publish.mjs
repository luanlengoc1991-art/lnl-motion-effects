// Đăng thay đổi của thư viện lên web (và qua đó tới mọi máy cài LNL Frames Studio) bằng một lệnh:
//   node tools/publish.mjs "Thêm hiệu ứng X"
// 1. Sinh dự án từ tools/effects*.mjs (hiệu ứng đã xoá khỏi danh sách thì xoá thư mục).
// 2. Hiệu ứng mới hoặc vừa sửa: hyperframes check (lỗi thì dừng, không đăng) rồi render lại video mẫu + ảnh bìa.
// 3. Trang thư viện, dist/, zip + api/effects.json (mã phiên bản theo nội dung), deploy Cloudflare.
// 4. Kiểm tra trên web thật: số hiệu ứng khớp, mọi zip / video / ảnh tải được. Đạt thì commit + push.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://effects.luangroup.asia';
const HF = 'hyperframes@0.9.31';
const msg = process.argv.slice(2).join(' ').trim() || 'Cập nhật thư viện hiệu ứng';
const sh = (cmd, cwd = ROOT, quiet = false) => execSync(cmd, { cwd, stdio: quiet ? ['ignore', 'pipe', 'pipe'] : 'inherit', encoding: 'utf8', maxBuffer: 64 << 20 });
const step = (t) => console.log(`\n== ${t}`);
const python = () => {
  for (const c of ['python', 'py -3', 'python3']) { try { execSync(`${c} --version`, { stdio: 'ignore' }); return c; } catch { /* thử tiếp */ } }
  throw new Error('Cần Python 3 để đóng gói zip');
};

step('Sinh dự án');
sh('node tools/build.mjs');
const fx = JSON.parse(fs.readFileSync(path.join(ROOT, 'effects.json'), 'utf8'));

step('Kiểm tra và render hiệu ứng mới / vừa sửa');
const srcHash = (dir) => crypto.createHash('sha1').update(['index.html', 'compositions/fx.html'].map((f) => fs.readFileSync(path.join(dir, f))).join('\n')).digest('hex');
let rendered = 0;
for (const e of fx) {
  const dir = path.join(ROOT, 'effects', e.slug);
  const hash = srcHash(dir);
  const mark = path.join(dir, '.render-hash');
  if (fs.existsSync(path.join(dir, 'preview.mp4')) && fs.existsSync(mark) && fs.readFileSync(mark, 'utf8').trim() === hash) continue;
  const chk = JSON.parse(sh(`npx --yes ${HF} check --json`, dir, true));
  const errs = ['lint', 'runtime', 'layout', 'motion', 'contrast'].flatMap((k) => (chk[k]?.findings || []).filter((f) => f.severity === 'error').map((f) => `${k}:${f.code} ${f.selector || ''}`));
  if (errs.length) { console.error(`✗ ${e.slug} chưa đạt hyperframes check, không đăng:\n  ${errs.slice(0, 6).join('\n  ')}`); process.exit(1); }
  sh(`npx --yes ${HF} render -o full.mp4 --quality looks --quiet`, dir, true);
  const full = path.join(dir, 'full.mp4');
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', full, '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', path.join(dir, 'preview.mp4')]);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(e.duration * 0.72), '-i', full, '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '4', path.join(dir, 'poster.jpg')]);
  fs.rmSync(full, { force: true });
  fs.rmSync(path.join(dir, '.hyperframes'), { recursive: true, force: true });
  fs.writeFileSync(mark, hash);
  rendered++;
  console.log(`✓ ${e.slug}`);
}
console.log(`${rendered} hiệu ứng render lại, ${fx.length - rendered} giữ nguyên`);

step('Trang thư viện, dist, zip + danh mục');
sh('node tools/gallery.mjs');
sh('node tools/dist.mjs');
sh(`${python()} -I tools/pack.py`);

step('Deploy Cloudflare');
sh('npx --yes wrangler@4 deploy');

step('Kiểm tra trên web thật');
const local = JSON.parse(fs.readFileSync(path.join(ROOT, 'dist', 'api', 'effects.json'), 'utf8'));
let live = null;
for (let i = 0; i < 10; i++) {
  live = await fetch(`${SITE}/api/effects.json?t=${Date.now()}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null);
  if (live?.updated === local.updated) break;
  await new Promise((r) => setTimeout(r, 3000));
}
if (live?.updated !== local.updated) { console.error('✗ Web chưa nhận bản mới (api/effects.json chưa đổi)'); process.exit(1); }
const urls = live.effects.flatMap((e) => [e.zip, e.poster, e.preview]).concat(live.showcase.flatMap((s) => [s.video, s.poster]));
const bad = [];
const q = [...urls];
await Promise.all(Array.from({ length: 12 }, async () => { while (q.length) { const u = q.shift(); const r = await fetch(u, { method: 'HEAD' }).catch(() => null); if (r?.status !== 200) bad.push(u); } }));
if (bad.length) { console.error(`✗ ${bad.length} tệp không tải được:\n  ${bad.slice(0, 5).join('\n  ')}`); process.exit(1); }
console.log(`✓ ${live.count} hiệu ứng trên web, ${urls.length} tệp tải được`);

step('Commit + push');
sh('git add -A');
const changed = sh('git status --porcelain', ROOT, true).trim();
if (changed) {
  execFileSync('git', ['commit', '-q', '-m', `${msg}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`], { cwd: ROOT, stdio: 'inherit' });
  sh('git push -q origin main');
}
console.log(`\nXong: ${SITE} · app LNL Frames Studio tự nhận trong vòng 30 phút (hoặc khi mở Kho mẫu sau khi khởi động lại).`);
