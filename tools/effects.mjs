import { BATCH3 } from './effects3.mjs';
import { BATCH2 } from './effects2.mjs';
// LNL Motion Effects: danh sách hiệu ứng (tự thiết kế, viết mới hoàn toàn). Mỗi mục sinh một dự án HyperFrames độc lập.
// css/html/js là phần thân của cảnh (compositions/fx.html). Biến màu: --bg --card --fg --muted --accent --accent2.
// Trong js có sẵn: tl (timeline dừng), $, $$, và các hàm nhỏ: rise, pop, draw, count, out.

export const EFFECTS = [
  {
    slug: 'title-stack', name: 'Tiêu đề xếp tầng', group: 'Mở đầu', duration: 5,
    desc: 'Ba dòng tiêu đề trượt lên từ sau mặt nạ, dòng nhấn đổi màu, gạch chân chạy ngang rồi nhãn nhỏ bật lên.',
    use: 'Mở đầu video, giới thiệu chủ đề, tên chương.',
    css: `.tt{position:absolute;left:180px;top:280px}
.ln{overflow:hidden;padding:6px 0}
.ln span{display:block;font-family:"BVP";font-weight:900;font-size:128px;line-height:1.08;color:var(--fg);letter-spacing:-.02em}
.ln.ac span{color:var(--accent)}
#bar{position:absolute;left:180px;top:742px;width:620px;height:12px;border-radius:6px;background:var(--accent2);transform-origin:left center}
#kick{position:absolute;left:180px;top:200px;padding:10px 20px;border-radius:999px;border:2px solid var(--muted);font-family:"JBM";font-weight:700;font-size:24px;letter-spacing:.18em;color:var(--muted)}`,
    html: `<div id="kick" data-var-text="nhan">SERIES · TẬP 01</div>
<div class="tt"><div class="ln"><span id="l1" data-var-text="dong1">Làm video</span></div><div class="ln ac"><span id="l2" data-var-text="dong2">bằng AI</span></div><div class="ln"><span id="l3" data-var-text="dong3">trong 10 phút.</span></div></div>
<div id="bar"></div>`,
    js: `tl.fromTo(["#l1","#l2","#l3"],{yPercent:110},{yPercent:0,duration:.8,ease:"expo.out",stagger:.14},.2);
tl.fromTo("#bar",{scaleX:0},{scaleX:1,duration:.7,ease:"power3.inOut"},.85);
pop("#kick",1.2);
tl.fromTo("#l2",{color:"var(--fg)"},{color:"var(--accent)",duration:.3},.75);
out(".tt,#bar,#kick",4.45);`,
  },
  {
    slug: 'stat-cards', name: 'Ba thẻ số liệu đếm lên', group: 'Con số', duration: 6,
    desc: 'Ba thẻ nổi lên lệch nhịp, mỗi thẻ đếm số từ 0, thanh tiến độ chạy theo, thẻ giữa sáng viền nhấn.',
    use: 'Khoe thành tích, số liệu dự án, kết quả khách hàng.',
    css: `.row{position:absolute;left:150px;right:150px;top:300px;display:flex;gap:48px}
.cd{flex:1;height:440px;border-radius:36px;background:var(--card);border:2px solid #ffffff14;padding:48px;position:relative;box-shadow:0 40px 90px #0008}
.cd.hi{border-color:var(--accent)}
.cd small{font-family:"JBM";font-weight:700;font-size:24px;letter-spacing:.14em;color:var(--muted)}
.cd b{display:block;margin-top:40px;font-family:"BVP";font-weight:900;font-size:132px;line-height:1;color:var(--fg);letter-spacing:-.03em}
.cd.hi b{color:var(--accent)}
.cd p{margin-top:16px;font-family:"BVP";font-weight:600;font-size:30px;color:var(--muted)}
.tr{position:absolute;left:48px;right:48px;bottom:48px;height:10px;border-radius:5px;background:#ffffff14}
.tr i{display:block;height:100%;border-radius:5px;background:var(--accent2);transform-origin:left center}`,
    html: `<div class="row">
<div class="cd" id="c1"><small>KHÁCH HÀNG</small><b id="n1">0</b><p data-var-text="nhan1">người dùng mới</p><div class="tr"><i id="t1"></i></div></div>
<div class="cd hi" id="c2"><small>TĂNG TRƯỞNG</small><b id="n2">0</b><p data-var-text="nhan2">so với năm ngoái</p><div class="tr"><i id="t2"></i></div></div>
<div class="cd" id="c3"><small>HÀI LÒNG</small><b id="n3">0</b><p data-var-text="nhan3">đánh giá 5 sao</p><div class="tr"><i id="t3"></i></div></div></div>`,
    js: `rise("#c1,#c2,#c3",.2,.16);
count("#n1",12500,.7,1.6,0,"","+");count("#n2",248,.86,1.6,0,"","%");count("#n3",98,1.02,1.6,0,"","%");
tl.fromTo(["#t1","#t2","#t3"],{scaleX:0},{scaleX:i=>[.72,.95,.98][i],duration:1.6,ease:"power2.out",stagger:.16},.7);
tl.fromTo("#c2",{scale:1},{scale:1.04,duration:.5,ease:"back.out(2)"},2.6);
out(".row",5.45);`,
  },
  {
    slug: 'bar-rise', name: 'Biểu đồ cột mọc lên', group: 'Con số', duration: 6,
    desc: 'Trục và lưới vẽ ra, năm cột mọc từ đáy theo thứ tự, nhãn giá trị đếm theo chiều cao, cột cao nhất đổi màu nhấn.',
    use: 'So sánh doanh thu theo năm, theo kênh, theo sản phẩm.',
    css: `#ch{position:absolute;left:260px;top:180px;width:1400px;height:700px}
.gl{position:absolute;left:0;right:0;height:2px;background:#ffffff12;transform-origin:left center}
#ax{position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--muted);transform-origin:left center}
.col{position:absolute;bottom:4px;width:170px;border-radius:18px 18px 4px 4px;background:var(--card);border:2px solid #ffffff1a;transform-origin:bottom center}
.col.top{background:var(--accent);border-color:var(--accent)}
.v{position:absolute;width:170px;text-align:center;font-family:"BVP";font-weight:800;font-size:44px;color:var(--fg)}
.x{position:absolute;bottom:-64px;width:170px;text-align:center;font-family:"JBM";font-weight:700;font-size:26px;color:var(--muted)}
#cap{position:absolute;left:260px;top:90px;font-family:"BVP";font-weight:800;font-size:52px;color:var(--fg)}`,
    html: `<div id="cap" data-var-text="tieude">Doanh thu (tỷ đồng)</div>
<div id="ch"><div class="gl" style="top:0"></div><div class="gl" style="top:175px"></div><div class="gl" style="top:350px"></div><div class="gl" style="top:525px"></div><div id="ax"></div></div>`,
    js: `const ch=$("#ch"),vals=[18,26,22,41,63],lab=["2022","2023","2024","2025","2026"],max=70;
vals.forEach((v,i)=>{const x=60+i*270,h=Math.round(v/max*690);
 const c=document.createElement("div");c.className="col"+(v===63?" top":"");c.style.left=x+"px";c.style.height=h+"px";c.id="b"+i;ch.appendChild(c);
 const n=document.createElement("div");n.className="v";n.style.left=x+"px";n.style.bottom=(h+20)+"px";n.id="v"+i;n.textContent="0";ch.appendChild(n);
 const l=document.createElement("div");l.className="x";l.style.left=x+"px";l.textContent=lab[i];ch.appendChild(l);
 tl.fromTo(c,{scaleY:0},{scaleY:1,duration:.9,ease:"power3.out"},.9+i*.18);
 tl.fromTo(n,{y:h},{y:0,duration:.9,ease:"power3.out"},.9+i*.18);
 count("#v"+i,v,.9+i*.18,.9);});
rise("#cap",.1);
tl.fromTo(".gl",{scaleX:0},{scaleX:1,duration:.7,ease:"power2.out",stagger:.07},.2);
tl.fromTo("#ax",{scaleX:0},{scaleX:1,duration:.7,ease:"power2.out"},.3);
tl.fromTo(".x",{opacity:0},{opacity:1,duration:.4,stagger:.08},.6);
out("#ch,#cap",5.45);`,
  },
  {
    slug: 'check-list', name: 'Danh sách tích dấu', group: 'Danh sách', duration: 6,
    desc: 'Bốn dòng hiện lần lượt, ô vuông tự vẽ dấu tích bằng nét, chữ dòng đã xong mờ đi và gạch ngang nhẹ.',
    use: 'Các bước làm, quyền lợi gói, việc cần chuẩn bị.',
    css: `#hd{position:absolute;left:300px;top:170px;font-family:"BVP";font-weight:900;font-size:76px;color:var(--fg)}
.it{position:absolute;left:300px;display:flex;align-items:center;gap:36px}
.bx{width:76px;height:76px;border-radius:20px;border:4px solid var(--muted);position:relative}
.bx svg{position:absolute;inset:6px}
.bx path{fill:none;stroke:var(--accent);stroke-width:9;stroke-linecap:round;stroke-linejoin:round}
.tx{font-family:"BVP";font-weight:700;font-size:56px;color:var(--fg);position:relative}
.tx i{position:absolute;left:0;right:0;top:54%;height:5px;background:var(--muted);transform-origin:left center;transform:scaleX(0)}`,
    html: `<div id="hd" data-var-text="tieude">Trước khi quay video</div>
${[0, 1, 2, 3].map((i) => `<div class="it" id="i${i}" style="top:${330 + i * 150}px"><div class="bx" id="x${i}"><svg viewBox="0 0 56 56"><path id="p${i}" d="M10 29 L23 42 L46 15"/></svg></div><div class="tx" data-var-text="muc${i + 1}">${['Viết kịch bản ngắn gọn', 'Chuẩn bị ảnh, video gốc', 'Chọn nhạc và giọng đọc', 'Xuất bản 9:16 và 16:9'][i]}<i id="s${i}"></i></div></div>`).join('')}`,
    js: `rise("#hd",.1);
[0,1,2,3].forEach(i=>{const t=.5+i*.9,p=$("#p"+i),L=p.getTotalLength();p.style.strokeDasharray=L;
 tl.fromTo("#i"+i,{opacity:0,x:-60},{opacity:1,x:0,duration:.5,ease:"power3.out"},t);
 tl.fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:.4,ease:"power2.out"},t+.45);
 tl.fromTo("#x"+i,{borderColor:"var(--muted)"},{borderColor:"var(--accent)",duration:.2},t+.45);
 tl.fromTo("#x"+i,{scale:1},{scale:1.12,duration:.15,yoyo:true,repeat:1},t+.45);
 tl.fromTo("#s"+i,{scaleX:0},{scaleX:1,duration:.35,ease:"power2.out"},t+.75);
 tl.to("#i"+i+" .tx",{color:"var(--muted)",duration:.3},t+.75);});
out("#hd,.it",5.45);`,
  },
  {
    slug: 'ai-chat', name: 'Khung chat AI gõ và trả lời', group: 'Giải thích', duration: 7,
    desc: 'Cửa sổ chat mở ra, câu hỏi gõ từng chữ rồi gửi, ba chấm chờ nhấp nháy, câu trả lời hiện theo từng từ.',
    use: 'Minh hoạ dùng ChatGPT, Claude, trợ lý AI trong video hướng dẫn.',
    css: `#win{position:absolute;left:360px;top:130px;width:1200px;height:820px;border-radius:40px;background:var(--card);border:2px solid #ffffff14;box-shadow:0 60px 140px #000a;overflow:hidden}
#bar{height:84px;display:flex;align-items:center;gap:14px;padding:0 36px;border-bottom:2px solid #ffffff10}
#bar i{width:18px;height:18px;border-radius:50%;background:#ffffff26}
#bar b{margin-left:20px;font-family:"BVP";font-weight:700;font-size:28px;color:var(--fg)}
.msg{position:absolute;max-width:820px;padding:28px 36px;border-radius:30px;font-family:"BVP";font-weight:600;font-size:36px;line-height:1.4}
#q{right:48px;top:140px;background:var(--accent);color:#111;border-bottom-right-radius:8px}
#a{left:48px;top:330px;background:#ffffff0d;color:var(--fg);border-bottom-left-radius:8px}
#dots{position:absolute;left:48px;top:330px;padding:30px 36px;border-radius:30px;background:#ffffff0d;display:flex;gap:12px}
#dots i{width:16px;height:16px;border-radius:50%;background:var(--muted)}
#inp{position:absolute;left:36px;right:36px;bottom:36px;height:96px;border-radius:28px;background:#ffffff0a;border:2px solid #ffffff14;display:flex;align-items:center;padding:0 32px;font-family:"BVP";font-weight:600;font-size:34px;color:var(--fg)}
#cur{display:inline-block;width:4px;height:40px;background:var(--accent);margin-left:6px}
#send{position:absolute;right:20px;width:64px;height:64px;border-radius:20px;background:var(--accent)}`,
    html: `<div id="win"><div id="bar"><i></i><i></i><i></i><b>Trợ lý AI</b></div>
<div class="msg" id="q"></div><div id="dots"><i></i><i></i><i></i></div><div class="msg" id="a"></div>
<div id="inp"><span id="typed"></span><span id="cur"></span><div id="send"></div></div></div>`,
    js: `const Q="Viết giúp mình 3 ý tưởng video ngắn cho quán cà phê.",A="1. Một ngày của ly cà phê từ hạt tới tay khách. 2. Barista thử pha 5 kiểu trong 30 giây. 3. Khách quen kể lý do quay lại mỗi sáng.";
const ty=$("#typed"),o={n:0};
tl.fromTo("#win",{opacity:0,y:80,scale:.94},{opacity:1,y:0,scale:1,duration:.7,ease:"expo.out"},.1);
tl.fromTo(o,{n:0},{n:Q.length,duration:1.6,ease:"none",onUpdate:()=>{ty.textContent=Q.slice(0,Math.round(o.n))}},.7);
tl.fromTo("#send",{scale:1},{scale:.82,duration:.1,yoyo:true,repeat:1},2.4);
tl.set(ty,{textContent:""},2.5);
$("#q").textContent=Q;
tl.fromTo("#q",{opacity:0,y:30,scale:.9},{opacity:1,y:0,scale:1,duration:.45,ease:"back.out(1.8)"},2.5);
tl.fromTo("#dots",{opacity:0},{opacity:1,duration:.2},2.95);
tl.fromTo("#dots i",{y:0},{y:-12,duration:.25,ease:"sine.inOut",stagger:.1,yoyo:true,repeat:3},3);
tl.to("#dots",{opacity:0,duration:.15},4.05);
const words=A.split(" ");$("#a").innerHTML=words.map(w=>"<span class=w>"+w+" </span>").join("");
tl.fromTo("#a",{opacity:0},{opacity:1,duration:.01},4.1);
tl.fromTo("#a .w",{opacity:0},{opacity:1,duration:.05,stagger:.045},4.1);
tl.fromTo("#cur",{opacity:1},{opacity:0,duration:.01,repeat:12,yoyo:true,repeatDelay:.25},0);
out("#win",6.45);`,
  },
  {
    slug: 'step-timeline', name: 'Dòng thời gian bốn mốc', group: 'Danh sách', duration: 6,
    desc: 'Đường ngang vẽ dần, chấm sáng chạy dọc đường, tới đâu mốc đó bật lên kèm năm và mô tả ngắn.',
    use: 'Lộ trình dự án, lịch sử thương hiệu, các bước quy trình.',
    css: `#ln{position:absolute;left:200px;right:200px;top:540px;height:8px;border-radius:4px;background:#ffffff1a}
#fill{position:absolute;left:200px;top:540px;width:1520px;height:8px;border-radius:4px;background:var(--accent);transform-origin:left center}
#run{position:absolute;left:184px;top:526px;width:36px;height:36px;border-radius:50%;background:var(--accent2);box-shadow:0 0 40px var(--accent2)}
.mk{position:absolute;top:504px;width:80px;height:80px;margin-left:-40px;border-radius:50%;background:var(--card);border:6px solid var(--accent)}
.lb{position:absolute;width:380px;margin-left:-190px;text-align:center}
.lb b{display:block;font-family:"BVP";font-weight:900;font-size:64px;color:var(--fg)}
.lb span{display:block;margin-top:8px;font-family:"BVP";font-weight:600;font-size:30px;color:var(--muted)}`,
    html: `<div id="ln"></div><div id="fill"></div>
${[0, 1, 2, 3].map((i) => `<div class="mk" id="m${i}" style="left:${200 + 140 + i * 413}px"></div><div class="lb" id="t${i}" style="left:${200 + 140 + i * 413}px;top:${i % 2 ? 640 : 250}px"><b>${['Q1', 'Q2', 'Q3', 'Q4'][i]}</b><span data-var-text="moc${i + 1}">${['Khởi công', 'Cất nóc', 'Hoàn thiện', 'Bàn giao'][i]}</span></div>`).join('')}
<div id="run"></div>`,
    js: `tl.fromTo("#ln",{scaleX:0},{scaleX:1,duration:.6,ease:"power2.out",transformOrigin:"left center"},.1);
tl.fromTo("#fill",{scaleX:0},{scaleX:1,duration:3.6,ease:"none"},.6);
tl.fromTo("#run",{x:0},{x:1520,duration:3.6,ease:"none"},.6);
[0,1,2,3].forEach(i=>{const t=.6+(140+i*413)/1520*3.6;
 tl.fromTo("#m"+i,{scale:0},{scale:1,duration:.5,ease:"back.out(2.4)"},t-.1);
 tl.fromTo("#t"+i,{opacity:0,y:i%2?-30:30},{opacity:1,y:0,duration:.5,ease:"power3.out"},t);});
out("#ln,#fill,#run,.mk,.lb",5.45);`,
  },
  {
    slug: 'glitch-word', name: 'Chữ nhiễu tách màu', group: 'Chữ', duration: 4,
    desc: 'Từ khoá xuất hiện kiểu tín hiệu lỗi: ba lớp màu lệch nhau, dải cắt ngang giật, rồi khớp lại thành chữ sạch.',
    use: 'Nhấn từ khoá, chuyển đoạn kiểu công nghệ, mở đầu nhanh.',
    css: `.gw{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.gw span{position:absolute;font-family:"BVP";font-weight:900;font-size:220px;letter-spacing:-.02em;mix-blend-mode:screen}
#g1{color:#ff2e63}#g2{color:#08d9d6}#g3{color:var(--fg);mix-blend-mode:normal}
.sl{position:absolute;left:0;right:0;height:46px;background:var(--bg)}`,
    html: `<div class="gw" data-layout-allow-overlap><span id="g1" data-var-text="tu">TƯƠNG LAI</span><span id="g2" data-var-text="tu">TƯƠNG LAI</span><span id="g3" data-var-text="tu">TƯƠNG LAI</span></div>
<div class="sl" id="s1" style="top:430px"></div><div class="sl" id="s2" style="top:560px"></div>`,
    js: `const jit=[[-18,6],[14,-4],[-8,10],[22,0],[-4,-6],[0,0]];
tl.fromTo(".gw span",{opacity:0},{opacity:1,duration:.05},.2);
jit.forEach((j,k)=>{const t=.25+k*.09;tl.set("#g1",{x:j[0],y:j[1]},t);tl.set("#g2",{x:-j[0],y:-j[1]},t);tl.set("#g3",{x:j[1]/2,skewX:k%2?6:-4},t);
 tl.set("#s1",{x:k%2?-200:240,opacity:k<5?1:0},t);tl.set("#s2",{x:k%2?260:-180,opacity:k<5?1:0},t);});
tl.set("#g3",{skewX:0,x:0},.8);
tl.to(["#g1","#g2"],{x:0,y:0,opacity:0,duration:.35,ease:"power2.out"},.85);
tl.fromTo("#g3",{scale:1.06},{scale:1,duration:.6,ease:"expo.out"},.85);
[2.4,2.5].forEach((t,k)=>{tl.set("#g1",{x:k?0:-12,opacity:k?0:1},t);tl.set("#g2",{x:k?0:12,opacity:k?0:1},t);});
out(".gw",3.5);`,
  },
  {
    slug: 'before-after', name: 'So sánh trước và sau', group: 'Con số', duration: 6,
    desc: 'Hai nửa màn hình với nhãn TRƯỚC / SAU, thanh chia trượt qua lại rồi dừng giữa, số liệu hai bên đếm lên.',
    use: 'Kết quả trước và sau khi dùng sản phẩm, so sánh hai phương án.',
    css: `.half{position:absolute;top:0;bottom:0;width:960px;display:flex;flex-direction:column;align-items:center;justify-content:center}
#L{left:0;background:#1d2129}#R{left:960px;background:var(--accent)}
.half small{font-family:"JBM";font-weight:700;font-size:30px;letter-spacing:.3em}
#L small{color:var(--muted)}#R small{color:#111}
.half b{font-family:"BVP";font-weight:900;font-size:200px;line-height:1.1;letter-spacing:-.03em}
#L b{color:var(--fg)}#R b{color:#111}
.half p{font-family:"BVP";font-weight:700;font-size:40px}
#L p{color:var(--muted)}#R p{color:#111c}
#div{position:absolute;top:0;bottom:0;left:954px;width:12px;background:var(--fg)}
#knob{position:absolute;left:910px;top:490px;width:100px;height:100px;border-radius:50%;background:var(--fg);box-shadow:0 10px 40px #0008}`,
    html: `<div class="half" id="L"><small>TRƯỚC</small><b id="nL">0</b><p data-var-text="nhanL">giờ làm mỗi video</p></div>
<div class="half" id="R"><small>SAU</small><b id="nR">0</b><p data-var-text="nhanR">phút với AI</p></div>
<div id="div"></div><div id="knob"></div>`,
    js: `tl.fromTo("#L",{xPercent:-100},{xPercent:0,duration:.7,ease:"expo.out"},.1);
tl.fromTo("#R",{xPercent:100},{xPercent:0,duration:.7,ease:"expo.out"},.1);
tl.fromTo(["#div","#knob"],{opacity:0},{opacity:1,duration:.3},.6);
tl.to(["#div","#knob"],{x:-260,duration:.7,ease:"power2.inOut"},1);
tl.to(["#div","#knob"],{x:220,duration:.8,ease:"power2.inOut"},1.75);
tl.to(["#div","#knob"],{x:0,duration:.6,ease:"back.out(1.6)"},2.6);
count("#nL",6,.9,1.2,0,"","h");count("#nR",15,1.1,1.6,0,"","'");
out(".half,#div,#knob",5.45);`,
  },
  {
    slug: 'tile-wipe', name: 'Chuyển cảnh ô lưới lật', group: 'Chuyển cảnh', duration: 3,
    desc: 'Màn hình chia lưới 8×5, các ô lật theo đường chéo để che cảnh cũ rồi lật tiếp để lộ cảnh mới.',
    use: 'Chuyển giữa hai đoạn, chuyển sang chương mới.',
    css: `.scn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:150px}
#A{background:var(--card);color:var(--fg)}#B{background:var(--accent2);color:#111;opacity:0}
#grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(5,1fr);perspective:1400px}
#grid i{background:var(--accent);transform-origin:center center}`,
    html: `<div class="scn" id="A" data-layout-allow-occlusion data-var-text="canhA">Phần 1</div><div class="scn" id="B" data-layout-allow-occlusion data-var-text="canhB">Phần 2</div><div id="grid">${'<i></i>'.repeat(40)}</div>`,
    js: `const tiles=$$("#grid i");
tiles.forEach((el,k)=>{const r=Math.floor(k/8),c=k%8,d=(r+c)*.05;
 tl.fromTo(el,{rotationY:90,opacity:0},{rotationY:0,opacity:1,duration:.35,ease:"power2.out"},.4+d);
 tl.to(el,{rotationY:-90,opacity:0,duration:.35,ease:"power2.in"},1.35+d);});
tl.set("#A",{opacity:0},1.3);tl.set("#B",{opacity:1},1.3);
tl.fromTo("#B",{scale:1.08},{scale:1,duration:1,ease:"expo.out"},1.35);`,
  },
  {
    slug: 'name-strap', name: 'Thanh tên người nói', group: 'Giải thích', duration: 5,
    desc: 'Khối màu trượt vào góc dưới trái, tên và chức danh lộ ra sau mặt nạ, vạch nhấn chạy dọc, giữ rồi rút gọn gàng.',
    use: 'Giới thiệu người nói trong video phỏng vấn, livestream, talking head.',
    css: `#st{position:absolute;left:150px;bottom:150px;height:190px;display:flex;align-items:stretch}
#ac{width:16px;background:var(--accent);transform-origin:bottom center}
#bx{position:relative;overflow:hidden;background:var(--card);padding:30px 56px 30px 40px;border:2px solid #ffffff12;border-left:none;transform-origin:left center}
#nm{font-family:"BVP";font-weight:900;font-size:66px;color:var(--fg);white-space:nowrap}
#rl{margin-top:6px;font-family:"BVP";font-weight:600;font-size:34px;color:var(--muted);white-space:nowrap}
#tg{position:absolute;left:150px;bottom:360px;padding:10px 22px;border-radius:999px;background:var(--accent2);font-family:"JBM";font-weight:700;font-size:24px;letter-spacing:.14em;color:#111}`,
    html: `<div id="tg" data-var-text="the">KHÁCH MỜI</div>
<div id="st"><div id="ac"></div><div id="bx"><div id="nm" data-var-text="ten">Nguyễn Minh Anh</div><div id="rl" data-var-text="chucdanh">Nhà sáng lập · Studio Ánh Sáng</div></div></div>`,
    js: `tl.fromTo("#ac",{scaleY:0},{scaleY:1,duration:.4,ease:"power3.out"},.2);
tl.fromTo("#bx",{scaleX:0},{scaleX:1,duration:.6,ease:"expo.out"},.45);
tl.fromTo("#nm",{yPercent:120},{yPercent:0,duration:.6,ease:"expo.out"},.75);
tl.fromTo("#rl",{yPercent:140,opacity:0},{yPercent:0,opacity:1,duration:.6,ease:"expo.out"},.9);
pop("#tg",1.1);
tl.to(["#nm","#rl","#tg"],{opacity:0,y:-10,duration:.25,ease:"power2.in"},4.1);
tl.to("#bx",{scaleX:0,duration:.4,ease:"power3.in"},4.25);
tl.to("#ac",{scaleY:0,duration:.3,ease:"power3.in"},4.55);`,
  },
  {
    slug: 'feature-orbit', name: 'Tính năng quay quanh sản phẩm', group: 'Mở đầu', duration: 7,
    desc: 'Thẻ sản phẩm ở giữa, sáu nhãn tính năng bay ra theo vòng quỹ đạo, xoay chậm một vòng rồi dừng đúng chỗ.',
    use: 'Giới thiệu sản phẩm, app, gói dịch vụ có nhiều tính năng.',
    css: `#core{position:absolute;left:760px;top:340px;width:400px;height:400px;border-radius:72px;background:linear-gradient(140deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;box-shadow:0 0 120px color-mix(in srgb,var(--accent) 45%,transparent)}
#core b{font-family:"BVP";font-weight:900;font-size:72px;color:#111;text-align:center;line-height:1.05}
#ring{position:absolute;left:460px;top:40px;width:1000px;height:1000px;border-radius:50%;border:2px dashed #ffffff22}
#orb{position:absolute;left:960px;top:540px;width:0;height:0}
.ft{position:absolute;padding:20px 32px;border-radius:999px;background:var(--card);border:2px solid #ffffff1c;font-family:"BVP";font-weight:700;font-size:34px;color:var(--fg);white-space:nowrap;transform:translate(-50%,-50%)}`,
    html: `<div id="ring"></div><div id="core"><b data-var-text="sanpham">LNL<br>Studio</b></div><div id="orb"></div>`,
    js: `const F=["Tạo ảnh AI","Video 4K","Giọng đọc Việt","Ghép tự động","Lưu đám mây","Xuất mọi khổ"],R=500,orb=$("#orb");
const els=F.map((t,i)=>{const d=document.createElement("div");d.className="ft";d.textContent=t;orb.appendChild(d);return d;});
const st={a:0,r:0};const place=()=>els.forEach((d,i)=>{const ang=(i/F.length)*Math.PI*2+st.a-Math.PI/2;d.style.left=(Math.cos(ang)*st.r)+"px";d.style.top=(Math.sin(ang)*st.r)+"px";});
place();
tl.fromTo("#core",{scale:0,rotation:-20},{scale:1,rotation:0,duration:.8,ease:"back.out(1.7)"},.1);
tl.fromTo("#ring",{scale:.4,opacity:0},{scale:1,opacity:1,duration:.9,ease:"expo.out"},.4);
tl.fromTo(st,{r:0},{r:R,duration:1.1,ease:"expo.out",onUpdate:place},.6);
tl.fromTo(els,{opacity:0,scale:.4},{opacity:1,scale:1,duration:.5,ease:"back.out(2)",stagger:.08},.65);
tl.fromTo(st,{a:0},{a:Math.PI*2/F.length*2,duration:4.2,ease:"power2.inOut",onUpdate:place},1.6);
tl.fromTo("#ring",{rotation:0},{rotation:60,duration:5,ease:"none"},1);
out("#core,#ring,.ft",6.45);`,
  },
  {
    slug: 'logo-split', name: 'Màn tách đôi lộ logo', group: 'Mở đầu', duration: 4,
    desc: 'Hai tấm màu che kín màn hình tách ra hai phía, logo phóng nhẹ ở giữa, dòng khẩu hiệu gõ ra bên dưới.',
    use: 'Mở hoặc kết video thương hiệu, end card.',
    css: `.dr{position:absolute;top:0;bottom:0;width:960px;background:var(--accent)}
#dl{left:0}#dr{left:960px;background:var(--accent2)}
#lg{position:absolute;left:0;right:0;top:390px;text-align:center;font-family:"BVP";font-weight:900;font-size:180px;color:var(--fg);letter-spacing:-.03em}
#lg i{font-style:normal;color:var(--accent)}
#sg{position:absolute;left:0;right:0;top:640px;text-align:center;font-family:"JBM";font-weight:700;font-size:36px;letter-spacing:.2em;color:var(--muted)}`,
    html: `<div id="lg" data-var-text="logo">LNL<i>.</i>studio</div><div id="sg"></div><div class="dr" id="dl"></div><div class="dr" id="dr"></div>`,
    js: `const S="SÁNG TẠO NHANH HƠN",sg=$("#sg"),o={n:0};
tl.to("#dl",{xPercent:-100,duration:.9,ease:"expo.inOut"},.4);
tl.to("#dr",{xPercent:100,duration:.9,ease:"expo.inOut"},.4);
tl.fromTo("#lg",{scale:.85,opacity:0},{scale:1,opacity:1,duration:1,ease:"expo.out"},.75);
tl.fromTo(o,{n:0},{n:S.length,duration:.9,ease:"none",onUpdate:()=>{sg.textContent=S.slice(0,Math.round(o.n))}},1.5);
out("#lg,#sg",3.5);`,
  },
].concat(BATCH2, BATCH3);
