/* ============================================================
   Azure IaaS Knowledge Hub — data + search/filter + interactions
   ============================================================ */

/* --- Reusable inline SVG icons (stroke-based, currentColor) --- */
const ICONS = {
  compute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M7 8h4M7 11h7"/></svg>',
  network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="M12 7.4v4.6m0 0-5 3.6m5-3.6 5 3.6"/></svg>',
  storage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',
  security: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 5 6v5c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6l-7-3Z"/><path d="m9.5 12 1.8 1.8 3.4-3.6"/></svg>',
  mgmt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 9.2 3.5 3.5 0 0 1 17 18H7Z"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="9" width="7" height="12" rx="1.5"/><rect x="14" y="3" width="7" height="18" rx="1.5"/></svg>',
  disk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.4"/><path d="M12 4v3M12 17v3"/></svg>',
  gateway: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6M4 20h16"/></svg>',
  balance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M5 9l7-6 7 6"/><path d="M5 9 2 16a3 3 0 0 0 6 0L5 9ZM19 9l-3 7a3 3 0 0 0 6 0l-3-7Z"/></svg>',
  vpn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2.5"/></svg>',
  firewall: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 14.5h18M9 4v5m6-5v5M6 9v5.5m6-5.5v5.5m6-5.5v5.5"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="4"/><path d="m11 11 9 9M17 17l2-2M14 14l2-2"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h4l2 6 4-14 2 8h6"/></svg>',
  group: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>',
  template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  dns: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
};

/* --- Categories (labels resolved via i18n) --- */
const CATEGORIES = [
  { id: 'all' }, { id: 'compute' }, { id: 'networking' },
  { id: 'storage' }, { id: 'security' }, { id: 'mgmt' },
];

/* --- Language helpers (i18n.js loads first) --- */
function L() { return (window.getLang ? window.getLang() : 'en'); }
function T(key) { return (window.i18nT ? window.i18nT(key) : key); }
function catLabel(id) { return T('cat.' + id); }
function topicTitle(t) { return (L() === 'pt' && t.tp) ? t.tp : t.t; }
function topicDesc(t)  { return (L() === 'pt' && t.dp) ? t.dp : t.d; }

/* --- Topics (Azure IaaS) --- */
const TOPICS = [
  { t: 'Azure Virtual Machines', tp: 'Máquinas Virtuais do Azure', cat: 'compute', icon: 'compute', level: 'beginner', time: 9,
    d: 'Spin up Windows or Linux servers on demand. Learn sizes, images, pricing tiers and your first deployment.',
    dp: 'Cria servidores Windows ou Linux a pedido. Aprende tamanhos, imagens, escalões de preço e a tua primeira implementação.', featured: true, href: '/article' },
  { t: 'VM Scale Sets', tp: 'Conjuntos de Dimensionamento de VMs', cat: 'compute', icon: 'scale', level: 'intermediate', time: 8,
    d: 'Run and auto-scale identical VMs behind a load balancer to handle traffic spikes automatically.',
    dp: 'Executa e dimensiona automaticamente VMs idênticas atrás de um balanceador de carga para lidar com picos de tráfego.', href: '/vmscaleset' },
  { t: 'Availability Sets & Zones', tp: 'Conjuntos e Zonas de Disponibilidade', cat: 'compute', icon: 'cloud', level: 'intermediate', time: 7,
    d: 'Keep workloads resilient by spreading VMs across fault domains and physically separate datacenters.',
    dp: 'Mantém as cargas de trabalho resilientes distribuindo VMs por domínios de falha e datacenters fisicamente separados.', href: '/availability' },
  { t: 'Managed Disks', tp: 'Discos Geridos', cat: 'storage', icon: 'disk', level: 'beginner', time: 6,
    d: 'Understand OS vs data disks, Standard HDD, SSD and Premium tiers, snapshots and encryption.',
    dp: 'Compreende discos de SO vs dados, escalões Standard HDD, SSD e Premium, snapshots e encriptação.', href: '/disks' },
  { t: 'Virtual Network (VNet)', tp: 'Rede Virtual (VNet)', cat: 'networking', icon: 'network', level: 'beginner', time: 10,
    d: 'The foundation of Azure networking — subnets, address spaces, peering and private connectivity.',
    dp: 'A base das redes no Azure — sub-redes, espaços de endereços, peering e conectividade privada.', featured: true, href: '/vnet' },
  { t: 'Network Security Groups', tp: 'Grupos de Segurança de Rede', cat: 'security', icon: 'firewall', level: 'beginner', time: 7,
    d: 'Filter inbound and outbound traffic to your subnets and NICs with simple, prioritized rules.',
    dp: 'Filtra o tráfego de entrada e saída das tuas sub-redes e NICs com regras simples e priorizadas.', href: '/nsg' },
  { t: 'Azure Load Balancer', tp: 'Balanceador de Carga do Azure', cat: 'networking', icon: 'balance', level: 'intermediate', time: 8,
    d: 'Distribute traffic across healthy VMs at layer 4 for high availability and scale.',
    dp: 'Distribui o tráfego por VMs saudáveis na camada 4 para alta disponibilidade e escala.', href: '/loadbalancer' },
  { t: 'Application Gateway', tp: 'Application Gateway', cat: 'networking', icon: 'gateway', level: 'advanced', time: 9,
    d: 'Layer-7 load balancing with SSL offload, URL routing and a built-in Web Application Firewall.',
    dp: 'Balanceamento de carga na camada 7 com SSL offload, encaminhamento por URL e Web Application Firewall integrada.', href: '/gateway' },
  { t: 'VPN & ExpressRoute', tp: 'VPN e ExpressRoute', cat: 'networking', icon: 'vpn', level: 'advanced', time: 11,
    d: 'Connect on-premises networks to Azure securely over the internet or a private circuit.',
    dp: 'Liga redes locais ao Azure de forma segura através da internet ou de um circuito privado.', href: '/vpn' },
  { t: 'Azure DNS', tp: 'Azure DNS', cat: 'networking', icon: 'dns', level: 'beginner', time: 5,
    d: 'Host your domains in Azure and resolve names for public and private workloads.',
    dp: 'Aloja os teus domínios no Azure e resolve nomes para cargas de trabalho públicas e privadas.', href: '/dns' },
  { t: 'Azure Firewall', tp: 'Azure Firewall', cat: 'security', icon: 'firewall', level: 'advanced', time: 9,
    d: 'A managed, stateful network firewall with threat intelligence to protect your VNets.',
    dp: 'Uma firewall de rede gerida e com estado, com inteligência de ameaças para proteger as tuas VNets.', href: '/firewall' },
  { t: 'Azure Key Vault', tp: 'Azure Key Vault', cat: 'security', icon: 'key', level: 'intermediate', time: 7,
    d: 'Safely store secrets, keys and certificates, and keep them out of your code and configs.',
    dp: 'Guarda segredos, chaves e certificados em segurança, mantendo-os fora do código e das configurações.', href: '/keyvault' },
  { t: 'Blob & Disk Storage', tp: 'Armazenamento Blob e de Discos', cat: 'storage', icon: 'storage', level: 'beginner', time: 8,
    d: 'Store unstructured data and VM disks. Learn access tiers, redundancy and lifecycle rules.',
    dp: 'Armazena dados não estruturados e discos de VMs. Aprende escalões de acesso, redundância e regras de ciclo de vida.', href: '/storage' },
  { t: 'Resource Groups', tp: 'Grupos de Recursos', cat: 'mgmt', icon: 'group', level: 'beginner', time: 5,
    d: 'Organize, deploy and govern related resources as a single logical unit with shared lifecycle.',
    dp: 'Organiza, implementa e gere recursos relacionados como uma única unidade lógica com ciclo de vida partilhado.', href: '/rg' },
  { t: 'ARM & Bicep Templates', tp: 'Modelos ARM e Bicep', cat: 'mgmt', icon: 'template', level: 'intermediate', time: 10,
    d: 'Define your infrastructure as code so deployments are repeatable, reviewable and reliable.',
    dp: 'Define a tua infraestrutura como código para implementações repetíveis, revisíveis e fiáveis.', href: '/arm' },
  { t: 'Azure Monitor', tp: 'Azure Monitor', cat: 'mgmt', icon: 'monitor', level: 'intermediate', time: 8,
    d: 'Collect metrics and logs, build dashboards and fire alerts to keep your stack healthy.',
    dp: 'Recolhe métricas e registos, cria dashboards e dispara alertas para manter o teu sistema saudável.', href: '/monitor' },
];

/* --- Shared reveal observer (with guaranteed fallback) --- */
const revealIO = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })
  : null;
function observeReveal(el) { if (revealIO) revealIO.observe(el); else el.classList.add('in'); }
function revealAll() { document.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); }
// Safety net: never let content stay hidden if rAF/IO is throttled or fails.
setTimeout(revealAll, 1500);
document.addEventListener('visibilitychange', () => { if (!document.hidden) revealAll(); });

/* --- Render & filter --- */
const state = { q: '', cat: 'all' };
const grid = document.getElementById('cards');
const filtersEl = document.getElementById('filters');
const resultMeta = document.getElementById('resultMeta');
const searchInput = document.getElementById('searchInput');

function countFor(catId) {
  return catId === 'all' ? TOPICS.length : TOPICS.filter(t => t.cat === catId).length;
}

function renderFilters() {
  filtersEl.innerHTML = CATEGORIES.map(c =>
    `<button class="chip" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">
       ${catLabel(c.id)} <span class="cnt">${countFor(c.id)}</span>
     </button>`
  ).join('');
  filtersEl.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => { state.cat = btn.dataset.cat; renderFilters(); renderCards(); });
  });
}

function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return text.slice(0, i) + '<mark>' + text.slice(i, i + q.length) + '</mark>' + text.slice(i + q.length);
}

function renderCards() {
  const q = state.q.trim().toLowerCase();
  const list = TOPICS.filter(t => {
    const matchCat = state.cat === 'all' || t.cat === state.cat;
    const hay = (t.t + ' ' + t.d + ' ' + (t.tp||'') + ' ' + (t.dp||'') + ' ' + t.cat + ' ' + catLabel(t.cat)).toLowerCase();
    const matchQ = !q || hay.includes(q);
    return matchCat && matchQ;
  });

  resultMeta.textContent = `${T('m.showing')} ${list.length} ${T('m.of')} ${TOPICS.length} ${T('m.topics')}`
    + (state.cat !== 'all' ? ` · ${catLabel(state.cat)}` : '')
    + (q ? ` · “${state.q.trim()}”` : '');

  if (!list.length) {
    grid.innerHTML = `<div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <p>${T('m.empty')} “${state.q.trim()}”. ${T('m.emptyhint')}</p></div>`;
    return;
  }

  grid.innerHTML = list.map(t => {
    const href = t.href || 'article.html';
    return `<a class="card reveal" href="${href}">
      <div class="ico">${ICONS[t.icon] || ICONS.cloud}</div>
      <h3>${highlight(topicTitle(t), state.q)}</h3>
      <p>${highlight(topicDesc(t), state.q)}</p>
      <div class="meta">
        <span class="tag cat">${catLabel(t.cat)}</span>
        <span class="tag">${t.time} ${T('m.minread')}</span>
        <span class="level ${t.level}" title="${T('m.' + t.level)}">
          <span class="bars"><i></i><i></i><i></i></span>${T('m.' + t.level)}
        </span>
      </div>
    </a>`;
  }).join('');

  // Reveal injected cards: stagger on first paint, observe for scroll-in.
  grid.querySelectorAll('.card').forEach((el, i) => {
    observeReveal(el);
    setTimeout(() => el.classList.add('in'), 40 + i * 30);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', e => { state.q = e.target.value; renderCards(); });
  // "/" focuses search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); }
    if (e.key === 'Escape' && document.activeElement === searchInput) { searchInput.value = ''; state.q=''; renderCards(); searchInput.blur(); }
  });
}

if (grid) { renderFilters(); renderCards(); }

/* Re-render hub when language changes */
document.addEventListener('langchange', () => { if (grid) { renderFilters(); renderCards(); } });

/* --- Scroll reveal for static sections --- */
document.querySelectorAll('.reveal:not(.card)').forEach(el => observeReveal(el));

/* --- Newsletter (demo) --- */
const cf = document.getElementById('ctaForm');
if (cf) cf.addEventListener('submit', e => {
  e.preventDefault();
  const btn = cf.querySelector('button');
  btn.textContent = T('cta.subbed');
  btn.style.background = 'linear-gradient(135deg, var(--teal), var(--teal))';
  cf.querySelector('input').value = '';
});

/* --- Year --- */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
