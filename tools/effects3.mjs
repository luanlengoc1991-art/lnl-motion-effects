// Đợt 3 (18 hiệu ứng): bất động sản, mạng xã hội, 3D, chữ, chuyển cảnh. Cùng quy ước với effects.mjs.
export const BATCH3 = [
  {
    slug: 'floorplan-draw', name: 'Mặt bằng căn hộ tự vẽ', group: 'Bất động sản', duration: 7,
    desc: 'Nét tường vẽ dần thành mặt bằng căn hộ, từng phòng tô màu lần lượt kèm tên và diện tích, tổng diện tích đếm lên.',
    use: 'Giới thiệu căn hộ mẫu, layout nhà phố, so sánh loại căn.',
    css: `#fp{position:absolute;left:220px;top:150px;width:980px;height:780px}
#fp .wl{fill:none;stroke:var(--fg);stroke-width:10;stroke-linecap:square}
#fp .rm{opacity:0}
.rl{position:absolute;text-align:center;font-family:"BVP";font-weight:800;font-size:30px;color:var(--fg)}
.rl small{display:block;font-family:"JBM";font-weight:700;font-size:30px;color:var(--fg)}
#tot{position:absolute;left:1300px;top:330px}
#tot small{display:block;font-family:"JBM";font-weight:700;font-size:28px;letter-spacing:.2em;color:var(--muted)}
#tot b{display:block;font-family:"BVP";font-weight:900;font-size:150px;line-height:1.1;color:var(--accent)}
#tot span{display:block;font-family:"BVP";font-weight:700;font-size:40px;color:var(--fg)}`,
    html: `<svg id="fp" viewBox="0 0 980 780">
<rect class="rm" id="r0" x="10" y="10" width="560" height="440" fill="color-mix(in srgb,var(--accent) 30%,transparent)"/>
<rect class="rm" id="r1" x="570" y="10" width="400" height="330" fill="color-mix(in srgb,var(--accent2) 30%,transparent)"/>
<rect class="rm" id="r2" x="570" y="340" width="400" height="430" fill="color-mix(in srgb,var(--accent2) 22%,transparent)"/>
<rect class="rm" id="r3" x="10" y="450" width="300" height="320" fill="color-mix(in srgb,var(--accent) 20%,transparent)"/>
<rect class="rm" id="r4" x="310" y="450" width="260" height="320" fill="#ffffff14"/>
<path class="wl" id="w0" d="M10 10 H970 V770 H10 Z"/>
<path class="wl" id="w1" d="M570 10 V250 M570 330 V770 M570 340 H860"/>
<path class="wl" id="w2" d="M10 450 H200 M280 450 H570 M310 450 V770"/></svg>
${[['Phòng khách + bếp', '32 m²', 220 + 290, 150 + 230], ['Phòng ngủ 1', '15 m²', 220 + 770, 150 + 175], ['Phòng ngủ 2', '18 m²', 220 + 770, 150 + 555], ['Ban công', '6 m²', 220 + 160, 150 + 610], ['WC', '5 m²', 220 + 440, 150 + 610]].map(([n, a, x, y], i) => `<div class="rl" id="l${i}" style="left:${x - 160}px;top:${y - 40}px;width:320px">${n}<small>${a}</small></div>`).join('')}
<div id="tot"><small>DIỆN TÍCH</small><b id="tn">0</b><span data-var-text="loaican">Căn 2 phòng ngủ</span></div>`,
    js: `["#w0","#w1","#w2"].forEach((s,i)=>{const p=$(s),L=p.getTotalLength();p.style.strokeDasharray=L;tl.fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:1.1,ease:"power2.inOut"},.2+i*.45);});
[0,1,2,3,4].forEach(i=>{tl.fromTo("#r"+i,{opacity:0},{opacity:1,duration:.4},1.8+i*.45);tl.fromTo("#l"+i,{opacity:0,y:20},{opacity:1,y:0,duration:.4,ease:"back.out(2)"},1.9+i*.45);});
rise("#tot small,#tot span",1.6,.1);tl.fromTo("#tot b",{opacity:0},{opacity:1,duration:.2},1.8);count("#tn",76,1.8,2.4,0,""," m²");
out("#fp,.rl,#tot",6.45);`,
  },
  {
    slug: 'location-radius', name: 'Vị trí và bán kính tiện ích', group: 'Bất động sản', duration: 7,
    desc: 'Bản đồ đường phố cách điệu, ghim dự án cắm xuống giữa, vòng bán kính lan ra, các tiện ích quanh bật nhãn kèm số phút di chuyển.',
    use: 'Giới thiệu vị trí dự án, kết nối giao thông, tiện ích xung quanh.',
    css: `#mp{position:absolute;inset:0}
#mp path{fill:none;stroke:#ffffff14;stroke-width:14;stroke-linecap:round}
#mp path.mj{stroke:#ffffff24;stroke-width:26}
.rg{position:absolute;left:960px;top:540px;border-radius:50%;border:3px solid var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent)}
#pin{position:absolute;left:910px;top:420px;width:100px;height:120px}
.am{position:absolute;display:flex;align-items:center;gap:16px;padding:14px 24px 14px 14px;border-radius:999px;background:var(--card);border:2px solid #ffffff1a;font-family:"BVP";font-weight:700;font-size:30px;color:var(--fg);white-space:nowrap}
.am i{width:44px;height:44px;border-radius:50%;background:var(--accent2)}
.am b{color:var(--accent);font-weight:900}`,
    html: `<svg id="mp" viewBox="0 0 1920 1080"><path class="mj" d="M0 600 C 500 560, 1300 640, 1920 580"/><path class="mj" d="M880 0 C 940 400, 1000 700, 1040 1080"/><path d="M0 250 H1920"/><path d="M0 880 H1920"/><path d="M300 0 V1080"/><path d="M1550 0 V1080"/><path d="M300 250 L 1550 880"/></svg>
<div class="rg" id="g1" style="width:500px;height:500px;margin:-250px 0 0 -250px"></div><div class="rg" id="g2" style="width:900px;height:900px;margin:-450px 0 0 -450px;opacity:.5"></div>
<svg id="pin" viewBox="0 0 100 120"><path d="M50 118 C 20 80, 6 60, 6 42 A44 44 0 0 1 94 42 C 94 60, 80 80, 50 118 Z" fill="var(--accent)"/><circle cx="50" cy="42" r="16" fill="var(--bg)"/></svg>
${[['Trường học', '3 phút', 420, 330], ['Siêu thị', '5 phút', 1260, 300], ['Bệnh viện', '8 phút', 1320, 760], ['Công viên', '2 phút', 380, 720], ['Trung tâm', '15 phút', 760, 900]].map(([n, t, x, y], i) => `<div class="am" id="a${i}" style="left:${x}px;top:${y}px"><i></i>${n} · <b>${t}</b></div>`).join('')}`,
    js: `tl.fromTo("#mp path",{opacity:0},{opacity:1,duration:.6,stagger:.05},.1);
tl.fromTo("#pin",{y:-300,opacity:0},{y:0,opacity:1,duration:.7,ease:"bounce.out"},.6);
tl.fromTo("#g1",{scale:0},{scale:1,duration:1,ease:"expo.out"},1.2);tl.fromTo("#g2",{scale:0},{scale:1,duration:1.3,ease:"expo.out"},1.4);
[0,1,2,3,4].forEach(i=>tl.fromTo("#a"+i,{opacity:0,scale:.6},{opacity:1,scale:1,duration:.45,ease:"back.out(2.2)"},2+i*.35));
out("#mp,.rg,#pin,.am",6.45);`,
  },
  {
    slug: 'unit-specs', name: 'Thẻ thông số căn', group: 'Bất động sản', duration: 6,
    desc: 'Thẻ lớn trượt vào, bốn ô thông số (diện tích, phòng ngủ, hướng, giá) bật lần lượt, số đếm lên, giá cuối nhấn màu.',
    use: 'Thông tin nhanh một loại căn, một lô đất, một sản phẩm.',
    css: `#uc{position:absolute;left:240px;top:170px;width:1440px;height:740px;border-radius:52px;background:var(--card);border:2px solid #ffffff12;padding:64px}
#uc h2{margin:0;font-family:"BVP";font-weight:900;font-size:76px;color:var(--fg)}
#uc h2 em{font-style:normal;color:var(--accent)}
.gd{position:absolute;left:64px;right:64px;top:250px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px}
.sp{height:400px;border-radius:36px;background:#ffffff08;border:2px solid #ffffff10;padding:36px 30px;display:flex;flex-direction:column;justify-content:flex-end}
.sp small{font-family:"JBM";font-weight:700;font-size:28px;letter-spacing:.14em;color:var(--muted)}
.sp b{margin-top:14px;font-family:"BVP";font-weight:900;font-size:52px;line-height:1.1;color:var(--fg);white-space:nowrap}
.sp.hi{background:var(--accent)}.sp.hi small{color:#111b}.sp.hi b{color:#111}`,
    html: `<div id="uc"><h2 data-var-text="tieude">Căn <em>B-12.08</em> · View sông</h2><div class="gd">
<div class="sp" id="s0"><small>DIỆN TÍCH</small><b id="n0">0</b></div><div class="sp" id="s1"><small>PHÒNG NGỦ</small><b id="n1">0</b></div>
<div class="sp" id="s2"><small>HƯỚNG</small><b data-var-text="huong">Đông Nam</b></div><div class="sp hi" id="s3"><small>GIÁ TỪ</small><b id="n3">0</b></div></div></div>`,
    js: `tl.fromTo("#uc",{opacity:0,y:120},{opacity:1,y:0,duration:.8,ease:"expo.out"},.1);
tl.fromTo("#uc h2",{opacity:0,x:-40},{opacity:1,x:0,duration:.6,ease:"power3.out"},.5);
[0,1,2,3].forEach(i=>tl.fromTo("#s"+i,{opacity:0,y:60,scale:.92},{opacity:1,y:0,scale:1,duration:.55,ease:"back.out(1.8)"},.9+i*.25));
count("#n0",74.5,1,1.4,1,""," m²");count("#n1",2,1.25,.8);count("#n3",3.6,1.75,1.4,1,""," tỷ");
tl.fromTo("#s3",{scale:1},{scale:1.05,duration:.3,yoyo:true,repeat:1,ease:"power2.out"},3.4);
out("#uc",5.45);`,
  },
  {
    slug: 'payment-plan', name: 'Tiến độ thanh toán', group: 'Bất động sản', duration: 6,
    desc: 'Thanh ngang chia đoạn theo tỉ lệ thanh toán, từng đoạn mọc ra kèm phần trăm và mốc thời gian bên dưới, ưu đãi nổi lên cuối.',
    use: 'Phương thức thanh toán, trả góp, các đợt đóng tiền.',
    css: `#hd{position:absolute;left:200px;top:180px;font-family:"BVP";font-weight:900;font-size:72px;color:var(--fg)}
#bar{position:absolute;left:200px;top:400px;width:1520px;height:120px;display:flex;gap:10px}
.sg{height:100%;border-radius:28px;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:54px;color:#111;transform-origin:left center}
.sg:nth-child(1){background:var(--accent)}.sg:nth-child(2){background:var(--accent2)}.sg:nth-child(3){background:#9aa7b8}
.mk{position:absolute;top:560px;font-family:"BVP";font-weight:700;font-size:34px;color:var(--fg)}
.mk small{display:block;font-family:"BVP";font-weight:600;font-size:28px;color:var(--muted)}
#gift{position:absolute;left:200px;top:760px;padding:24px 40px;border-radius:28px;border:3px dashed var(--accent2);font-family:"BVP";font-weight:800;font-size:40px;color:var(--accent2)}`,
    html: `<div id="hd" data-var-text="tieude">Thanh toán linh hoạt</div>
<div id="bar"><div class="sg" id="g0" style="flex:30">30%</div><div class="sg" id="g1" style="flex:40">40%</div><div class="sg" id="g2" style="flex:30">30%</div></div>
<div class="mk" id="m0" style="left:200px">Ký hợp đồng<small>Tháng 1</small></div><div class="mk" id="m1" style="left:${200 + 1520 * 0.3 + 10}px">Trong xây dựng<small>Tháng 2 – 18</small></div><div class="mk" id="m2" style="left:${200 + 1520 * 0.7 + 20}px">Nhận nhà<small>Quý 4/2027</small></div>
<div id="gift" data-var-text="uudai">Tặng gói nội thất 200 triệu khi thanh toán sớm</div>`,
    js: `rise("#hd",.1);
[0,1,2].forEach(i=>{tl.fromTo("#g"+i,{scaleX:0},{scaleX:1,duration:.7,ease:"expo.out"},.6+i*.55);tl.fromTo("#m"+i,{opacity:0,y:20},{opacity:1,y:0,duration:.45,ease:"power3.out"},.9+i*.55);});
tl.fromTo("#gift",{opacity:0,scale:.85},{opacity:1,scale:1,duration:.6,ease:"back.out(2)"},2.7);
out("#hd,#bar,.mk,#gift",5.45);`,
  },
  {
    slug: 'tower-floors', name: 'Toà nhà sáng từng tầng', group: 'Bất động sản', duration: 6,
    desc: 'Khối toà nhà cách điệu, các tầng bật đèn từ dưới lên, một tầng được chọn sáng màu nhấn và kéo nhãn chú thích ra ngoài.',
    use: 'Giới thiệu toà, tầng đẹp, tầng tiện ích, căn còn trống.',
    css: `#tw{position:absolute;left:640px;top:100px;width:420px;height:880px;border-radius:18px 18px 0 0;background:#151a22;border:3px solid #ffffff1c;padding:18px;display:flex;flex-direction:column-reverse;gap:8px}
.fl{flex:1;border-radius:6px;background:#ffffff0c;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:6px}
.fl i{border-radius:3px;background:#ffffff10}
#cl{position:absolute;left:1060px;top:0;height:6px;background:var(--accent);transform-origin:left center}
#lb{position:absolute;left:1260px;padding:28px 40px;border-radius:30px;background:var(--accent);color:#111}
#lb b{display:block;font-family:"BVP";font-weight:900;font-size:56px}
#lb span{display:block;font-family:"BVP";font-weight:700;font-size:32px}
#nm{position:absolute;left:180px;top:420px;font-family:"BVP";font-weight:900;font-size:84px;line-height:1.1;color:var(--fg)}
#nm small{display:block;font-family:"JBM";font-weight:700;font-size:30px;letter-spacing:.2em;color:var(--muted)}`,
    html: `<div id="nm"><small>TOÀ</small><span data-var-text="toa">Sky A</span></div>
<div id="tw">${Array.from({ length: 22 }, (_, i) => `<div class="fl" id="f${i}">${'<i></i>'.repeat(6)}</div>`).join('')}</div>
<div id="cl"></div><div id="lb"><b data-var-text="tang">Tầng 18</b><span data-var-text="mota">Hồ bơi vô cực · Sky bar</span></div>`,
    js: `const N=22,sel=17,fl=$$(".fl");
tl.fromTo("#tw",{opacity:0,y:200},{opacity:1,y:0,duration:.8,ease:"expo.out"},.1);
fl.forEach((f,i)=>tl.to(f.querySelectorAll("i"),{background:"color-mix(in srgb,var(--accent2) 70%,transparent)",duration:.12,stagger:.01},.8+i*.07));
const y=100+18+(N-1-sel)*((880-36-8*(N-1))/N+8)+((880-36-8*(N-1))/N)/2;
tl.set("#cl",{top:y-3},0);tl.set("#lb",{top:y-80},0);
tl.to(fl[sel],{background:"var(--accent)",duration:.3},2.6);
tl.fromTo("#cl",{scaleX:0,width:200},{scaleX:1,duration:.4,ease:"power3.out"},2.8);
tl.fromTo("#lb",{opacity:0,x:-30},{opacity:1,x:0,duration:.5,ease:"back.out(1.8)"},3.1);
rise("#nm",.3);
out("#tw,#cl,#lb,#nm",5.45);`,
  },
  {
    slug: 'like-burst', name: 'Tim nổ và số thích', group: 'Mạng xã hội', duration: 4,
    desc: 'Nút tim lớn được bấm, tim co lại rồi bung đỏ, vòng hạt nổ tỏa ra, số lượt thích nhảy lên.',
    use: 'Kêu gọi thả tim, khoe tương tác, mở đầu video mạng xã hội.',
    css: `#ht{position:absolute;left:810px;top:290px;width:300px;height:300px}
#ht path{fill:none;stroke:var(--fg);stroke-width:14;stroke-linejoin:round}
#hf{position:absolute;left:810px;top:290px;width:300px;height:300px}
#hf path{fill:#ff3b5c}
.pt{position:absolute;left:950px;top:430px;width:22px;height:22px;border-radius:50%;background:var(--accent2)}
#ct{position:absolute;left:0;right:0;top:650px;text-align:center;font-family:"BVP";font-weight:900;font-size:120px;color:var(--fg)}
#ct small{display:block;font-family:"BVP";font-weight:700;font-size:36px;color:var(--muted)}`,
    html: `<svg id="ht" viewBox="0 0 100 100"><path d="M50 86 C 18 64, 8 46, 8 32 A20 20 0 0 1 50 22 A20 20 0 0 1 92 32 C 92 46, 82 64, 50 86 Z"/></svg>
<svg id="hf" viewBox="0 0 100 100"><path d="M50 86 C 18 64, 8 46, 8 32 A20 20 0 0 1 50 22 A20 20 0 0 1 92 32 C 92 46, 82 64, 50 86 Z"/></svg>
${Array.from({ length: 12 }, (_, i) => `<i class="pt" id="p${i}"></i>`).join('')}<div id="ct"><span id="cn">12.480</span><small>lượt thích</small></div>`,
    js: `tl.fromTo("#ht",{scale:0},{scale:1,duration:.5,ease:"back.out(2)",transformOrigin:"center"},.1);
tl.set("#hf",{scale:0,transformOrigin:"center"},0);
tl.to("#ht",{scale:.82,duration:.15,ease:"power2.in"},.9);
tl.to("#hf",{scale:1.25,duration:.25,ease:"back.out(3)"},1.05);tl.to("#hf",{scale:1,duration:.3,ease:"power2.out"},1.3);
for(let i=0;i<12;i++){const a=i/12*Math.PI*2;tl.fromTo("#p"+i,{x:0,y:0,scale:1,opacity:1},{x:Math.cos(a)*230,y:Math.sin(a)*230,scale:0,opacity:0,duration:.7,ease:"power3.out"},1.05);}
tl.fromTo("#ct",{opacity:0,y:30},{opacity:1,y:0,duration:.4},.4);
count("#cn",12481,1.1,.01);tl.fromTo("#ct",{scale:1},{scale:1.08,duration:.15,yoyo:true,repeat:1},1.1);
out("#ht,#hf,#ct",3.45);`,
  },
  {
    slug: 'live-comments', name: 'Bình luận livestream trôi lên', group: 'Mạng xã hội', duration: 7,
    desc: 'Khung livestream có nhãn LIVE, bình luận của người xem lần lượt hiện ở dưới và đẩy các bình luận cũ trôi lên, mờ dần.',
    use: 'Minh hoạ livestream bán hàng, phản hồi khách, không khí sôi động.',
    css: `#lv{position:absolute;left:560px;top:60px;width:800px;height:960px;border-radius:48px;background:linear-gradient(160deg,#2a2f3a,#12151b);overflow:hidden;border:2px solid #ffffff14}
#tag{position:absolute;left:36px;top:36px;padding:10px 22px;border-radius:12px;background:#ef4444;font-family:"BVP";font-weight:900;font-size:30px;color:#fff}
#vw{position:absolute;left:190px;top:36px;padding:10px 22px;border-radius:12px;background:#0007;font-family:"BVP";font-weight:700;font-size:30px;color:#fff}
#cm{position:absolute;left:30px;right:30px;bottom:40px;height:620px;overflow:hidden}
.c{position:absolute;left:0;bottom:0;max-width:700px;display:flex;align-items:center;gap:16px;padding:14px 24px 14px 14px;border-radius:999px;background:#0008}
.c i{flex:none;width:50px;height:50px;border-radius:50%}
.c span{font-family:"BVP";font-weight:600;font-size:30px;color:#fff;white-space:nowrap}
.c b{color:var(--accent2);font-weight:800}`,
    html: `<div id="lv"><div id="tag">● LIVE</div><div id="vw" data-var-text="nguoixem">2.381 đang xem</div><div id="cm" data-layout-allow-overflow>${[['Thu Hà', 'Căn 2PN còn không shop?', '#f97316'], ['Minh Tuấn', 'Giá bao nhiêu ạ', '#22c55e'], ['Lan Anh', 'Đẹp quá, chốt 1 căn', '#a855f7'], ['Quốc Bảo', 'Có hỗ trợ vay không?', '#3b82f6'], ['Ngọc Mai', 'Gửi mình bảng giá với', '#ec4899'], ['Hữu Phước', '🔥🔥🔥', '#eab308'], ['Thanh Tâm', 'Xem nhà mẫu ở đâu ạ', '#14b8a6']].map(([n, t, c], i) => `<div class="c" id="c${i}"><i style="background:${c}"></i><span><b>${n}</b> ${t}</span></div>`).join('')}</div></div>`,
    js: `const C=$$(".c"),gap=96,st={k:0};const ap=()=>C.forEach((el,i)=>{const d=st.k-1-i;if(d<0){el.style.opacity="0";return;}el.style.transform="translateY("+(-d*gap)+"px)";el.style.opacity=String(Math.max(0,1-d*.16));});ap();
tl.fromTo("#lv",{opacity:0,scale:.92},{opacity:1,scale:1,duration:.7,ease:"expo.out"},.1);
tl.fromTo("#tag",{opacity:1},{opacity:.4,duration:.4,yoyo:true,repeat:7},.5);
C.forEach((el,i)=>tl.to(st,{k:i+1,duration:.35,ease:"power2.out",onUpdate:ap},.8+i*.75));
out("#lv",6.45);`,
  },
  {
    slug: 'follower-odometer', name: 'Đồng hồ số người theo dõi', group: 'Mạng xã hội', duration: 5,
    desc: 'Ảnh đại diện tròn có viền màu, bên cạnh dãy chữ số lăn như đồng hồ công-tơ-mét dừng ở con số mới, nhãn cột mốc bật lên.',
    use: 'Khoe cột mốc người theo dõi, lượt đăng ký kênh, khách hàng.',
    css: `#av{position:absolute;left:300px;top:340px;width:400px;height:400px;border-radius:50%;padding:14px;background:conic-gradient(var(--accent),var(--accent2),var(--accent))}
#av i{display:block;width:100%;height:100%;border-radius:50%;background:linear-gradient(140deg,#3b4252,#1c212a);border:10px solid var(--bg)}
#od{position:absolute;left:800px;top:420px;height:200px;display:flex;gap:10px;overflow:hidden}
.dg{width:120px;height:200px;border-radius:24px;background:var(--card);overflow:hidden;position:relative}
.dg .st{position:absolute;left:0;right:0;top:0}
.dg .st b{display:block;height:200px;line-height:200px;text-align:center;font-family:"BVP";font-weight:900;font-size:130px;color:var(--fg)}
.sep{width:30px;font-family:"BVP";font-weight:900;font-size:130px;line-height:200px;color:var(--muted)}
#lb{position:absolute;left:800px;top:660px;font-family:"BVP";font-weight:700;font-size:44px;color:var(--muted)}
#ms{position:absolute;left:800px;top:260px;padding:14px 30px;border-radius:999px;background:var(--accent2);font-family:"BVP";font-weight:900;font-size:40px;color:#111}`,
    html: `<div id="av"><i></i></div><div id="od" data-layout-allow-overflow data-layout-allow-occlusion></div><div id="lb" data-var-text="nhan">người theo dõi</div><div id="ms" data-var-text="mocmoc">Cột mốc mới!</div>`,
    js: `const T="100.000",od=$("#od");let k=0;const cols=[];
for(const ch of T){if(ch==="."){const s=document.createElement("div");s.className="sep";s.setAttribute("data-layout-ignore","");s.textContent=".";od.appendChild(s);continue;}
 const d=document.createElement("div");d.className="dg";const st=document.createElement("div");st.className="st";st.setAttribute("data-layout-ignore","");
 let h="";for(let r=0;r<3;r++)for(let n=0;n<10;n++)h+="<b>"+n+"</b>";h+="<b>"+ch+"</b>";st.innerHTML=h;d.appendChild(st);od.appendChild(d);cols.push([st,Number(ch),k++]);}
tl.fromTo("#av",{scale:0,rotation:-90},{scale:1,rotation:0,duration:.8,ease:"back.out(1.6)"},.1);
tl.fromTo("#od",{opacity:0},{opacity:1,duration:.3},.4);
cols.forEach(([st,n,i])=>tl.fromTo(st,{y:0},{y:-200*30,duration:1.6+i*.18,ease:"power3.inOut"},.5));
rise("#lb",.6);pop("#ms",2.9);
out("#av,#od,#lb,#ms",4.45);`,
  },
  {
    slug: 'social-post', name: 'Bài đăng nổi tương tác', group: 'Mạng xã hội', duration: 6,
    desc: 'Thẻ bài đăng mạng xã hội trượt vào với ảnh, chú thích và hàng nút; số thích, bình luận, chia sẻ đếm lên lần lượt.',
    use: 'Khoe bài viral, minh hoạ chiến dịch, kết quả quảng cáo.',
    css: `#po{position:absolute;left:600px;top:70px;width:720px;height:940px;border-radius:44px;background:#fff;overflow:hidden;box-shadow:0 60px 140px #000b}
#hd{display:flex;align-items:center;gap:20px;padding:28px 32px}
#hd i{width:72px;height:72px;border-radius:50%;background:var(--accent)}
#hd b{display:block;font-family:"BVP";font-weight:800;font-size:32px;color:#111}
#hd span{display:block;font-family:"BVP";font-weight:600;font-size:28px;color:#555}
#im{height:520px;background:linear-gradient(135deg,var(--accent),var(--accent2))}
#cp{padding:26px 32px 0;font-family:"BVP";font-weight:600;font-size:30px;line-height:1.4;color:#222}
#ac{position:absolute;left:32px;right:32px;bottom:34px;display:flex;justify-content:space-between}
.ab{display:flex;align-items:center;gap:12px;font-family:"BVP";font-weight:900;font-size:36px;color:#111}
.ab i{width:44px;height:44px;border-radius:12px}`,
    html: `<div id="po"><div id="hd"><i></i><div><b data-var-text="ten">LNL Studio</b><span>2 giờ trước</span></div></div><div id="im"></div>
<div id="cp" data-var-text="chuthich">Một ngày ở công trường được kể lại trong 30 giây. Bạn đoán xem cuối video là gì?</div>
<div id="ac"><div class="ab"><i style="background:#ff3b5c"></i><span id="a0">0</span></div><div class="ab"><i style="background:#3b82f6"></i><span id="a1">0</span></div><div class="ab"><i style="background:#22c55e"></i><span id="a2">0</span></div></div></div>`,
    js: `tl.fromTo("#po",{opacity:0,y:200,rotation:6},{opacity:1,y:0,rotation:0,duration:.9,ease:"expo.out"},.1);
tl.fromTo("#im",{scale:1.2},{scale:1,duration:1.4,ease:"power2.out"},.3);
count("#a0",48200,1.2,1.6);count("#a1",3150,1.5,1.5);count("#a2",920,1.8,1.4);
tl.fromTo(".ab",{opacity:0,y:20},{opacity:1,y:0,duration:.4,stagger:.15},1.1);
out("#po",5.45);`,
  },
  {
    slug: 'card-flip', name: 'Thẻ lật 3D', group: '3D', duration: 5,
    desc: 'Thẻ lớn nghiêng trong không gian, lật 180 độ quanh trục dọc để lộ mặt sau với câu trả lời, bóng đổ đổi theo góc lật.',
    use: 'Câu hỏi và đáp án, trước và sau, tiết lộ giá hay quà tặng.',
    css: `#sc{position:absolute;left:560px;top:190px;width:800px;height:700px;perspective:2200px}
#cd{position:absolute;inset:0;transform-style:preserve-3d}
.fc{position:absolute;inset:0;border-radius:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;backface-visibility:hidden;padding:60px;text-align:center}
#fA{background:var(--card);border:2px solid #ffffff1a}
#fB{background:var(--accent);transform:rotateY(180deg)}
.fc small{font-family:"JBM";font-weight:700;font-size:30px;letter-spacing:.2em}
#fA small{color:var(--muted)}#fB small{color:#111b}
.fc b{font-family:"BVP";font-weight:900;font-size:90px;line-height:1.1}
#fA b{color:var(--fg)}#fB b{color:#111}`,
    html: `<div id="sc"><div id="cd" data-layout-allow-overlap data-layout-allow-occlusion><div class="fc" id="fA"><small>CÂU HỎI</small><b data-var-text="cauhoi">Làm video mất bao lâu?</b></div><div class="fc" id="fB" data-layout-allow-occlusion><small>TRẢ LỜI</small><b data-var-text="traloi">Chỉ 15 phút</b></div></div></div>`,
    js: `tl.fromTo("#cd",{opacity:0,y:120,rotationX:20},{opacity:1,y:0,rotationX:8,duration:.9,ease:"expo.out"},.1);
tl.to("#cd",{rotationY:180,rotationX:0,duration:1.1,ease:"power3.inOut"},1.8);
tl.fromTo("#cd",{scale:1},{scale:.92,duration:.55,yoyo:true,repeat:1,ease:"sine.inOut"},1.8);
out("#sc",4.45);`,
  },
  {
    slug: 'depth-layers', name: 'Lớp thẻ tách chiều sâu', group: '3D', duration: 6,
    desc: 'Ba lớp giao diện chồng khít nhau trong góc nghiêng 3D rồi tách ra theo chiều sâu, mỗi lớp lộ nhãn chức năng, sau đó gộp lại.',
    use: 'Giải thích cấu trúc sản phẩm, các lớp dịch vụ, kiến trúc hệ thống.',
    css: `#st{position:absolute;left:560px;top:240px;width:800px;height:600px;perspective:2600px}
#rig{position:absolute;inset:0;transform-style:preserve-3d}
.ly{position:absolute;inset:0;border-radius:44px;border:3px solid;display:flex;align-items:flex-end;padding:40px;font-family:"BVP";font-weight:900;font-size:48px}
#l0{background:#1b2230ee;border-color:#ffffff33;color:var(--fg)}
#l1{background:color-mix(in srgb,var(--accent2) 30%,#1b2230);border-color:var(--accent2);color:var(--fg)}
#l2{background:color-mix(in srgb,var(--accent) 40%,#1b2230);border-color:var(--accent);color:var(--fg)}`,
    html: `<div id="st"><div id="rig" data-layout-allow-overlap><div class="ly" id="l0" data-var-text="lop1">Dữ liệu</div><div class="ly" id="l1" data-var-text="lop2">Xử lý AI</div><div class="ly" id="l2" data-var-text="lop3">Giao diện</div></div></div>`,
    js: `tl.fromTo("#rig",{opacity:0,rotationX:0,rotationZ:0},{opacity:1,rotationX:55,rotationZ:-30,duration:1,ease:"expo.out"},.1);
tl.fromTo("#l0",{z:0},{z:-200,duration:1,ease:"power3.inOut"},1.3);
tl.fromTo("#l2",{z:0},{z:200,duration:1,ease:"power3.inOut"},1.3);
tl.to(["#l0","#l1","#l2"],{z:0,duration:.8,ease:"power3.inOut"},4);
tl.to("#rig",{rotationX:0,rotationZ:0,duration:.8,ease:"power3.inOut"},4.2);
out("#st",5.45);`,
  },
  {
    slug: 'cube-words', name: 'Khối lập phương đổi chữ', group: '3D', duration: 6,
    desc: 'Một dải khối lập phương xoay từng mặt, mỗi lần lật đổi sang một từ mới, câu dẫn bên trái đứng yên.',
    use: 'Liệt kê nhiều lợi ích, nhiều đối tượng khách, "dành cho …".',
    css: `#lead{position:absolute;left:220px;top:470px;font-family:"BVP";font-weight:900;font-size:96px;color:var(--fg)}
#cw{position:absolute;left:880px;top:450px;width:820px;height:150px;perspective:1800px}
#cb{position:absolute;inset:0;transform-style:preserve-3d}
.fa{position:absolute;inset:0;display:flex;align-items:center;padding-left:40px;border-radius:24px;background:var(--accent);font-family:"BVP";font-weight:900;font-size:90px;color:#111;backface-visibility:hidden}
#fa0{transform:translateZ(75px)}#fa1{transform:rotateX(-90deg) translateZ(75px);background:var(--accent2)}#fa2{transform:rotateX(-180deg) translateZ(75px)}#fa3{transform:rotateX(-270deg) translateZ(75px);background:var(--accent2)}`,
    html: `<div id="lead" data-var-text="dan">Dành cho</div><div id="cw"><div id="cb" data-layout-allow-occlusion data-layout-allow-overlap>${['người bán hàng', 'chủ shop', 'nhà môi giới', 'người sáng tạo'].map((t, i) => `<div class="fa" id="fa${i}">${t}</div>`).join('')}</div></div>`,
    js: `rise("#lead",.1);tl.fromTo("#cw",{opacity:0,x:60},{opacity:1,x:0,duration:.6,ease:"expo.out"},.3);
[1,2,3].forEach(k=>tl.to("#cb",{rotationX:90*k,duration:.7,ease:"back.inOut(1.4)"},.9+k*1.15));
out("#lead,#cw",5.45);`,
  },
  {
    slug: 'letter-assemble', name: 'Ký tự bay về xếp chữ', group: 'Chữ', duration: 5,
    desc: 'Các ký tự của từ khoá xuất phát từ những vị trí rải khắp khung hình, xoay và bay về xếp thành chữ hoàn chỉnh.',
    use: 'Tên thương hiệu, từ khoá chủ đề, khoảnh khắc chốt.',
    css: `#wd{position:absolute;left:0;right:0;top:420px;text-align:center;white-space:nowrap}
#wd span{display:inline-block;font-family:"BVP";font-weight:900;font-size:200px;color:var(--fg);letter-spacing:-.01em}
#wd span.sp{width:60px}
#wd span.ac{color:var(--accent)}
#sb{position:absolute;left:0;right:0;top:700px;text-align:center;font-family:"JBM";font-weight:700;font-size:34px;letter-spacing:.3em;color:var(--accent)}`,
    html: `<div id="wd" data-var-text="tu" data-layout-allow-overlap></div><div id="sb" data-var-text="phu">BẤT ĐỘNG SẢN XANH</div>`,
    js: `const W="ECO CITY",wd=$("#wd");wd.innerHTML=[...W].map(c=>c===" "?'<span class="sp"> </span>':"<span>"+c+"</span>").join("");
const L=$$("#wd span");
L.forEach((s,i)=>{const a=i*2.4,r=700+((i*137)%300);tl.fromTo(s,{x:Math.cos(a)*r,y:Math.sin(a)*r*.6,rotation:(i%2?1:-1)*(120+i*20),opacity:0,scale:.4},{x:0,y:0,rotation:0,opacity:1,scale:1,duration:1.2,ease:"expo.out"},.2+i*.07);});
L.forEach((s,i)=>tl.set(s,{attr:{class:s.className==="sp"?"sp":"ac"}},2.1+i*.04));
rise("#sb",2.3);
out("#wd,#sb",4.45);`,
  },
  {
    slug: 'marquee-rows', name: 'Hai dải chữ chạy ngược chiều', group: 'Chữ', duration: 6,
    desc: 'Hai dải chữ lớn chạy ngang ngược chiều nhau, dải dưới viền rỗng, ở giữa bật lên một khẩu hiệu đứng yên.',
    use: 'Nền chữ động cho phần chuyển đoạn, khẩu hiệu thương hiệu, poster động.',
    css: `.mq{position:absolute;left:0;white-space:nowrap;font-family:"BVP";font-weight:900;font-size:180px;line-height:1}
#m0{top:200px;color:var(--fg)}#m1{top:700px;color:transparent;-webkit-text-stroke:3px var(--muted)}
#ct{position:absolute;left:560px;top:445px;width:800px;padding:36px;border-radius:36px;background:var(--accent);text-align:center;font-family:"BVP";font-weight:900;font-size:76px;color:#111}`,
    html: `<div class="mq" id="m0" data-layout-allow-overflow>${'SÁNG TẠO · NHANH · ĐẸP · '.repeat(4)}</div><div class="mq" id="m1" data-layout-allow-overflow>${'VIDEO · HÌNH ẢNH · GIỌNG ĐỌC · '.repeat(4)}</div><div id="ct" data-var-text="khauhieu">Làm là đẹp</div>`,
    js: `tl.fromTo("#m0",{x:0},{x:-1400,duration:6,ease:"none"},0);
tl.fromTo("#m1",{x:-1400},{x:0,duration:6,ease:"none"},0);
tl.fromTo(".mq",{opacity:0},{opacity:1,duration:.5},.1);
tl.fromTo("#ct",{scale:0,rotation:-6},{scale:1,rotation:-3,duration:.7,ease:"back.out(2)"},1.2);
out(".mq,#ct",5.45);`,
  },
  {
    slug: 'stripe-wipe', name: 'Chuyển cảnh sọc chéo', group: 'Chuyển cảnh', duration: 3,
    desc: 'Các sọc chéo hai màu quét ngang khung hình lệch nhịp, phủ kín cảnh cũ rồi rút đi để lộ cảnh mới.',
    use: 'Chuyển đoạn năng động, video thể thao, quảng cáo nhịp nhanh.',
    css: `.scn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:150px}
#A{background:var(--card);color:var(--fg)}#B{background:var(--bg);color:var(--accent2);opacity:0}
#sw{position:absolute;left:-600px;top:-300px;width:3200px;height:1700px;transform:rotate(-20deg);display:flex;flex-direction:column}
#sw i{flex:1;transform-origin:left center}
#sw i:nth-child(odd){background:var(--accent)}#sw i:nth-child(even){background:var(--accent2)}`,
    html: `<div class="scn" id="A" data-var-text="canhA" data-layout-allow-occlusion>Phần 1</div><div class="scn" id="B" data-var-text="canhB" data-layout-allow-occlusion>Phần 2</div><div id="sw" data-layout-allow-overflow data-layout-ignore>${'<i></i>'.repeat(8)}</div>`,
    js: `const S=$$("#sw i");
S.forEach((s,i)=>{tl.fromTo(s,{scaleX:0,transformOrigin:"left center"},{scaleX:1,duration:.45,ease:"power3.in"},.4+i*.05);});
tl.set("#A",{opacity:0},1.3);tl.set("#B",{opacity:1},1.3);
S.forEach((s,i)=>{tl.to(s,{scaleX:0,transformOrigin:"right center",duration:.45,ease:"power3.out"},1.35+i*.05);});
tl.fromTo("#B",{x:-60},{x:0,duration:.9,ease:"expo.out"},1.4);`,
  },
  {
    slug: 'zoom-push', name: 'Chuyển cảnh phóng xuyên', group: 'Chuyển cảnh', duration: 3,
    desc: 'Cảnh cũ phóng to lao về phía máy quay và nhoè đi, cảnh mới từ xa thu vào đúng khung, tạo cảm giác lao xuyên qua.',
    use: 'Chuyển đoạn mạnh, chuyển từ tổng quan vào chi tiết.',
    css: `.scn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:150px}
#A{background:var(--card);color:var(--fg)}#B{background:var(--bg);color:var(--accent);opacity:0}
#fl{position:absolute;inset:0;background:#fff;opacity:0}`,
    html: `<div class="scn" id="A" data-var-text="canhA" data-layout-allow-occlusion>Tổng quan</div><div class="scn" id="B" data-var-text="canhB" data-layout-allow-occlusion>Chi tiết</div><div id="fl"></div>`,
    js: `tl.to("#A",{scale:4,opacity:0,filter:"blur(24px)",duration:.7,ease:"expo.in"},.6);
tl.fromTo("#fl",{opacity:0},{opacity:.35,duration:.12,yoyo:true,repeat:1},1.2);
tl.fromTo("#B",{scale:.3,opacity:0,filter:"blur(24px)"},{scale:1,opacity:1,filter:"blur(0px)",duration:.8,ease:"expo.out"},1.25);`,
  },
  {
    slug: 'task-progress', name: 'Thanh tiến trình kèm việc', group: 'Giải thích', duration: 6,
    desc: 'Thanh tải chạy từ 0 đến 100%, mỗi khi qua một mốc thì một việc trong danh sách đổi sang trạng thái xong, cuối cùng báo hoàn tất.',
    use: 'Minh hoạ quy trình tự động, AI đang làm việc, các bước xử lý đơn.',
    css: `#pb{position:absolute;left:360px;top:300px;width:1200px;height:56px;border-radius:28px;background:#ffffff14;overflow:hidden}
#pf{height:100%;width:100%;border-radius:28px;background:linear-gradient(90deg,var(--accent),var(--accent2));transform-origin:left center}
#pc{position:absolute;left:360px;top:190px;font-family:"BVP";font-weight:900;font-size:80px;color:var(--fg)}
#pt{position:absolute;left:760px;top:215px;font-family:"BVP";font-weight:700;font-size:40px;color:var(--muted)}
.tk{position:absolute;left:360px;display:flex;align-items:center;gap:24px;font-family:"BVP";font-weight:700;font-size:44px;color:var(--muted)}
.tk i{width:48px;height:48px;border-radius:50%;border:4px solid var(--muted);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:30px;color:#111}
#dn{position:absolute;left:360px;top:850px;padding:20px 36px;border-radius:24px;background:#22c55e;font-family:"BVP";font-weight:900;font-size:44px;color:#111}`,
    html: `<div id="pc">0%</div><div id="pt" data-var-text="viec">AI đang dựng video…</div><div id="pb"><div id="pf"></div></div>
${['Đọc kịch bản', 'Tạo hình ảnh', 'Lồng giọng đọc', 'Xuất video'].map((t, i) => `<div class="tk" id="t${i}" style="top:${420 + i * 100}px"><i id="c${i}"></i>${t}</div>`).join('')}
<div id="dn" data-var-text="xong">Hoàn tất ✓</div>`,
    js: `tl.fromTo("#pf",{scaleX:0},{scaleX:1,duration:3.6,ease:"power1.inOut"},.5);
count("#pc",100,.5,3.6,0,"","%");rise("#pt",.2);
tl.fromTo(".tk",{opacity:0,x:-30},{opacity:1,x:0,duration:.4,stagger:.1},.3);
[0,1,2,3].forEach(i=>{const t=.5+3.6*(i+1)/4-.1;tl.to("#c"+i,{background:"#22c55e",borderColor:"#22c55e",duration:.2},t);tl.set("#c"+i,{textContent:"✓"},t);tl.to("#t"+i,{color:"var(--fg)",duration:.2},t);tl.fromTo("#c"+i,{scale:1},{scale:1.3,duration:.15,yoyo:true,repeat:1},t);});
pop("#dn",4.2);
out("#pc,#pt,#pb,.tk,#dn",5.45);`,
  },
  {
    slug: 'venn-overlap', name: 'Hai vòng giao nhau', group: 'Giải thích', duration: 6,
    desc: 'Hai vòng tròn mờ trượt vào từ hai bên kèm nhãn, chồng lên nhau, phần giao sáng màu nhấn và hiện từ khoá kết luận.',
    use: 'Điểm chung của hai nhóm, sản phẩm đáp ứng hai nhu cầu, công thức A + B.',
    css: `.vc{position:absolute;top:240px;width:600px;height:600px;border-radius:50%;border:4px solid}
#vA{left:460px;background:color-mix(in srgb,var(--accent) 22%,transparent);border-color:var(--accent)}
#vB{left:860px;background:color-mix(in srgb,var(--accent2) 22%,transparent);border-color:var(--accent2)}
.vl{position:absolute;top:500px;width:300px;text-align:center;font-family:"BVP";font-weight:800;font-size:44px;color:var(--fg)}
#mid{position:absolute;left:800px;top:465px;width:320px;text-align:center;font-family:"BVP";font-weight:900;font-size:50px;line-height:1.1;color:#111;padding:20px 0;border-radius:24px;background:var(--fg)}`,
    html: `<div class="vc" id="vA" data-layout-allow-overlap></div><div class="vc" id="vB" data-layout-allow-overlap></div>
<div class="vl" id="tA" style="left:480px;width:300px" data-var-text="nhanA">Giá hợp lý</div><div class="vl" id="tB" style="left:1140px;width:300px" data-var-text="nhanB">Vị trí đẹp</div>
<div id="mid" data-var-text="ketqua">Đáng mua</div>`,
    js: `tl.fromTo("#vA",{x:-500,opacity:0},{x:0,opacity:1,duration:1,ease:"expo.out"},.2);
tl.fromTo("#vB",{x:500,opacity:0},{x:0,opacity:1,duration:1,ease:"expo.out"},.4);
rise("#tA,#tB",1,.15);
tl.fromTo("#mid",{scale:0},{scale:1,duration:.6,ease:"back.out(2.4)"},2);
tl.fromTo(["#vA","#vB"],{scale:1},{scale:1.04,duration:.3,yoyo:true,repeat:1},2);
out(".vc,.vl,#mid",5.45);`,
  },
];
