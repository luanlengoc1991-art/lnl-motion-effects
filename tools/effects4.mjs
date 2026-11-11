// Đợt 4 (18 hiệu ứng): kết video, nhạc & nhịp, biểu đồ, bản đồ, người nói, nền chuyển động, chuyển cảnh.
// Chuyển động lặp (sóng, nhịp) tính từ thời gian của timeline (proxy o.t) để tua tới đâu cũng ra đúng một khung hình.
const SPEAKER = `<div class="spk"><svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice"><circle cx="200" cy="190" r="92" fill="#ffffff22"/><path d="M40 500 C 60 340, 340 340, 360 500 Z" fill="#ffffff1a"/></svg><span>Video người nói</span></div>`;
const SPK_CSS = `.spk{position:absolute;inset:0;background:linear-gradient(160deg,#323846,#161a21);overflow:hidden}
.spk svg{position:absolute;left:0;right:0;bottom:0;width:100%;height:85%}
.spk span{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-family:"JBM";font-weight:700;font-size:28px;letter-spacing:.14em;color:#ffffff66}`;

export const BATCH4 = [
  {
    slug: 'end-subscribe', name: 'Nút đăng ký và chuông', group: 'Kết video', duration: 5,
    desc: 'Con trỏ di chuyển tới nút Đăng ký, bấm, nút đổi màu thành Đã đăng ký, chuông bên cạnh rung và sáng lên.',
    use: 'Cuối video YouTube, kêu gọi theo dõi kênh.',
    css: `#ch{position:absolute;left:520px;top:300px;display:flex;align-items:center;gap:30px}
#av{width:150px;height:150px;border-radius:50%;background:linear-gradient(140deg,var(--accent),var(--accent2))}
#ch b{display:block;font-family:"BVP";font-weight:900;font-size:56px;color:var(--fg)}
#ch small{display:block;font-family:"BVP";font-weight:600;font-size:32px;color:var(--muted)}
#bt{position:absolute;left:520px;top:520px;width:520px;height:120px;border-radius:60px;background:#ef4444;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:48px;color:#fff}
#bt.on{background:#3a404c;color:var(--fg)}
#bl{position:absolute;left:1080px;top:520px;width:120px;height:120px;border-radius:50%;background:#3a404c;display:flex;align-items:center;justify-content:center}
#bl svg{width:64px;height:64px}
#cur{position:absolute;left:0;top:0;width:60px;height:72px}`,
    html: `<div id="ch"><div id="av"></div><div><b data-var-text="kenh">LNL Studio</b><small data-var-text="mota">Video AI mỗi tuần</small></div></div>
<div id="bt"><span id="btx">Đăng ký</span></div><div id="bl"><svg viewBox="0 0 24 24"><path id="bp" d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zm-2 15a2 2 0 0 0 4 0" fill="none" stroke="var(--fg)" stroke-width="2" stroke-linejoin="round"/></svg></div>
<svg id="cur" viewBox="0 0 30 36"><path d="M2 2 L2 30 L10 23 L15 34 L20 32 L15 21 L26 21 Z" fill="#fff" stroke="#111" stroke-width="2"/></svg>`,
    js: `rise("#ch",.1);tl.fromTo(["#bt","#bl"],{opacity:0,y:40},{opacity:1,y:0,duration:.5,stagger:.1,ease:"back.out(1.8)"},.4);
tl.fromTo("#cur",{x:1500,y:900,opacity:0},{x:820,y:600,opacity:1,duration:1,ease:"power3.inOut"},.8);
tl.to("#cur",{scale:.85,duration:.1,yoyo:true,repeat:1},1.85);
tl.to("#bt",{scale:.94,duration:.1,yoyo:true,repeat:1},1.85);
tl.set("#bt",{attr:{class:"on"}},1.95);tl.set("#btx",{textContent:"Đã đăng ký ✓"},1.95);
tl.to("#cur",{x:1140,y:610,duration:.6,ease:"power3.inOut"},2.3);
tl.to("#bl",{scale:.9,duration:.1,yoyo:true,repeat:1},2.95);
tl.to("#bl",{background:"#f59e0b",duration:.2},3);
tl.fromTo("#bl svg",{rotation:0},{rotation:18,duration:.08,yoyo:true,repeat:7,ease:"sine.inOut",transformOrigin:"50% 10%"},3.05);
out("#ch,#bt,#bl,#cur",4.45);`,
  },
  {
    slug: 'end-next-videos', name: 'Màn kết gợi ý video', group: 'Kết video', duration: 6,
    desc: 'Hai khung video gợi ý trượt vào hai bên, ảnh kênh tròn ở giữa phía dưới, dòng "Xem tiếp" và mũi tên chỉ sang hai khung.',
    use: 'Màn kết YouTube (end screen), điều hướng sang video khác.',
    css: `.nv{position:absolute;top:180px;width:720px;height:405px;border-radius:32px;overflow:hidden;border:3px solid #ffffff1c;background:linear-gradient(140deg,#2b3240,#161a21)}
.nv b{position:absolute;left:30px;bottom:26px;right:30px;font-family:"BVP";font-weight:800;font-size:38px;color:var(--fg)}
.nv i{position:absolute;left:50%;top:42%;width:110px;height:110px;margin:-55px;border-radius:50%;background:#000a;border:4px solid #fffa}
#v0{left:150px}#v1{left:1050px}
#ce{position:absolute;left:885px;top:680px;width:150px;height:150px;border-radius:50%;background:linear-gradient(140deg,var(--accent),var(--accent2));border:6px solid var(--bg)}
#nx{position:absolute;left:0;right:0;top:880px;text-align:center;font-family:"BVP";font-weight:900;font-size:56px;color:var(--fg)}`,
    html: `<div class="nv" id="v0"><i></i><b data-var-text="video1">5 lỗi khi quay video bằng điện thoại</b></div><div class="nv" id="v1"><i></i><b data-var-text="video2">Làm video 30 giây trong 10 phút</b></div>
<div id="ce"></div><div id="nx" data-var-text="loikeu">Xem tiếp nhé 👆</div>`,
    js: `tl.fromTo("#v0",{x:-900,opacity:0},{x:0,opacity:1,duration:.8,ease:"expo.out"},.2);
tl.fromTo("#v1",{x:900,opacity:0},{x:0,opacity:1,duration:.8,ease:"expo.out"},.35);
tl.fromTo("#ce",{scale:0},{scale:1,duration:.6,ease:"back.out(2.2)"},.9);
rise("#nx",1.2);
tl.fromTo(".nv",{borderColor:"#ffffff1c"},{borderColor:"#ffffff1c",duration:.01},0);
[["#v0",2],["#v1",3]].forEach(([s,t])=>{tl.to(s,{scale:1.04,duration:.3,ease:"power2.out"},t);tl.to(s,{scale:1,duration:.3,ease:"power2.in"},t+.6);});
out(".nv,#ce,#nx",5.45);`,
  },
  {
    slug: 'cta-qr', name: 'Mã QR và lời kêu gọi', group: 'Kết video', duration: 6,
    desc: 'Khung mã QR vẽ dần từng ô vuông, khung quét chạy dọc, bên cạnh lời kêu gọi và hotline hiện lần lượt.',
    use: 'Cuối video quảng cáo, mời quét mã nhận ưu đãi, đặt lịch tham quan.',
    css: `#qr{position:absolute;left:300px;top:240px;width:600px;height:600px;border-radius:40px;background:#fff;padding:50px}
#gd{display:grid;grid-template-columns:repeat(21,1fr);gap:2px;width:500px;height:500px}
#gd i{background:#111;border-radius:2px}
#gd i.o{background:transparent}
#sn{position:absolute;left:300px;top:240px;width:600px;height:10px;border-radius:5px;background:var(--accent);box-shadow:0 0 40px var(--accent)}
#tx{position:absolute;left:1000px;top:330px;width:720px}
#tx b{display:block;font-family:"BVP";font-weight:900;font-size:76px;line-height:1.1;color:var(--fg)}
#tx span{display:block;margin-top:24px;font-family:"BVP";font-weight:700;font-size:40px;color:var(--muted)}
#tx em{display:inline-block;margin-top:34px;padding:18px 34px;border-radius:24px;background:var(--accent);font-style:normal;font-family:"BVP";font-weight:900;font-size:48px;color:#111}`,
    html: `<div id="qr"><div id="gd"></div></div><div id="sn"></div>
<div id="tx"><b data-var-text="tieude">Quét mã nhận bảng giá</b><span data-var-text="mota">Ưu đãi 5% cho 50 khách đầu tiên</span><em data-var-text="hotline">0909 000 000</em></div>`,
    js: `const gd=$("#gd"),N=21,on=(r,c)=>{const f=(rr,cc)=>rr<7&&cc<7;const fin=(R,C)=>{const a=Math.max(Math.abs(R-3),Math.abs(C-3));return a!==1;};
 if(r<7&&c<7)return fin(r,c);if(r<7&&c>=N-7)return fin(r,c-(N-7));if(r>=N-7&&c<7)return fin(r-(N-7),c);return ((r*7+c*13+r*c)%5)<2;};
let h="";for(let r=0;r<N;r++)for(let c=0;c<N;c++)h+=on(r,c)?"<i></i>":'<i class="o"></i>';gd.innerHTML=h;
tl.fromTo("#qr",{scale:.6,opacity:0},{scale:1,opacity:1,duration:.7,ease:"back.out(1.6)"},.1);
tl.fromTo("#gd i",{scale:0},{scale:1,duration:.25,stagger:{each:.0025,from:"start"}},.5);
tl.fromTo("#sn",{y:0,opacity:0},{y:590,opacity:1,duration:1.1,ease:"sine.inOut",yoyo:true,repeat:1},1.8);
rise("#tx b,#tx span,#tx em",1,.2);
out("#qr,#sn,#tx",5.45);`,
  },
  {
    slug: 'eq-bars', name: 'Cột âm lượng nhảy theo nhạc', group: 'Nhạc & nhịp', duration: 6,
    desc: 'Dãy cột equalizer nhảy lên xuống theo nhịp, màu chuyển dần từ cam sang vàng, tên bài hát và nghệ sĩ hiện bên trên.',
    use: 'Video nhạc, podcast, mở đầu chương trình có nhạc nền.',
    css: `#eq{position:absolute;left:240px;right:240px;bottom:220px;height:480px;display:flex;align-items:flex-end;gap:14px}
#eq i{flex:1;height:100%;border-radius:12px 12px 4px 4px;background:linear-gradient(0deg,var(--accent),var(--accent2));transform-origin:bottom center}
#sg{position:absolute;left:240px;top:150px}
#sg b{display:block;font-family:"BVP";font-weight:900;font-size:80px;color:var(--fg)}
#sg span{display:block;font-family:"BVP";font-weight:600;font-size:38px;color:var(--muted)}`,
    html: `<div id="sg"><b data-var-text="baihat">Chạy Về Phía Nắng</b><span data-var-text="nghesi">LNL Studio · 120 BPM</span></div><div id="eq">${'<i></i>'.repeat(32)}</div>`,
    js: `const B=$$("#eq i"),o={t:0},bpm=120;const ap=()=>{const b=o.t*bpm/60;B.forEach((el,i)=>{const kick=Math.pow(Math.max(0,Math.cos(Math.PI*2*b)),6);const v=.18+.42*Math.abs(Math.sin(o.t*3.1+i*.55))*(.6+.4*Math.sin(i*.9+o.t*1.7))+.4*kick*Math.exp(-Math.abs(i-16)/9);el.style.transform="scaleY("+Math.min(1,v).toFixed(3)+")";});};ap();
tl.fromTo(o,{t:0},{t:6,duration:6,ease:"none",onUpdate:ap},0);
tl.fromTo("#eq",{opacity:0},{opacity:1,duration:.5},.1);rise("#sg",.3);
out("#sg,#eq",5.45);`,
  },
  {
    slug: 'beat-title', name: 'Chữ đập theo nhịp', group: 'Nhạc & nhịp', duration: 6,
    desc: 'Tiêu đề phóng nhẹ theo mỗi phách 120 BPM, vòng sóng tỏa ra phía sau ở phách mạnh, nền chớp nhẹ theo nhịp.',
    use: 'Intro theo nhạc, reel nhịp nhanh, đoạn cao trào.',
    css: `#tt{position:absolute;left:0;right:0;top:400px;text-align:center;font-family:"BVP";font-weight:900;font-size:190px;color:var(--fg);letter-spacing:-.02em}
.rg{position:absolute;left:960px;top:500px;width:400px;height:400px;margin:-200px;border-radius:50%;border:8px solid var(--accent)}
#fl{position:absolute;inset:0;background:var(--accent);opacity:0}`,
    html: `<div id="fl"></div>${[0, 1, 2, 3].map((i) => `<div class="rg" id="r${i}"></div>`).join('')}<div id="tt" data-var-text="tieude">BÙNG NỔ</div>`,
    js: `const o={t:0},beat=.5;const ap=()=>{const b=o.t/beat,ph=b-Math.floor(b),pulse=Math.exp(-ph*6);
 $("#tt").style.transform="scale("+(1+.08*pulse)+")";$("#fl").style.opacity=String(.12*pulse*(Math.floor(b)%4===0?1:.4));
 [0,1,2,3].forEach(k=>{const el=$("#r"+k),bb=Math.floor(b/1)-k;const age=o.t-(Math.floor(b)-k)*beat;const s=age*2.2;el.style.transform="scale("+s.toFixed(3)+")";el.style.opacity=String(Math.max(0,.7-age*.6));});};ap();
tl.fromTo(o,{t:0},{t:6,duration:6,ease:"none",onUpdate:ap},0);
tl.fromTo("#tt",{opacity:0},{opacity:1,duration:.3},.2);
out("#tt,.rg",5.45);`,
  },
  {
    slug: 'waveform-voice', name: 'Sóng âm giọng đọc', group: 'Nhạc & nhịp', duration: 6,
    desc: 'Dải sóng âm đối xứng chạy theo thời gian, đầu đọc sáng quét ngang, nhãn tên người nói và thời lượng phía trên.',
    use: 'Podcast, audiogram, trích đoạn phỏng vấn, giọng đọc AI.',
    css: `#wv{position:absolute;left:200px;right:200px;top:420px;height:240px;display:flex;align-items:center;gap:6px}
#wv i{flex:1;height:100%;border-radius:4px;background:#ffffff26;transform-origin:center}
#wv i.p{background:var(--accent)}
#hd{position:absolute;left:200px;top:240px;display:flex;align-items:center;gap:26px}
#hd u{width:110px;height:110px;border-radius:50%;background:linear-gradient(140deg,var(--accent),var(--accent2))}
#hd b{display:block;font-family:"BVP";font-weight:900;font-size:56px;color:var(--fg)}
#hd span{display:block;font-family:"JBM";font-weight:700;font-size:30px;color:var(--muted)}`,
    html: `<div id="hd"><u></u><div><b data-var-text="ten">Podcast Nhà Đẹp · Tập 12</b><span id="tm">00:00 / 00:06</span></div></div><div id="wv">${'<i></i>'.repeat(90)}</div>`,
    js: `const W=$$("#wv i"),o={t:0},n=W.length;const amp=i=>.15+.85*Math.abs(Math.sin(i*.37)*Math.sin(i*.11+1)*Math.cos(i*.07));
W.forEach((el,i)=>el.style.transform="scaleY("+amp(i).toFixed(3)+")");
const ap=()=>{const k=Math.floor(o.t/6*n);W.forEach((el,i)=>{el.setAttribute("class",i<k?"p":"");});const s=Math.floor(o.t);$("#tm").textContent="00:0"+s+" / 00:06";};ap();
tl.fromTo(o,{t:0},{t:6,duration:6,ease:"none",onUpdate:ap},0);
tl.fromTo("#wv i",{scaleY:0},{scaleY:(i)=>amp(i),duration:.6,stagger:.005,ease:"back.out(2)"},.1);
rise("#hd",.2);
out("#hd,#wv",5.45);`,
  },
  {
    slug: 'pie-slices', name: 'Biểu đồ tròn tách lát', group: 'Biểu đồ', duration: 6,
    desc: 'Biểu đồ tròn vẽ từng lát theo chiều kim đồng hồ, lát lớn nhất tách ra khỏi tâm, chú thích phần trăm hiện bên phải.',
    use: 'Cơ cấu khách hàng, tỉ trọng doanh thu, phân bổ ngân sách.',
    css: `#pie{position:absolute;left:260px;top:180px;width:720px;height:720px}
#pie circle{fill:none;stroke-width:300}
.lg{position:absolute;left:1120px;display:flex;align-items:center;gap:24px;font-family:"BVP";font-weight:700;font-size:42px;color:var(--fg)}
.lg i{width:44px;height:44px;border-radius:12px}
.lg b{font-weight:900;margin-left:auto;min-width:130px;text-align:right}`,
    html: `<svg id="pie" viewBox="0 0 720 720"></svg>${[['Mạng xã hội', 46, 'var(--accent)'], ['Tìm kiếm', 28, 'var(--accent2)'], ['Giới thiệu', 16, '#60a5fa'], ['Khác', 10, '#94a3b8']].map(([n, v, c], i) => `<div class="lg" id="g${i}" style="top:${300 + i * 110}px;width:600px"><i style="background:${c}"></i>${n}<b>${v}%</b></div>`).join('')}`,
    js: `const D=[[46,"var(--accent)"],[28,"var(--accent2)"],[16,"#60a5fa"],[10,"#94a3b8"]],R=150,C=2*Math.PI*R,svg=$("#pie");let acc=0;
D.forEach(([v,c],i)=>{const el=document.createElementNS("http://www.w3.org/2000/svg","circle");el.setAttribute("cx","360");el.setAttribute("cy","360");el.setAttribute("r",String(R));el.setAttribute("stroke",c);el.setAttribute("transform","rotate("+(-90+acc*3.6)+" 360 360)");el.style.strokeDasharray=(C*v/100).toFixed(2)+" "+C.toFixed(2);el.id="sl"+i;svg.appendChild(el);
 tl.fromTo(el,{strokeDashoffset:C*v/100},{strokeDashoffset:0,duration:.7*v/46+.2,ease:"power2.out"},.3+acc/100*1.8);
 const mid=(-90+(acc+v/2)*3.6)*Math.PI/180;if(i===0)tl.to(el,{x:Math.cos(mid)*40,y:Math.sin(mid)*40,duration:.5,ease:"back.out(2)"},2.4);
 tl.fromTo("#g"+i,{opacity:0,x:40},{opacity:1,x:0,duration:.45,ease:"power3.out"},.5+acc/100*1.8);acc+=v;});
out("#pie,.lg",5.45);`,
  },
  {
    slug: 'hbar-rank', name: 'Thanh ngang đổi hạng', group: 'Biểu đồ', duration: 7,
    desc: 'Năm thanh ngang mọc ra theo giá trị năm đầu, rồi giá trị đổi sang năm sau, các thanh dài ra và đổi chỗ theo thứ hạng.',
    use: 'So sánh thị phần, xếp hạng khu vực, tăng trưởng giữa hai mốc.',
    css: `#yr{position:absolute;right:220px;top:140px;font-family:"BVP";font-weight:900;font-size:120px;color:var(--muted)}
.hb{position:absolute;left:220px;height:110px;display:flex;align-items:center}
.hb .lb{width:300px;font-family:"BVP";font-weight:800;font-size:40px;color:var(--fg)}
.hb .br{height:84px;border-radius:0 20px 20px 0;transform-origin:left center}
.hb .vl{margin-left:20px;font-family:"BVP";font-weight:900;font-size:40px;color:var(--fg)}`,
    html: `<div id="yr">2024</div>${[['Quận 2', '#ff6b3d'], ['Quận 7', '#ffc857'], ['Thủ Đức', '#60a5fa'], ['Bình Thạnh', '#34d399'], ['Quận 9', '#c084fc']].map(([n, c], i) => `<div class="hb" id="h${i}"><div class="lb">${n}</div><div class="br" id="b${i}" style="background:${c}"></div><div class="vl" id="v${i}">0</div></div>`).join('')}`,
    js: `const A=[82,64,58,40,22],B=[90,60,96,44,70],mx=100,full=1100,o={p:0};
const ap=()=>{const vals=A.map((a,i)=>a+(B[i]-a)*o.p);const order=vals.map((v,i)=>[v,i]).sort((x,y)=>y[0]-x[0]);
 order.forEach(([v,i],rank)=>{$("#h"+i).style.top=(330+rank*130)+"px";$("#b"+i).style.width=(v/mx*full).toFixed(1)+"px";$("#v"+i).textContent=Math.round(v)+"%";});
 $("#yr").textContent=o.p<.5?"2024":"2026";};
const g={s:0};const grow=()=>{A.forEach((a,i)=>{$("#b"+i).style.width=(a*g.s/mx*full).toFixed(1)+"px";$("#v"+i).textContent=Math.round(a*g.s)+"%";});};
ap();tl.fromTo(g,{s:0},{s:1,duration:1.2,ease:"power3.out",onUpdate:grow},.3);
tl.fromTo(".hb",{opacity:0},{opacity:1,duration:.3,stagger:.08},.2);
tl.fromTo(o,{p:0},{p:1,duration:2.4,ease:"power2.inOut",onUpdate:ap},2.4);
out(".hb,#yr",6.45);`,
  },
  {
    slug: 'kpi-grid', name: 'Lưới chỉ số kinh doanh', group: 'Biểu đồ', duration: 6,
    desc: 'Sáu ô chỉ số hiện theo đường chéo, mỗi ô đếm số kèm mũi tên tăng xanh hoặc giảm đỏ và đường xu hướng nhỏ tự vẽ.',
    use: 'Báo cáo tháng, dashboard nhanh, tổng kết chiến dịch.',
    css: `#kg{position:absolute;left:200px;top:160px;width:1520px;display:grid;grid-template-columns:repeat(3,1fr);gap:34px}
.kp{height:350px;border-radius:36px;background:var(--card);border:2px solid #ffffff12;padding:40px;position:relative}
.kp small{font-family:"JBM";font-weight:700;font-size:28px;letter-spacing:.12em;color:var(--muted)}
.kp b{display:block;margin-top:20px;font-family:"BVP";font-weight:900;font-size:84px;color:var(--fg)}
.kp em{font-style:normal;font-family:"BVP";font-weight:800;font-size:34px}
.kp em.u{color:#4ade80}.kp em.d{color:#f87171}
.kp svg{position:absolute;right:36px;bottom:40px;width:200px;height:80px}
.kp path{fill:none;stroke-width:6;stroke-linecap:round;stroke-linejoin:round}`,
    html: `<div id="kg">${[['DOANH THU', 'u', '+18%', 'M4 70 L50 52 L90 58 L140 30 L196 12'], ['ĐƠN HÀNG', 'u', '+9%', 'M4 60 L50 56 L90 40 L140 44 L196 22'], ['CHI PHÍ QC', 'd', '−6%', 'M4 20 L50 30 L90 26 L140 46 L196 58'], ['KHÁCH MỚI', 'u', '+24%', 'M4 72 L50 60 L90 44 L140 34 L196 8'], ['HOÀN ĐƠN', 'd', '−2%', 'M4 40 L50 44 L90 38 L140 50 L196 54'], ['ĐÁNH GIÁ', 'u', '+0,3', 'M4 50 L50 46 L90 40 L140 30 L196 26']].map(([n, k, d, p], i) => `<div class="kp" id="k${i}"><small>${n}</small><b id="n${i}">0</b><em class="${k}">${k === 'u' ? '▲' : '▼'} ${d}</em><svg viewBox="0 0 200 80"><path id="p${i}" d="${p}" stroke="${k === 'u' ? '#4ade80' : '#f87171'}"/></svg></div>`).join('')}</div>`,
    js: `const V=[[2.4,1,""," tỷ"],[1840,0],[312,0,""," tr"],[956,0],[38,0],[4.8,1,"","★"]];
V.forEach(([v,dec,pre,suf],i)=>{const t=.2+((i%3)+Math.floor(i/3))*.18;tl.fromTo("#k"+i,{opacity:0,y:50,scale:.94},{opacity:1,y:0,scale:1,duration:.55,ease:"back.out(1.7)"},t);
 count("#n"+i,v,t+.2,1.4,dec||0,pre||"",suf||"");const p=$("#p"+i),L=p.getTotalLength();p.style.strokeDasharray=L;tl.fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:1,ease:"power2.out"},t+.4);});
out("#kg",5.45);`,
  },
  {
    slug: 'route-draw', name: 'Tuyến đường vẽ giữa hai điểm', group: 'Bản đồ', duration: 6,
    desc: 'Hai ghim điểm đi và điểm đến cắm xuống, đường nét đứt cong tự vẽ nối hai điểm, chấm sáng chạy dọc tuyến, nhãn thời gian hiện giữa đường.',
    use: 'Khoảng cách tới trung tâm, tuyến giao thông mới, lộ trình giao hàng.',
    css: `#bg2{position:absolute;inset:0}
#bg2 path{fill:none;stroke:#ffffff10;stroke-width:12}
#rt{position:absolute;inset:0}
#rp{fill:none;stroke:var(--accent);stroke-width:10;stroke-linecap:round}
#rd{fill:none;stroke:var(--fg);stroke-width:4;stroke-dasharray:4 18;opacity:.5}
.pn{position:absolute;width:80px;height:96px;margin:-96px 0 0 -40px}
.pl{position:absolute;padding:14px 26px;border-radius:20px;background:var(--card);border:2px solid #ffffff1c;font-family:"BVP";font-weight:800;font-size:36px;color:var(--fg);white-space:nowrap}
#tm{position:absolute;left:880px;top:330px;padding:16px 30px;border-radius:999px;background:var(--accent2);font-family:"BVP";font-weight:900;font-size:44px;color:#111}`,
    html: `<svg id="bg2" viewBox="0 0 1920 1080"><path d="M0 300 C 600 360, 1200 200, 1920 280"/><path d="M0 760 C 700 700, 1300 860, 1920 780"/><path d="M500 0 C 560 400, 460 700, 540 1080"/><path d="M1400 0 C 1340 400, 1460 700, 1380 1080"/></svg>
<svg id="rt" viewBox="0 0 1920 1080"><path id="rd" d="M360 760 C 700 300, 1200 260, 1560 420"/><path id="rp" d="M360 760 C 700 300, 1200 260, 1560 420"/><circle id="dot" r="20" fill="var(--accent2)"/></svg>
<svg class="pn" id="pA" style="left:360px;top:760px" viewBox="0 0 100 120"><path d="M50 118 C 20 80, 6 60, 6 42 A44 44 0 0 1 94 42 C 94 60, 80 80, 50 118 Z" fill="var(--fg)"/></svg>
<svg class="pn" id="pB" style="left:1560px;top:420px" viewBox="0 0 100 120"><path d="M50 118 C 20 80, 6 60, 6 42 A44 44 0 0 1 94 42 C 94 60, 80 80, 50 118 Z" fill="var(--accent)"/></svg>
<div class="pl" id="lA" style="left:220px;top:790px" data-var-text="diemdi">Dự án Eco City</div><div class="pl" id="lB" style="left:1440px;top:450px" data-var-text="diemden">Trung tâm Q1</div>
<div id="tm" data-var-text="thoigian">15 phút</div>`,
    js: `const rp=$("#rp"),L=rp.getTotalLength();rp.style.strokeDasharray=L;
tl.fromTo("#bg2 path",{opacity:0},{opacity:1,duration:.6,stagger:.08},.1);
tl.fromTo("#pA",{y:-200,opacity:0},{y:0,opacity:1,duration:.6,ease:"bounce.out"},.4);
tl.fromTo("#pB",{y:-200,opacity:0},{y:0,opacity:1,duration:.6,ease:"bounce.out"},.6);
rise("#lA,#lB",.9,.15);
tl.fromTo("#rd",{opacity:0},{opacity:.5,duration:.4},1.2);
tl.fromTo(rp,{strokeDashoffset:L},{strokeDashoffset:0,duration:2,ease:"power2.inOut"},1.4);
const o={p:0};const ap=()=>{const pt=rp.getPointAtLength(L*o.p);$("#dot").setAttribute("cx",pt.x.toFixed(1));$("#dot").setAttribute("cy",pt.y.toFixed(1));};ap();
tl.fromTo(o,{p:0},{p:1,duration:2,ease:"power2.inOut",onUpdate:ap},1.4);
pop("#tm",2.6);
out("#bg2,#rt,.pn,.pl,#tm",5.45);`,
  },
  {
    slug: 'branch-pins', name: 'Ghim chi nhánh rơi xuống', group: 'Bản đồ', duration: 6,
    desc: 'Lưới chấm bản đồ hiện mờ, các ghim rơi xuống lần lượt ở nhiều vị trí, mỗi ghim tỏa vòng sáng, bộ đếm số chi nhánh tăng theo.',
    use: 'Mạng lưới cửa hàng, đại lý toàn quốc, số dự án đã triển khai.',
    css: `#dots{position:absolute;inset:0;background-image:radial-gradient(circle,#ffffff1f 2px,transparent 3px);background-size:36px 36px}
.bp{position:absolute;width:56px;height:68px;margin:-68px 0 0 -28px}
.gl{position:absolute;width:140px;height:140px;margin:-70px;border-radius:50%;border:4px solid var(--accent)}
#cnt{position:absolute;left:150px;top:150px;padding:30px 44px;border-radius:36px;background:var(--card);border:2px solid #ffffff1a}
#cnt b{display:block;font-family:"BVP";font-weight:900;font-size:110px;line-height:1;color:var(--accent)}
#cnt span{display:block;margin-top:10px;font-family:"BVP";font-weight:700;font-size:36px;color:var(--fg)}`,
    html: `<div id="dots"></div>${[[760, 300], [980, 420], [1210, 360], [1450, 520], [880, 640], [1120, 760], [1360, 860], [1600, 300], [700, 860], [1520, 720]].map(([x, y], i) => `<div class="gl" id="o${i}" style="left:${x}px;top:${y - 30}px"></div><svg class="bp" id="b${i}" style="left:${x}px;top:${y}px" viewBox="0 0 100 120"><path d="M50 118 C 20 80, 6 60, 6 42 A44 44 0 0 1 94 42 C 94 60, 80 80, 50 118 Z" fill="var(--accent)"/><circle cx="50" cy="42" r="16" fill="var(--bg)"/></svg>`).join('')}
<div id="cnt"><b id="cn">0</b><span data-var-text="nhan">chi nhánh toàn quốc</span></div>`,
    js: `tl.fromTo("#dots",{opacity:0},{opacity:1,duration:.8},.1);rise("#cnt",.3);
for(let i=0;i<10;i++){const t=.7+i*.32;tl.fromTo("#b"+i,{y:-260,opacity:0},{y:0,opacity:1,duration:.5,ease:"bounce.out"},t);tl.fromTo("#o"+i,{scale:0,opacity:.9},{scale:1.4,opacity:0,duration:.9,ease:"power2.out"},t+.4);}
count("#cn",48,.7,3.2);
out("#dots,.bp,.gl,#cnt",5.45);`,
  },
  {
    slug: 'speaker-side-points', name: 'Người nói lệch phải kèm ý chính', group: 'Người nói', duration: 7,
    desc: 'Khung người nói thu nhỏ trượt sang phải, bên trái các ý chính hiện lần lượt kèm số thứ tự, ý đang nói sáng màu nhấn.',
    use: 'Video talking head có liệt kê ý, bài giảng, review sản phẩm.',
    css: `${SPK_CSS}
#fr{position:absolute;top:110px;left:1080px;width:640px;height:860px;border-radius:40px;overflow:hidden;border:4px solid var(--accent);box-shadow:0 50px 120px #000b}
.pt{position:absolute;left:180px;width:820px;display:flex;align-items:center;gap:30px;padding:26px 30px;border-radius:30px;font-family:"BVP";font-weight:800;font-size:46px;color:var(--muted)}
.pt i{flex:none;width:72px;height:72px;border-radius:22px;background:#ffffff12;display:flex;align-items:center;justify-content:center;font-style:normal;font-family:"BVP";font-weight:900;font-size:38px;color:var(--fg)}
.pt.on{background:var(--card);color:var(--fg)}.pt.on i{background:var(--accent);color:#111}`,
    html: `<div id="fr">${SPEAKER}</div>${['Chọn đúng góc máy', 'Ánh sáng từ phía trước', 'Nói chậm, rõ từng ý'].map((t, i) => `<div class="pt" id="p${i}" style="top:${290 + i * 180}px"><i>${i + 1}</i><span data-var-text="y${i + 1}">${t}</span></div>`).join('')}`,
    js: `tl.fromTo("#fr",{x:-560,scale:1.25},{x:0,scale:1,duration:1,ease:"expo.inOut"},.2);
[0,1,2].forEach(i=>{const t=1.3+i*1.5;tl.fromTo("#p"+i,{opacity:0,x:-60},{opacity:1,x:0,duration:.5,ease:"power3.out"},t);
 tl.set("#p"+i,{attr:{class:"pt on"}},t);if(i)tl.set("#p"+(i-1),{attr:{class:"pt"}},t);});
out("#fr,.pt",6.45);`,
  },
  {
    slug: 'karaoke-caption', name: 'Phụ đề tô màu từng từ', group: 'Người nói', duration: 6,
    desc: 'Phụ đề lớn ở dưới khung người nói, từng từ sáng lên và nảy nhẹ đúng lúc được nói, từ khoá đổi màu nhấn.',
    use: 'Phụ đề kiểu TikTok / Reels cho video người nói, giọng đọc.',
    css: `${SPK_CSS}
#fr{position:absolute;inset:0}
#cap{position:absolute;left:160px;right:160px;bottom:150px;text-align:center}
#cap span{display:inline-block;margin:0 12px;font-family:"BVP";font-weight:900;font-size:84px;color:#ffffffad;text-shadow:0 6px 24px #000c}
#cap span.on{color:#fff}#cap span.key{color:var(--accent2)}`,
    html: `<div id="fr">${SPEAKER}</div><div id="cap" data-var-text="phude"></div>`,
    js: `const T="Ba bước để video của bạn giữ chân người xem".split(" "),keys=[0,1,8],cap=$("#cap");
cap.innerHTML=T.map(w=>"<span>"+w+"</span>").join(" ");const S=$$("#cap span");
tl.fromTo("#cap",{opacity:0,y:30},{opacity:1,y:0,duration:.4},.3);
S.forEach((s,i)=>{const t=.6+i*.48;tl.set(s,{attr:{class:keys.includes(i)?"key":"on"}},t);tl.fromTo(s,{scale:1},{scale:1.14,duration:.12,yoyo:true,repeat:1,ease:"power2.out"},t);});
out("#cap",5.45);`,
  },
  {
    slug: 'speaker-pip-topic', name: 'Khung tròn người nói và chủ đề', group: 'Người nói', duration: 6,
    desc: 'Khung người nói tròn ở góc dưới trái nảy ra, thẻ chủ đề lớn chiếm phần còn lại với tiêu đề và gạch nhấn, thanh tiến trình chạy dưới đáy.',
    use: 'Video giải thích có người nói nhỏ ở góc, bài giảng trên slide.',
    css: `${SPK_CSS}
#pip{position:absolute;left:110px;bottom:110px;width:320px;height:320px;border-radius:50%;overflow:hidden;border:8px solid var(--accent);box-shadow:0 30px 80px #000b}
#tp{position:absolute;left:520px;top:220px;right:160px}
#tp small{display:block;font-family:"JBM";font-weight:700;font-size:32px;letter-spacing:.2em;color:var(--accent)}
#tp b{display:block;margin-top:20px;font-family:"BVP";font-weight:900;font-size:100px;line-height:1.1;color:var(--fg)}
#tp i{display:block;margin-top:36px;width:260px;height:12px;border-radius:6px;background:var(--accent2);transform-origin:left center}
#tp p{margin:36px 0 0;font-family:"BVP";font-weight:600;font-size:42px;line-height:1.4;color:var(--muted)}
#pg{position:absolute;left:0;bottom:0;height:12px;width:1920px;background:var(--accent);transform-origin:left center}`,
    html: `<div id="pip">${SPEAKER}</div><div id="tp"><small data-var-text="chuong">PHẦN 2</small><b data-var-text="tieude">Định giá căn hộ thế nào?</b><i></i><p data-var-text="mota">Ba yếu tố quyết định: vị trí, pháp lý và tiến độ.</p></div><div id="pg"></div>`,
    js: `tl.fromTo("#pip",{scale:0},{scale:1,duration:.7,ease:"back.out(1.8)"},.2);
rise("#tp small,#tp b",.5,.15);tl.fromTo("#tp i",{scaleX:0},{scaleX:1,duration:.5,ease:"power3.out"},1);rise("#tp p",1.2);
tl.fromTo("#pg",{scaleX:0},{scaleX:1,duration:5.2,ease:"none"},.3);
out("#pip,#tp",5.45);`,
  },
  {
    slug: 'gradient-blobs', name: 'Nền khối màu trôi', group: 'Nền chuyển động', duration: 8,
    desc: 'Các khối màu lớn nhoè mờ trôi chậm và đổi chỗ cho nhau như dung nham, tiêu đề đứng yên phía trên, dùng làm nền cho chữ.',
    use: 'Nền cho tiêu đề, trích dẫn, màn chờ, video thư giãn.',
    css: `.bl{position:absolute;width:900px;height:900px;margin:-450px;border-radius:50%;filter:blur(120px);opacity:.85}
#b0{background:var(--accent)}#b1{background:var(--accent2)}#b2{background:#60a5fa}#b3{background:#c084fc}
#gr{position:absolute;inset:0;background-image:radial-gradient(#ffffff0a 1px,transparent 1.5px);background-size:6px 6px}
#tt{position:absolute;left:0;right:0;top:430px;text-align:center;font-family:"BVP";font-weight:900;font-size:140px;color:#fff;text-shadow:0 10px 60px #0006}`,
    html: `<div class="bl" id="b0"></div><div class="bl" id="b1"></div><div class="bl" id="b2"></div><div class="bl" id="b3"></div><div id="gr" data-layout-ignore></div><div id="tt" data-var-text="tieude">Thở chậm lại</div>`,
    js: `const P=[[600,400,.21,0],[1300,650,.17,1.7],[900,800,.13,3.1],[1500,300,.19,4.4]],o={t:0};
const ap=()=>P.forEach(([x,y,f,ph],i)=>{const el=$("#b"+i);el.style.left=(x+260*Math.sin(o.t*f*2+ph)).toFixed(1)+"px";el.style.top=(y+200*Math.cos(o.t*f*2.6+ph)).toFixed(1)+"px";});ap();
tl.fromTo(o,{t:0},{t:8,duration:8,ease:"none",onUpdate:ap},0);
tl.fromTo(".bl",{opacity:0},{opacity:.85,duration:1.2},0);rise("#tt",.6);
out("#tt",7.45);`,
  },
  {
    slug: 'retro-grid', name: 'Lưới phối cảnh chạy tới', group: 'Nền chuyển động', duration: 6,
    desc: 'Mặt lưới phối cảnh trải về đường chân trời và chạy liên tục về phía người xem, mặt trời sọc lặn phía sau, tiêu đề phát sáng.',
    use: 'Phong cách retro, giới thiệu sự kiện, mở đầu kênh công nghệ.',
    css: `#sky{position:absolute;inset:0;background:linear-gradient(180deg,#120b2a 0%,#3b0d4a 55%,#0b0614 56%)}
#sun{position:absolute;left:660px;top:180px;width:600px;height:420px;border-radius:300px 300px 0 0;background:linear-gradient(180deg,var(--accent2),var(--accent));-webkit-mask:repeating-linear-gradient(180deg,#000 0 26px,transparent 26px 36px);mask:repeating-linear-gradient(180deg,#000 0 26px,transparent 26px 36px)}
#pl{position:absolute;left:0;top:0;width:1920px;height:1080px}
#pl line{stroke:var(--accent);stroke-width:3;opacity:.85}
#tt{position:absolute;left:0;right:0;top:330px;text-align:center;font-family:"BVP";font-weight:900;font-size:150px;color:#fff;text-shadow:0 0 30px var(--accent),0 0 80px var(--accent)}`,
    html: `<div id="sky"></div><div id="sun"></div><svg id="pl" viewBox="0 0 1920 1080" data-layout-ignore></svg><div id="tt" data-var-text="tieude">ĐÊM HỘI 2026</div>`,
    js: `const pl=$("#pl"),NS="http://www.w3.org/2000/svg",H=600,vx=960;for(let k=-14;k<=14;k++){const l=document.createElementNS(NS,"line");l.setAttribute("x1",String(vx+k*20));l.setAttribute("y1",String(H));l.setAttribute("x2",String(vx+k*260));l.setAttribute("y2","1080");pl.appendChild(l);}
const hs=[];for(let k=0;k<12;k++){const l=document.createElementNS(NS,"line");l.setAttribute("x1","0");l.setAttribute("x2","1920");pl.appendChild(l);hs.push(l);}
const o={t:0};const ap=()=>hs.forEach((l,k)=>{const f=((k+o.t*1.5)%12)/12;const y=H+(1080-H)*f*f;l.setAttribute("y1",y.toFixed(1));l.setAttribute("y2",y.toFixed(1));l.style.opacity=String(Math.min(1,f*3));});ap();
tl.fromTo(o,{t:0},{t:6,duration:6,ease:"none",onUpdate:ap},0);
tl.fromTo("#sun",{y:200,opacity:0},{y:0,opacity:1,duration:1.4,ease:"expo.out"},.2);
tl.fromTo("#tt",{opacity:0,scale:1.2},{opacity:1,scale:1,duration:.8,ease:"expo.out"},1);
tl.to("#tt",{opacity:.75,duration:.08,yoyo:true,repeat:3},2.2);
out("#tt",5.45);`,
  },
  {
    slug: 'dot-wave', name: 'Lưới chấm gợn sóng', group: 'Nền chuyển động', duration: 6,
    desc: 'Lưới chấm phủ kín khung hình, sóng tròn lan ra từ tâm làm chấm phồng to và sáng màu theo nhịp, chữ hiện ở giữa.',
    use: 'Nền công nghệ, mở đầu sản phẩm AI, màn chờ livestream.',
    css: `#dg{position:absolute;inset:0}
#dg i{position:absolute;width:14px;height:14px;margin:-7px;border-radius:50%;background:var(--accent)}
#tt{position:absolute;left:0;right:0;top:450px;text-align:center;font-family:"BVP";font-weight:900;font-size:130px;color:var(--fg);text-shadow:0 0 40px var(--bg)}`,
    html: `<div id="dg" data-layout-ignore></div><div id="tt" data-var-text="tieude">Trí tuệ nhân tạo</div>`,
    js: `const dg=$("#dg"),cols=33,rows=19,dots=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=40+c*57.5,y=40+r*55.5;const el=document.createElement("i");el.style.left=x+"px";el.style.top=y+"px";dg.appendChild(el);dots.push([el,Math.hypot(x-960,y-540)]);}
const o={t:0};const ap=()=>dots.forEach(([el,d])=>{const w=Math.sin(d/90-o.t*4);const s=.35+.65*Math.max(0,w);el.style.transform="scale("+s.toFixed(3)+")";el.style.opacity=(.15+.85*Math.max(0,w)).toFixed(3);});ap();
tl.fromTo(o,{t:0},{t:6,duration:6,ease:"none",onUpdate:ap},0);
rise("#tt",.8);
out("#tt",5.45);`,
  },
  {
    slug: 'split-slide', name: 'Chuyển cảnh tách đôi trượt', group: 'Chuyển cảnh', duration: 3,
    desc: 'Cảnh cũ cắt ngang làm hai, nửa trên trượt lên, nửa dưới trượt xuống, để lộ cảnh mới nằm phía sau với đường cắt sáng.',
    use: 'Chuyển chương, mở màn sản phẩm, chuyển cảnh gọn gàng.',
    css: `.scn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:150px}
#B{background:var(--bg);color:var(--accent)}
.hf{position:absolute;left:0;right:0;height:540px;overflow:hidden;background:var(--card)}
.hf span{position:absolute;left:0;right:0;height:1080px;display:flex;align-items:center;justify-content:center;font-family:"BVP";font-weight:900;font-size:150px;color:var(--fg)}
#hT{top:0}#hT span{top:0}#hB{top:540px}#hB span{top:-540px}
#ln{position:absolute;left:0;right:0;top:536px;height:8px;background:var(--accent2);transform-origin:center}`,
    html: `<div class="scn" id="B" data-var-text="canhB" data-layout-allow-occlusion data-layout-allow-overlap>Chương mới</div><div class="hf" id="hT" data-layout-allow-overflow data-layout-allow-occlusion data-layout-allow-overlap><span data-var-text="canhA">Chương cũ</span></div><div class="hf" id="hB" data-layout-allow-overflow data-layout-allow-occlusion data-layout-allow-overlap><span data-var-text="canhA">Chương cũ</span></div><div id="ln" data-layout-ignore></div>`,
    js: `tl.fromTo("#ln",{scaleX:0},{scaleX:1,duration:.4,ease:"power3.out"},.4);
tl.to("#hT",{yPercent:-100,duration:.8,ease:"expo.inOut"},.9);tl.to("#hB",{yPercent:100,duration:.8,ease:"expo.inOut"},.9);
tl.to("#ln",{opacity:0,duration:.3},1.2);
tl.fromTo("#B",{scale:.9},{scale:1,duration:1,ease:"expo.out"},1);`,
  },
];
