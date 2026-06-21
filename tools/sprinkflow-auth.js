/*
 * SprinkFlow shared auth — single sign-on across the PWA games.
 * One SprinkFlow (Supabase) account; the session is stored under shared
 * localStorage keys so signing in on any game signs you in on all of them
 * (same origin). Exposes window.SFAuth.
 */
(function () {
  "use strict";
  var SB_URL = "https://aebghirpjiwiergkafej.supabase.co";
  var SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlYmdoaXJwaml3aWVyZ2thZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMjA0NTQsImV4cCI6MjA5NTg5NjQ1NH0.ogDc26YGo3AEAZZcPII_p3htPml4pjQa4vOyYAU1sSg";
  var SKEY = "sf.session", HKEY = "sf.handle";
  var listeners = [];

  function getSession() { try { return JSON.parse(localStorage.getItem(SKEY) || "null"); } catch (e) { return null; } }
  function setSession(s) { try { localStorage.setItem(SKEY, JSON.stringify(s)); } catch (e) {} fire(); }
  function clearSession() { try { localStorage.removeItem(SKEY); } catch (e) {} fire(); }
  function getHandle() { return (localStorage.getItem(HKEY) || "").trim(); }
  function setHandle(h) { try { localStorage.setItem(HKEY, String(h || "").slice(0, 24)); } catch (e) {} }
  function isSignedIn() { var s = getSession(); return !!(s && s.token); }
  function displayName() { var s = getSession(); return getHandle() || (s && s.email ? s.email.split("@")[0] : ""); }
  function fire() { listeners.forEach(function (cb) { try { cb(getSession()); } catch (e) {} }); }
  function onChange(cb) { listeners.push(cb); }
  window.addEventListener("storage", function (e) { if (e.key === SKEY || e.key === HKEY) fire(); });

  // ---- injected sign-in modal (once) ----
  var injected = false, onSuccessCb = null;
  function inject() {
    if (injected) return; injected = true;
    var css =
      ".sf-modal-bk{position:fixed;inset:0;background:rgba(5,8,11,.72);backdrop-filter:blur(3px);display:none;align-items:flex-end;justify-content:center;z-index:90;padding:0}" +
      ".sf-modal-bk.show{display:flex}" +
      ".sf-modal{width:100%;max-width:460px;background:var(--surface,#171d24);border:1px solid var(--line,#2d3742);border-radius:22px 22px 0 0;padding:22px 18px calc(22px + env(safe-area-inset-bottom,0px));color:var(--ink,#f5f7f8);font-family:Inter,system-ui,sans-serif}" +
      "@media(min-width:520px){.sf-modal-bk{align-items:center;padding:16px}.sf-modal{border-radius:22px}}" +
      ".sf-modal h3{font:700 1.25rem 'Space Grotesk',sans-serif;margin:0 0 4px}" +
      ".sf-modal p{color:var(--muted,#aab4bd);margin:0 0 16px;font-size:.9rem;line-height:1.45}" +
      ".sf-field{margin-bottom:12px}.sf-field label{display:block;font:600 .78rem Inter;color:var(--muted,#aab4bd);margin-bottom:6px}" +
      ".sf-field input{width:100%;box-sizing:border-box;background:var(--bg,#0d1116);border:1px solid var(--line-strong,#536171);border-radius:12px;padding:13px;color:var(--ink,#f5f7f8);font:500 1rem Inter}" +
      ".sf-field input:focus{outline:2px solid var(--accent,#ffb03a);outline-offset:0}" +
      ".sf-err{color:#ff5a4f;font:500 .85rem Inter;min-height:20px;margin:2px 0 10px}" +
      ".sf-btn{display:block;width:100%;border:0;border-radius:14px;padding:15px;font:700 1.05rem 'Space Grotesk';cursor:pointer;background:linear-gradient(120deg,#ff5a2f,#ffb03a);color:#1a0d06}" +
      ".sf-later{text-align:center;margin-top:14px}.sf-later button{background:none;border:0;color:var(--muted,#aab4bd);font:500 .85rem Inter;cursor:pointer}" +
      ".sf-switch{text-align:center;margin-top:14px;font:500 .86rem Inter;color:var(--muted,#aab4bd)}.sf-switch a{color:var(--accent,#ffb03a);cursor:pointer;font-weight:600;text-decoration:underline}" +
      ".sf-err.ok{color:var(--ok,#3ddc97)}.sf-err.ok b{color:var(--ok,#3ddc97)}" +
      ".sf-spin{display:inline-block;width:15px;height:15px;border:2px solid rgba(0,0,0,.25);border-top-color:#1a0d06;border-radius:50%;animation:sfspin .7s linear infinite;vertical-align:-2px}" +
      "@keyframes sfspin{to{transform:rotate(360deg)}}";
    var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);
    var div = document.createElement("div"); div.id = "sfAuthModal"; div.className = "sf-modal-bk";
    div.innerHTML =
      '<div class="sf-modal" role="dialog" aria-modal="true">' +
      '<h3 id="sfTitle">Sign in to compete</h3>' +
      '<p id="sfBlurb">One free SprinkFlow account works across all the games and the study tool. Your leaderboard name is shown publicly; your email is never shown.</p>' +
      '<form id="sfAuthForm">' +
      '<div class="sf-field"><label id="sfEmailLabel">Email</label><input id="sfEmail" type="email" autocomplete="username" inputmode="email" placeholder="you@company.com" required></div>' +
      '<div class="sf-field"><label id="sfPassLabel">Password</label><input id="sfPass" type="password" autocomplete="current-password" placeholder="At least 6 characters" required></div>' +
      '<div class="sf-field"><label>Leaderboard name (shown publicly)</label><input id="sfHandle" type="text" maxlength="24" placeholder="e.g. SprinkNerd"></div>' +
      '<div class="sf-err" id="sfErr"></div>' +
      '<button class="sf-btn" type="submit" id="sfSubmit">Sign in</button>' +
      '</form>' +
      '<div class="sf-switch" id="sfSwitch"></div>' +
      '<div class="sf-later"><button id="sfLater" type="button">Maybe later</button></div>' +
      '</div>';
    document.body.appendChild(div);
    div.addEventListener("click", function (e) { if (e.target === div) close(); });
    document.getElementById("sfLater").onclick = close;
    document.getElementById("sfAuthForm").addEventListener("submit", submit);
    document.getElementById("sfSwitch").addEventListener("click", function (e) {
      if (e.target && e.target.dataset && e.target.dataset.mode) { e.preventDefault(); setMode(e.target.dataset.mode); }
    });
  }
  var mode = "signin";
  function setMode(m) {
    mode = (m === "signup") ? "signup" : "signin";
    var t = document.getElementById("sfTitle"), b = document.getElementById("sfBlurb"),
        sub = document.getElementById("sfSubmit"), sw = document.getElementById("sfSwitch"),
        pass = document.getElementById("sfPass"), err = document.getElementById("sfErr"),
        passLabel = document.getElementById("sfPassLabel");
    if (!t) return;
    err.textContent = ""; err.className = "sf-err";
    if (mode === "signup") {
      t.textContent = "Create your free account";
      b.textContent = "One free SprinkFlow account unlocks all the games, the study tool, and the global leaderboards. Your leaderboard name is public; your email never is.";
      sub.textContent = "Create account";
      pass.setAttribute("autocomplete", "new-password");
      if (passLabel) passLabel.textContent = "Create a password";
      pass.setAttribute("placeholder", "At least 6 characters");
      sw.innerHTML = 'Already have an account? <a data-mode="signin">Sign in</a>';
    } else {
      t.textContent = "Sign in to compete";
      b.textContent = "One free SprinkFlow account works across all the games and the study tool. Your leaderboard name is shown publicly; your email is never shown.";
      sub.textContent = "Sign in";
      pass.setAttribute("autocomplete", "current-password");
      if (passLabel) passLabel.textContent = "Password";
      pass.setAttribute("placeholder", "Your password");
      sw.innerHTML = 'New here? <a data-mode="signup">Create a free account</a>';
    }
  }
  function close() { var m = document.getElementById("sfAuthModal"); if (m) m.classList.remove("show"); }
  function openSignIn(opts) {
    inject(); opts = opts || {}; onSuccessCb = opts.onSuccess || null;
    var s = getSession();
    document.getElementById("sfEmail").value = (s && s.email) || "";
    document.getElementById("sfHandle").value = getHandle() || (opts.prefillHandle || "");
    setMode(opts.mode === "signup" ? "signup" : "signin");
    document.getElementById("sfAuthModal").classList.add("show");
  }
  function escErr(s) { return String(s).replace(/[<>&]/g, function (c) { return ({ "<":"&lt;",">":"&gt;","&":"&amp;" })[c]; }); }
  function submit(e) {
    e.preventDefault();
    var email = document.getElementById("sfEmail").value.trim(), pass = document.getElementById("sfPass").value;
    var handle = document.getElementById("sfHandle").value.trim();
    var btn = document.getElementById("sfSubmit"), err = document.getElementById("sfErr");
    if (!email || !pass) return;
    err.textContent = ""; err.className = "sf-err";
    if (mode === "signup") doSignup(email, pass, handle, btn, err);
    else doSignin(email, pass, handle, btn, err);
  }
  function doSignin(email, pass, handle, btn, err) {
    btn.disabled = true; btn.innerHTML = '<span class="sf-spin"></span> Signing in…';
    fetch(SB_URL + "/auth/v1/token?grant_type=password", { method: "POST", headers: { apikey: SB_ANON, "Content-Type": "application/json" }, body: JSON.stringify({ email: email, password: pass }) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.access_token) {
          var msg = (res.d && (res.d.error_description || res.d.msg || res.d.error)) || "Sign-in failed. Check your email and password.";
          if (/confirm/i.test(msg)) msg = "Please confirm your email first (check your inbox), then sign in.";
          throw new Error(msg);
        }
        setHandle(handle || email.split("@")[0]);
        setSession(sessionFrom(res.d, email));
        close();
        if (onSuccessCb) { var cb = onSuccessCb; onSuccessCb = null; cb(); }
      })
      .catch(function (e) { err.className = "sf-err"; err.textContent = e.message || "Sign-in failed."; })
      .then(function () { btn.disabled = false; btn.textContent = (mode === "signup") ? "Create account" : "Sign in"; });
  }
  function doSignup(email, pass, handle, btn, err) {
    if (pass.length < 6) { err.className = "sf-err"; err.textContent = "Password must be at least 6 characters."; return; }
    btn.disabled = true; btn.innerHTML = '<span class="sf-spin"></span> Creating account…';
    fetch(SB_URL + "/auth/v1/signup", { method: "POST", headers: { apikey: SB_ANON, "Content-Type": "application/json" }, body: JSON.stringify({ email: email, password: pass }) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          var msg = (res.d && (res.d.msg || res.d.error_description || res.d.error)) || "Could not create the account.";
          if (/already|registered|exists/i.test(msg)) msg = "That email already has an account — try signing in instead.";
          throw new Error(msg);
        }
        if (handle) setHandle(handle);
        var d = res.d;
        if (d.access_token) {                                  // email confirmation disabled -> signed in now
          setSession(sessionFrom(d, email));
          close();
          if (onSuccessCb) { var cb = onSuccessCb; onSuccessCb = null; cb(); }
          return;
        }
        setMode("signin");                                     // confirmation required -> prompt to confirm then sign in
        document.getElementById("sfEmail").value = email;
        err.className = "sf-err ok";
        err.innerHTML = "✓ Account created! Check <b>" + escErr(email) + "</b> for a confirmation link (peek in spam too), then sign in.";
      })
      .catch(function (e) { err.className = "sf-err"; err.textContent = e.message || "Could not create the account."; })
      .then(function () { btn.disabled = false; btn.textContent = (mode === "signup") ? "Create account" : "Sign in"; });
  }

  // ---- session persistence: keep the access token fresh via the refresh token ----
  function sessionFrom(d, email) {
    return {
      token: d.access_token,
      refresh: d.refresh_token || null,
      expiresAt: Math.floor(Date.now() / 1000) + (d.expires_in || 3600),
      userId: (d.user && d.user.id) || null,
      email: (d.user && d.user.email) || email || null
    };
  }
  function tokenFresh() { var s = getSession(); return !!(s && s.token && (!s.expiresAt || s.expiresAt - 60 > Date.now() / 1000)); }
  var refreshing = null, RLOCK = "sf.refreshing";
  function refreshSession() {
    var s = getSession();
    if (!s || !s.refresh) return Promise.resolve(false);
    if (refreshing) return refreshing;
    // cross-page/tab coordination: refresh tokens rotate and Supabase revokes on reuse, so only ONE
    // page may spend the token at a time. If another page refreshed within the last few seconds, skip.
    var now = Date.now(), lock = 0;
    try { lock = parseInt(localStorage.getItem(RLOCK) || "0", 10) || 0; } catch (e) {}
    if (now - lock < 6000) return Promise.resolve(tokenFresh());
    try { localStorage.setItem(RLOCK, String(now)); } catch (e) {}
    refreshing = fetch(SB_URL + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: SB_ANON, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: s.refresh }) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d.access_token) { setSession(sessionFrom(res.d, s.email)); return true; }
        // refresh was rejected — but ONLY sign out if the current access token is also already expired.
        // While the access token is still valid, a rejection is almost always a harmless rotation race; keep the session.
        var cur = getSession();
        if (cur && cur.expiresAt && cur.expiresAt > Date.now() / 1000 + 30) return false;
        clearSession(); return false;                        // token truly dead -> signed out
      })
      .catch(function () { return false; })                  // network error: keep the session, retry later (stay signed in offline)
      .then(function (v) { try { localStorage.removeItem(RLOCK); } catch (e) {} refreshing = null; return v; });
    return refreshing;
  }
  function ensureFresh() {
    if (tokenFresh()) return Promise.resolve(true);
    var s = getSession();
    if (!s || !s.refresh) return Promise.resolve(isSignedIn());
    return refreshSession();
  }
  function freshToken() { return ensureFresh().then(function () { var s = getSession(); return s ? s.token : null; }); }

  // ---- Supabase REST helpers ----
  function doRpc(fn, args, token) {
    return fetch(SB_URL + "/rest/v1/rpc/" + fn, { method: "POST", headers: { apikey: SB_ANON, Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify(args || {}) })
      .then(function (r) { return { ok: r.ok, status: r.status }; })
      .catch(function () { return { ok: false, status: 0, reason: "offline" }; });
  }
  function rpc(fn, args) {
    var s = getSession();
    if (!s || !s.token) return Promise.resolve({ ok: false, status: 401, reason: "not-signed-in" });
    return ensureFresh().then(function () {
      var s2 = getSession();
      if (!s2 || !s2.token) return { ok: false, status: 401, reason: "not-signed-in" };
      return doRpc(fn, args, s2.token).then(function (r) {
        if (r.status !== 401 && r.status !== 403) return r;
        return refreshSession().then(function (ok) {                 // expired mid-flight -> refresh once and retry
          if (!ok) return { ok: false, status: r.status, reason: "expired" };
          var s3 = getSession();
          return doRpc(fn, args, s3.token).then(function (r2) {
            if (r2.status === 401 || r2.status === 403) { var c2 = getSession(); if (!c2 || !c2.expiresAt || c2.expiresAt < Date.now() / 1000) clearSession(); return { ok: false, status: r2.status, reason: "expired" }; }
            return r2;
          });
        });
      });
    });
  }
  function read(path) {
    return fetch(SB_URL + "/rest/v1/" + path, { headers: { apikey: SB_ANON, Authorization: "Bearer " + SB_ANON } })
      .then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }

  window.SFAuth = {
    SB_URL: SB_URL, SB_ANON: SB_ANON,
    session: getSession, handle: getHandle, setHandle: setHandle, displayName: displayName,
    isSignedIn: isSignedIn, onChange: onChange, openSignIn: openSignIn, signOut: clearSession,
    rpc: rpc, read: read, ensureFresh: ensureFresh, freshToken: freshToken, refresh: refreshSession
  };

  // keep the device signed in: refresh on load, on a timer, and when the app regains focus
  if (isSignedIn()) ensureFresh();
  setInterval(function () { if (isSignedIn() && !tokenFresh()) refreshSession(); }, 4 * 60 * 1000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden && isSignedIn() && !tokenFresh()) refreshSession(); });

  // ---- app gate: require a free sign-in before the tools/games can be used ----
  // Opt out on a page with: <body data-no-auth-gate> (none currently do).
  var gateStyled = false;
  function gateStyles() {
    if (gateStyled) return; gateStyled = true;
    var css =
      "#sf-gate{position:fixed;inset:0;z-index:80;background:var(--bg,#0d1116);display:flex;align-items:center;justify-content:center;padding:24px;font-family:Inter,system-ui,sans-serif;overflow:auto}" +
      "#sf-gate .sf-gate-card{max-width:360px;text-align:center;color:var(--ink,#f5f7f8)}" +
      "#sf-gate .sf-gate-logo{font-size:54px;line-height:1;margin-bottom:8px}" +
      "#sf-gate h2{font:700 1.5rem 'Space Grotesk',sans-serif;margin:0 0 8px;background:linear-gradient(120deg,#ff5a2f,#ffb03a,#37b7e4);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}" +
      "#sf-gate p{color:var(--muted,#aab4bd);margin:0 0 20px;line-height:1.5;font-size:.95rem}" +
      "#sf-gate button{border:0;border-radius:14px;padding:15px 26px;font:700 1.05rem 'Space Grotesk',sans-serif;cursor:pointer;background:linear-gradient(120deg,#ff5a2f,#ffb03a);color:#1a0d06}";
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  }
  function removeGate() { var w = document.getElementById("sf-gate"); if (w && w.parentNode) w.parentNode.removeChild(w); }
  function buildGate() {
    if (document.getElementById("sf-gate")) return;
    gateStyles();
    var w = document.createElement("div"); w.id = "sf-gate";
    w.innerHTML = '<div class="sf-gate-card"><div class="sf-gate-logo">💧</div>' +
      '<h2>SprinkFlow Tools</h2>' +
      '<p>Create a free account or sign in to use the calculators, code references, and games.</p>' +
      '<button type="button" id="sf-gate-btn">Sign in / Create account</button></div>';
    document.body.appendChild(w);
    document.getElementById("sf-gate-btn").onclick = function () { openSignIn({ onSuccess: removeGate }); };
  }
  function applyGate() {
    if (document.body && document.body.hasAttribute("data-no-auth-gate")) return;
    if (isSignedIn()) { removeGate(); return; }
    buildGate();
    openSignIn({ onSuccess: removeGate });   // auto-open the sign-in form over the wall
  }
  onChange(function () { if (isSignedIn()) removeGate(); else applyGate(); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyGate);
  else applyGate();
})();
