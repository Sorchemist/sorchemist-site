/* =========================================================
   SORCHEMIST — 3D Vadi Sahnesi (saf WebGL, kütüphanesiz)
   SC.createScene(canvas, { mode: "valley" | "library" | "forge" })
   - valley : ay ışığında Hobbit vadisi (ana sayfa)
   - library: kuzey ışıklı gece, uçuşan rün ışıkları (konular)
   - forge  : köz rengi gökyüzü, yükselen kıvılcımlar (deneyler)
   Fare/eğim ile kamera, kaydırma ile ilerleme; FPS'e göre
   çözünürlük ayarı; ekran dışında ve gizli sekmede durur.
   ========================================================= */
(() => {
  "use strict";
  const SC = (window.SC = window.SC || {});
  const MODES = { valley: 0, library: 1, forge: 2 };

  const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const FS = `
    precision highp float;
    uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform float uIntro; uniform float uMode;
    float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
    float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y); }
    const mat2 M = mat2(1.6,1.2,-1.2,1.6);
    float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=M*p; a*=.5; } return v; }
    float terrain(vec2 q){
      float h = fbm(q*.045)*15. + fbm(q*.2)*1.2;
      float river = abs(q.x + sin(q.y*.045)*7. + sin(q.y*.11)*2.);
      h *= .08 + .92*smoothstep(2., 22., river);
      return h - 1.6;
    }
    vec3 nrm(vec3 p, float t){ vec2 e=vec2(.02+.002*t,0.);
      return normalize(vec3(terrain(p.xz-e.xy)-terrain(p.xz+e.xy), 2.*e.x, terrain(p.xz-e.yx)-terrain(p.xz+e.yx))); }
    void main(){
      float lib = step(.5,uMode)*step(uMode,1.5);
      float forge = step(1.5,uMode);
      vec2 uv = (gl_FragCoord.xy - .5*uRes) / uRes.y;
      float z = uTime*.9 + uScroll*14.;
      vec3 ro = vec3(uMouse.x*1.6, 0., z);
      ro.y = max(max(terrain(ro.xz), terrain(ro.xz+vec2(0.,3.))), max(terrain(ro.xz+vec2(0.,7.)), terrain(ro.xz+vec2(0.,12.)))*.85) + 2.6 - uMouse.y*.5 + uScroll*1.2;
      vec3 ta = ro + vec3(uMouse.x*.35, -.14 - uMouse.y*.08 - uScroll*.12, 1.);
      vec3 fw = normalize(ta-ro), rt = normalize(cross(vec3(0,1,0),fw)), up = cross(fw,rt);
      vec3 rd = normalize(fw*1.35 + uv.x*rt + uv.y*up);

      vec3 moonDir = normalize(vec3(.3 + uMouse.x*.05, .13, 1.));
      // Gökyüzü paletleri
      vec3 skyLow = mix(mix(vec3(.05,.15,.14), vec3(.04,.07,.16), lib), vec3(.32,.11,.04), forge);
      vec3 skyTop = mix(mix(vec3(.012,.03,.05), vec3(.01,.012,.04), lib), vec3(.04,.015,.02), forge);
      vec3 sky = mix(skyLow, skyTop, pow(clamp(rd.y+.05,0.,1.),.45));
      float md = max(dot(rd,moonDir),0.);
      vec3 moonCol = mix(vec3(1.,.92,.75), vec3(1.,.45,.15), forge);
      sky += moonCol*smoothstep(.99935,.99965,md)*1.6*(1.-forge*.5) + moonCol*pow(md,180.)*.35 + mix(vec3(.4,.6,.6), vec3(.9,.35,.1), forge)*pow(md,10.)*(.2+forge*.4);
      if(rd.y>0.){
        vec2 sp = rd.xy/(rd.z+1.)*140.; float s = hash(floor(sp)); vec2 sf = fract(sp)-.5;
        sky += step(.992 - lib*.006,s) * smoothstep(.32,.0,length(sf)) * (.45+.55*sin(uTime*2.+s*90.)) * vec3(.85,.92,1.) * smoothstep(0.,.2,rd.y) * .9 * (1.-forge*.7);
        // Kuzey ışıkları (kütüphane)
        if(lib>.5){
          float a = rd.x*2.2 + uTime*.05;
          float band = sin(a*3. + fbm(vec2(a*2., uTime*.1))*4.)*.08 + .32;
          float d = abs(rd.y - band);
          float curtain = smoothstep(.12,.0,d) * (.5+.5*fbm(vec2(rd.x*18., uTime*.4)));
          sky += mix(vec3(.15,.9,.6), vec3(.55,.3,1.), smoothstep(.2,.45,rd.y)) * curtain * .45 * smoothstep(0.,.15,rd.y);
        }
      }

      float t = .3, h = 0.; bool hit = false;
      for(int i=0;i<96;i++){
        vec3 p = ro + rd*t; h = p.y - terrain(p.xz);
        if(h < .003*t){ hit = true; break; }
        t += h*.42; if(t>90.) break;
      }
      vec3 col = sky;
      vec3 fogBase = mix(mix(vec3(.045,.12,.115), vec3(.04,.06,.12), lib), vec3(.2,.08,.04), forge);
      vec3 fogCol = mix(fogBase, mix(vec3(.2,.26,.22), vec3(.5,.2,.07), forge), pow(md,5.)*.7);
      if(hit){
        vec3 p = ro + rd*t; vec3 n = nrm(p,t);
        float dif = clamp(dot(n,moonDir),0.,1.);
        float hgt = smoothstep(-1.5, 6., p.y);
        vec3 base = mix(vec3(.03,.075,.05), vec3(.09,.16,.07), hgt);
        base = mix(base, vec3(.12,.12,.09), smoothstep(.65,.4,n.y));
        base = mix(base, base*vec3(.75,.8,1.2), lib);
        base = mix(base, vec3(.08,.05,.035)*(.6+hgt), forge);
        vec3 lightCol = mix(vec3(1.1,1.25,1.3), vec3(1.6,.8,.4), forge);
        col = base*(.12 + dif*lightCol) + vec3(.02,.05,.05)*(1.-n.y);
        col += mix(vec3(.25,.45,.42), vec3(.6,.25,.08), forge)*pow(1.-clamp(dot(n,-rd),0.,1.),4.)*.25;
        // Hobbit evlerinin sıcak pencereleri / ocaklar
        vec2 cell = floor(p.xz*.35); vec2 f = fract(p.xz*.35)-.5;
        float r = hash(cell);
        if(r > .965 - forge*.02 && p.y > -1.2){ float w = smoothstep(.18 + forge*.08,.0,length(f)); col += vec3(1.,.62,.22)*w*(2.2+forge*1.5)*(.7+.3*sin(uTime*3.+r*40.)); }
        // Nehir (forge modunda lav)
        vec3 riverCol = mix(vec3(.2,.45,.5), vec3(1.4,.45,.08), forge);
        col += riverCol*smoothstep(-1.45,-1.6,p.y)*(.6+forge*.8)*(.6+.4*noise(p.xz*2.+uTime*(1.+forge)));
        float fog = 1. - exp(-t*(.026 + lib*.006));
        col = mix(col, fogCol, fog);
      }
      col += mix(vec3(.1,.2,.19), vec3(.35,.12,.04), forge)*.18*smoothstep(.2,-.15,rd.y);

      // Uçuşan ışıklar: ateşböceği / rün / kıvılcım
      for(int i=0;i<18;i++){
        float fi = float(i);
        vec3 q = vec3(sin(fi*12.9 + uTime*.25)*7., ro.y - 1.6 + sin(uTime*.8+fi*1.7)*.6 + fract(fi*.37)*2.2, 0.);
        q.y += forge * (mod(uTime*(.6+fract(fi*.53)) + fi*1.3, 5.) - 2.); // kıvılcımlar yükselir
        q.x += forge * sin(uTime*2. + fi)*.4;
        q.z = z + 2. + mod(fi*7.31 - z, 34.);
        vec3 w = q - ro; float tp = dot(w, rd);
        if(tp>0. && (!hit || tp<t)){
          float d = length(w - rd*tp);
          float k = mod(fi,4.);
          vec3 c = k<1. ? vec3(.35,1.,.75) : k<2. ? vec3(.4,.8,1.) : k<3. ? vec3(1.,.72,.3) : vec3(.8,.55,1.);
          c = mix(c, k<2. ? vec3(.55,.75,1.) : vec3(.75,.55,1.), lib*.6);
          c = mix(c, k<2. ? vec3(1.,.55,.15) : vec3(1.,.8,.35), forge);
          float size = mix(.0016, .0009, forge);
          col += c * size/(d*d+.0006) / (1.+tp*.12) * (.6+.4*sin(uTime*(2.3+forge*6.)+fi));
        }
      }
      // İmleç feneri
      vec2 mp = vec2(uMouse.x*uRes.x/uRes.y*.5, -uMouse.y*.5);
      float ml = length(uv - mp);
      col += mix(vec3(1.,.8,.45), vec3(1.,.55,.2), forge)*.0035/(ml*ml+.006);

      col = 1. - exp(-col*1.5);
      col = pow(col, vec3(.85));
      float vig = smoothstep(1.25,.35,length(uv*vec2(.85,1.)));
      col *= mix(.55,1.,vig);
      col += (hash(gl_FragCoord.xy + fract(uTime)*100.) - .5)*.035;
      gl_FragColor = vec4(col*uIntro, 1.);
    }`;

  SC.createScene = (canvas, opts = {}) => {
    const mode = MODES[opts.mode] ?? 0;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    const fail = () => { document.documentElement.classList.add("no-webgl"); return { reveal() {} }; };
    if (!gl) return fail();
    const sh = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    };
    const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS);
    if (!v || !f) return fail();
    const prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fail();
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {}; ["uRes", "uTime", "uMouse", "uScroll", "uIntro", "uMode"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));
    gl.uniform1f(U.uMode, mode);

    let scale = innerWidth < 700 ? .45 : .6;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * scale * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };
    addEventListener("resize", resize); resize();

    let visible = true, running = !document.hidden;
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
    document.addEventListener("visibilitychange", () => (running = !document.hidden));

    let intro = 0, introTarget = opts.autoReveal ? 1 : 0;
    let last = performance.now(), time = opts.startTime || 0, frames = 0, acc = 0;
    const scrollRange = opts.scrollRange || innerHeight;
    function frame(now) {
      requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, .1); last = now;
      if (!running || !visible) return;
      if (!SC.reduced) time += dt;
      intro = SC.lerp(intro, introTarget, 1 - Math.pow(.02, dt));
      frames++; acc += dt;
      if (acc > 1.5) {
        const fps = frames / acc; frames = 0; acc = 0;
        if (fps < 40 && scale > .3) { scale -= .08; resize(); } else if (fps > 58 && scale < .75) { scale += .04; resize(); }
      }
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uTime, time);
      gl.uniform2f(U.uMouse, SC.mouse.sx, SC.mouse.sy);
      gl.uniform1f(U.uScroll, SC.clamp(scrollY / scrollRange, 0, 1.2));
      gl.uniform1f(U.uIntro, intro);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(frame);
    return { reveal() { introTarget = 1; } };
  };
})();
