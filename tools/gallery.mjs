// Trang thư viện (index.html, chạy được trên GitHub Pages) + README.md từ effects.json.
// Giao diện theo bố cục trang dịch vụ capiproduct.com/service/mobile-app: header viên thuốc, hero 2 cột với khung cắt góc
// phát sáng, số liệu gradient khổng lồ, ba ưu điểm có icon màu, thẻ ví dụ thực tế, quy trình dạng đường nét đứt,
// lưới hiệu ứng, bốn lý do có quầng sáng ở giữa. Phông Bricolage Grotesque (fonts/, SIL OFL) phối nét đậm 800 / mảnh 200.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEMES } from './build.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fx = JSON.parse(fs.readFileSync(path.join(ROOT, 'effects.json'), 'utf8'));
const show = JSON.parse(fs.readFileSync(path.join(ROOT, 'showcase.json'), 'utf8'));
const nameOf = Object.fromEntries(fx.map((e) => [e.slug, e.name]));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const groups = [...new Set(fx.map((e) => e.group))];
const hero = fx.find((e) => e.slug === 'title-stack') || fx[0];

const cards = fx.map((e) => `<article data-g="${esc(e.group)}" data-q="${esc((e.name + ' ' + e.desc + ' ' + e.use + ' ' + e.slug).toLowerCase())}">
  <video src="effects/${e.slug}/preview.mp4" poster="effects/${e.slug}/poster.jpg" muted loop playsinline preload="none"></video>
  <div class="b"><span class="g">${esc(e.group)} · ${e.duration}s</span><h3>${esc(e.name)}</h3><p>${esc(e.desc)}</p><p class="u">Dùng khi: ${esc(e.use)}</p>
  <div class="a"><a href="effects/${e.slug}/compositions/fx.html">Mã cảnh</a><a href="effects/${e.slug}/spec.md">Hướng dẫn</a><a href="effects/${e.slug}/preview.mp4" download>Tải video mẫu</a><a href="zips/${e.slug}.zip">Tải dự án (.zip)</a></div></div>
</article>`).join('\n');

const showcase = show.map((x) => `<section class="case rv" id="vi-du">
  <div class="case-media cut"><video src="${x.video}" poster="${x.poster}" controls playsinline preload="metadata"></video></div>
  <div class="case-info"><p class="kick">Ví dụ thực tế</p><h2>${esc(x.name)}</h2><div class="tags">${x.uses.map((u) => `<span>${esc(nameOf[u] || u)}</span>`).join('')}</div><p>${esc(x.desc)}</p></div>
</section>`).join('');

const ICON = {
  stack: '<svg viewBox="0 0 80 80"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a6e"/><stop offset="1" stop-color="#f6bc16"/></linearGradient></defs><path d="M40 8 76 26 40 44 4 26Z" fill="url(#ga)"/><path d="M4 38 40 56 76 38" fill="none" stroke="#ff9326" stroke-width="5"/><path d="M4 52 40 70 76 52" fill="none" stroke="#f6bc16" stroke-width="3"/></svg>',
  pill: '<svg viewBox="0 0 80 80"><defs><linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2fea74"/><stop offset="1" stop-color="#14c8b4"/></linearGradient></defs><rect x="4" y="6" width="72" height="8" rx="2" fill="none" stroke="#14c8b4" stroke-width="3"/><rect x="4" y="22" width="72" height="36" rx="18" fill="url(#gb)"/><rect x="4" y="66" width="72" height="8" rx="2" fill="none" stroke="#2fa3c8" stroke-width="3"/></svg>',
  orbs: '<svg viewBox="0 0 80 80"><defs><linearGradient id="gc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e01e5a"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><circle cx="22" cy="22" r="17" fill="none" stroke="#ff6b5a" stroke-width="2.5"/><path d="M22 39c20 0 18-34 40-34a17 17 0 0 1 0 34c-20 0-18 34-40 34a17 17 0 0 1 0-34Z" fill="url(#gc)"/><circle cx="58" cy="58" r="17" fill="none" stroke="#c03a8a" stroke-width="2.5"/></svg>',
};

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>LNL Motion Effects · Bộ hiệu ứng HyperFrames</title>
<meta name="description" content="Bộ hiệu ứng motion graphic dựng bằng HyperFrames + GSAP, chữ tiếng Việt, 4 bộ màu, mỗi hiệu ứng là một dự án chạy ngay.">
<meta name="theme-color" content="#000000">
<link rel="preload" href="fonts/BricolageGrotesque-ExtraBold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/BricolageGrotesque-ExtraLight.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/BricolageGrotesque-Regular.woff2" as="font" type="font/woff2" crossorigin>
<style>
@font-face{font-family:"BG";font-weight:200;font-display:swap;src:url(fonts/BricolageGrotesque-ExtraLight.woff2) format("woff2")}
@font-face{font-family:"BG";font-weight:300;font-display:swap;src:url(fonts/BricolageGrotesque-Light.woff2) format("woff2")}
@font-face{font-family:"BG";font-weight:400;font-display:swap;src:url(fonts/BricolageGrotesque-Regular.woff2) format("woff2")}
@font-face{font-family:"BG";font-weight:600;font-display:swap;src:url(fonts/BricolageGrotesque-SemiBold.woff2) format("woff2")}
@font-face{font-family:"BG";font-weight:800;font-display:swap;src:url(fonts/BricolageGrotesque-ExtraBold.woff2) format("woff2")}
:root{--bg:#000;--panel:#121212;--panel2:#191919;--line:rgba(255,255,255,.1);--ink:#f6f6f4;--mute:#9a9a9a;--yel:#f6bc16;--org:#ff9326;--grn:#2fea74;--teal:#14c8b4;--pink:#e01e5a;--vio:#7c3aed;--ease:cubic-bezier(.22,1,.36,1)}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:"BG",system-ui,sans-serif;background:var(--bg);color:var(--ink);font-size:16px;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit}code{font-family:ui-monospace,Consolas,monospace;font-size:.92em;color:var(--yel)}
.wrap{width:min(1240px,100% - 2*clamp(18px,5vw,80px));margin:0 auto}
.grad{background:linear-gradient(90deg,#fff 0%,#ffe59a 25%,var(--yel) 50%,var(--org) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.thin{font-weight:200}
/* ---------- header: logo · nav viên thuốc · nút vàng ---------- */
.top{position:sticky;top:0;z-index:20;background:rgba(10,10,10,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.top .wrap{display:flex;align-items:center;gap:20px;height:84px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:800;font-size:19px;line-height:1;letter-spacing:-.02em}
.logo i{width:36px;height:36px;border-radius:11px;background:conic-gradient(from 210deg,var(--grn),var(--teal),#38bdf8,var(--vio),var(--pink),var(--org),var(--yel),var(--grn));display:grid;place-items:center;font-style:normal;color:#000;font-size:15px}
.logo small{display:block;font-weight:200;font-size:13px;letter-spacing:.06em}
.nav{margin:0 auto;display:flex;gap:4px;padding:6px;border:1px solid rgba(255,255,255,.18);border-radius:999px}
.nav a{padding:10px 18px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.01em;transition:background .2s,color .2s}
.nav a:hover{background:#fff;color:#000}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border-radius:999px;font:600 15px "BG",sans-serif;text-transform:uppercase;text-decoration:none;cursor:pointer;border:1px solid transparent;transition:transform .3s var(--ease),box-shadow .3s,background .2s,color .2s}
.btn.y{background:var(--yel);color:#111}.btn.y:hover{transform:translateY(-2px);box-shadow:0 12px 30px -10px rgba(246,188,22,.7)}
.btn.o{border-color:var(--yel);color:var(--yel)}.btn.o:hover{background:var(--yel);color:#111}
.btn svg{width:18px;height:18px;transition:transform .3s var(--ease)}.btn:hover svg{transform:translateX(4px)}
/* ---------- hero 2 cột ---------- */
.hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:40px;align-items:center;padding:70px 0 40px}
.hero .l1{font-size:clamp(26px,3vw,42px);color:#8a8a8a;font-weight:400;letter-spacing:-.04em;text-transform:uppercase;margin:0}
.hero h1{margin:14px 0 0;font-size:clamp(52px,7.4vw,108px);line-height:.92;font-weight:800;letter-spacing:-.055em;text-transform:uppercase}
.hero .l3{margin:16px 0 0;font-size:clamp(28px,3.4vw,50px);line-height:1;font-weight:200;letter-spacing:-.04em;text-transform:uppercase}
.hero .ctas{display:flex;flex-wrap:wrap;gap:14px;margin-top:38px}
.frame{position:relative;border-radius:34px;padding:2px;background:linear-gradient(150deg,rgba(47,234,116,.9),rgba(47,234,116,.15) 40%,rgba(20,200,180,.75));clip-path:polygon(70px 0,100% 0,100% 100%,0 100%,0 70px);box-shadow:0 0 60px -10px rgba(47,234,116,.35)}
.frame>div{border-radius:32px;overflow:hidden;clip-path:polygon(69px 0,100% 0,100% 100%,0 100%,0 69px);background:#0b0b0b}
.frame video{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
.intro{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:center;padding:30px 0 90px}
.intro p{max-width:560px;margin:0;color:var(--mute);font-size:17px;line-height:1.65;font-weight:300}
.mini{display:flex}.mini div{padding:0 34px;border-left:1px solid rgba(255,255,255,.5)}.mini div:first-child{border-left:0;padding-left:0}
.mini b{display:block;font-size:40px;font-weight:400;letter-spacing:-.04em}.mini span{font-size:15px;color:#ddd}
/* ---------- tiêu đề mục ---------- */
.sec{padding:90px 0}
.sh{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:56px}
.sh .k{margin:0;font-size:clamp(24px,2.6vw,38px);color:#8a8a8a;font-weight:400;letter-spacing:-.04em;text-transform:uppercase}
.sh h2{margin:8px 0 0;font-size:clamp(38px,4.6vw,64px);line-height:1;font-weight:800;letter-spacing:-.05em;text-transform:uppercase}
.kick{display:inline-flex;align-items:center;gap:10px;margin:0;color:#9a9a9a;font-size:14px;letter-spacing:.06em;text-transform:uppercase}
.kick::before{content:"";border-left:8px solid #9a9a9a;border-top:5px solid transparent;border-bottom:5px solid transparent}
/* ---------- số liệu gradient khổng lồ ---------- */
.nums{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 80px;padding-left:20%}
.num{display:grid;grid-template-columns:auto 1fr;gap:34px;align-items:center;border-top:1px solid var(--line);padding-top:34px}
.num b{font-size:clamp(70px,8vw,120px);font-weight:400;letter-spacing:-.05em;line-height:.9;-webkit-background-clip:text;background-clip:text;color:transparent}
.num span{font-size:19px;color:#9a9a9a;font-weight:300}
.n1 b{background-image:linear-gradient(100deg,var(--teal),var(--grn))}.n2 b{background-image:linear-gradient(100deg,var(--pink),var(--org))}
.n3{grid-column:1/-1;width:72%;margin-left:12%}.n3 b{background-image:linear-gradient(100deg,#a3e635,var(--grn))}
/* ---------- ba ưu điểm ---------- */
.feats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:50px}
.feat svg{width:80px;height:80px;display:block;transition:transform .6s var(--ease)}.feat:hover svg{transform:translateY(-6px) rotate(-4deg)}
.feat h3{margin:34px 0 0;font-size:20px;font-weight:600;letter-spacing:-.02em}.feat p{margin:14px 0 0;color:#cfcfcf;font-weight:300;line-height:1.6}
.feat .st{display:flex;gap:16px;align-items:center;margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,.45);width:66%}
.feat .st b{font-size:38px;font-weight:400;letter-spacing:-.04em;-webkit-background-clip:text;background-clip:text;color:transparent}
.feat .st span{color:#cfcfcf;font-size:15px;line-height:1.4;font-weight:300}
.f1 .st b{background-image:linear-gradient(90deg,var(--org),var(--pink))}.f2 .st b{background-image:linear-gradient(90deg,var(--teal),var(--grn))}.f3 .st b{background-image:linear-gradient(90deg,var(--pink),var(--vio))}
/* ---------- ví dụ thực tế: khung cắt góc + bảng thông tin ---------- */
.case{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:24px;align-items:stretch}
.cut{border-radius:44px;overflow:hidden;clip-path:polygon(70px 0,100% 0,100% 100%,0 100%,0 70px);background:#000;display:flex;align-items:center}
.case-media video{display:block;width:100%;aspect-ratio:16/9;background:#000}
.case-info{border-radius:44px;padding:36px 34px;background:radial-gradient(90% 70% at 100% 0%,rgba(124,58,237,.35),transparent 70%),linear-gradient(170deg,#2a2236,#16131c 70%)}
.case-info h2{margin:16px 0 0;font-size:clamp(28px,2.6vw,40px);line-height:1.05;font-weight:400;letter-spacing:-.04em;text-transform:uppercase}
.tags{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.tags span{padding:9px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.3);font-size:15px}
.case-info p{color:#e8e8e8;line-height:1.6;font-size:17px;font-weight:300}
/* ---------- quy trình: đường nét đứt + các giai đoạn ---------- */
.steps{position:relative;display:grid;gap:110px;padding:20px 0}
.steps::before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:2px dashed rgba(255,255,255,.35)}
.step{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:start}
.step .d{grid-column:1;text-align:right;padding-right:70px;color:#cfcfcf;font-weight:300;line-height:1.6;font-size:17px}
.step .c{grid-column:2;padding-left:70px;position:relative}
.step .c::before{content:"";position:absolute;left:-7px;top:6px;width:14px;height:14px;border-radius:50%;background:#bdbdbd;box-shadow:0 0 0 0 rgba(246,188,22,0);transition:background .4s,box-shadow .4s}
.step .c::after{content:"";position:absolute;left:14px;top:12px;width:40px;border-top:1px solid #bdbdbd}
.step.in .c::before{background:var(--yel);box-shadow:0 0 18px 4px rgba(246,188,22,.6)}
.step .c small{font-size:17px;color:#ddd}.step .c h3{margin:12px 0 18px;font-size:clamp(26px,2.4vw,36px);font-weight:400;letter-spacing:-.04em}
.step .c .tags span{font-size:14px;background:#1a1a1a;border-color:#1a1a1a}
.step .glow{position:absolute;left:0;top:-60px;width:50%;height:220px;pointer-events:none;background:radial-gradient(closest-side,var(--gc),transparent);opacity:.35;filter:blur(10px)}
/* ---------- thư viện ---------- */
.bar{position:sticky;top:84px;z-index:10;display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:16px 0;background:rgba(0,0,0,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.chips button{border:1px solid rgba(255,255,255,.18);background:transparent;color:#eee;border-radius:999px;padding:9px 16px;font:600 13px "BG",sans-serif;text-transform:uppercase;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.chips button:hover{border-color:#fff}.chips button.on{background:var(--yel);border-color:var(--yel);color:#111}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:22px;padding:30px 0 40px}
article{position:relative;background:#141414;border:1px solid #1f1f1f;border-radius:28px;overflow:hidden;transition:transform .45s var(--ease),border-color .3s,box-shadow .45s}
article:hover{transform:translateY(-6px);border-color:rgba(246,188,22,.55);box-shadow:0 24px 50px -28px rgba(246,188,22,.55)}
article video{display:block;width:100%;aspect-ratio:16/9;background:#000;transition:transform .7s var(--ease)}article:hover video{transform:scale(1.04)}
.b{position:relative;padding:20px 22px 22px;background:#141414}
.g{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--yel);font-weight:600}
h3{margin:8px 0 8px;font-size:21px;font-weight:600;letter-spacing:-.02em}.b p{margin:0 0 8px;font-size:15px;line-height:1.55;color:#b9b9b9;font-weight:300}.u{color:#8a8a8a!important;font-size:14px!important}
.a{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.a a{padding:7px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.16);font-size:13px;font-weight:600;text-decoration:none;transition:background .2s,color .2s,border-color .2s}
.a a:hover{background:var(--yel);border-color:var(--yel);color:#111}
.empty{display:none;grid-column:1/-1;text-align:center;color:var(--mute);padding:40px}
/* ---------- bốn lý do: quầng sáng ở giữa ---------- */
.why{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-width:1030px;margin:0 auto}
.why::before{content:"";position:absolute;left:50%;top:50%;width:360px;height:360px;transform:translate(-50%,-50%);background:radial-gradient(closest-side,rgba(255,110,60,.85),rgba(224,30,90,.35) 45%,transparent 75%);filter:blur(8px);pointer-events:none}
.why div{position:relative;border-radius:22px;padding:26px 26px 30px;background:rgba(24,24,26,.92)}
.why i{display:grid;place-items:center;width:68px;height:68px;border-radius:50%;background:#2a2a2c;font-style:normal;font-size:30px}
.why h3{margin:24px 0 14px;font-size:20px}.why p{margin:0;color:#c7c7c7;line-height:1.6;font-weight:300}
.api{margin:0 auto;max-width:1030px;padding:22px 26px;border-radius:22px;border:1px dashed rgba(255,255,255,.22);color:#c7c7c7;line-height:1.6}
footer{padding:50px 0 60px;color:#8a8a8a;font-size:14px;border-top:1px solid #151515;margin-top:90px}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px}footer a{color:var(--yel)}
/* ---------- phần đầu gọn + ô tìm kiếm to ---------- */
.lead{padding:42px 0 18px}.lead h1{margin:12px 0 0;font-size:clamp(34px,4.4vw,62px);line-height:1;font-weight:800;letter-spacing:-.05em;text-transform:uppercase}
.lead .sub{margin:12px 0 0;color:var(--mute);font-weight:300;font-size:16px;max-width:760px}
.bar{flex-direction:column;align-items:stretch;gap:12px}
.search{display:flex;align-items:center;gap:12px;height:60px;padding:0 18px 0 20px;border-radius:999px;background:#0e0e0e;border:1.5px solid rgba(255,255,255,.2);transition:border-color .2s,box-shadow .2s}
.search:focus-within{border-color:var(--yel);box-shadow:0 0 0 4px rgba(246,188,22,.14)}
.search svg{width:22px;height:22px;color:var(--yel);flex:none}
.search input{flex:1;min-width:0;margin:0!important;border:0!important;background:transparent!important;padding:0!important;font:400 18px "BG",sans-serif!important;color:#fff;outline:0}
.search kbd{font:600 12px "BG",sans-serif;color:#9a9a9a;border:1px solid rgba(255,255,255,.2);border-radius:7px;padding:3px 8px}
.chips{display:flex;flex-wrap:wrap;gap:8px}.chips b{font-weight:400;opacity:.6;margin-left:3px}
.chips button.on b{opacity:.75}
/* ---------- hiệu ứng xuất hiện ---------- */
.rv{opacity:0;transform:translateY(36px);transition:opacity .9s var(--ease),transform .9s var(--ease)}.rv.in{opacity:1;transform:none}
.hero .l1,.hero h1,.hero .l3,.hero .ctas,.frame{animation:up 1s var(--ease) both}
.hero h1{animation-delay:.08s}.hero .l3{animation-delay:.16s}.hero .ctas{animation-delay:.26s}.frame{animation:pop 1.1s var(--ease) .2s both}
@keyframes up{from{opacity:0;transform:translateY(40px)}}@keyframes pop{from{opacity:0;transform:scale(.94) translateY(24px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}
@media(max-width:1000px){.hero,.case{grid-template-columns:1fr}.nav{display:none}.feats{grid-template-columns:1fr}.nums{padding-left:0;grid-template-columns:1fr}.n3{width:auto;margin:0}.intro{grid-template-columns:1fr}
.steps::before{left:7px}.step{grid-template-columns:1fr}.step .d{grid-column:1;grid-row:2;text-align:left;padding:14px 0 0 40px}.step .c{grid-column:1;padding-left:40px}.step .c::before{left:0}.step .c::after{display:none}.step .glow{display:none}}
@media(max-width:640px){.top .wrap{height:68px}.top .btn{padding:11px 16px;font-size:13px}.bar{position:static}.search{height:52px}.search input{font-size:16px!important}.search kbd{display:none}main{grid-template-columns:1fr}.why{grid-template-columns:1fr}.mini div{padding:0 18px}.cut,.frame,.frame>div{clip-path:none}}
</style></head><body>
<header class="top"><div class="wrap">
  <a class="logo" href="#"><i>▶</i><span>LNL<small>Motion Effects</small></span></a>
  <nav class="nav"><a href="#hieu-ung">Hiệu ứng</a><a href="#vi-du">Ví dụ</a><a href="#quy-trinh">Quy trình</a><a href="#api">API</a><a href="https://github.com/luanlengoc1991-art/lnl-motion-effects">GitHub</a></nav>
  <a class="btn y" href="#hieu-ung" onclick="setTimeout(()=>q.focus(),300)">Tìm hiệu ứng</a>
</div></header>

<section class="wrap lead">
  <div><p class="kick">Thư viện HyperFrames + GSAP</p>
  <h1><span class="grad">${fx.length} hiệu ứng</span> <span class="thin">motion dựng sẵn</span></h1>
  <p class="sub">Chữ tiếng Việt, ${Object.keys(THEMES).length} bộ màu. Tìm, xem video mẫu, tải .zip hoặc thêm thẳng từ Kho mẫu trong LNL Frames Studio.</p></div>
</section>
<section class="wrap" id="hieu-ung">
  <div class="bar">
    <label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Tìm hiệu ứng: số liệu, chat, logo, bản đồ, người nói…" aria-label="Tìm hiệu ứng" autofocus><kbd>/</kbd></label>
    <div class="chips"><button class="on" data-f="">Tất cả <b>${fx.length}</b></button>${groups.map((g) => `<button data-f="${esc(g)}">${esc(g)} <b>${fx.filter((e) => e.group === g).length}</b></button>`).join('')}</div>
  </div>
  <main>
${cards}
<p class="empty" id="empty">Không có hiệu ứng khớp. Thử từ khoá khác.</p>
  </main>
</section>

<div class="wrap sec">${showcase}</div>

<section class="sec wrap" id="quy-trinh">
  <div class="sh rv"><div><p class="k">Quy trình</p><h2>Từ hiệu ứng <span class="thin">tới</span> <span class="grad">video</span></h2></div></div>
  <div class="steps">
    <div class="step rv" style="--gc:rgba(246,188,22,.55)"><span class="glow"></span><p class="d">Lọc theo nhóm hoặc gõ từ khoá, xem video mẫu chạy ngay trên thẻ.</p><div class="c"><small>Bước 1</small><h3>Chọn hiệu ứng</h3><div class="tags"><span>Lọc theo nhóm</span><span>Tìm nhanh</span><span>Xem video mẫu</span></div></div></div>
    <div class="step rv" style="--gc:rgba(47,234,116,.5)"><span class="glow"></span><p class="d">Tải dự án .zip hoặc thêm thẳng từ Kho mẫu trong LNL Frames Studio.</p><div class="c"><small>Bước 2</small><h3>Đưa vào dự án</h3><div class="tags"><span>Tải .zip</span><span>LNL Frames Studio</span><span>Mã cảnh</span></div></div></div>
    <div class="step rv" style="--gc:rgba(124,58,237,.55)"><span class="glow"></span><p class="d">Sửa chữ trong <code>compositions/fx.html</code>, đổi màu bằng 6 biến của bộ màu.</p><div class="c"><small>Bước 3</small><h3>Sửa chữ &amp; màu</h3><div class="tags"><span>data-var-text</span><span>6 biến màu</span><span>Hướng dẫn</span></div></div></div>
    <div class="step rv" style="--gc:rgba(224,30,90,.5)"><span class="glow"></span><p class="d">Xem trước rồi xuất MP4 bằng HyperFrames, giữ chất lượng chuẩn.</p><div class="c"><small>Bước 4</small><h3>Render video</h3><div class="tags"><span>hyperframes preview</span><span>hyperframes render</span></div></div></div>
  </div>
</section>

<section class="sec wrap">
  <div class="sh rv" style="justify-content:center;text-align:center"><div><p class="k">Vì sao dùng</p><h2>Làm video <span class="grad">nhanh hơn</span></h2></div></div>
  <div class="why rv">
    <div><i>🎯</i><h3>Viết mới, tự thiết kế</h3><p>Không chép template của thư viện khác; mỗi hiệu ứng có hướng dẫn và mã nguồn rõ ràng.</p></div>
    <div><i>📊</i><h3>Số liệu, biểu đồ, bản đồ</h3><p>Đếm số, cột mọc, đường vẽ, ghim vị trí — đủ cho video giới thiệu dự án và báo cáo.</p></div>
    <div><i>🧩</i><h3>Ghép được với nhau</h3><p>Mỗi cảnh có id riêng, thêm nhiều hiệu ứng vào cùng một dự án mà không đụng nhau.</p></div>
    <div><i>🛡️</i><h3>Kiểm tra trước khi đăng</h3><p>Mọi hiệu ứng qua <code>hyperframes check</code> và render lại video mẫu trước khi lên web.</p></div>
  </div>
</section>

<section class="wrap" id="api"><p class="api rv">Dành cho app: danh mục <code>/api/effects.json</code> (tên, nhóm, mô tả, video mẫu, ảnh bìa, link tải) và mỗi hiệu ứng một tệp <code>/zips/&lt;mã&gt;.zip</code> chạy ngay bằng HyperFrames. Gọi được từ mọi tên miền.</p></section>

<footer><div class="wrap"><span>© ${new Date().getFullYear()} LNL Motion Effects</span><span>Mã nguồn: <a href="https://github.com/luanlengoc1991-art/lnl-motion-effects">GitHub</a> · Phông Bricolage Grotesque, Be Vietnam Pro (SIL OFL)</span></div></footer>
<script>
const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.preload="auto";v.play().catch(()=>{})}else v.pause()}),{rootMargin:"120px"});
document.querySelectorAll("article video").forEach(v=>io.observe(v));
let g="";const empty=document.getElementById("empty");
const apply=()=>{const s=q.value.trim().toLowerCase();let n=0;document.querySelectorAll("article").forEach(a=>{a.hidden=(g&&a.dataset.g!==g)||(s&&!a.dataset.q.includes(s));if(!a.hidden)n++});empty.style.display=n?"none":"block"};
document.querySelectorAll(".chips button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chips button").forEach(x=>x.classList.toggle("on",x===b));g=b.dataset.f;apply()});
q.oninput=apply;
addEventListener("keydown",e=>{if(e.key==="/"&&document.activeElement!==q){e.preventDefault();q.focus()}});
// Hiện dần khi cuộn tới, số liệu đếm lên, chấm quy trình sáng lên
const still=matchMedia("(prefers-reduced-motion: reduce)").matches;
const count=el=>{const to=+el.dataset.count;if(still||!to){el.textContent=to;return}const t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/1200);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");e.target.querySelectorAll("[data-count]").forEach(count);rv.unobserve(e.target)}),{rootMargin:"0px 0px -12% 0px"});
document.querySelectorAll(".rv").forEach(el=>rv.observe(el));
</script></body></html>`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);

const md = [`# LNL Motion Effects`, '',
  `${fx.length} hiệu ứng motion graphic dựng bằng **HyperFrames + GSAP**, chữ tiếng Việt (Be Vietnam Pro), 4 bộ màu dựng sẵn. Tự thiết kế và viết mới.`, '',
  'Xem online: https://effects.luangroup.asia/', '',
  '## Dùng một hiệu ứng', '```sh', 'cd effects/<ten-hieu-ung>', 'npx hyperframes preview   # xem, sửa trực tiếp', 'npx hyperframes render    # xuất MP4 1920x1080', '```',
  'Chữ có `data-var-text` sửa trong `compositions/fx.html`; màu là 6 biến trong `#root` của `index.html` (bảng màu ở `spec.md` từng hiệu ứng).', '',
  '## Đưa lên web', 'Trang chạy trên Cloudflare (Workers Static Assets) ở https://effects.luangroup.asia/: `node tools/gallery.mjs && node tools/dist.mjs && python tools/pack.py && npx wrangler deploy`. App đọc danh mục ở https://effects.luangroup.asia/api/effects.json (CORS mở) và tải dự án ở /zips/<mã>.zip. Cache: trang chính hỏi lại mỗi lần (Cloudflare giữ 5 phút), video và ảnh lưu 1 ngày, phông 1 năm (`_headers`).', '','## Thêm hiệu ứng', 'Viết thêm một mục trong `tools/effects.mjs`, rồi `node tools/build.mjs` (sinh dự án), kiểm tra bằng `npx hyperframes check`, render `preview.mp4` / `poster.jpg`, và `node tools/gallery.mjs` (trang thư viện + README).', '',
  ...groups.flatMap((g) => [`## ${g}`, '', '| Xem trước | Hiệu ứng | Thời lượng |', '|---|---|---|',
    ...fx.filter((e) => e.group === g).map((e) => `| [<img src="effects/${e.slug}/poster.jpg" width="260">](effects/${e.slug}/preview.mp4) | **[${e.name}](effects/${e.slug}/)**<br>${e.desc}<br><sub>Dùng khi: ${e.use}</sub> | ${e.duration}s |`), '']),
  '## Bộ màu', '', '| Bộ | Nền | Nhấn | Nhấn 2 |', '|---|---|---|---|', ...Object.values(THEMES).map((t) => `| ${t.name} | ${t.bg} | ${t.accent} | ${t.accent2} |`), '',
  '## Giấy phép', 'Mã nguồn theo giấy phép MIT (xem `LICENSE`). Phông Be Vietnam Pro, JetBrains Mono và Bricolage Grotesque (trang thư viện) theo SIL Open Font License.', ''];
fs.writeFileSync(path.join(ROOT, 'README.md'), md.join('\n'));
console.log('index.html + README.md:', fx.length, 'hiệu ứng');
