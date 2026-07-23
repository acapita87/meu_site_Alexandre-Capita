/* ============================================================
   Tweaks — lightweight, on-brand customization panel
   (shared by index.html + article.html)
   ============================================================ */
(function () {
  const STORE = 'ac-azure-tweaks';

  const THEMES = {
    azure:   { label: 'Azure',   sw: ['#2f7bff', '#37e0c8'], vars: { '--blue':'#2f7bff', '--blue-bright':'#5b97ff', '--teal':'#37e0c8', '--violet':'#8b9bff' } },
    aurora:  { label: 'Aurora',  sw: ['#8b5cf6', '#ec4899'], vars: { '--blue':'#8b5cf6', '--blue-bright':'#a78bfa', '--teal':'#f472b6', '--violet':'#c084fc' } },
    emerald: { label: 'Emerald', sw: ['#10b981', '#5eead4'], vars: { '--blue':'#0ea672', '--blue-bright':'#34d399', '--teal':'#5eead4', '--violet':'#6ee7b7' } },
    ember:   { label: 'Ember',   sw: ['#f59e0b', '#fb7185'], vars: { '--blue':'#f97316', '--blue-bright':'#fb923c', '--teal':'#fbbf24', '--violet':'#fb7185' } },
  };

  const defaults = (window.TWEAK_DEFAULTS && typeof window.TWEAK_DEFAULTS === 'object')
    ? window.TWEAK_DEFAULTS : { theme: 'azure', glow: true, density: 'comfortable' };

  let state = Object.assign({}, defaults);
  try { const saved = JSON.parse(localStorage.getItem(STORE)); if (saved) state = Object.assign(state, saved); } catch (e) {}

  function apply() {
    const t = THEMES[state.theme] || THEMES.azure;
    Object.entries(t.vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    document.documentElement.style.setProperty('--tw-glow', state.glow ? '1' : '0');
    const fx = document.querySelector('.bg-fx');
    if (fx) fx.style.opacity = state.glow ? '1' : '.18';
    document.documentElement.dataset.density = state.density;
  }

  function persist(edits) {
    state = Object.assign(state, edits);
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
    apply();
    // Write to disk via host (only the file holding the EDITMODE block is updated).
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*'); } catch (e) {}
    sync();
  }

  apply();

  /* ---- Panel UI ---- */
  const panel = document.createElement('div');
  panel.id = 'tweaks-panel';
  panel.style.display = 'none';
  panel.innerHTML = `
    <div class="tw-head">
      <span class="tw-title">Tweaks</span>
      <button class="tw-close" aria-label="Close">&times;</button>
    </div>
    <div class="tw-body">
      <div class="tw-group">
        <div class="tw-label">Accent theme</div>
        <div class="tw-themes">
          ${Object.entries(THEMES).map(([id, t]) => `
            <button class="tw-theme" data-theme="${id}">
              <span class="tw-sw" style="background:linear-gradient(135deg, ${t.sw[0]}, ${t.sw[1]})"></span>
              <span>${t.label}</span>
            </button>`).join('')}
        </div>
      </div>
      <div class="tw-group">
        <div class="tw-label">Ambient glow</div>
        <div class="tw-seg" data-key="glow">
          <button data-val="true">On</button>
          <button data-val="false">Subtle</button>
        </div>
      </div>
      <div class="tw-group">
        <div class="tw-label">Reading density</div>
        <div class="tw-seg" data-key="density">
          <button data-val="comfortable">Comfortable</button>
          <button data-val="compact">Compact</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(panel);

  const style = document.createElement('style');
  style.textContent = `
    #tweaks-panel { position: fixed; right: 22px; bottom: 22px; z-index: 200; width: 290px;
      background: rgba(14,26,54,.92); backdrop-filter: blur(16px);
      border: 1px solid var(--line); border-radius: 16px; color: var(--text);
      box-shadow: 0 30px 70px -20px rgba(0,0,0,.7); font-family: var(--font-body);
      animation: twin .25s ease; }
    @keyframes twin { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
    #tweaks-panel .tw-head { display: flex; align-items: center; justify-content: space-between;
      padding: 15px 16px; border-bottom: 1px solid var(--line-soft); }
    #tweaks-panel .tw-title { font-family: var(--font-display); font-weight: 600; font-size: 15px; letter-spacing: -.01em; }
    #tweaks-panel .tw-close { background: none; border: 0; color: var(--text-dim); font-size: 22px;
      cursor: pointer; line-height: 1; padding: 0 4px; transition: color .2s; }
    #tweaks-panel .tw-close:hover { color: var(--text); }
    #tweaks-panel .tw-body { padding: 16px; display: flex; flex-direction: column; gap: 18px; }
    #tweaks-panel .tw-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: .12em;
      text-transform: uppercase; color: var(--text-dim); margin-bottom: 10px; }
    #tweaks-panel .tw-themes { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    #tweaks-panel .tw-theme { display: flex; align-items: center; gap: 9px; cursor: pointer;
      background: rgba(122,156,224,.06); border: 1px solid var(--line); border-radius: 10px;
      padding: 9px 11px; color: var(--text-mid); font-size: 13px; font-weight: 600; transition: all .18s; }
    #tweaks-panel .tw-theme:hover { color: var(--text); border-color: rgba(122,156,224,.4); }
    #tweaks-panel .tw-theme[aria-pressed="true"] { color: var(--text); border-color: var(--teal);
      box-shadow: 0 0 0 1px var(--teal); }
    #tweaks-panel .tw-sw { width: 20px; height: 20px; border-radius: 6px; flex: none; }
    #tweaks-panel .tw-seg { display: flex; gap: 6px; background: rgba(122,156,224,.06);
      border: 1px solid var(--line); border-radius: 10px; padding: 4px; }
    #tweaks-panel .tw-seg button { flex: 1; background: none; border: 0; color: var(--text-mid);
      font-family: var(--font-body); font-weight: 600; font-size: 13px; padding: 8px; border-radius: 7px;
      cursor: pointer; transition: all .18s; }
    #tweaks-panel .tw-seg button[aria-pressed="true"] { color: #04122e;
      background: linear-gradient(135deg, var(--teal), var(--blue-bright)); }
    html[data-density="compact"] .prose p, html[data-density="compact"] .prose li { font-size: 16px; }
    html[data-density="compact"] .prose { max-width: 680px; }
    html[data-density="compact"] .card p { font-size: 13.5px; }
  `;
  document.head.appendChild(style);

  function sync() {
    panel.querySelectorAll('.tw-theme').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.theme === state.theme));
    panel.querySelectorAll('.tw-seg').forEach(seg => {
      const key = seg.dataset.key;
      seg.querySelectorAll('button').forEach(b =>
        b.setAttribute('aria-pressed', String(state[key]) === b.dataset.val));
    });
  }
  sync();

  panel.querySelectorAll('.tw-theme').forEach(b =>
    b.addEventListener('click', () => persist({ theme: b.dataset.theme })));
  panel.querySelectorAll('.tw-seg').forEach(seg => {
    const key = seg.dataset.key;
    seg.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      let v = b.dataset.val;
      if (v === 'true') v = true; else if (v === 'false') v = false;
      persist({ [key]: v });
    }));
  });

  /* ---- Host protocol ---- */
  function show() { panel.style.display = 'block'; }
  function hide() { panel.style.display = 'none'; }
  window.addEventListener('message', (e) => {
    const t = e.data && e.data.type;
    if (t === '__activate_edit_mode') show();
    else if (t === '__deactivate_edit_mode') hide();
  });
  panel.querySelector('.tw-close').addEventListener('click', () => {
    hide();
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();
