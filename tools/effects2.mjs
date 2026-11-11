// Đợt 2 (18 hiệu ứng): cùng quy ước với effects.mjs.
const ring = (r) => 2 * Math.PI * r;

export const BATCH2 = [
  {
    slug: 'word-cascade', name: 'Chữ rơi nảy vào chỗ', group: 'Mở đầu', duration: 5,
    desc: 'Từng chữ của câu rơi từ trên xuống, nảy nhẹ khi chạm vạch, từ nhấn cuối cùng phóng to và đổi màu.',
    use: 'Câu mở đầu, khẩu hiệu, câu chốt cuối video.',
    css: `#ln{position:absolute;left:0;right:0;top:420px;display:flex;justify-content:center;flex-wrap:wrap;gap:0 34px;padding:0 160px}
.w{display:inline-block;font-family:"BVP";font-weight:900;font-size:120px;line-height:1.25;color:var(--fg)}
.w.k{color:var(--accent)}
#fl{position:absolute;left:360px;right:360px;top:700px;height:6px;border-radius:3px;background:#ffffff1c;transform-origin:center}`,
    html: `<div id="ln" data-var-text="cau"></div><div id="fl"></div>`,
    js: `const S="Ý tưởng hay cần được kể đúng cách".split(" ");const ln=$("#ln");
ln.innerHTML=S.map((w,i)=>'<span class="w'+(i===S.length-1?' k':'')+'">'+w+'</span>').join("");
const ws=$$("#ln .w");
tl.fromTo("#fl",{scaleX:0},{scaleX:1,duration:.6,ease:"power2.out"},.1);
tl.fromTo(ws,{y:-420,opacity:0,rotation:i=>(i%2?8:-8)},{y:0,opacity:1,rotation:0,duration:.9,ease:"bounce.out",stagger:.12},.3);
tl.fromTo(ws[ws.length-1],{scale:1},{scale:1.18,transformOrigin:"left 70%",duration:.4,ease:"back.out(3)"},1.9);
out("#ln,#fl",4.45);`,
  },
  {
    slug: 'spotlight-title', name: 'Đèn rọi lộ tiêu đề', group: 'Mở đầu', duration: 5,
    desc: 'Màn hình tối, một vòng đèn rọi lướt qua để lộ dần dòng tiêu đề, rồi đèn bung rộng sáng toàn cảnh.',
    use: 'Mở màn bí ẩn, giới thiệu sản phẩm mới, tiết lộ tên dự án.',
    css: `#tx{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px}
#tx b{font-family:"BVP";font-weight:900;font-size:150px;color:var(--fg);letter-spacing:-.02em}
#tx span{font-family:"JBM";font-weight:700;font-size:32px;letter-spacing:.3em;color:var(--accent)}
#dk{position:absolute;inset:0;background:radial-gradient(circle 260px at var(--x,10%) var(--y,50%),transparent 0,transparent 60%,#000 100%)}`,
    html: `<div id="tx"><b data-var-text="tieude">Ra mắt 2026</b><span data-var-text="phu">SẮP CÓ MẶT</span></div><div id="dk" data-layout-allow-occlusion></div>`,
    js: `const dk=$("#dk"),o={x:5,y:40,r:260};const ap=()=>{dk.style.setProperty("--x",o.x+"%");dk.style.setProperty("--y",o.y+"%");dk.style.background="radial-gradient(circle "+o.r+"px at "+o.x+"% "+o.y+"%,transparent 0,transparent 55%,#000 100%)";};ap();
tl.fromTo(o,{x:5,y:40},{x:95,y:55,duration:2.2,ease:"sine.inOut",onUpdate:ap},.2);
tl.to(o,{x:50,y:50,duration:.7,ease:"power2.inOut",onUpdate:ap},2.4);
tl.to(o,{r:1600,duration:.9,ease:"expo.in",onUpdate:ap},3);
tl.fromTo("#tx b",{scale:.96},{scale:1,duration:1,ease:"expo.out"},3.4);
out("#tx",4.45);`,
  },
  {
    slug: 'phone-scroll', name: 'Điện thoại cuộn nội dung', group: 'Mở đầu', duration: 6,
    desc: 'Khung điện thoại nổi lên nghiêng nhẹ, màn hình cuộn qua các thẻ nội dung, thẻ nổi bật bung ra ngoài khung.',
    use: 'Giới thiệu app, giao diện mạng xã hội, trang sản phẩm trên di động.',
    css: `#ph{position:absolute;left:740px;top:90px;width:440px;height:900px;border-radius:64px;background:#05070a;border:14px solid #222831;overflow:hidden;box-shadow:0 60px 140px #000c}
#sc{position:absolute;left:18px;right:18px;top:40px}
.pc{height:220px;border-radius:28px;margin-bottom:22px;background:var(--card);border:2px solid #ffffff12;padding:26px}
.pc i{display:block;height:20px;border-radius:10px;background:#ffffff1f;margin-bottom:14px}
.pc i.s{width:60%}.pc i.a{width:40%;background:var(--accent)}
#pop{position:absolute;left:1220px;top:420px;width:520px;padding:40px;border-radius:36px;background:var(--accent);color:#111;font-family:"BVP";font-weight:800;font-size:44px;line-height:1.25;box-shadow:0 40px 100px #0009}`,
    html: `<div id="ph"><div id="sc" data-layout-allow-overflow>${Array.from({ length: 9 }, (_, i) => `<div class="pc"><i class="a"></i><i></i><i class="s"></i></div>`).join('')}</div></div>
<div id="pop" data-var-text="noibat">+38% đơn hàng sau 2 tuần</div>`,
    js: `tl.fromTo("#ph",{y:300,opacity:0,rotation:-8},{y:0,opacity:1,rotation:-4,duration:.9,ease:"expo.out"},.1);
tl.fromTo("#sc",{y:0},{y:-1080,duration:3,ease:"power2.inOut"},1);
tl.fromTo("#pop",{opacity:0,x:-200,scale:.7},{opacity:1,x:0,scale:1,duration:.7,ease:"back.out(1.8)"},3.4);
tl.to("#ph",{rotation:0,duration:1,ease:"power2.inOut"},3.2);
out("#ph,#pop",5.45);`,
  },
  {
    slug: 'donut-percent', name: 'Vòng tròn phần trăm', group: 'Con số', duration: 5,
    desc: 'Vòng tròn vẽ ra theo tỉ lệ, số ở giữa đếm lên cùng nhịp, nhãn giải thích trượt vào bên cạnh.',
    use: 'Tỉ lệ hoàn thành, tỉ lệ hài lòng, thị phần.',
    css: `#dn{position:absolute;left:300px;top:190px;width:700px;height:700px}
#dn circle{fill:none;stroke-width:56}
#bgc{stroke:#ffffff14}#fg{stroke:var(--accent);stroke-linecap:round}
#pc{position:absolute;left:300px;top:190px;width:700px;height:700px;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:170px;color:var(--fg)}
#lb{position:absolute;left:1100px;top:400px;width:620px}
#lb b{display:block;font-family:"BVP";font-weight:900;font-size:66px;color:var(--fg);line-height:1.15}
#lb span{display:block;margin-top:18px;font-family:"BVP";font-weight:600;font-size:34px;color:var(--muted)}`,
    html: `<svg id="dn" viewBox="0 0 700 700"><circle id="bgc" cx="350" cy="350" r="300"/><circle id="fg" cx="350" cy="350" r="300" transform="rotate(-90 350 350)"/></svg>
<div id="pc">0%</div><div id="lb"><b data-var-text="tieude">Khách quay lại mua lần hai</b><span data-var-text="mota">Số liệu 12 tháng gần nhất</span></div>`,
    js: `const P=76,L=${ring(300).toFixed(2)},fg=$("#fg");fg.style.strokeDasharray=L;
tl.fromTo("#dn",{scale:.7,opacity:0},{scale:1,opacity:1,duration:.7,ease:"expo.out"},.1);
tl.fromTo(fg,{strokeDashoffset:L},{strokeDashoffset:L*(1-P/100),duration:1.8,ease:"power2.inOut"},.5);
count("#pc",P,.5,1.8,0,"","%");
rise("#lb b,#lb span",1.2,.15);
out("#dn,#pc,#lb",4.45);`,
  },
  {
    slug: 'line-growth', name: 'Đường tăng trưởng', group: 'Con số', duration: 6,
    desc: 'Đường biểu đồ vẽ từ trái sang phải với vùng tô mờ bên dưới, chấm cuối nhấp nháy và nhãn tăng trưởng bật lên.',
    use: 'Doanh thu theo tháng, lượt theo dõi kênh, giá trị tăng theo thời gian.',
    css: `#cv{position:absolute;left:200px;top:200px;width:1520px;height:640px}
#ar{fill:url(#gr)}#lnp{fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round;stroke-linejoin:round}
#dt{fill:var(--accent2)}
#tg{position:absolute;left:1440px;top:120px;padding:18px 30px;border-radius:24px;background:var(--accent2);font-family:"BVP";font-weight:900;font-size:52px;color:#111}
#cap{position:absolute;left:200px;top:110px;font-family:"BVP";font-weight:800;font-size:48px;color:var(--fg)}
.ml{position:absolute;top:870px;font-family:"JBM";font-weight:700;font-size:30px;color:var(--muted)}`,
    html: `<div id="cap" data-var-text="tieude">Người theo dõi kênh</div>
<svg id="cv" viewBox="0 0 1520 640"><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient><clipPath id="cl"><rect id="cr" x="0" y="0" width="0" height="640"/></clipPath></defs>
<path id="ar" clip-path="url(#cl)" d=""/><path id="lnp" d=""/><circle id="dt" r="18" cx="-50" cy="-50"/></svg>
<div id="tg" data-var-text="nhan">+420%</div>
${['T1', 'T3', 'T5', 'T7', 'T9', 'T12'].map((m, i) => `<div class="ml" style="left:${200 + i * 296}px">${m}</div>`).join('')}`,
    js: `const V=[60,80,72,120,150,140,210,260,250,330,420,520],W=1520,H=640,mx=560;
const pts=V.map((v,i)=>[i/(V.length-1)*W,H-v/mx*H]);
const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
$("#lnp").setAttribute("d",d);$("#ar").setAttribute("d",d+" L"+W+" "+H+" L0 "+H+" Z");
const lp=$("#lnp"),L=lp.getTotalLength();lp.style.strokeDasharray=L;
tl.fromTo(lp,{strokeDashoffset:L},{strokeDashoffset:0,duration:2.6,ease:"power1.inOut"},.4);
tl.fromTo("#cr",{attr:{width:0}},{attr:{width:W},duration:2.6,ease:"power1.inOut"},.4);
const last=pts[pts.length-1];tl.set("#dt",{attr:{cx:last[0],cy:last[1]}},3);
tl.fromTo("#dt",{scale:0,transformOrigin:"center"},{scale:1,duration:.4,ease:"back.out(3)"},3);
tl.fromTo("#dt",{opacity:1},{opacity:.35,duration:.3,yoyo:true,repeat:3},3.4);
pop("#tg",3.1);rise("#cap",.1);tl.fromTo(".ml",{opacity:0},{opacity:1,duration:.4,stagger:.08},.3);
out("#cv,#tg,#cap,.ml",5.45);`,
  },
  {
    slug: 'price-drop', name: 'Giá giảm bật lên', group: 'Con số', duration: 5,
    desc: 'Giá cũ hiện ra rồi bị gạch chéo, giá mới đập xuống với rung nhẹ, tem phần trăm xoay vào góc.',
    use: 'Khuyến mãi, flash sale, ưu đãi mở bán.',
    css: `#old{position:absolute;left:0;right:0;top:300px;text-align:center;font-family:"BVP";font-weight:800;font-size:96px;color:var(--muted)}
#slash{position:absolute;left:640px;top:350px;width:640px;height:10px;border-radius:5px;background:var(--accent);transform-origin:left center;transform:rotate(-8deg)}
#new{position:absolute;left:0;right:0;top:470px;text-align:center;font-family:"BVP";font-weight:900;font-size:220px;color:var(--fg);letter-spacing:-.03em}
#new i{font-style:normal;font-size:110px;color:var(--accent)}
#stamp{position:absolute;left:1380px;top:220px;width:250px;height:250px;border-radius:50%;background:var(--accent2);display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:76px;color:#111}`,
    html: `<div id="old" data-layout-allow-occlusion data-var-text="giacu">2.990.000đ</div><div id="slash"></div>
<div id="new"><span data-var-text="giamoi">1.990.000</span><i>đ</i></div><div id="stamp" data-var-text="giam">-33%</div>`,
    js: `rise("#old",.2);
tl.fromTo("#slash",{scaleX:0},{scaleX:1,duration:.4,ease:"power3.out"},.9);
tl.fromTo("#new",{scale:2.2,opacity:0},{scale:1,opacity:1,duration:.5,ease:"expo.in"},1.4);
tl.fromTo("#new",{x:-10},{x:10,duration:.05,yoyo:true,repeat:5,ease:"none"},1.9);
tl.set("#new",{x:0},2.2);
tl.fromTo("#stamp",{scale:0,rotation:-180},{scale:1,rotation:-12,duration:.7,ease:"back.out(2)"},2.1);
out("#old,#slash,#new,#stamp",4.45);`,
  },
  {
    slug: 'podium-rank', name: 'Bục xếp hạng', group: 'Con số', duration: 6,
    desc: 'Ba bục 2–1–3 mọc lên theo thứ tự hạng ba, hạng hai, hạng nhất; tên và điểm hiện trên bục, hạng nhất có vương miện.',
    use: 'Top sản phẩm bán chạy, bảng xếp hạng nhân viên, so sánh ba lựa chọn.',
    css: `.pd{position:absolute;bottom:120px;width:420px;border-radius:28px 28px 0 0;transform-origin:bottom center;display:flex;justify-content:center;padding-top:30px;font-family:"BVP";font-weight:900;font-size:120px;color:#11111199}
#p1{left:750px;height:520px;background:var(--accent)}#p2{left:300px;height:380px;background:var(--card);color:var(--muted)}#p3{left:1200px;height:280px;background:var(--card);color:var(--muted)}
.nm{position:absolute;width:420px;text-align:center}
.nm b{display:block;font-family:"BVP";font-weight:800;font-size:44px;color:var(--fg)}
.nm span{display:block;font-family:"JBM";font-weight:700;font-size:28px;color:var(--muted)}
#cr{position:absolute;left:910px;top:150px;width:100px;height:70px}`,
    html: `<div class="pd" id="p2">2</div><div class="pd" id="p1">1</div><div class="pd" id="p3">3</div>
<div class="nm" id="n2" style="left:300px;top:${1080 - 120 - 380 - 120}px"><b data-var-text="hang2">Gói Cơ bản</b><span>8,6 điểm</span></div>
<div class="nm" id="n1" style="left:750px;top:${1080 - 120 - 520 - 120}px"><b data-var-text="hang1">Gói Pro</b><span>9,4 điểm</span></div>
<div class="nm" id="n3" style="left:1200px;top:${1080 - 120 - 280 - 120}px"><b data-var-text="hang3">Gói Dùng thử</b><span>7,9 điểm</span></div>
<svg id="cr" viewBox="0 0 100 70"><path d="M5 65 L12 15 L35 40 L50 5 L65 40 L88 15 L95 65 Z" fill="var(--accent2)"/></svg>`,
    js: `[["#p3","#n3",.3],["#p2","#n2",.8],["#p1","#n1",1.3]].forEach(([p,n,t])=>{tl.fromTo(p,{scaleY:0},{scaleY:1,duration:.8,ease:"expo.out"},t);tl.fromTo(n,{opacity:0,y:40},{opacity:1,y:0,duration:.5,ease:"back.out(1.8)"},t+.45);});
tl.fromTo("#cr",{y:-200,opacity:0,rotation:-20},{y:0,opacity:1,rotation:0,duration:.8,ease:"bounce.out"},2.3);
out(".pd,.nm,#cr",5.45);`,
  },
  {
    slug: 'card-carousel', name: 'Băng chuyền thẻ', group: 'Danh sách', duration: 7,
    desc: 'Năm thẻ xếp ngang trượt qua giữa màn hình, thẻ vào giữa phóng to và sáng lên, thẻ hai bên lùi mờ.',
    use: 'Giới thiệu nhiều sản phẩm, nhiều gói dịch vụ, nhiều dự án.',
    css: `#tr{position:absolute;left:0;top:240px;height:600px;width:4000px}
.cc{position:absolute;top:0;width:480px;height:600px;border-radius:44px;background:var(--card);border:2px solid #ffffff14;padding:50px;display:flex;flex-direction:column;justify-content:flex-end}
.cc em{position:absolute;left:50px;top:50px;font-style:normal;font-family:"JBM";font-weight:700;font-size:30px;color:var(--accent)}
.cc b{font-family:"BVP";font-weight:900;font-size:60px;color:var(--fg);line-height:1.1}
.cc span{margin-top:14px;font-family:"BVP";font-weight:600;font-size:30px;color:var(--muted)}`,
    html: `<div id="tr" data-layout-allow-overflow>${['Căn hộ studio', 'Căn 2 phòng ngủ', 'Căn góc 3 phòng', 'Penthouse', 'Shophouse'].map((t, i) => `<div class="cc" id="k${i}" style="left:${i * 560}px"><em>0${i + 1}</em><b>${t}</b><span>${['Từ 1,6 tỷ', 'Từ 2,9 tỷ', 'Từ 4,2 tỷ', 'Liên hệ', 'Từ 12 tỷ'][i]}</span></div>`).join('')}</div>`,
    js: `const N=5,step=560,center=960-240;const st={p:0};const cards=$$(".cc");
const ap=()=>{$("#tr").style.transform="translateX("+(center-st.p*step)+"px)";cards.forEach((c,i)=>{const d=Math.min(1,Math.abs(i-st.p));c.style.transform="scale("+(1.12-.22*d)+")";c.style.opacity=String(1-.55*d);c.style.borderColor=d<.3?"var(--accent)":"#ffffff14";});};ap();
tl.fromTo("#tr",{opacity:0},{opacity:1,duration:.5},.1);
for(let k=1;k<N;k++)tl.to(st,{p:k,duration:.8,ease:"power3.inOut",onUpdate:ap},.4+k*1.15);
out("#tr",6.45);`,
  },
  {
    slug: 'three-steps', name: 'Ba bước có mũi tên nối', group: 'Danh sách', duration: 6,
    desc: 'Ba khối bước với số to hiện lần lượt, mũi tên cong tự vẽ nối bước trước sang bước sau.',
    use: 'Quy trình đặt hàng, cách dùng sản phẩm, hướng dẫn nhanh.',
    css: `.sp{position:absolute;top:330px;width:440px;height:420px;border-radius:40px;background:var(--card);border:2px solid #ffffff12;padding:44px}
.sp b{display:block;font-family:"BVP";font-weight:900;font-size:120px;line-height:1;color:var(--accent)}
.sp h4{margin:26px 0 0;font-family:"BVP";font-weight:800;font-size:46px;color:var(--fg)}
.sp p{margin:12px 0 0;font-family:"BVP";font-weight:600;font-size:30px;color:var(--muted);line-height:1.35}
#arr{position:absolute;inset:0;width:1920px;height:1080px}
#arr path{fill:none;stroke:var(--accent2);stroke-width:8;stroke-linecap:round}`,
    html: `${[0, 1, 2].map((i) => `<div class="sp" id="sp${i}" style="left:${170 + i * 560}px"><b>0${i + 1}</b><h4 data-var-text="buoc${i + 1}">${['Chọn mẫu', 'Điền nội dung', 'Xuất video'][i]}</h4><p>${['Trong thư viện có sẵn', 'Chữ, ảnh, màu thương hiệu', 'MP4 dọc hoặc ngang'][i]}</p></div>`).join('')}
<svg id="arr" viewBox="0 0 1920 1080"><path id="a0" d="M620 300 C 680 200, 760 200, 820 290"/><path id="a1" d="M1180 300 C 1240 200, 1320 200, 1380 290"/><path id="h0" d="M800 260 L822 292 L786 300"/><path id="h1" d="M1360 260 L1382 292 L1346 300"/></svg>`,
    js: `[0,1,2].forEach(i=>rise("#sp"+i,.3+i*1.2));
[0,1].forEach(i=>{const p=$("#a"+i),h=$("#h"+i),L=p.getTotalLength(),Lh=h.getTotalLength();p.style.strokeDasharray=L;h.style.strokeDasharray=Lh;
 tl.fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:.6,ease:"power2.inOut"},.9+i*1.2);
 tl.fromTo(h,{strokeDashoffset:Lh},{strokeDashoffset:0,duration:.25,ease:"power2.out"},1.45+i*1.2);});
out(".sp,#arr",5.45);`,
  },
  {
    slug: 'pros-cons', name: 'Ưu và nhược hai cột', group: 'Danh sách', duration: 6,
    desc: 'Hai cột tiêu đề Nên / Không nên, các dòng hiện xen kẽ hai bên với dấu cộng xanh và dấu trừ đỏ bật lên.',
    use: 'So sánh hai lựa chọn, việc nên và không nên, ưu nhược điểm.',
    css: `.col{position:absolute;top:170px;width:760px}
#cA{left:160px}#cB{left:1000px}
.col h3{margin:0 0 40px;padding-bottom:24px;border-bottom:4px solid;font-family:"BVP";font-weight:900;font-size:64px}
#cA h3{color:#4ade80;border-color:#4ade80}#cB h3{color:#f87171;border-color:#f87171}
.rw{display:flex;align-items:center;gap:26px;margin-bottom:34px;font-family:"BVP";font-weight:700;font-size:42px;color:var(--fg)}
.rw i{flex:none;width:64px;height:64px;border-radius:20px;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:"BVP";font-weight:900;font-size:48px}
#cA .rw i{background:#4ade8026;color:#4ade80}#cB .rw i{background:#f8717126;color:#f87171}`,
    html: `<div class="col" id="cA"><h3>Nên</h3>${['Câu mở đầu dưới 3 giây', 'Chữ to, đủ tương phản', 'Một ý chính mỗi cảnh'].map((t, i) => `<div class="rw" id="a${i}"><i>+</i>${t}</div>`).join('')}</div>
<div class="col" id="cB"><h3>Không nên</h3>${['Giới thiệu dài dòng', 'Nhạc át giọng đọc', 'Nhồi quá nhiều chữ'].map((t, i) => `<div class="rw" id="b${i}"><i>−</i>${t}</div>`).join('')}</div>`,
    js: `rise("#cA h3,#cB h3",.2,.15);
[0,1,2].forEach(i=>{tl.fromTo("#a"+i,{opacity:0,x:-60},{opacity:1,x:0,duration:.5,ease:"power3.out"},.9+i*1.1);tl.fromTo("#a"+i+" i",{scale:0},{scale:1,duration:.4,ease:"back.out(3)"},1+i*1.1);
 tl.fromTo("#b"+i,{opacity:0,x:60},{opacity:1,x:0,duration:.5,ease:"power3.out"},1.45+i*1.1);tl.fromTo("#b"+i+" i",{scale:0},{scale:1,duration:.4,ease:"back.out(3)"},1.55+i*1.1);});
out(".col",5.45);`,
  },
  {
    slug: 'browser-callout', name: 'Khoanh vùng trên trang web', group: 'Giải thích', duration: 6,
    desc: 'Cửa sổ trình duyệt hiện lên, vòng tròn tự vẽ khoanh vào một nút, máy quay đẩy vào vùng đó và chú thích hiện ra.',
    use: 'Hướng dẫn thao tác trên web, chỉ chỗ bấm, giải thích tính năng.',
    css: `#cam{position:absolute;inset:0;transform-origin:1180px 600px}
#bw{position:absolute;left:260px;top:140px;width:1400px;height:820px;border-radius:30px;background:#f4f5f7;overflow:hidden;box-shadow:0 60px 140px #000b}
#tb{height:70px;background:#e3e5ea;display:flex;align-items:center;gap:12px;padding:0 28px}
#tb i{width:16px;height:16px;border-radius:50%;background:#c4c8cf}#tb span{margin-left:24px;flex:1;height:36px;border-radius:18px;background:#fff}
.blk{position:absolute;border-radius:16px;background:#dfe2e8}
#btn{position:absolute;left:810px;top:420px;width:320px;height:96px;border-radius:24px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:800;font-size:36px}
#ov{position:absolute;inset:0;width:1920px;height:1080px}
#ov ellipse{fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round}
#note{position:absolute;left:1240px;top:780px;padding:22px 34px;border-radius:24px;background:var(--accent);color:#111;font-family:"BVP";font-weight:800;font-size:40px}`,
    html: `<div id="cam"><div id="bw"><div id="tb"><i></i><i></i><i></i><span></span></div>
<div class="blk" style="left:60px;top:130px;width:620px;height:60px"></div><div class="blk" style="left:60px;top:220px;width:900px;height:30px"></div><div class="blk" style="left:60px;top:270px;width:780px;height:30px"></div>
<div class="blk" style="left:60px;top:360px;width:600px;height:380px"></div><div id="btn" data-var-text="nut">Tạo video ngay</div></div>
<svg id="ov" viewBox="0 0 1920 1080"><ellipse id="el" cx="1230" cy="608" rx="240" ry="100" transform="rotate(-4 1230 608)"/></svg></div>
<div id="note" data-var-text="chuthich">Bấm vào đây để bắt đầu</div>`,
    js: `const el=$("#el"),L=el.getTotalLength();el.style.strokeDasharray=L;
tl.fromTo("#bw",{opacity:0,y:80,scale:.95},{opacity:1,y:0,scale:1,duration:.8,ease:"expo.out"},.1);
tl.fromTo(el,{strokeDashoffset:L},{strokeDashoffset:0,duration:.8,ease:"power2.inOut"},1.2);
tl.fromTo("#cam",{scale:1},{scale:1.55,duration:1.3,ease:"power3.inOut"},2.1);
pop("#note",3.2);
out("#cam,#note",5.45);`,
  },
  {
    slug: 'quote-card', name: 'Thẻ trích dẫn', group: 'Giải thích', duration: 6,
    desc: 'Dấu ngoặc kép lớn bật vào, câu trích dẫn hiện theo từng dòng, gạch nhấn chạy dưới tên người nói.',
    use: 'Lời khách hàng, câu nói nổi tiếng, nhận xét chuyên gia.',
    css: `#qm{position:absolute;left:220px;top:110px;font-family:"BVP";font-weight:900;font-size:420px;line-height:1;color:var(--accent)}
#qt{position:absolute;left:300px;right:260px;top:340px}
#qt .l{overflow:hidden}#qt .l span{display:block;font-family:"BVP";font-weight:800;font-size:72px;line-height:1.3;color:var(--fg)}
#au{position:absolute;left:300px;top:790px;font-family:"BVP";font-weight:700;font-size:40px;color:var(--fg)}
#au small{display:block;margin-top:6px;font-weight:600;font-size:30px;color:var(--muted)}
#ul{position:absolute;left:300px;top:770px;width:120px;height:8px;border-radius:4px;background:var(--accent2);transform-origin:left center}`,
    html: `<div id="qm">“</div><div id="qt">${['Từ khi dùng video ngắn,', 'khách tự tìm đến shop', 'nhiều gấp ba lần trước.'].map((t, i) => `<div class="l" data-layout-allow-overflow><span id="q${i}">${t}</span></div>`).join('')}</div>
<div id="ul"></div><div id="au"><span data-var-text="ten">Chị Hồng Nhung</span><small data-var-text="vaitro">Chủ tiệm bánh Nhà Mây</small></div>`,
    js: `tl.fromTo("#qm",{scale:0,rotation:-30},{scale:1,rotation:0,duration:.7,ease:"back.out(2.4)"},.1);
tl.fromTo(["#q0","#q1","#q2"],{yPercent:110},{yPercent:0,duration:.8,ease:"expo.out",stagger:.25},.6);
tl.fromTo("#ul",{scaleX:0},{scaleX:1,duration:.5,ease:"power3.out"},1.9);
rise("#au",2.1);
out("#qm,#qt,#ul,#au",5.45);`,
  },
  {
    slug: 'notif-stack', name: 'Thông báo đổ dồn', group: 'Giải thích', duration: 6,
    desc: 'Các thông báo kiểu điện thoại rơi xuống xếp chồng, thông báo cũ lùi sâu và mờ dần, số đếm trên biểu tượng tăng lên.',
    use: 'Đơn hàng về liên tục, tin nhắn khách hàng, hiệu ứng "bùng nổ" sau chiến dịch.',
    css: `#stk{position:absolute;left:560px;top:470px;width:800px;height:600px;perspective:1600px}
.nt{position:absolute;left:0;top:0;width:800px;height:150px;border-radius:40px;background:#ffffffee;display:flex;align-items:center;gap:28px;padding:0 36px;box-shadow:0 30px 60px #0007}
.nt i{flex:none;width:86px;height:86px;border-radius:24px;background:var(--accent)}
.nt b{display:block;font-family:"BVP";font-weight:800;font-size:36px;color:#111}
.nt span{display:block;font-family:"BVP";font-weight:600;font-size:28px;color:#555}
#bd{position:absolute;left:1300px;top:400px;min-width:110px;height:110px;border-radius:55px;background:#ef4444;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 24px;font-family:"BVP";font-weight:900;font-size:56px}`,
    html: `<div id="stk" data-layout-allow-overlap>${['Đơn hàng mới #1024', 'Đơn hàng mới #1025', 'Khách hỏi giá căn 2PN', 'Đơn hàng mới #1026', 'Đơn hàng mới #1027'].map((t, i) => `<div class="nt" id="nt${i}"><i></i><div><b>${t}</b><span>vừa xong</span></div></div>`).join('')}</div><div id="bd">0</div>`,
    js: `const n=$$(".nt");const st={k:0};const ap=()=>n.forEach((el,i)=>{const d=st.k-1-i;if(d<0){el.style.opacity="0";return;}const z=Math.min(d,4);el.style.opacity=String(Math.max(0,1-z*.22));el.style.transform="translateY("+(z*-34)+"px) scale("+(1-z*.06)+")";el.style.zIndex=String(i+1);el.lastElementChild.style.opacity=d>=1?"0":"1";el.firstElementChild.style.opacity=d>=1?".5":"1";});ap();
n.forEach((el,i)=>{tl.fromTo(el,{y:-300},{y:0,duration:.5,ease:"back.out(1.4)",immediateRender:false},.4+i*.75);tl.to(st,{k:i+1,duration:.01,onUpdate:ap},.4+i*.75);});
pop("#bd",.3);count("#bd",27,.4,3.6);
out("#stk,#bd",5.45);`,
  },
  {
    slug: 'search-suggest', name: 'Ô tìm kiếm gợi ý', group: 'Giải thích', duration: 6,
    desc: 'Ô tìm kiếm lớn, chữ gõ từng ký tự, danh sách gợi ý thả xuống, dòng phù hợp sáng lên rồi được chọn.',
    use: 'Nói về từ khoá khách tìm, SEO, minh hoạ cách tra cứu.',
    css: `#sb{position:absolute;left:360px;top:250px;width:1200px;height:130px;border-radius:65px;background:var(--card);border:3px solid #ffffff1c;display:flex;align-items:center;padding:0 56px;font-family:"BVP";font-weight:700;font-size:48px;color:var(--fg)}
#sb svg{width:54px;height:54px;margin-right:30px;flex:none}
#cur{display:inline-block;width:5px;height:56px;background:var(--accent);margin-left:6px}
#dd{position:absolute;left:400px;top:410px;width:1120px;border-radius:40px;background:var(--card);border:2px solid #ffffff12;overflow:hidden;transform-origin:top center}
.sg{height:110px;display:flex;align-items:center;padding:0 50px;font-family:"BVP";font-weight:600;font-size:40px;color:var(--muted)}
.sg.on{background:color-mix(in srgb,var(--accent) 22%,transparent);color:var(--fg)}`,
    html: `<div id="sb"><svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="7" fill="none" stroke="var(--muted)" stroke-width="2.4"/><path d="M15.5 15.5 L21 21" stroke="var(--muted)" stroke-width="2.4" stroke-linecap="round"/></svg><span id="ty"></span><span id="cur"></span></div>
<div id="dd">${['căn hộ gần biển giá tốt', 'căn hộ gần biển Đà Nẵng', 'căn hộ gần biển cho thuê', 'căn hộ gần biển trả góp'].map((t, i) => `<div class="sg" id="g${i}">${t}</div>`).join('')}</div>`,
    js: `const Q="căn hộ gần biển",ty=$("#ty"),o={n:0};
tl.fromTo("#sb",{opacity:0,scale:.9},{opacity:1,scale:1,duration:.6,ease:"expo.out"},.1);
tl.fromTo(o,{n:0},{n:Q.length,duration:1.3,ease:"none",onUpdate:()=>{ty.textContent=Q.slice(0,Math.round(o.n))}},.6);
tl.fromTo("#dd",{scaleY:0,opacity:0},{scaleY:1,opacity:1,duration:.5,ease:"expo.out"},1.9);
tl.fromTo(".sg",{opacity:0,x:-30},{opacity:1,x:0,duration:.35,stagger:.08},2);
tl.set("#g0",{attr:{class:"sg on"}},2.8);tl.set("#g0",{attr:{class:"sg"}},3.3);tl.set("#g1",{attr:{class:"sg on"}},3.3);
tl.fromTo("#g1",{scale:1},{scale:1.03,duration:.15,yoyo:true,repeat:1},3.9);
tl.fromTo("#cur",{opacity:1},{opacity:0,duration:.01,repeat:9,yoyo:true,repeatDelay:.3},0);
out("#sb,#dd",5.45);`,
  },
  {
    slug: 'marker-highlight', name: 'Bút dạ quang tô từ khoá', group: 'Chữ', duration: 6,
    desc: 'Đoạn văn hiện ra, nét bút dạ quang quét lần lượt qua các từ khoá theo nhịp đọc, đoạn còn lại mờ đi.',
    use: 'Nhấn ý chính trong trích dẫn, điều khoản, đoạn giải thích.',
    css: `#pa{position:absolute;left:240px;right:240px;top:300px;font-family:"BVP";font-weight:700;font-size:66px;line-height:1.55;color:var(--fg)}
.hl{position:relative;display:inline-block}
.hl i{position:absolute;left:-6px;right:-6px;top:18%;bottom:8%;background:var(--accent2);opacity:.85;z-index:0;transform-origin:left center;border-radius:10px}
.hl span{position:relative;z-index:1}`,
    html: `<div id="pa" data-layout-allow-overlap>Khách không mua sản phẩm, họ mua <span class="hl" id="h0"><i></i><span>kết quả</span></span> mà sản phẩm mang lại. Video tốt cho họ <span class="hl" id="h1"><i></i><span>thấy trước</span></span> kết quả đó trong <span class="hl" id="h2"><i></i><span>vài giây đầu</span></span>.</div>`,
    js: `rise("#pa",.2);
[0,1,2].forEach(i=>{tl.fromTo("#h"+i+" i",{scaleX:0},{scaleX:1,duration:.55,ease:"power2.inOut"},1.2+i*1.1);tl.to("#h"+i+" span",{color:"#111",duration:.2},1.45+i*1.1);});
tl.to("#pa",{opacity:.55,duration:.5},4.3);
out("#pa",5.45);`,
  },
  {
    slug: 'type-correct', name: 'Gõ chữ rồi sửa từ', group: 'Chữ', duration: 6,
    desc: 'Dòng chữ gõ như máy đánh chữ, con trỏ dừng, xoá lùi một từ rồi gõ lại từ đúng với màu nhấn.',
    use: 'Đổi góc nhìn ("không phải… mà là…"), chơi chữ, câu hook gây tò mò.',
    css: `#ln{position:absolute;left:0;right:0;top:440px;text-align:center;font-family:"BVP";font-weight:900;font-size:110px;color:var(--fg);white-space:nowrap}
#ln em{font-style:normal;color:var(--accent)}
#cur{display:inline-block;width:10px;height:110px;margin-left:8px;vertical-align:-14px;background:var(--accent2)}`,
    html: `<div id="ln"><span id="a"></span><em id="b"></em><span id="cur"></span></div>`,
    js: `const A="Video là để ",B1="giải trí",B2="bán hàng",a=$("#a"),b=$("#b"),o={n:0,d:0,m:0};
tl.fromTo(o,{n:0},{n:A.length+B1.length,duration:1.6,ease:"none",onUpdate:()=>{const k=Math.round(o.n);a.textContent=A.slice(0,k);b.textContent=k>A.length?B1.slice(0,k-A.length):"";b.style.color="var(--fg)";}},.3);
tl.to(o,{d:B1.length,duration:.6,ease:"none",onUpdate:()=>{b.textContent=B1.slice(0,B1.length-Math.round(o.d));}},2.5);
tl.to(o,{m:B2.length,duration:.7,ease:"none",onUpdate:()=>{b.style.color="var(--accent)";b.textContent=B2.slice(0,Math.round(o.m));}},3.2);
tl.fromTo("#ln",{scale:1},{scale:1.06,duration:.3,yoyo:true,repeat:1,ease:"power2.out"},4);
tl.fromTo("#cur",{opacity:1},{opacity:0,duration:.01,repeat:11,yoyo:true,repeatDelay:.35},0);
out("#ln",5.45);`,
  },
  {
    slug: 'outline-fill', name: 'Chữ viền đổ đầy màu', group: 'Chữ', duration: 5,
    desc: 'Chữ lớn chỉ có viền vẽ ra trước, sau đó màu đổ đầy từ dưới lên như nước dâng, dòng phụ hiện bên dưới.',
    use: 'Tiêu đề chương, con số lớn, tên thương hiệu.',
    css: `.ow{position:absolute;left:0;right:0;top:330px;text-align:center;font-family:"BVP";font-weight:900;font-size:260px;letter-spacing:-.02em;line-height:1.1}
#o1{color:transparent;-webkit-text-stroke:4px var(--fg)}
#o2{color:var(--accent);clip-path:inset(100% 0 0 0)}
#sub{position:absolute;left:0;right:0;top:680px;text-align:center;font-family:"JBM";font-weight:700;font-size:36px;letter-spacing:.3em;color:var(--muted)}`,
    html: `<div class="ow" id="o1" data-var-text="chu">CHƯƠNG 2</div><div class="ow" id="o2" data-var-text="chu" data-layout-allow-overlap>CHƯƠNG 2</div><div id="sub" data-var-text="phu">TĂNG TỐC</div>`,
    js: `tl.fromTo("#o1",{opacity:0,scale:1.1},{opacity:1,scale:1,duration:.8,ease:"expo.out"},.2);
const c={p:100};tl.fromTo(c,{p:100},{p:0,duration:1.4,ease:"power2.inOut",onUpdate:()=>{$("#o2").style.clipPath="inset("+c.p+"% 0 0 0)"}},1);
rise("#sub",2.3);
out(".ow,#sub",4.45);`,
  },
  {
    slug: 'circle-iris', name: 'Chuyển cảnh vòng tròn mở', group: 'Chuyển cảnh', duration: 3,
    desc: 'Một chấm màu ở giữa nở thành vòng tròn phủ kín cảnh cũ, rồi vòng thứ hai mở ra từ đó để lộ cảnh mới.',
    use: 'Chuyển đoạn mềm mại, chuyển sang chủ đề mới, hiệu ứng "zoom vào".',
    css: `.scn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:150px}
#A{background:var(--card);color:var(--fg)}#B{background:var(--bg);color:var(--accent)}
#ir{position:absolute;left:960px;top:540px;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;background:var(--accent)}`,
    html: `<div class="scn" id="A" data-var-text="canhA" data-layout-allow-occlusion>Trước</div><div class="scn" id="B" data-var-text="canhB" data-layout-allow-occlusion style="clip-path:circle(0% at 50% 50%)">Sau</div><div id="ir"></div>`,
    js: `tl.fromTo("#ir",{scale:0},{scale:1,duration:.25,ease:"back.out(3)"},.3);
tl.to("#ir",{scale:130,duration:.8,ease:"power3.in"},.6);
const c={r:0};tl.fromTo(c,{r:0},{r:75,duration:.9,ease:"power3.out",onUpdate:()=>{$("#B").style.clipPath="circle("+c.r+"% at 50% 50%)"}},1.45);
tl.set("#ir",{opacity:0},1.45);
tl.fromTo("#B",{scale:1.1},{scale:1,duration:1,ease:"expo.out"},1.45);`,
  },
];
