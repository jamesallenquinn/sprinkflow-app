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
      ".sf-spin{display:inline-block;width:15px;height:15px;border:2px solid rgba(0,0,0,.25);border-top-color:#1a0d06;border-radius:50%;animation:sfspin .7s linear infinite;vertical-align:-2px}" +
      "@keyframes sfspin{to{transform:rotate(360deg)}}";
    var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);
    var div = document.createElement("div"); div.id = "sfAuthModal"; div.className = "sf-modal-bk";
    div.innerHTML =
      '<div class="sf-modal" role="dialog" aria-modal="true">' +
      '<h3>Sign in to compete</h3>' +
      '<p>One SprinkFlow account works across all the games and the study tool. Your leaderboard name is shown publicly; your email is never shown.</p>' +
      '<form id="sfAuthForm">' +
      '<div class="sf-field"><label>SprinkFlow email</label><input id="sfEmail" type="email" autocomplete="username" inputmode="email" placeholder="you@company.com" required></div>' +
      '<div class="sf-field"><label>Password</label><input id="sfPass" type="password" autocomplete="current-password" placeholder="••••••••" required></div>' +
      '<div class="sf-field"><label>Leaderboard name (shown publicly)</label><input id="sfHandle" type="text" maxlength="24" placeholder="e.g. SprinkNerd"></div>' +
      '<div class="sf-err" id="sfErr"></div>' +
      '<button class="sf-btn" type="submit" id="sfSubmit">Sign in</button>' +
      '</form>' +
      '<div class="sf-later"><button id="sfLater" type="button">Maybe later</button></div>' +
      '</div>';
    document.body.appendChild(div);
    div.addEventListener("click", function (e) { if (e.target === div) close(); });
    document.getElementById("sfLater").onclick = close;
    document.getElementById("sfAuthForm").addEventListener("submit", submit);
  }
  function close() { var m = document.getElementById("sfAuthModal"); if (m) m.classList.remove("show"); }
  function openSignIn(opts) {
    inject(); opts = opts || {}; onSuccessCb = opts.onSuccess || null;
    var s = getSession();
    document.getElementById("sfEmail").value = (s && s.email) || "";
    document.getElementById("sfHandle").value = getHandle() || (opts.prefillHandle || "");
    document.getElementById("sfErr").textContent = "";
    document.getElementById("sfAuthModal").classList.add("show");
  }
  function submit(e) {
    e.preventDefault();
    var email = document.getElementById("sfEmail").value.trim(), pass = document.getElementById("sfPass").value;
    if (!email || !pass) return;
    var btn = document.getElementById("sfSubmit"); btn.disabled = true; btn.innerHTML = '<span class="sf-spin"></span> Signing in…';
    document.getElementById("sfErr").textContent = "";
    fetch(SB_URL + "/auth/v1/token?grant_type=password", { method: "POST", headers: { apikey: SB_ANON, "Content-Type": "application/json" }, body: JSON.stringify({ email: email, password: pass }) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.access_token) {
          var msg = (res.d && (res.d.error_description || res.d.msg || res.d.error)) || "Sign-in failed. Check your email and password.";
          if (/confirm/i.test(msg)) msg = "Please confirm your email first (check your inbox), then sign in.";
          throw new Error(msg);
        }
        setHandle(document.getElementById("sfHandle").value.trim() || email.split("@")[0]);
        setSession({ token: res.d.access_token, userId: res.d.user && res.d.user.id, email: (res.d.user && res.d.user.email) || email });
        close();
        if (onSuccessCb) { var cb = onSuccessCb; onSuccessCb = null; cb(); }
      })
      .catch(function (err) { document.getElementById("sfErr").textContent = err.message || "Sign-in failed."; })
      .then(function () { btn.disabled = false; btn.textContent = "Sign in"; });
  }

  // ---- Supabase REST helpers ----
  function rpc(fn, args) {
    var s = getSession();
    if (!s || !s.token) return Promise.resolve({ ok: false, status: 401, reason: "not-signed-in" });
    return fetch(SB_URL + "/rest/v1/rpc/" + fn, { method: "POST", headers: { apikey: SB_ANON, Authorization: "Bearer " + s.token, "Content-Type": "application/json" }, body: JSON.stringify(args || {}) })
      .then(function (r) { if (r.status === 401 || r.status === 403) { clearSession(); return { ok: false, status: r.status, reason: "expired" }; } return { ok: r.ok, status: r.status }; })
      .catch(function () { return { ok: false, status: 0, reason: "offline" }; });
  }
  function read(path) {
    return fetch(SB_URL + "/rest/v1/" + path, { headers: { apikey: SB_ANON, Authorization: "Bearer " + SB_ANON } })
      .then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }

  window.SFAuth = {
    SB_URL: SB_URL, SB_ANON: SB_ANON,
    session: getSession, handle: getHandle, setHandle: setHandle, displayName: displayName,
    isSignedIn: isSignedIn, onChange: onChange, openSignIn: openSignIn, signOut: clearSession,
    rpc: rpc, read: read
  };
})();
