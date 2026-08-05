/* ============================================================================
 * SprinkFlow — Learn Hydraulic Calcs: live model + interactive labs
 * ----------------------------------------------------------------------------
 * Two things live here:
 *
 *  1. MODEL — real Hazen-Williams / K-factor math, plus a walk of the four-head
 *     example system used all through the course. The labs drive it with live
 *     values, so the diagram and the calc sheet always agree with each other.
 *     The defaults reproduce the exact numbers printed in the course text
 *     (H1: 7.0 psi / 14.8 gpm, 0.9 psi through the 1" x 12 ft, H2 at 7.9 psi).
 *
 *  2. LABS — one interactive step per course section, keyed by section id.
 *     A lab never restates the lesson prose; the prose stays in
 *     learn-hydraulics-course.js and the UI shows it behind "Why this works".
 *     A lab is the thing you DO.
 *
 * Lab kinds: tap | order | numeric | slider | iterate | read
 * UMD global `HydraulicLabs`.
 * ========================================================================== */
(function (global) {
  "use strict";

  /* ---------------------------------------------------------------- model */
  var C_DEFAULT = 120;
  var ID = { "1": 1.049, "1-1/4": 1.380, "1-1/2": 1.610, "2": 2.067, "2-1/2": 2.469, "3": 3.068, "4": 4.026 };
  var SIZES = ["1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "4"];

  function pfPerFt(q, d, c) {
    return 4.52 * Math.pow(Math.abs(q), 1.85) / (Math.pow(c || C_DEFAULT, 1.85) * Math.pow(d, 4.87));
  }
  function pf(q, d, c, L) { return pfPerFt(q, d, c) * L; }
  function qFromP(k, p) { return k * Math.sqrt(Math.max(0, p)); }
  function pFromQ(k, q) { var v = q / k; return v * v; }
  function elevPsi(ft) { return 0.433 * ft; }
  function availPressure(stat, res, qTest, q) {
    return stat - (stat - res) * Math.pow(Math.max(0, q) / qTest, 1.85);
  }

  /* Walk the example system from H1 back to the supply. Branch 2 hangs off a
     known tee pressure, so its two heads are settled with a short fixed-point
     loop — the same "guess, recompute, repeat" the solver lesson describes. */
  function system(o) {
    o = o || {};
    var k = o.k || 5.6, c = o.c || C_DEFAULT, p1 = o.p1 != null ? o.p1 : 7.0;
    var L = { b1a: 12, b1b: 10, cm2: 20, b2a: 12, b2b: 10, cm1: 25 };
    var D = { b1a: ID["1"], b1b: ID["1-1/4"], cm2: ID["2"], b2a: ID["1"], b2b: ID["1-1/4"], cm1: ID["2-1/2"] };
    var riseFt = o.riseFt != null ? o.riseFt : 12;

    var q1 = qFromP(k, p1);
    var pfB1a = pf(q1, D.b1a, c, L.b1a);
    var p2 = p1 + pfB1a;
    var q2 = qFromP(k, p2);
    var qBranch1 = q1 + q2;
    var pfB1b = pf(qBranch1, D.b1b, c, L.b1b);
    var pT1 = p2 + pfB1b;
    var pfCm2 = pf(qBranch1, D.cm2, c, L.cm2);
    var pT2 = pT1 + pfCm2;

    // branch 2 is fed at pT2 and works downstream — settle it
    var q3 = q1, q4 = q1, p3 = p1, p4 = p1, pfB2b = 0, pfB2a = 0, i;
    for (i = 0; i < 24; i++) {
      pfB2b = pf(q3 + q4, D.b2b, c, L.b2b);
      p4 = Math.max(0, pT2 - pfB2b);
      q4 = qFromP(k, p4);
      pfB2a = pf(q3, D.b2a, c, L.b2a);
      p3 = Math.max(0, p4 - pfB2a);
      q3 = qFromP(k, p3);
    }
    var total = q1 + q2 + q3 + q4;
    var pfCm1 = pf(total, D.cm1, c, L.cm1);
    var pRiserTop = pT2 + pfCm1;
    var pSource = pRiserTop + elevPsi(riseFt);

    return {
      k: k, c: c,
      p: { h1: p1, h2: p2, h3: p3, h4: p4, t1: pT1, t2: pT2, riser: pRiserTop, source: pSource },
      q: { h1: q1, h2: q2, h3: q3, h4: q4, total: total },
      pf: { b1a: pfB1a, b1b: pfB1b, cm2: pfCm2, b2a: pfB2a, b2b: pfB2b, cm1: pfCm1, elev: elevPsi(riseFt) },
      flow: { b1a: q1, b1b: qBranch1, cm2: qBranch1, b2a: q3, b2b: q3 + q4, cm1: total, sup: total },
      L: L, D: D
    };
  }

  var M = {
    ID: ID, SIZES: SIZES, C_DEFAULT: C_DEFAULT,
    pfPerFt: pfPerFt, pf: pf, qFromP: qFromP, pFromQ: pFromQ, elevPsi: elevPsi,
    availPressure: availPressure, system: system
  };

  function r1(v) { return Math.round(v * 10) / 10; }
  function fmt1(v) { return r1(v).toFixed(1); }
  function fmt2(v) { return (Math.round(v * 100) / 100).toFixed(2); }

  /* Full-system scene state for the tree diagram at a given H1 pressure. */
  function treeState(sys, opts) {
    opts = opts || {};
    var labels = {};
    if (opts.labels !== false) {
      labels.h1 = fmt1(sys.q.h1) + " gpm";
      labels.h2 = fmt1(sys.q.h2) + " gpm";
      labels.h3 = fmt1(sys.q.h3) + " gpm";
      labels.h4 = fmt1(sys.q.h4) + " gpm";
    }
    return {
      active: { h1: 1, h2: 1, h3: 1, h4: 1 },
      flow: sys.flow,
      labels: labels,
      glow: opts.glow || []
    };
  }

  /* ----------------------------------------------------------------- labs */
  var BASE = system();
  var LOOP_Q = 150;        // total flow through the Level 4 loop
  var LOOP_TOL = 0.45;     // psi gap that counts as balanced (4 winning slider positions)

  var LABS = {

    /* ===================== LEVEL 1 — tree systems ===================== */
    "meet-the-system": {
      scene: "tree",
      kind: "tap",
      headline: "Four sprinklers. One water supply.",
      task: "Tap each sprinkler to open it.",
      targets: ["h1", "h2", "h3", "h4"],
      ordered: false,
      sceneFor: function (got) {
        var active = {}, flow = {};
        got.forEach(function (g) { active[g] = 1; });
        if (got.length) { flow.sup = got.length * 15; flow.cm1 = got.length * 15; }
        if (got.indexOf("h1") >= 0 || got.indexOf("h2") >= 0) { flow.cm2 = 30; flow.b1b = 30; }
        if (got.indexOf("h1") >= 0) flow.b1a = 15;
        if (got.indexOf("h3") >= 0 || got.indexOf("h4") >= 0) flow.b2b = 30;
        if (got.indexOf("h3") >= 0) flow.b2a = 15;
        return { active: active, flow: flow, tap: ["h1", "h2", "h3", "h4"], got: got };
      },
      reward: "This exact system runs through all six levels. H1 — top right — is the one farthest from the supply."
    },

    "tree-what-it-is": {
      scene: "tree",
      kind: "tap",
      headline: "H1 has exactly one way home.",
      task: "Tap the pipes from H1 back to the riser, in order.",
      targets: ["b1a", "b1b", "cm2", "cm1"],
      ordered: true,
      sceneFor: function (got) {
        var flow = {};
        got.forEach(function (g) { flow[g] = 30; });
        return { active: { h1: 1 }, flow: flow, tap: ["b1a", "b1b", "cm2", "cm1", "b2a", "b2b", "sup"], got: got, glow: ["h1"] };
      },
      reward: "One route per sprinkler. That's what makes this a tree — and why the calc never has to guess how flow splits."
    },

    "tree-node-rule": {
      scene: "tree",
      kind: "numeric",
      headline: "Every junction has to balance.",
      task: "150 gpm arrives at H2's tee. H2 discharges 42 gpm. How much continues up the branch to H1?",
      formula: "flow in = flow out + discharge at the node",
      unit: "gpm",
      answer: 108,
      tol: 0.5,
      pad: "150 - 42",
      sceneFor: function () {
        return { active: { h1: 1, h2: 1 }, flow: { b1a: 108, b1b: 150, cm2: 150, cm1: 150, sup: 150 },
                 labels: { h1: "? gpm", h2: "takes 42" }, glow: ["h2"] };
      },
      reward: "That's conservation of mass, and it's the entire node rule. A calc sheet is this bookkeeping, repeated."
    },

    "tree-calculation-order": {
      scene: "tree",
      kind: "order",
      headline: "The calc walks backward, from the worst head home.",
      task: "Put the walk in the order the calc actually runs.",
      items: [
        "H1 — the most remote sprinkler",
        "H2 — next head upstream",
        "The cross main",
        "The riser and supply"
      ],
      sceneFor: function () {
        return { active: { h1: 1, h2: 1, h3: 1, h4: 1 }, flow: BASE.flow, glow: ["h1"], labels: { h1: "start", h4: "" } };
      },
      reward: "Remote head first, supply last. Every pipe you cross carries the sum of everything behind you."
    },

    "tree-ready": {
      scene: "tree",
      kind: "read",
      headline: "You can read the shape of a calc now.",
      task: "Next up: real numbers on H1.",
      sceneFor: function () { return treeState(BASE, { labels: false }); },
      reward: "Level 2 gives H1 a pressure and a flow — and starts the calc sheet for real."
    },

    /* ================= LEVEL 2 — sprinkler discharge ================= */
    "sprinkler-minimum-demand": {
      scene: "tree",
      kind: "slider",
      headline: "The code sets a floor before hydraulics says a word.",
      task: "Our building is Light Hazard. Drag the density to 0.10 gpm/ft².",
      controls: [{ key: "dens", label: "Design density", min: 0.05, max: 0.35, step: 0.01, val: 0.20, unit: "gpm/ft²", dec: 2 }],
      compute: function (v) {
        var req = v.dens * 130;
        return {
          readouts: [
            { label: "H1 minimum flow", value: fmt1(req), unit: "gpm", bar: req / 45, tone: Math.abs(v.dens - 0.10) < 0.005 ? "good" : "" }
          ],
          note: "H1 covers 130 ft²  ·  " + fmt2(v.dens) + " × 130 = " + fmt1(req) + " gpm",
          ok: Math.abs(v.dens - 0.10) < 0.005,
          scene: { active: { h1: 1, h2: 1, h3: 1, h4: 1 }, flow: BASE.flow, glow: ["h1"], labels: { h1: "≥ " + fmt1(req) + " gpm" } }
        };
      },
      goal: "Set the density to 0.10",
      formula: "minimum flow = density × coverage area",
      reward: "13.0 gpm is H1's floor. It is not H1's flow — the next step shows what the head actually does."
    },

    "sprinkler-pressure-driven": {
      scene: "head",
      kind: "slider",
      headline: "A sprinkler is an orifice. Push harder, more comes out.",
      task: "Drag the pressure until H1 delivers at least its 13.0 gpm minimum.",
      controls: [{ key: "p", label: "Pressure at the head", min: 2, max: 60, step: 0.5, val: 3, unit: "psi", dec: 1 }],
      compute: function (v) {
        var q = qFromP(5.6, v.p);
        return {
          readouts: [
            { label: "Discharge", value: fmt1(q), unit: "gpm", bar: q / 44, tone: q >= 13 ? "good" : "" }
          ],
          note: "Q = 5.6 × √" + fmt1(v.p) + " = " + fmt1(q) + " gpm",
          ok: q >= 13,
          scene: { p: v.p, q: q, pMax: 60, qMax: 44, tone: q >= 13 ? "good" : "" }
        };
      },
      goal: "Reach 13.0 gpm",
      formula: "Q = K × √P",
      reward: "Notice it took only ~5.4 psi. Flow follows the SQUARE ROOT of pressure — quadruple the psi, only double the gpm."
    },

    "sprinkler-invert-formula": {
      scene: "head",
      kind: "numeric",
      headline: "Flip the formula to find the pressure you need.",
      task: "H1 must deliver 13.0 gpm and K = 5.6. What pressure does that take?",
      formula: "P = (Q ÷ K)²",
      unit: "psi",
      answer: 5.4,
      tol: 0.25,
      pad: "(13 / 5.6)^2",
      sceneFor: function () { return { p: 5.4, q: 13.0, pMax: 60, qMax: 44 }; },
      reward: "5.4 psi — but NFPA 13 also sets a hard 7 psi floor at any sprinkler. The higher requirement always governs, so the calc starts H1 at 7.0."
    },

    "sprinkler-first-row": {
      scene: "head",
      kind: "numeric",
      headline: "First real row of the calc sheet.",
      task: "H1 starts at the 7.0 psi code floor. What does a K5.6 head actually discharge there?",
      formula: "Q = K × √P",
      unit: "gpm",
      answer: 14.8,
      tol: 0.3,
      pad: "5.6 * sqrt(7)",
      sceneFor: function () { return { p: 7, q: qFromP(5.6, 7), pMax: 60, qMax: 44, tone: "good" }; },
      reward: "14.8 gpm against a 13.0 requirement. That's a calc working correctly — not waste."
    },

    "sprinkler-pressure-ratio": {
      scene: "tree",
      kind: "numeric",
      headline: "Upstream heads always flow more.",
      task: "The 12 ft of 1″ pipe to H2 costs 0.9 psi, so H2 sits at 7.9 psi. What does H2 discharge?",
      formula: "Q = K × √P",
      unit: "gpm",
      answer: 15.7,
      tol: 0.3,
      pad: "5.6 * sqrt(7.9)",
      sceneFor: function () {
        return { active: { h1: 1, h2: 1 }, flow: { b1a: 14.8, b1b: 30.6, cm2: 30.6, cm1: 30.6, sup: 30.6 },
                 labels: { h1: "14.8 @ 7.0", h2: "? @ 7.9" }, glow: ["h2", "b1a"] };
      },
      reward: "Every head you pass sits at a higher pressure, so every head flows more. Never copy H1's number down the sheet."
    },

    "sprinkler-design-vs-actual": {
      scene: "tree",
      kind: "slider",
      headline: "Raise one head's pressure and the whole system inflates.",
      task: "Drag H1's pressure and watch all four discharges — and the total — climb.",
      controls: [{ key: "p1", label: "Pressure at H1", min: 7, max: 45, step: 0.5, val: 7, unit: "psi", dec: 1 }],
      compute: function (v) {
        var s = system({ p1: v.p1 });
        return {
          readouts: [
            { label: "H1 / H2", value: fmt1(s.q.h1) + " / " + fmt1(s.q.h2), unit: "gpm" },
            { label: "Total demand", value: fmt1(s.q.total), unit: "gpm", bar: s.q.total / 200, tone: s.q.total >= 100 ? "good" : "" }
          ],
          note: "Required at the supply: " + fmt1(s.p.source) + " psi",
          ok: s.q.total >= 100,
          scene: treeState(s, { glow: [] })
        };
      },
      goal: "Push total demand past 100 gpm",
      formula: "each head: Q = K × √P (its own P)",
      reward: "Total demand is the sum of ACTUAL discharges, never the minimums. And it climbs fast — which is why pressure discipline matters."
    },

    /* ==================== LEVEL 3 — friction loss ==================== */
    "friction-why-it-matters": {
      scene: "pipe",
      kind: "slider",
      headline: "Every foot of pipe charges you pressure.",
      task: "Stretch this 1¼″ pipe out and watch the bill.",
      controls: [{ key: "L", label: "Pipe length", min: 5, max: 120, step: 5, val: 10, unit: "ft", dec: 0 }],
      compute: function (v) {
        var d = ID["1-1/4"], q = 100, loss = pf(q, d, C_DEFAULT, v.L);
        return {
          readouts: [
            { label: "Friction loss", value: fmt1(loss), unit: "psi", bar: loss / 30, tone: loss >= 10 ? "good" : "" }
          ],
          note: "100 gpm  ·  " + fmt2(pfPerFt(q, d, C_DEFAULT)) + " psi per foot × " + v.L + " ft",
          ok: loss >= 10,
          scene: { d: d, q: q, pf: loss, pfMax: 30, pIn: 50 + loss, pOut: 50, sizeLabel: '1¼" × ' + v.L + " ft" }
        };
      },
      goal: "Reach 10 psi of loss",
      formula: "friction loss = (psi per foot) × effective length",
      reward: "Fittings count too — a tee or elbow is converted to equivalent feet of pipe and added to the physical length."
    },

    "friction-hazen-williams": {
      scene: "pipe",
      kind: "slider",
      headline: "Double the flow and friction more than triples.",
      task: "Start at 50 gpm, then drag to 100 and watch the loss multiplier.",
      controls: [{ key: "q", label: "Flow", min: 20, max: 200, step: 5, val: 50, unit: "gpm", dec: 0 }],
      compute: function (v) {
        var d = ID["1-1/4"], L = 20;
        var loss = pf(v.q, d, C_DEFAULT, L), base = pf(50, d, C_DEFAULT, L);
        var mult = loss / base;
        return {
          readouts: [
            { label: "Friction loss", value: fmt1(loss), unit: "psi", bar: loss / 40 },
            { label: "vs. 50 gpm", value: "×" + fmt2(mult), unit: "", tone: v.q >= 100 ? "good" : "" }
          ],
          note: "loss ∝ Q^1.85 — so 2× the flow is 2^1.85 = 3.61× the loss",
          ok: v.q >= 100,
          scene: { d: d, q: v.q, pf: loss, pfMax: 40, pIn: 50 + loss, pOut: 50, sizeLabel: '1¼" × 20 ft' }
        };
      },
      goal: "Drag the flow to 100 gpm",
      formula: "pf = 4.52 × L × Q^1.85 ÷ (C^1.85 × d^4.87)",
      reward: "That exponent is why a path that grabs too much flow gets punished for it — and it's exactly what makes looped systems settle down in Level 4."
    },

    "friction-diameter": {
      scene: "pipe",
      kind: "slider",
      headline: "One pipe size up can erase most of the loss.",
      task: "Same 100 gpm, same 20 ft. Size the pipe up and watch the loss fall.",
      controls: [{ key: "i", label: "Pipe size", min: 0, max: 6, step: 1, val: 0, unit: "", dec: 0, choices: SIZES }],
      compute: function (v) {
        var name = SIZES[v.i] || "1", d = ID[name], loss = pf(100, d, C_DEFAULT, 20);
        var base = pf(100, ID["1"], C_DEFAULT, 20);
        return {
          readouts: [
            { label: "Inside diameter", value: fmt2(d), unit: "in" },
            { label: "Friction loss", value: fmt1(loss), unit: "psi", bar: loss / base, tone: loss < 2 ? "good" : "" }
          ],
          note: 'vs 1" pipe: ' + (loss / base < 0.999 ? Math.round((1 - loss / base) * 100) + "% less loss" : "baseline"),
          ok: loss < 2,
          scene: { d: d, q: 100, pf: loss, pfMax: base, pIn: 50 + loss, pOut: 50, sizeLabel: name + '"' }
        };
      },
      goal: "Get under 2 psi",
      formula: "friction loss ∝ 1 ÷ d^4.87",
      reward: "That 4.87 exponent is why you use ACTUAL inside diameter, not nominal size. A tenth of an inch is not a rounding error."
    },

    "friction-elevation": {
      scene: "pipe",
      kind: "numeric",
      headline: "Height costs pressure too — and it has nothing to do with flow.",
      task: "The riser climbs 12 ft from the supply to the ceiling. What does that cost?",
      formula: "elevation pressure = 0.433 psi × vertical feet",
      unit: "psi",
      answer: 5.2,
      tol: 0.2,
      pad: "12 * 0.433",
      sceneFor: function () {
        return { d: ID["2-1/2"], q: 60, pf: 5.196, pfMax: 12, pIn: 55.2, pOut: 50,
                 sizeLabel: "riser · 12 ft rise", lossLabel: "elevation cost" };
      },
      reward: "Elevation is charged whether water is moving or not. Friction only shows up when it flows. Total required pressure includes both."
    },

    /* ==================== LEVEL 4 — loop balancing ==================== */
    "loop-multiple-routes": {
      scene: "loop",
      kind: "slider",
      headline: "Two routes to the same node. Now flow has a choice.",
      task: "150 gpm has to get from A to B. Send more than half of it down path A.",
      controls: [{ key: "split", label: "Share through path A", min: 20, max: 80, step: 0.5, val: 50, unit: "%", dec: 1 }],
      compute: function (v) {
        var qa = LOOP_Q * v.split / 100, qb = LOOP_Q - qa;
        var ha = pf(qa, ID["2"], C_DEFAULT, 100), hb = pf(qb, ID["2"], C_DEFAULT, 160);
        return {
          readouts: [
            { label: "Path A · 100 ft", value: fmt1(qa), unit: "gpm" },
            { label: "Path B · 160 ft", value: fmt1(qb), unit: "gpm" }
          ],
          note: "Same 2″ pipe both ways — path B is just 60% longer",
          ok: v.split > 50,
          scene: { qA: qa, qB: qb, hfA: ha, hfB: hb, hfMax: Math.max(ha, hb, 8), tol: LOOP_TOL }
        };
      },
      goal: "Send more than 50% down A",
      formula: "no single path back to the supply = no simple accumulation",
      reward: "Nothing forced that split — you chose it. Real water doesn't choose. The next step finds the split water would actually pick."
    },

    "loop-energy-rule": {
      scene: "loop",
      kind: "slider",
      headline: "Balanced means both routes lose the same pressure.",
      task: "Node B can only have ONE pressure. Find the split where both routes agree.",
      controls: [{ key: "split", label: "Share through path A", min: 20, max: 80, step: 0.5, val: 50, unit: "%", dec: 1 }],
      compute: function (v) {
        var qa = LOOP_Q * v.split / 100, qb = LOOP_Q - qa;
        var ha = pf(qa, ID["2"], C_DEFAULT, 100), hb = pf(qb, ID["2"], C_DEFAULT, 160);
        var err = Math.abs(ha - hb);
        return {
          readouts: [
            { label: "Loss through A  /  through B", value: fmt2(ha) + "  /  " + fmt2(hb), unit: "psi" },
            { label: "Gap", value: fmt2(err), unit: "psi", bar: 1 - Math.min(1, err / 4), tone: err <= LOOP_TOL ? "good" : "" }
          ],
          note: err <= LOOP_TOL ? "Balanced — both routes hand node B the same pressure." : (ha > hb ? "Path A is losing more — ease off it." : "Path B is losing more — send it less."),
          ok: err <= LOOP_TOL,
          scene: { qA: qa, qB: qb, hfA: ha, hfB: hb, hfMax: Math.max(ha, hb, 8), tol: LOOP_TOL }
        };
      },
      goal: "Get the gap under 0.45 psi",
      formula: "signed sum of pressure changes around a closed loop = 0",
      reward: "You just did by hand what a solver does by iteration. Notice the balance point isn't 50/50 — the shorter path takes about 56%.",
      solveHint: "Try around 56%"
    },

    "loop-flow-correction": {
      scene: "loop",
      kind: "iterate",
      headline: "Overload a path and friction pushes back.",
      task: "Start it badly off-balance and let the correction run. Tap to step it.",
      iterations: [
        { split: 90, label: "Initial guess — dump 90% into path A" },
        { split: 74, label: "A is losing far too much. Shift flow to B." },
        { split: 63, label: "Still high. Correct again." },
        { split: 58, label: "Closing in." },
        { split: 56.5, label: "Gap under tolerance — converged." }
      ],
      residualUnit: "psi",
      sceneFor: function (it) {
        var qa = LOOP_Q * it.split / 100, qb = LOOP_Q - qa;
        var ha = pf(qa, ID["2"], C_DEFAULT, 100), hb = pf(qb, ID["2"], C_DEFAULT, 160);
        var err = Math.abs(ha - hb);
        return {
          scene: { qA: qa, qB: qb, hfA: ha, hfB: hb, hfMax: Math.max(ha, hb, 8), tol: LOOP_TOL },
          residual: err,
          readouts: [
            { label: "Path A", value: fmt1(qa), unit: "gpm" },
            { label: "Loop error", value: fmt2(err), unit: "psi", bar: 1 - Math.min(1, err / 16), tone: err <= LOOP_TOL ? "good" : "" }
          ]
        };
      },
      reward: "Because loss grows as Q^1.85, an overloaded path gets disproportionately expensive. That's the feedback that makes the network settle instead of oscillate."
    },

    /* =================== LEVEL 5 — solver behavior =================== */
    "solver-network": {
      scene: "tree",
      kind: "order",
      headline: "To a solver, your drawing is nodes and pipes.",
      task: "Put the solver's setup in order.",
      items: [
        "Nodes — elevation, and any outlet demand",
        "Pipes — size, length, equivalent length, C-factor",
        "Guess a pressure at every node",
        "Solve the whole network at once"
      ],
      sceneFor: function () { return treeState(BASE, { labels: false }); },
      reward: "Sprinklers aren't fixed flows — they're pressure-driven outlets. Whatever pressure the network settles on decides what they discharge."
    },

    "solver-iteration": {
      scene: "tree",
      kind: "iterate",
      headline: "Guess. Measure the error. Correct. Repeat.",
      task: "Tap to run iterations and watch the imbalance collapse.",
      iterations: [
        { residual: 42.0, label: "Initial guess — nodes are badly out of balance" },
        { residual: 11.3, label: "Pressures corrected from the residuals" },
        { residual: 2.81, label: "Error dropping fast now" },
        { residual: 0.44, label: "Almost there" },
        { residual: 0.06, label: "Under tolerance — converged" }
      ],
      residualUnit: "gpm",
      sceneFor: function (it, i, n) {
        var s = system({ p1: 7 });
        var scale = 0.55 + 0.45 * (i / (n - 1));
        var flow = {}, kk;
        for (kk in s.flow) flow[kk] = s.flow[kk] * (i === n - 1 ? 1 : scale * (1 + (i % 2 ? 0.18 : -0.14)));
        return {
          scene: { active: { h1: 1, h2: 1, h3: 1, h4: 1 }, flow: flow, labels: {}, glow: i === n - 1 ? ["h1", "h2", "h3", "h4"] : [] },
          residual: it.residual,
          readouts: [
            { label: "Largest node residual", value: fmt2(it.residual), unit: "gpm", bar: 1 - Math.min(1, it.residual / 42), tone: it.residual < 0.5 ? "good" : "" }
          ]
        };
      },
      reward: "A residual is just how wrong the current guess still is. Node residuals check continuity; loop residuals check pressure balance."
    },

    "solver-convergence": {
      scene: "tree",
      kind: "slider",
      headline: "Convergence is 'close enough' — and you set what close means.",
      task: "Tighten the tolerance and watch the iteration count climb.",
      controls: [{ key: "tolIdx", label: "Tolerance", min: 0, max: 5, step: 1, val: 0, unit: "", dec: 0, choices: ["5 gpm", "2 gpm", "1 gpm", "0.5 gpm", "0.1 gpm", "0.01 gpm"] }],
      compute: function (v) {
        var tols = [5, 2, 1, 0.5, 0.1, 0.01];
        var seq = [42.0, 11.3, 2.81, 0.44, 0.06, 0.004, 0.0002];
        var tol = tols[v.tolIdx], iters = 1, i;
        for (i = 0; i < seq.length; i++) { if (seq[i] <= tol) { iters = i + 1; break; } iters = seq.length; }
        var s = system({ p1: 7 });
        return {
          readouts: [
            { label: "Tolerance", value: String(tol), unit: "gpm" },
            { label: "Iterations needed", value: String(iters), unit: "", bar: iters / 7, tone: v.tolIdx >= 3 ? "good" : "" }
          ],
          note: v.tolIdx >= 3 ? "Tight enough to report. Flows below are the balanced result." : "Loose tolerance stops early — the answer is still drifting.",
          ok: v.tolIdx >= 3,
          scene: treeState(s, {})
        };
      },
      goal: "Tighten to 0.5 gpm or better",
      formula: "converged = every node and loop residual within tolerance",
      reward: "Converged is not the same as passing. The network can balance perfectly and still fail its sprinkler minimums or its supply check."
    },

    "solver-reporting": {
      scene: "tree",
      kind: "read",
      headline: "The route table in a report is a view, not the method.",
      task: "This is the solved system. The rows below are just a readable way to check it.",
      showSheet: true,
      sceneFor: function () { return treeState(BASE, {}); },
      reward: "Report order ≠ solve order. And a grid pipe showing low or negative flow can be perfectly valid — it just means flow runs opposite the direction the model drew it."
    },

    /* ================= LEVEL 6 — demand and supply ================= */
    "demand-total-flow": {
      scene: "tree",
      kind: "numeric",
      headline: "Demand is the sum of the actuals, plus the hose.",
      task: "Twelve sprinklers averaging 22.5 gpm, plus a 250 gpm hose allowance. What's the total demand?",
      formula: "total demand = Σ actual sprinkler flow + hose allowance",
      unit: "gpm",
      answer: 520,
      tol: 1,
      pad: "12 * 22.5 + 250",
      sceneFor: function () { return treeState(BASE, {}); },
      reward: "Use the ACTUAL calculated discharges, never the density minimums — the minimums would under-state the demand every time."
    },

    "demand-supply-curve": {
      scene: "curve",
      kind: "slider",
      headline: "The more you draw, the less pressure you get.",
      task: "Drag the demand along the supply curve. The system needs 64 psi.",
      controls: [{ key: "q", label: "System demand", min: 100, max: 1400, step: 20, val: 200, unit: "gpm", dec: 0 }],
      compute: function (v) {
        var stat = 88, res = 62, qTest = 1200, need = 64;
        var avail = availPressure(stat, res, qTest, v.q);
        return {
          readouts: [
            { label: "Available", value: fmt1(avail), unit: "psi", bar: avail / stat, tone: avail >= need ? "good" : "" },
            { label: "Required", value: "64.0", unit: "psi" }
          ],
          note: "Flow test: 88 psi static, 62 psi residual at 1200 gpm",
          ok: avail < need,
          scene: { stat: stat, res: res, qTest: qTest, qDemand: v.q, pReq: need, qMax: 1400, pMax: 94, pMin: 44 }
        };
      },
      goal: "Push demand until available drops below 64 psi",
      formula: "P_avail = P_static − (P_static − P_res) × (Q ÷ Q_test)^1.85",
      reward: "Same 1.85 exponent as pipe friction — because the supply's own piping loses pressure the same nonlinear way."
    },

    "demand-margin": {
      scene: "curve",
      kind: "slider",
      headline: "Safety margin is the whole verdict.",
      task: "Demand is locked at 900 gpm. Bring the required pressure down.",
      controls: [{ key: "need", label: "Required pressure", min: 40, max: 90, step: 1, val: 86, unit: "psi", dec: 0 }],
      compute: function (v) {
        var stat = 88, res = 62, qTest = 1200, q = 900;
        var avail = availPressure(stat, res, qTest, q);
        var margin = avail - v.need;
        return {
          readouts: [
            { label: "Available @ 900 gpm", value: fmt1(avail), unit: "psi" },
            { label: "Safety margin", value: (margin >= 0 ? "+" : "") + fmt1(margin), unit: "psi", bar: (margin + 20) / 40, tone: margin >= 0 ? "good" : "" }
          ],
          note: margin >= 0 ? "Supply covers the demand." : "Short on pressure — the design fails this check.",
          ok: margin >= 0,
          scene: { stat: stat, res: res, qTest: qTest, qDemand: q, pReq: v.need, qMax: 1400, pMax: 94, pMin: 38 }
        };
      },
      goal: "Get the margin positive",
      formula: "safety margin = available pressure − required pressure",
      reward: "That's the end of the walk: remote head → friction → loop balance → converged network → demand point → margin. You've followed a whole calc."
    }
  };

  global.HydraulicLabs = {
    model: M,
    labs: LABS,
    forSection: function (id) { return LABS[id] || null; },
    treeState: treeState,
    base: BASE,
    fmt1: fmt1, fmt2: fmt2
  };
})(window);
