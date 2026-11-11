// Sinh mỗi hiệu ứng thành một dự án HyperFrames độc lập trong effects/<slug>/ (index.html + compositions/fx.html + font + spec).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EFFECTS } from './effects.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = path.join(ROOT, 'tools', 'fonts');
export const THEMES = {
  'than-cam': { name: 'Than & cam san hô', bg: '#0e1116', card: '#171b22', fg: '#f5f3ee', muted: '#8a93a1', accent: '#ff6b3d', accent2: '#ffc857' },
  'dem-xanh': { name: 'Đêm xanh', bg: '#07101f', card: '#0f1d36', fg: '#f2f6ff', muted: '#8ea0c0', accent: '#4f8bff', accent2: '#7cf0d4' },
  'rung-xanh': { name: 'Rừng xanh', bg: '#0c1510', card: '#15231a', fg: '#f1f5ef', muted: '#8fa596', accent: '#5ed17e', accent2: '#e9d36a' },
  'giay-sang': { name: 'Giấy sáng', bg: '#f6f2ea', card: '#ffffff', fg: '#191714', muted: '#7d756a', accent: '#e8461f', accent2: '#2f6bff' },
};
const vars = (t) => `--bg:${t.bg};--card:${t.card};--fg:${t.fg};--muted:${t.muted};--accent:${t.accent};--accent2:${t.accent2}`;
const FONT_FACES = `@font-face{font-family:"BVP";src:url("assets/fonts/BeVietnamPro-Black.ttf");font-weight:900}
@font-face{font-family:"BVP";src:url("assets/fonts/BeVietnamPro-ExtraBold.ttf");font-weight:800}
@font-face{font-family:"BVP";src:url("assets/fonts/BeVietnamPro-SemiBold.ttf");font-weight:600 700}
@font-face{font-family:"JBM";src:url("assets/fonts/JetBrainsMono.ttf");font-weight:100 800}`;
// Hàm dùng chung của mọi cảnh (đều chỉ thêm tween vào tl, không hẹn giờ, không ngẫu nhiên).
const HELPERS = `const tl = gsap.timeline({ paused: true });
const $ = (s) => document.querySelector("#fx-wrap " + s) || document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll("#fx-wrap " + s));
function rise(sel, t, st = 0.1) { tl.fromTo(sel, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: st }, t); }
function pop(sel, t, st = 0.06) { tl.fromTo(sel, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)", stagger: st }, t); }
function count(sel, to, t, d = 1, dec = 0, pre = "", suf = "") { const el = $(sel); const o = { v: 0 }; tl.fromTo(o, { v: 0 }, { v: to, duration: d, ease: "power2.out", onUpdate: () => { el.textContent = pre + (dec ? o.v.toFixed(dec).replace(".", ",") : Math.round(o.v).toLocaleString("vi-VN")) + suf; } }, t); }
function out(sel, t) { tl.to(sel, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" }, t); }`;

function scene(e) {
  return `<template>
  <style>
${FONT_FACES}
#root{position:absolute;inset:0;overflow:hidden}
#fx-wrap{position:absolute;inset:0}
${e.css}
  </style>
  <div id="root" data-composition-id="fx" data-width="1920" data-height="1080">
    <div id="fx-wrap">
${e.html}
    </div>
  </div>
  <script>
    (function () {
${HELPERS}
${e.js}
      window.__timelines["fx"] = tl;
    })();
  </script>
</template>
`;
}

function root(e, theme = THEMES['than-cam']) {
  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>${e.name} · LNL Motion Effects</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #000; }
      /* Bảng màu: đổi 6 biến này (xem spec.md để có 4 bộ màu dựng sẵn). */
      #root { position: relative; width: 100%; height: 100%; ${vars(theme)}; }
      #bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 40%, color-mix(in srgb, var(--card) 70%, var(--bg)) 0%, var(--bg) 75%); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${e.duration}" data-width="1920" data-height="1080">
      <div id="bg"></div>
      <div id="fx-host" style="z-index:2" data-composition-id="fx" data-composition-src="compositions/fx.html" data-start="0" data-duration="${e.duration}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080"></div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.set({}, {}, ${e.duration});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
}

function spec(e) {
  const vs = [...new Set([...e.html.matchAll(/data-var-text="([^"]+)"/g)].map((m) => m[1]))];
  return `# ${e.name}

- Mã: \`${e.slug}\` · Nhóm: ${e.group} · Thời lượng: ${e.duration} giây · 1920×1080, 30 khung/giây
- Tác giả: LNL Motion Effects (tự thiết kế, viết mới)

## Hiệu ứng làm gì
${e.desc}

## Dùng khi
${e.use}

## Thay nội dung
${vs.length ? vs.map((v) => `- \`${v}\`: phần tử có \`data-var-text="${v}"\` trong \`compositions/fx.html\``).join('\n') : '- Chữ nằm trong `compositions/fx.html`.'}
- Số liệu, danh sách nằm đầu phần \`<script>\` của \`compositions/fx.html\`.

## Bảng màu
Đổi 6 biến trong \`#root\` của \`index.html\`:

| Bộ | --bg | --card | --fg | --muted | --accent | --accent2 |
|---|---|---|---|---|---|---|
${Object.values(THEMES).map((t) => `| ${t.name} | ${t.bg} | ${t.card} | ${t.fg} | ${t.muted} | ${t.accent} | ${t.accent2} |`).join('\n')}

## Chạy
\`\`\`sh
npx hyperframes preview     # xem trong trình duyệt
npx hyperframes render      # xuất MP4
\`\`\`
`;
}

for (const e of EFFECTS) {
  const dir = path.join(ROOT, 'effects', e.slug);
  fs.mkdirSync(path.join(dir, 'compositions'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'assets', 'fonts'), { recursive: true });
  for (const f of fs.readdirSync(FONTS)) fs.copyFileSync(path.join(FONTS, f), path.join(dir, 'assets', 'fonts', f));
  fs.writeFileSync(path.join(dir, 'index.html'), root(e));
  fs.writeFileSync(path.join(dir, 'compositions', 'fx.html'), scene(e));
  fs.writeFileSync(path.join(dir, 'spec.md'), spec(e));
  fs.writeFileSync(path.join(dir, 'hyperframes.json'), JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json', registry: 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry', paths: { blocks: 'compositions', components: 'compositions/components', assets: 'assets' }, media: { autoProxy: true } }, null, 2));
  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ id: `lnl-fx-${e.slug}`, name: e.name }, null, 2));
}
fs.writeFileSync(path.join(ROOT, 'effects.json'), JSON.stringify(EFFECTS.map(({ slug, name, group, duration, desc, use }) => ({ slug, name, group, duration, desc, use })), null, 1));
console.log('đã sinh', EFFECTS.length, 'hiệu ứng');
