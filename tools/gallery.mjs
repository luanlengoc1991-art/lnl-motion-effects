// Trang thư viện (index.html, chạy được trên GitHub Pages) + README.md từ effects.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEMES } from './build.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fx = JSON.parse(fs.readFileSync(path.join(ROOT, 'effects.json'), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const groups = [...new Set(fx.map((e) => e.group))];

const cards = fx.map((e) => `<article data-g="${esc(e.group)}" data-q="${esc((e.name + ' ' + e.desc + ' ' + e.use + ' ' + e.slug).toLowerCase())}">
  <video src="effects/${e.slug}/preview.mp4" poster="effects/${e.slug}/poster.jpg" muted loop playsinline preload="none"></video>
  <div class="b"><span class="g">${esc(e.group)} · ${e.duration}s</span><h3>${esc(e.name)}</h3><p>${esc(e.desc)}</p><p class="u">Dùng khi: ${esc(e.use)}</p>
  <div class="a"><a href="effects/${e.slug}/compositions/fx.html">Mã cảnh</a><a href="effects/${e.slug}/spec.md">Hướng dẫn</a><a href="effects/${e.slug}/preview.mp4" download>Tải video mẫu</a></div></div>
</article>`).join('\n');

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>LNL Motion Effects · Bộ hiệu ứng HyperFrames</title>
<meta name="description" content="Bộ hiệu ứng motion graphic dựng bằng HyperFrames + GSAP, chữ tiếng Việt, 4 bộ màu, mỗi hiệu ứng là một dự án chạy ngay.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;font-family:"Be Vietnam Pro",system-ui,sans-serif;background:#0e1116;color:#f5f3ee}
header{padding:56px 6vw 28px}h1{margin:0;font-size:clamp(34px,5vw,64px);font-weight:800;letter-spacing:-.02em}h1 b{color:#ff6b3d}
.sub{color:#8a93a1;max-width:720px;margin:14px 0 0;line-height:1.6}
.bar{position:sticky;top:0;z-index:2;display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:14px 6vw;background:#0e1116e6;backdrop-filter:blur(10px);border-bottom:1px solid #222832}
.bar button{border:1px solid #2a313b;background:#171b22;color:#f5f3ee;border-radius:999px;padding:8px 16px;font:600 13px inherit;cursor:pointer}.bar button.on{background:#ff6b3d;border-color:#ff6b3d;color:#111}
.bar input{margin-left:auto;min-width:240px;background:#171b22;border:1px solid #2a313b;border-radius:999px;color:#fff;padding:10px 16px;font:14px inherit}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:22px;padding:28px 6vw 70px}
article{background:#171b22;border:1px solid #232a33;border-radius:20px;overflow:hidden}video{display:block;width:100%;aspect-ratio:16/9;background:#000}
.b{padding:16px 18px 18px}.g{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffc857}
h3{margin:6px 0 6px;font-size:18px}p{margin:0 0 8px;font-size:14px;line-height:1.5;color:#aab2bf}.u{color:#8a93a1;font-size:13px}
.a{display:flex;flex-wrap:wrap;gap:14px;margin-top:10px}.a a{color:#ff8a63;font-size:13px;font-weight:600;text-decoration:none}.a a:hover{text-decoration:underline}
footer{padding:0 6vw 40px;color:#8a93a1;font-size:13px}
</style></head><body>
<header><h1>LNL <b>Motion</b> Effects</h1><p class="sub">${fx.length} hiệu ứng motion graphic dựng bằng HyperFrames + GSAP, chữ tiếng Việt, 4 bộ màu. Mỗi hiệu ứng là một dự án HyperFrames chạy ngay: tải thư mục về, sửa chữ, <code>npx hyperframes render</code>.</p></header>
<div class="bar"><button class="on" data-f="">Tất cả</button>${groups.map((g) => `<button data-f="${esc(g)}">${esc(g)}</button>`).join('')}<input id="q" placeholder="Tìm: số liệu, chat, logo…" aria-label="Tìm hiệu ứng"></div>
<main>
${cards}
</main>
<footer>© ${new Date().getFullYear()} LNL Motion Effects. Mã nguồn: <a style="color:#ff8a63" href="https://github.com/luanlengoc1991-art/lnl-motion-effects">GitHub</a>.</footer>
<script>
const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.preload="auto";v.play().catch(()=>{})}else v.pause()}),{rootMargin:"120px"});
document.querySelectorAll("video").forEach(v=>io.observe(v));
let g="";const apply=()=>{const s=q.value.trim().toLowerCase();document.querySelectorAll("article").forEach(a=>{a.hidden=(g&&a.dataset.g!==g)||(s&&!a.dataset.q.includes(s))})};
document.querySelectorAll(".bar button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".bar button").forEach(x=>x.classList.toggle("on",x===b));g=b.dataset.f;apply()});
q.oninput=apply;
</script></body></html>`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);

const md = [`# LNL Motion Effects`, '',
  `${fx.length} hiệu ứng motion graphic dựng bằng **HyperFrames + GSAP**, chữ tiếng Việt (Be Vietnam Pro), 4 bộ màu dựng sẵn. Tự thiết kế và viết mới.`, '',
  'Xem online: https://luanlengoc1991-art.github.io/lnl-motion-effects/', '',
  '## Dùng một hiệu ứng', '```sh', 'cd effects/<ten-hieu-ung>', 'npx hyperframes preview   # xem, sửa trực tiếp', 'npx hyperframes render    # xuất MP4 1920x1080', '```',
  'Chữ có `data-var-text` sửa trong `compositions/fx.html`; màu là 6 biến trong `#root` của `index.html` (bảng màu ở `spec.md` từng hiệu ứng).', '',
  '## Thêm hiệu ứng', 'Viết thêm một mục trong `tools/effects.mjs`, rồi `node tools/build.mjs` (sinh dự án), kiểm tra bằng `npx hyperframes check`, render `preview.mp4` / `poster.jpg`, và `node tools/gallery.mjs` (trang thư viện + README).', '',
  ...groups.flatMap((g) => [`## ${g}`, '', '| Xem trước | Hiệu ứng | Thời lượng |', '|---|---|---|',
    ...fx.filter((e) => e.group === g).map((e) => `| [<img src="effects/${e.slug}/poster.jpg" width="260">](effects/${e.slug}/preview.mp4) | **[${e.name}](effects/${e.slug}/)**<br>${e.desc}<br><sub>Dùng khi: ${e.use}</sub> | ${e.duration}s |`), '']),
  '## Bộ màu', '', '| Bộ | Nền | Nhấn | Nhấn 2 |', '|---|---|---|---|', ...Object.values(THEMES).map((t) => `| ${t.name} | ${t.bg} | ${t.accent} | ${t.accent2} |`), '',
  '## Giấy phép', 'Mã nguồn theo giấy phép MIT (xem `LICENSE`). Phông Be Vietnam Pro và JetBrains Mono theo SIL Open Font License.', ''];
fs.writeFileSync(path.join(ROOT, 'README.md'), md.join('\n'));
console.log('index.html + README.md:', fx.length, 'hiệu ứng');
