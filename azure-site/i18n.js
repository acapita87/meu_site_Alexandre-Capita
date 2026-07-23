/* ============================================================
   i18n — EN / PT (Português europeu) site-wide language toggle
   Shared by index.html + article.html
   ============================================================ */
(function () {
  const STORE = 'ac-azure-lang';
  let lang = 'en';
  try { const s = localStorage.getItem(STORE); if (s === 'pt' || s === 'en') lang = s; } catch (e) {}

  const DICT = {
    /* ---------- shared / nav ---------- */
    'nav.topics':   { en: 'Topics',          pt: 'Tópicos' },
    'nav.path':     { en: 'Learning path',   pt: 'Percurso' },
    'nav.sample':   { en: 'Sample article',  pt: 'Artigo de exemplo' },
    'nav.about':    { en: 'About',           pt: 'Sobre' },
    'nav.cta':      { en: 'Browse topics',   pt: 'Ver tópicos' },

    /* ---------- hero ---------- */
    'hero.eyebrow': { en: 'Azure IaaS · explained simply', pt: 'Azure IaaS · explicado de forma simples' },
    'hero.h1':      { en: 'Learn the <span class="grad">cloud infrastructure</span> that runs the world.',
                      pt: 'Aprende a <span class="grad">infraestrutura cloud</span> que move o mundo.' },
    'hero.lead':    { en: 'Clear, beginner-friendly notes on Azure Infrastructure as a Service — virtual machines, networking, storage and security — written and curated by Alexandre Capita.',
                      pt: 'Notas claras e acessíveis sobre Azure Infrastructure as a Service — máquinas virtuais, redes, armazenamento e segurança — escritas e organizadas por Alexandre Capita.' },
    'hero.explore': { en: 'Explore the hub',  pt: 'Explorar o hub' },
    'hero.sample':  { en: 'Read a sample',    pt: 'Ler um exemplo' },
    'hero.stat1':   { en: 'In-depth topics',  pt: 'Tópicos detalhados' },
    'hero.stat2':   { en: 'Core categories',  pt: 'Categorias principais' },
    'hero.stat3':   { en: 'Beginner-friendly',pt: 'Para iniciantes' },

    /* ---------- hub ---------- */
    'hub.tag':      { en: '// The knowledge hub', pt: '// O hub de conhecimento' },
    'hub.h2':       { en: 'Find exactly what you want to learn.', pt: 'Encontra exatamente o que queres aprender.' },
    'hub.p':        { en: 'Search by keyword or filter by category. Every topic is a self-contained, plain-English guide built for people new to the cloud.',
                      pt: 'Pesquisa por palavra-chave ou filtra por categoria. Cada tópico é um guia autónomo e em linguagem simples, feito para quem está a começar na cloud.' },
    'hub.search':   { en: 'Search topics — e.g. “virtual network”, “firewall”, “scale”…',
                      pt: 'Pesquisar tópicos — ex.: “rede virtual”, “firewall”, “escala”…' },

    /* ---------- learning path ---------- */
    'path.tag':     { en: '// Where to start', pt: '// Por onde começar' },
    'path.h2':      { en: 'A clear path from zero to confident.', pt: 'Um percurso claro do zero à confiança.' },
    'path.p':       { en: 'New to Azure? Follow these four steps in order — each one builds on the last.',
                      pt: 'Novo no Azure? Segue estes quatro passos por ordem — cada um assenta no anterior.' },
    'path.s1h':     { en: 'Set the foundations', pt: 'Definir as bases' },
    'path.s1p':     { en: 'Subscriptions, Resource Groups and how Azure organizes everything you build.',
                      pt: 'Subscrições, Grupos de Recursos e como o Azure organiza tudo o que constróis.' },
    'path.s2h':     { en: 'Launch compute', pt: 'Lançar computação' },
    'path.s2p':     { en: 'Create your first Virtual Machine and understand sizes, images and disks.',
                      pt: 'Cria a tua primeira Máquina Virtual e compreende tamanhos, imagens e discos.' },
    'path.s3h':     { en: 'Connect & secure', pt: 'Ligar e proteger' },
    'path.s3p':     { en: 'Wire up Virtual Networks, NSGs and load balancing to make it reachable and safe.',
                      pt: 'Liga Redes Virtuais, NSGs e balanceamento de carga para a tornares acessível e segura.' },
    'path.s4h':     { en: 'Automate & monitor', pt: 'Automatizar e monitorizar' },
    'path.s4p':     { en: 'Use ARM/Bicep templates and Azure Monitor to keep it repeatable and healthy.',
                      pt: 'Usa modelos ARM/Bicep e o Azure Monitor para manteres tudo repetível e saudável.' },

    /* ---------- cta ---------- */
    'cta.h2':       { en: 'Get new Azure notes in your inbox.', pt: 'Recebe novas notas de Azure no teu email.' },
    'cta.p':        { en: 'One short, practical email when a new topic drops. No spam, no fluff — just clear cloud knowledge from Alexandre Capita. Unsubscribe anytime.',
                      pt: 'Um email curto e prático sempre que sai um novo tópico. Sem spam, sem enrolação — apenas conhecimento claro de cloud por Alexandre Capita. Cancela quando quiseres.' },
    'cta.btn':      { en: 'Subscribe', pt: 'Subscrever' },
    'cta.subbed':   { en: 'Subscribed ✓', pt: 'Subscrito ✓' },

    /* ---------- footer ---------- */
    'footer.bio':   { en: 'A personal knowledge hub documenting my journey through Azure Infrastructure as a Service — written to help other beginners learn faster.',
                      pt: 'Um hub de conhecimento pessoal que documenta o meu percurso pelo Azure Infrastructure as a Service — escrito para ajudar outros iniciantes a aprender mais depressa.' },
    'footer.cat':   { en: 'Categories', pt: 'Categorias' },
    'footer.explore':{ en: 'Explore',   pt: 'Explorar' },
    'footer.connect':{ en: 'Connect',   pt: 'Liga-te' },
    'footer.exp1':  { en: 'All topics', pt: 'Todos os tópicos' },
    'footer.copy':  { en: '© <span id="year">{year}</span> Alexandre Capita. Built as a personal Azure knowledge hub.',
                      pt: '© <span id="year">{year}</span> Alexandre Capita. Criado como hub de conhecimento pessoal de Azure.' },
    'footer.notaffil':{ en: 'Not affiliated with Microsoft.', pt: 'Sem afiliação com a Microsoft.' },
    'footer.back':  { en: '← Back to all topics', pt: '← Voltar a todos os tópicos' },

    /* ---------- categories (used by app.js + footer) ---------- */
    'cat.all':        { en: 'All topics',          pt: 'Todos os tópicos' },
    'cat.compute':    { en: 'Compute',             pt: 'Computação' },
    'cat.networking': { en: 'Networking',          pt: 'Redes' },
    'cat.storage':    { en: 'Storage',             pt: 'Armazenamento' },
    'cat.security':   { en: 'Security & Identity',  pt: 'Segurança e Identidade' },
    'cat.mgmt':       { en: 'Management',           pt: 'Gestão' },

    /* ---------- hub dynamic strings (app.js) ---------- */
    'm.showing':    { en: 'Showing', pt: 'A mostrar' },
    'm.of':         { en: 'of',      pt: 'de' },
    'm.topics':     { en: 'topics',  pt: 'tópicos' },
    'm.minread':    { en: 'min read',pt: 'min de leitura' },
    'm.beginner':   { en: 'Beginner',    pt: 'Iniciante' },
    'm.intermediate':{ en: 'Intermediate',pt: 'Intermédio' },
    'm.advanced':   { en: 'Advanced',    pt: 'Avançado' },
    'm.empty':      { en: 'No topics match', pt: 'Nenhum tópico corresponde a' },
    'm.emptyhint':  { en: 'Try another keyword or category.', pt: 'Tenta outra palavra-chave ou categoria.' },

    /* ---------- article ---------- */
    'a.title':      { en: "Azure Virtual Machines — a beginner's guide · Alexandre Capita",
                      pt: 'Máquinas Virtuais do Azure — guia para iniciantes · Alexandre Capita' },
    'a.crumb_home': { en: 'Home', pt: 'Início' },
    'a.crumb_cat':  { en: 'Compute', pt: 'Computação' },
    'a.crumb_now':  { en: 'Virtual Machines', pt: 'Máquinas Virtuais' },
    'a.badge_read': { en: '9 min read', pt: '9 min de leitura' },
    'a.h1':         { en: 'Azure Virtual Machines, explained from scratch',
                      pt: 'Máquinas Virtuais do Azure, explicadas do zero' },
    'a.standfirst': { en: "A Virtual Machine is the most direct way to run your own server in the cloud. Here's what that really means, what it costs, and how to launch your first one in minutes.",
                      pt: 'Uma Máquina Virtual é a forma mais direta de executar o teu próprio servidor na cloud. Eis o que isso significa realmente, quanto custa e como lançar a primeira em minutos.' },
    'a.updated':    { en: 'Updated June 2026 · Azure IaaS', pt: 'Atualizado em junho de 2026 · Azure IaaS' },
    'a.toc_title':  { en: 'On this page', pt: 'Nesta página' },
    'a.toc1':       { en: 'What is a VM?',      pt: 'O que é uma VM?' },
    'a.toc2':       { en: 'Anatomy of a VM',    pt: 'Anatomia de uma VM' },
    'a.toc3':       { en: 'Sizes & pricing',    pt: 'Tamanhos e preços' },
    'a.toc4':       { en: 'Deploy your first VM',pt: 'Implementar a primeira VM' },
    'a.toc5':       { en: 'Beginner tips',      pt: 'Dicas para iniciantes' },

    'a.h_what':     { en: 'What is a Virtual Machine?', pt: 'O que é uma Máquina Virtual?' },
    'a.p_what1':    { en: "An Azure <strong>Virtual Machine (VM)</strong> is a computer that lives in Microsoft's datacenters instead of on your desk. You choose how much CPU, memory and disk it has, pick an operating system, and Azure gives you a fully working server you can log into within minutes — and shut down just as quickly.",
                      pt: 'Uma <strong>Máquina Virtual (VM)</strong> do Azure é um computador que vive nos datacenters da Microsoft em vez de na tua secretária. Escolhes quanto CPU, memória e disco tem, escolhes um sistema operativo, e o Azure dá-te um servidor totalmente funcional onde entras em minutos — e desligas com a mesma rapidez.' },
    'a.p_what2':    { en: "This model is called <strong>Infrastructure as a Service (IaaS)</strong>: Microsoft manages the physical hardware, power, cooling and networking, while <em>you</em> manage the operating system and everything you install on top. It's the cloud building block that feels most like a traditional server, which makes it the perfect place to start.",
                      pt: 'Este modelo chama-se <strong>Infrastructure as a Service (IaaS)</strong>: a Microsoft gere o hardware físico, a energia, a refrigeração e a rede, enquanto <em>tu</em> geres o sistema operativo e tudo o que instalas por cima. É o bloco da cloud que mais se parece com um servidor tradicional, o que o torna o ponto de partida perfeito.' },
    'a.callout1':   { en: '<b>Analogy:</b> Renting a VM is like renting an apartment instead of buying a house. You get a space that\'s yours to use, you pay only while you live there, and the landlord (Azure) handles the building itself.',
                      pt: '<b>Analogia:</b> Alugar uma VM é como arrendar um apartamento em vez de comprar uma casa. Tens um espaço teu para usar, pagas só enquanto lá vives, e o senhorio (Azure) trata do edifício.' },

    'a.h_anatomy':  { en: 'The anatomy of a VM', pt: 'A anatomia de uma VM' },
    'a.p_anatomy':  { en: 'Every VM you create is actually a small bundle of resources working together. Understanding these pieces makes everything else in Azure click into place:',
                      pt: 'Cada VM que crias é, na verdade, um pequeno conjunto de recursos a trabalhar em conjunto. Compreender estas peças faz com que tudo o resto no Azure encaixe:' },
    'a.li1':        { en: '<strong>Compute</strong> — the virtual CPU and RAM, defined by the VM <em>size</em>.',
                      pt: '<strong>Computação</strong> — o CPU e a RAM virtuais, definidos pelo <em>tamanho</em> da VM.' },
    'a.li2':        { en: '<strong>OS &amp; data disks</strong> — managed disks that store your operating system and files.',
                      pt: '<strong>Discos de SO e dados</strong> — discos geridos que guardam o sistema operativo e os ficheiros.' },
    'a.li3':        { en: '<strong>Network interface (NIC)</strong> — connects the VM to a <a href="index.html#hub" class="inline">Virtual Network</a>.',
                      pt: '<strong>Interface de rede (NIC)</strong> — liga a VM a uma <a href="index.html#hub" class="inline">Rede Virtual</a>.' },
    'a.li4':        { en: '<strong>Public IP</strong> (optional) — makes the VM reachable from the internet.',
                      pt: '<strong>IP público</strong> (opcional) — torna a VM acessível a partir da internet.' },
    'a.li5':        { en: '<strong>Network Security Group</strong> — the firewall rules controlling who can connect.',
                      pt: '<strong>Grupo de Segurança de Rede</strong> — as regras de firewall que controlam quem se pode ligar.' },
    'a.imgph':      { en: '// diagram placeholder — VM resource bundle (drop your screenshot here)',
                      pt: '// imagem por colocar — conjunto de recursos da VM (coloca aqui a tua captura)' },

    'a.h_sizes':    { en: 'Sizes & pricing', pt: 'Tamanhos e preços' },
    'a.p_sizes':    { en: "VM <strong>sizes</strong> are grouped into families optimized for different jobs. You don't need to memorize them — just know the general shape:",
                      pt: 'Os <strong>tamanhos</strong> de VM estão agrupados em famílias otimizadas para tarefas diferentes. Não precisas de os decorar — basta conheceres a ideia geral:' },
    'a.th1':        { en: 'Family',   pt: 'Família' },
    'a.th2':        { en: 'Best for', pt: 'Melhor para' },
    'a.th3':        { en: 'Example',  pt: 'Exemplo' },
    'a.td1':        { en: 'Burstable, low-cost dev/test', pt: 'Burstable, dev/teste de baixo custo' },
    'a.td2':        { en: 'General-purpose production',   pt: 'Produção de uso geral' },
    'a.td3':        { en: 'Compute-heavy workloads',       pt: 'Cargas intensivas em computação' },
    'a.td4':        { en: 'Memory-hungry apps',            pt: 'Aplicações com muita memória' },
    'a.p_billing':  { en: "You're billed <strong>per second</strong> while a VM is running. The single biggest way to save money as a beginner: <strong>stop and deallocate</strong> VMs you aren't using — you stop paying for compute the moment you do.",
                      pt: 'És faturado <strong>ao segundo</strong> enquanto a VM está ligada. A maior forma de poupar como iniciante: <strong>parar e desalocar</strong> as VMs que não estás a usar — deixas de pagar a computação no momento em que o fazes.' },
    'a.callout_warn':{ en: '<b>Watch out:</b> stopping a VM from <em>inside</em> the OS still bills you. Always “Stop (deallocate)” from the Azure Portal or CLI to actually release the hardware.',
                      pt: '<b>Atenção:</b> parar uma VM a partir de <em>dentro</em> do SO continua a faturar. Usa sempre “Parar (desalocar)” no Portal do Azure ou na CLI para libertar mesmo o hardware.' },

    'a.h_deploy':   { en: 'Deploy your first VM', pt: 'Implementa a tua primeira VM' },
    'a.p_deploy':   { en: 'You can create a VM in the Portal with a few clicks, but the cleanest way to learn is the <strong>Azure CLI</strong> — one command captures every decision you just read about:',
                      pt: 'Podes criar uma VM no Portal com alguns cliques, mas a forma mais limpa de aprender é a <strong>Azure CLI</strong> — um comando reúne todas as decisões que acabaste de ler:' },
    'a.p_connect':  { en: "That's it. In about a minute Azure returns the VM's public IP address, and you can connect:",
                      pt: 'É só isto. Em cerca de um minuto o Azure devolve o endereço IP público da VM e podes ligar-te:' },

    'a.h_tips':     { en: 'Beginner tips that save real money', pt: 'Dicas para iniciantes que poupam dinheiro a sério' },
    'a.tip1':       { en: "<strong>Use B-series for learning.</strong> They're cheap, burstable, and perfect for experiments.",
                      pt: '<strong>Usa a série B para aprender.</strong> São baratas, burstable e perfeitas para experiências.' },
    'a.tip2':       { en: "<strong>Deallocate when idle.</strong> Set an auto-shutdown schedule in the VM's settings.",
                      pt: '<strong>Desaloca quando estiver parada.</strong> Define um agendamento de encerramento automático nas definições da VM.' },
    'a.tip3':       { en: '<strong>Tag everything.</strong> Tags make it easy to find and clean up resources later.',
                      pt: '<strong>Etiqueta tudo.</strong> As etiquetas facilitam encontrar e limpar recursos mais tarde.' },
    'a.tip4':       { en: '<strong>Delete the whole resource group</strong> when a lab is done — it removes the VM, disk, NIC and IP in one action.',
                      pt: '<strong>Apaga o grupo de recursos inteiro</strong> quando terminares um laboratório — remove a VM, o disco, a NIC e o IP numa só ação.' },
    'a.callout_next':{ en: "<b>Next step:</b> a VM alone isn't very useful until it's connected and protected. Continue with Virtual Networks and Network Security Groups to make yours reachable and safe.",
                      pt: '<b>Próximo passo:</b> uma VM sozinha não é muito útil até estar ligada e protegida. Continua com Redes Virtuais e Grupos de Segurança de Rede para tornares a tua acessível e segura.' },
    'a.nextlabel':  { en: 'Continue the learning path', pt: 'Continua o percurso de aprendizagem' },
    'a.nexth':      { en: 'Virtual Network (VNet)', pt: 'Rede Virtual (VNet)' },
    'a.nextp':      { en: 'The foundation of all Azure networking — subnets, peering and private connectivity.',
                      pt: 'A base de todas as redes no Azure — sub-redes, peering e conectividade privada.' },
  };

  function t(key) {
    const e = DICT[key];
    if (!e) return key;
    let v = (e[lang] != null ? e[lang] : e.en);
    return v.replace('{year}', new Date().getFullYear());
  }

  function applyTranslations(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    root.querySelectorAll('[data-i18n-ph]').forEach(el => { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) document.title = t(titleKey);
  }

  /* expose for app.js */
  window.getLang = () => lang;
  window.i18nT = t;

  function setLang(next) {
    lang = (next === 'pt') ? 'pt' : 'en';
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    document.documentElement.lang = lang;
    applyTranslations();
    updateToggle();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }
  window.setLang = setLang;

  /* ---- Build the EN/PT toggle into the nav ---- */
  let toggleEl = null;
  function buildToggle() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner) return;
    toggleEl = document.createElement('div');
    toggleEl.className = 'lang-toggle';
    toggleEl.innerHTML = `
      <button data-lang="en" aria-label="English">EN</button>
      <button data-lang="pt" aria-label="Português">PT</button>`;
    const cta = navInner.querySelector('.nav-cta');
    navInner.insertBefore(toggleEl, cta || null);
    toggleEl.querySelectorAll('button').forEach(b =>
      b.addEventListener('click', () => setLang(b.dataset.lang)));

    const style = document.createElement('style');
    style.textContent = `
      .lang-toggle { display: inline-flex; gap: 2px; padding: 3px; border-radius: 999px;
        background: rgba(122,156,224,.08); border: 1px solid var(--line); margin-left: 4px; }
      .lang-toggle button { font-family: var(--font-mono); font-size: 12px; font-weight: 500;
        letter-spacing: .04em; color: var(--text-dim); background: none; border: 0; cursor: pointer;
        padding: 6px 11px; border-radius: 999px; transition: all .18s; }
      .lang-toggle button:hover { color: var(--text-mid); }
      .lang-toggle button[aria-pressed="true"] { color: #04122e;
        background: linear-gradient(135deg, var(--teal), var(--blue-bright)); }
      @media (max-width: 620px) { .lang-toggle { margin-left: 0; } }
    `;
    document.head.appendChild(style);
  }
  function updateToggle() {
    if (!toggleEl) return;
    toggleEl.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.lang === lang));
  }

  /* init */
  document.documentElement.lang = lang;
  buildToggle();
  updateToggle();
  applyTranslations();
})();
