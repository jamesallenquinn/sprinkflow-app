/* ============================================================================
 * SprinkFlow — Learn Hydraulic Calcs: animated SVG scenes
 * ----------------------------------------------------------------------------
 * Every lab step draws one of a handful of live scenes. A scene owns its SVG,
 * exposes update(state) so a lab can drive it from real hydraulic numbers, and
 * (optionally) reports taps on its parts so a step can be "tap the flow path".
 *
 * Scenes: tree | head | pipe | loop | curve
 * UMD global `HydraulicScenes`.
 * ========================================================================== */
(function (global) {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var STYLE_ID = "lh-scene-style";

  function E(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function n1(v) { return (Math.round(v * 10) / 10).toFixed(1); }

  /* Visual mapping: gpm -> stroke width, and gpm -> dash animation period.
     Square-rooted so a 4x flow change reads as a 2x thicker pipe, which keeps
     the small branch flows visible next to a big main. */
  function wFor(q) { return clamp(2.2 + Math.sqrt(Math.max(0, q)) * 0.62, 2.2, 11); }
  function durFor(q) { return clamp(2.6 - Math.sqrt(Math.max(0, q)) * 0.16, 0.42, 2.6).toFixed(2) + "s"; }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = [
      ".lh-scene{display:block;width:100%;height:auto;max-height:164px;margin:0 auto;overflow:visible;touch-action:manipulation}",
      ".lh-scene .casing{stroke:#38434f;stroke-linecap:round;fill:none}",
      ".lh-scene .wet{stroke:#37b7e4;stroke-linecap:round;fill:none;opacity:0;transition:opacity .35s ease,stroke-width .5s ease,stroke .35s ease}",
      ".lh-scene .wet.on{opacity:1;stroke-dasharray:7 11;animation:lhDash 1.2s linear infinite}",
      ".lh-scene .wet.hot{stroke:#8b7cf6;filter:drop-shadow(0 0 5px rgba(139,124,246,.75))}",
      ".lh-scene .wet.warm{stroke:#ffb03a}",
      "@keyframes lhDash{to{stroke-dashoffset:-36}}",
      ".lh-scene .hit{stroke:transparent;stroke-width:26;fill:none;cursor:pointer;stroke-linecap:round}",
      ".lh-scene .node{fill:#202832;stroke:#536171;stroke-width:2;transition:fill .3s,stroke .3s,r .3s}",
      ".lh-scene .node.on{fill:rgba(55,183,228,.35);stroke:#37b7e4}",
      ".lh-scene .node.hot{fill:rgba(139,124,246,.4);stroke:#8b7cf6;filter:drop-shadow(0 0 6px rgba(139,124,246,.7))}",
      ".lh-scene .node.got{fill:rgba(61,220,151,.35);stroke:#3ddc97}",
      ".lh-scene .node.tappable{cursor:pointer;animation:lhPulse 1.6s ease-in-out infinite}",
      "@keyframes lhPulse{0%,100%{opacity:1}50%{opacity:.5}}",
      ".lh-scene .ring{fill:none;stroke:#8b7cf6;stroke-width:2;opacity:0}",
      ".lh-scene .ring.go{animation:lhRing .6s ease-out}",
      "@keyframes lhRing{0%{opacity:.9;r:8}100%{opacity:0;r:22}}",
      ".lh-scene text{font-family:Inter,system-ui,sans-serif;paint-order:stroke;stroke:#0d1116;stroke-width:3px;stroke-linejoin:round}",
      ".lh-scene .nm{font-size:9px;font-weight:600;fill:#aab4bd}",
      ".lh-scene .nostroke{stroke:none}",
      ".lh-scene .val{font-size:10px;font-weight:700;fill:#37b7e4;opacity:0;transition:opacity .3s}",
      ".lh-scene .val.on{opacity:1}",
      ".lh-scene .val.hot{fill:#8b7cf6}",
      ".lh-scene .spray{stroke:#37b7e4;stroke-width:1.6;stroke-linecap:round;opacity:0;transform-box:fill-box;transform-origin:top center}",
      ".lh-scene .spray.on{opacity:.85;animation:lhSpray 1s linear infinite}",
      "@keyframes lhSpray{0%{opacity:0;transform:translateY(0) scaleY(.3)}25%{opacity:.9}100%{opacity:0;transform:translateY(14px) scaleY(1)}}",
      ".lh-scene .bore{fill:#151b22;stroke:#536171;stroke-width:2;transition:all .45s cubic-bezier(.2,.85,.25,1)}",
      ".lh-scene .fill{fill:#37b7e4;opacity:.75;transition:all .45s cubic-bezier(.2,.85,.25,1)}",
      ".lh-scene .streak{stroke:#bde9fb;stroke-width:2;stroke-linecap:round;opacity:.55;stroke-dasharray:9 15;animation:lhDash 1s linear infinite}",
      ".lh-scene .axis{stroke:#38434f;stroke-width:1.5}",
      ".lh-scene .grid{stroke:#252d36;stroke-width:1}",
      ".lh-scene .curve{fill:none;stroke:#37b7e4;stroke-width:2.5}",
      ".lh-scene .bar{transition:all .4s cubic-bezier(.2,.85,.25,1)}",
      "@media (prefers-reduced-motion:reduce){.lh-scene *{animation:none!important;transition:none!important}}"
    ].join("");
    document.head.appendChild(s);
  }

  /* ==========================================================================
   * TREE — the four-head worked example, live
   * ========================================================================*/
  var TREE = {
    heads: { h1: [252, 28], h2: [252, 82], h3: [118, 28], h4: [118, 82] },
    riser: [34, 140],
    pipes: {
      sup:  [[6, 140], [28, 140]],
      cm1:  [[34, 140], [118, 140]],
      cm2:  [[118, 140], [252, 140]],
      b1b:  [[252, 140], [252, 82]],
      b1a:  [[252, 82], [252, 28]],
      b2b:  [[118, 140], [118, 82]],
      b2a:  [[118, 82], [118, 28]]
    },
    labelAt: { h1: [268, 26, "start"], h2: [268, 80, "start"], h3: [104, 26, "end"], h4: [104, 80, "end"] }
  };

  function treeScene(host, onTap) {
    var svg = E("svg", { viewBox: "0 0 320 164", class: "lh-scene", "aria-label": "Sprinkler system" }, host);
    var parts = { casing: {}, wet: {}, hit: {}, node: {}, name: {}, val: {}, spray: {}, ring: {} };
    var key;

    for (key in TREE.pipes) {
      var p = TREE.pipes[key], a = p[0], b = p[1];
      var at = { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
      parts.casing[key] = E("line", Object.assign({ class: "casing", "stroke-width": 6 }, at), svg);
      parts.wet[key] = E("line", Object.assign({ class: "wet", "stroke-width": 3 }, at), svg);
    }
    // riser body + supply arrow
    E("rect", { x: 28, y: 133, width: 13, height: 14, rx: 3, fill: "#202832", stroke: "#536171", "stroke-width": 2 }, svg);
    E("text", { x: 34, y: 159, class: "nm", "text-anchor": "middle" }, svg).textContent = "riser";
    E("text", { x: 185, y: 155, class: "nm", "text-anchor": "middle" }, svg).textContent = "cross main";

    ["h1", "h2", "h3", "h4"].forEach(function (h) {
      var c = TREE.heads[h];
      // spray fan under each head
      var g = E("g", { class: "sprayg" }, svg);
      for (var i = -2; i <= 2; i++) {
        var ln = E("line", { class: "spray", x1: c[0] + i * 3, y1: c[1] + 7, x2: c[0] + i * 6, y2: c[1] + 17 }, g);
        ln.style.animationDelay = (Math.abs(i) * 0.13) + "s";
      }
      parts.spray[h] = g;
      parts.ring[h] = E("circle", { class: "ring", cx: c[0], cy: c[1], r: 8 }, svg);
      parts.node[h] = E("circle", { class: "node", cx: c[0], cy: c[1], r: 7.5 }, svg);
      var la = TREE.labelAt[h];
      parts.name[h] = E("text", { x: la[0], y: la[1] - 8, class: "nm", "text-anchor": la[2] }, svg);
      parts.name[h].textContent = h.toUpperCase();
      parts.val[h] = E("text", { x: la[0], y: la[1] + 5, class: "val", "text-anchor": la[2] }, svg);
    });

    // hit targets last so they sit on top
    for (key in TREE.pipes) {
      (function (k) {
        var p = TREE.pipes[k];
        parts.hit[k] = E("line", { class: "hit", x1: p[0][0], y1: p[0][1], x2: p[1][0], y2: p[1][1] }, svg);
        parts.hit[k].addEventListener("click", function () { if (onTap) onTap(k); });
      })(key);
    }
    ["h1", "h2", "h3", "h4"].forEach(function (h) {
      var c = TREE.heads[h];
      var hit = E("circle", { class: "hit", cx: c[0], cy: c[1], r: 15, "stroke-width": 0, fill: "transparent" }, svg);
      hit.addEventListener("click", function () { if (onTap) onTap(h); });
    });

    function update(s) {
      s = s || {};
      var flow = s.flow || {}, labels = s.labels || {}, glow = s.glow || [], got = s.got || [], tap = s.tap || [];
      Object.keys(TREE.pipes).forEach(function (k) {
        var q = flow[k], on = q != null && q > 0;
        var w = parts.wet[k];
        w.classList.toggle("on", !!on);
        w.classList.toggle("hot", glow.indexOf(k) >= 0);
        w.classList.toggle("warm", got.indexOf(k) >= 0);
        if (on) { w.setAttribute("stroke-width", wFor(q).toFixed(1)); w.style.animationDuration = durFor(q); }
        parts.hit[k].style.pointerEvents = tap.indexOf(k) >= 0 ? "stroke" : "none";
        parts.casing[k].style.stroke = tap.indexOf(k) >= 0 ? "#6c7a8a" : "";
      });
      ["h1", "h2", "h3", "h4"].forEach(function (h) {
        parts.ring[h].classList.remove("go");
        var on = !!(s.active && s.active[h]);
        parts.node[h].classList.toggle("on", on);
        parts.node[h].classList.toggle("hot", glow.indexOf(h) >= 0);
        parts.node[h].classList.toggle("got", got.indexOf(h) >= 0);
        parts.node[h].classList.toggle("tappable", tap.indexOf(h) >= 0 && got.indexOf(h) < 0);
        [].forEach.call(parts.spray[h].children, function (c) { c.classList.toggle("on", on); });
        var t = labels[h];
        parts.val[h].textContent = t || "";
        parts.val[h].classList.toggle("on", !!t);
        parts.val[h].classList.toggle("hot", glow.indexOf(h) >= 0);
      });
    }

    function pop(k) {
      var r = parts.ring[k];
      if (!r) return;
      r.classList.remove("go"); void r.getBoundingClientRect(); r.classList.add("go");
      setTimeout(function () { r.classList.remove("go"); }, 700);
    }

    return { update: update, pop: pop, svg: svg };
  }

  /* ==========================================================================
   * HEAD — one sprinkler, spray scales with real discharge, gauge shows psi
   * ========================================================================*/
  function headScene(host) {
    var svg = E("svg", { viewBox: "0 0 320 164", class: "lh-scene", "aria-label": "Sprinkler discharge" }, host);
    // gauge
    var gx = 62, gy = 84, gr = 40;
    E("circle", { cx: gx, cy: gy, r: gr, fill: "#151b22", stroke: "#2d3742", "stroke-width": 2 }, svg);
    E("path", { d: arc(gx, gy, gr - 7, -220, 40), fill: "none", stroke: "#2d3742", "stroke-width": 6, "stroke-linecap": "round" }, svg);
    var gaugeArc = E("path", { d: "", fill: "none", stroke: "#37b7e4", "stroke-width": 6, "stroke-linecap": "round" }, svg);
    var needle = E("line", { x1: gx, y1: gy, x2: gx, y2: gy - gr + 12, stroke: "#f5f7f8", "stroke-width": 2.5, "stroke-linecap": "round" }, svg);
    E("circle", { cx: gx, cy: gy, r: 4, fill: "#536171" }, svg);
    var gTxt = E("text", { x: gx, y: gy + 56, class: "val on", "text-anchor": "middle", "font-size": "13" }, svg);
    E("text", { x: gx, y: gy + 68, class: "nm", "text-anchor": "middle" }, svg).textContent = "pressure at the head";

    // pipe drop + head
    var hx = 218, hy = 52;
    E("line", { x1: hx, y1: 8, x2: hx, y2: hy - 6, class: "casing", "stroke-width": 9 }, svg);
    var wetDrop = E("line", { x1: hx, y1: 8, x2: hx, y2: hy - 6, class: "wet on", "stroke-width": 4 }, svg);
    E("rect", { x: hx - 7, y: hy - 8, width: 14, height: 11, rx: 2, fill: "#202832", stroke: "#536171", "stroke-width": 2 }, svg);
    E("line", { x1: hx - 11, y1: hy + 10, x2: hx + 11, y2: hy + 10, stroke: "#536171", "stroke-width": 3, "stroke-linecap": "round" }, svg);   // deflector
    E("line", { x1: hx - 8, y1: hy + 3, x2: hx - 8, y2: hy + 10, stroke: "#536171", "stroke-width": 2 }, svg);
    E("line", { x1: hx + 8, y1: hy + 3, x2: hx + 8, y2: hy + 10, stroke: "#536171", "stroke-width": 2 }, svg);

    var drops = [], i;
    for (i = 0; i < 22; i++) drops.push(E("line", { class: "spray on", x1: hx, y1: hy + 12, x2: hx, y2: hy + 20 }, svg));
    var qTxt = E("text", { x: hx, y: 152, class: "val on", "text-anchor": "middle", "font-size": "13" }, svg);

    function arc(cx, cy, r, a0, a1) {
      var p0 = pol(cx, cy, r, a0), p1 = pol(cx, cy, r, a1);
      var large = Math.abs(a1 - a0) > 180 ? 1 : 0;
      return "M" + p0[0] + " " + p0[1] + " A" + r + " " + r + " 0 " + large + " 1 " + p1[0] + " " + p1[1];
    }
    function pol(cx, cy, r, deg) { var a = (deg - 90) * Math.PI / 180; return [(cx + r * Math.cos(a)).toFixed(1), (cy + r * Math.sin(a)).toFixed(1)]; }

    function update(s) {
      s = s || {};
      var p = Math.max(0, s.p || 0), q = Math.max(0, s.q || 0), pMax = s.pMax || 60, qMax = s.qMax || 60;
      var frac = clamp(p / pMax, 0, 1);
      var ang = -220 + frac * 260;
      gaugeArc.setAttribute("d", arc(gx, gy, gr - 7, -220, ang));
      var np = pol(gx, gy, gr - 12, ang + 90 - 90);
      var a = (ang - 90) * Math.PI / 180;
      needle.setAttribute("x2", (gx + (gr - 12) * Math.cos(a)).toFixed(1));
      needle.setAttribute("y2", (gy + (gr - 12) * Math.sin(a)).toFixed(1));
      gTxt.textContent = n1(p) + " psi";
      wetDrop.setAttribute("stroke-width", wFor(q).toFixed(1));
      wetDrop.style.animationDuration = durFor(q);
      var qf = clamp(q / qMax, 0, 1);
      var reach = 22 + qf * 62, spread = 16 + qf * 58;
      drops.forEach(function (d, i) {
        var t = (i / (drops.length - 1)) - 0.5;                    // -0.5..0.5 across the fan
        var dx = t * spread * 2, dy = reach * (1 - Math.abs(t) * 0.55);
        d.setAttribute("x1", (hx + dx * 0.25).toFixed(1));
        d.setAttribute("y1", (hy + 12).toFixed(1));
        d.setAttribute("x2", (hx + dx).toFixed(1));
        d.setAttribute("y2", (hy + 12 + dy).toFixed(1));
        d.style.animationDelay = ((i % 6) * 0.16) + "s";
        d.style.animationDuration = (1.25 - qf * 0.55).toFixed(2) + "s";
        d.classList.toggle("on", q > 0.2);
      });
      qTxt.textContent = q > 0 ? n1(q) + " gpm" : "";
      qTxt.setAttribute("fill", s.tone === "good" ? "#3ddc97" : "#37b7e4");
    }
    return { update: update, pop: function () {}, svg: svg };
  }

  /* ==========================================================================
   * PIPE — one segment: bore scales with diameter, loss bar scales with pf
   * ========================================================================*/
  function pipeScene(host) {
    var svg = E("svg", { viewBox: "0 0 320 164", class: "lh-scene", "aria-label": "Pipe friction" }, host);
    var x0 = 26, x1 = 294, mid = 74;
    var bore = E("rect", { class: "bore", x: x0, y: mid - 14, width: x1 - x0, height: 28, rx: 5 }, svg);
    var fill = E("rect", { class: "fill", x: x0 + 2, y: mid - 12, width: x1 - x0 - 4, height: 24, rx: 4 }, svg);
    var streaks = [];
    for (var i = 0; i < 3; i++) streaks.push(E("line", { class: "streak", x1: x0 + 6, y1: mid - 6 + i * 6, x2: x1 - 6, y2: mid - 6 + i * 6 }, svg));
    var inP = E("text", { x: x0, y: mid - 24, class: "val on", "text-anchor": "start", "font-size": "11" }, svg);
    var outP = E("text", { x: x1, y: mid - 24, class: "val on", "text-anchor": "end", "font-size": "11" }, svg);
    E("text", { x: x0, y: mid - 36, class: "nm", "text-anchor": "start" }, svg).textContent = "in";
    E("text", { x: x1, y: mid - 36, class: "nm", "text-anchor": "end" }, svg).textContent = "out";
    // loss bar
    var lossLbl = E("text", { x: x0, y: 122, class: "nm" }, svg);
    lossLbl.textContent = "friction loss";
    E("rect", { x: x0, y: 128, width: x1 - x0, height: 14, rx: 7, fill: "#202832", stroke: "#2d3742", "stroke-width": 1 }, svg);
    var lossBar = E("rect", { class: "bar", x: x0, y: 128, width: 0, height: 14, rx: 7, fill: "#ff5a4f" }, svg);
    var lossTxt = E("text", { x: x1, y: 122, class: "val on", "text-anchor": "end", "font-size": "12", fill: "#ff5a4f" }, svg);
    var sizeTxt = E("text", { x: 160, y: mid + 5, class: "nm nostroke", "text-anchor": "middle", "font-size": "10", fill: "#0a1a22" }, svg);

    function update(s) {
      s = s || {};
      var d = s.d || 1.049, q = s.q || 0, pf = s.pf || 0, pfMax = s.pfMax || 20;
      var h = clamp(6 + d * 11, 8, 46);
      bore.setAttribute("y", (mid - h / 2).toFixed(1)); bore.setAttribute("height", h.toFixed(1));
      fill.setAttribute("y", (mid - h / 2 + 2).toFixed(1)); fill.setAttribute("height", Math.max(2, h - 4).toFixed(1));
      streaks.forEach(function (l, i) {
        var y = mid - h / 2 + 6 + i * ((h - 12) / 2);
        l.setAttribute("y1", y.toFixed(1)); l.setAttribute("y2", y.toFixed(1));
        l.style.animationDuration = durFor(q * (1.4 / Math.max(0.3, d)));
        l.style.opacity = h > 16 ? 0.55 : 0;
      });
      inP.textContent = s.pIn != null ? n1(s.pIn) + " psi" : "";
      outP.textContent = s.pOut != null ? n1(s.pOut) + " psi" : "";
      var w = clamp(pf / pfMax, 0, 1) * (x1 - x0);
      lossBar.setAttribute("width", w.toFixed(1));
      lossBar.setAttribute("fill", pf > pfMax * 0.6 ? "#ff5a4f" : (pf > pfMax * 0.28 ? "#ffb03a" : "#3ddc97"));
      lossTxt.textContent = n1(pf) + " psi";
      lossTxt.setAttribute("fill", lossBar.getAttribute("fill"));
      lossLbl.textContent = s.lossLabel || "friction loss";
      sizeTxt.textContent = s.sizeLabel || "";
      sizeTxt.style.opacity = h > 20 ? 1 : 0;
    }
    return { update: update, pop: function () {}, svg: svg };
  }

  /* ==========================================================================
   * LOOP — two parallel routes; balance the split until the losses agree
   * ========================================================================*/
  function loopScene(host) {
    var svg = E("svg", { viewBox: "0 0 320 164", class: "lh-scene", "aria-label": "Looped paths" }, host);
    var ax = 40, bx = 280, my = 62;
    E("path", { d: "M40 62 C 100 8, 220 8, 280 62", class: "casing", "stroke-width": 8 }, svg);
    E("path", { d: "M40 62 C 100 116, 220 116, 280 62", class: "casing", "stroke-width": 8 }, svg);
    var wetA = E("path", { d: "M40 62 C 100 8, 220 8, 280 62", class: "wet on", "stroke-width": 4 }, svg);
    var wetB = E("path", { d: "M40 62 C 100 116, 220 116, 280 62", class: "wet on", "stroke-width": 4 }, svg);
    E("circle", { cx: ax, cy: my, r: 8, class: "node on" }, svg);
    E("circle", { cx: bx, cy: my, r: 8, class: "node on" }, svg);
    E("text", { x: ax, y: my + 22, class: "nm", "text-anchor": "middle" }, svg).textContent = "A";
    E("text", { x: bx, y: my + 22, class: "nm", "text-anchor": "middle" }, svg).textContent = "B";
    var qA = E("text", { x: 160, y: 13, class: "val on", "text-anchor": "middle", "font-size": "11" }, svg);
    var qB = E("text", { x: 160, y: 118, class: "val on", "text-anchor": "middle", "font-size": "11" }, svg);

    // two loss bars + balance readout
    var bx0 = 70, bw = 180;
    E("text", { x: 60, y: 136, class: "nm", "text-anchor": "end" }, svg).textContent = "loss A";
    E("text", { x: 60, y: 152, class: "nm", "text-anchor": "end" }, svg).textContent = "loss B";
    E("rect", { x: bx0, y: 128, width: bw, height: 9, rx: 4.5, fill: "#202832" }, svg);
    E("rect", { x: bx0, y: 144, width: bw, height: 9, rx: 4.5, fill: "#202832" }, svg);
    var barA = E("rect", { class: "bar", x: bx0, y: 128, width: 0, height: 9, rx: 4.5, fill: "#37b7e4" }, svg);
    var barB = E("rect", { class: "bar", x: bx0, y: 144, width: 0, height: 9, rx: 4.5, fill: "#8b7cf6" }, svg);
    var errTxt = E("text", { x: 316, y: 146, class: "val on", "text-anchor": "end", "font-size": "12" }, svg);

    function update(s) {
      s = s || {};
      var a = s.qA || 0, b = s.qB || 0, ha = s.hfA || 0, hb = s.hfB || 0, max = s.hfMax || Math.max(ha, hb, 1);
      wetA.setAttribute("stroke-width", wFor(a).toFixed(1)); wetA.style.animationDuration = durFor(a);
      wetB.setAttribute("stroke-width", wFor(b).toFixed(1)); wetB.style.animationDuration = durFor(b);
      qA.textContent = n1(a) + " gpm"; qB.textContent = n1(b) + " gpm";
      barA.setAttribute("width", (clamp(ha / max, 0, 1) * bw).toFixed(1));
      barB.setAttribute("width", (clamp(hb / max, 0, 1) * bw).toFixed(1));
      var err = Math.abs(ha - hb), ok = err <= (s.tol || 0.5);
      errTxt.textContent = "Δ " + n1(err) + " psi";
      errTxt.setAttribute("fill", ok ? "#3ddc97" : "#ffb03a");
      wetA.classList.toggle("hot", ok); wetB.classList.toggle("hot", ok);
    }
    return { update: update, pop: function () {}, svg: svg };
  }

  /* ==========================================================================
   * CURVE — water supply curve with the demand point riding on it
   * ========================================================================*/
  function curveScene(host) {
    var svg = E("svg", { viewBox: "0 0 320 164", class: "lh-scene", "aria-label": "Water supply curve" }, host);
    var L = 40, R = 300, T = 12, B = 132;
    var i;
    for (i = 0; i <= 4; i++) {
      var y = T + (B - T) * i / 4;
      E("line", { class: "grid", x1: L, y1: y, x2: R, y2: y }, svg);
    }
    E("line", { class: "axis", x1: L, y1: T, x2: L, y2: B }, svg);
    E("line", { class: "axis", x1: L, y1: B, x2: R, y2: B }, svg);
    E("text", { x: 6, y: T + 10, class: "nm" }, svg).textContent = "psi";
    E("text", { x: R, y: B + 15, class: "nm", "text-anchor": "end" }, svg).textContent = "gpm";
    var curve = E("path", { class: "curve", d: "" }, svg);
    var marginBar = E("rect", { class: "bar", x: 0, y: 0, width: 6, height: 0, fill: "#3ddc97", opacity: ".8", rx: 3 }, svg);
    var reqDot = E("circle", { r: 5, fill: "#ff5a4f", stroke: "#0d1116", "stroke-width": 2 }, svg);
    var availDot = E("circle", { r: 5, fill: "#37b7e4", stroke: "#0d1116", "stroke-width": 2 }, svg);
    var lblAvail = E("text", { class: "val on", "font-size": "10", "text-anchor": "middle" }, svg);
    var lblReq = E("text", { class: "val on", "font-size": "10", "text-anchor": "middle", fill: "#ff5a4f" }, svg);
    var verdict = E("text", { x: 160, y: 156, class: "val on", "text-anchor": "middle", "font-size": "12" }, svg);

    function update(s) {
      s = s || {};
      var Ps = s.stat || 70, Pr = s.res || 50, Qt = s.qTest || 1000;
      var qMax = s.qMax || Qt * 1.2, pMax = s.pMax || Math.ceil(Ps * 1.15), pMin = s.pMin || 0;
      var X = function (q) { return L + (R - L) * clamp(q / qMax, 0, 1); };
      var Y = function (p) { return B - (B - T) * clamp((p - pMin) / (pMax - pMin), 0, 1); };
      var avail = function (q) { return Ps - (Ps - Pr) * Math.pow(clamp(q / Qt, 0, 4), 1.85); };
      var d = "", q;
      for (q = 0; q <= qMax; q += qMax / 60) d += (d ? "L" : "M") + X(q).toFixed(1) + " " + Y(Math.max(0, avail(q))).toFixed(1);
      curve.setAttribute("d", d);
      var qd = s.qDemand || 0, pa = Math.max(0, avail(qd)), pr = s.pReq || 0;
      availDot.setAttribute("cx", X(qd)); availDot.setAttribute("cy", Y(pa));
      reqDot.setAttribute("cx", X(qd)); reqDot.setAttribute("cy", Y(pr));
      lblAvail.setAttribute("x", clamp(X(qd), L + 24, R - 24)); lblAvail.setAttribute("y", Y(pa) - 9); lblAvail.textContent = n1(pa);
      lblReq.setAttribute("x", clamp(X(qd), L + 24, R - 24)); lblReq.setAttribute("y", Y(pr) + 15); lblReq.textContent = n1(pr);
      var margin = pa - pr, ok = margin >= 0;
      var yTop = Y(Math.max(pa, pr)), yBot = Y(Math.min(pa, pr));
      marginBar.setAttribute("x", (X(qd) - 3).toFixed(1));
      marginBar.setAttribute("y", yTop.toFixed(1));
      marginBar.setAttribute("height", Math.max(0, yBot - yTop).toFixed(1));
      marginBar.setAttribute("fill", ok ? "#3ddc97" : "#ff5a4f");
      verdict.textContent = (ok ? "margin +" : "short ") + n1(Math.abs(margin)) + " psi";
      verdict.setAttribute("fill", ok ? "#3ddc97" : "#ff5a4f");
    }
    return { update: update, pop: function () {}, svg: svg };
  }

  /* ========================================================================*/
  var BUILDERS = { tree: treeScene, head: headScene, pipe: pipeScene, loop: loopScene, curve: curveScene };

  function create(name, host, onTap) {
    injectStyle();
    host.innerHTML = "";
    var fn = BUILDERS[name] || treeScene;
    return fn(host, onTap);
  }

  global.HydraulicScenes = { create: create, wFor: wFor };
})(window);
