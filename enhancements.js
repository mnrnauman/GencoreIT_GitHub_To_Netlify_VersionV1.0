(function () {
  'use strict';

  var WHATSAPP_NUMBER = '923320000911';
  var WHATSAPP_MESSAGE = 'Hello! I visited the GENCORE IT website and would like to know more about your services.';
  var PHONE_NUMBER = '+92 332 0000911';
  var PHONE_TEL = 'tel:+923320000911';

  /* ── 1. FLOATING WHATSAPP BUTTON ── */
  function addWhatsAppButton() {
    var btn = document.createElement('a');
    btn.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Chat on WhatsApp');
    btn.id = 'wa-float-btn';
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="white"><path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.478 2.027 7.789L0 32l8.469-2.004A15.93 15.93 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm8.07 22.338c-.334.937-1.959 1.791-2.695 1.904-.69.105-1.56.149-2.515-.158-.581-.186-1.326-.435-2.28-.853-4.01-1.73-6.635-5.77-6.832-6.038-.197-.268-1.607-2.136-1.607-4.075s1.02-2.893 1.381-3.287c.362-.393.789-.492 1.052-.492.264 0 .527.002.757.014.242.012.568-.092.888.678.334.797 1.137 2.736 1.236 2.934.1.198.165.43.033.692-.133.262-.199.424-.395.654-.197.23-.414.514-.591.69-.197.196-.402.409-.173.803.23.394 1.02 1.682 2.188 2.727 1.504 1.34 2.773 1.754 3.167 1.952.394.197.625.165.856-.099.23-.263.986-1.15 1.249-1.544.263-.394.526-.329.888-.197.362.131 2.3 1.086 2.694 1.283.395.198.657.297.756.462.1.164.1.953-.233 1.89z"/></svg>';

    var style = document.createElement('style');
    style.textContent = '#wa-float-btn{position:fixed;bottom:24px;right:24px;z-index:9999;background:#25D366;border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,.5);transition:transform .2s,box-shadow .2s;text-decoration:none;}#wa-float-btn:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(37,211,102,.7);}@keyframes wa-pulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.6);}70%{box-shadow:0 0 0 12px rgba(37,211,102,0);}}#wa-float-btn{animation:wa-pulse 2s infinite;}#wa-float-tooltip{position:fixed;bottom:90px;right:24px;z-index:9998;background:#fff;color:#333;font-size:13px;font-family:Inter,sans-serif;padding:6px 12px;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,.15);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;}#wa-float-btn:hover+#wa-float-tooltip{opacity:1;}';
    document.head.appendChild(style);

    var tooltip = document.createElement('div');
    tooltip.id = 'wa-float-tooltip';
    tooltip.textContent = 'Chat with us on WhatsApp';

    document.body.appendChild(btn);
    document.body.appendChild(tooltip);
  }

  /* ── 2. PHONE NUMBER IN HEADER ── */
  function addPhoneToHeader() {
    function tryInsert() {
      var header = document.querySelector('header');
      if (!header) return false;
      if (document.getElementById('gc-header-phone')) return true;

      var phoneEl = document.createElement('a');
      phoneEl.id = 'gc-header-phone';
      phoneEl.href = PHONE_TEL;
      phoneEl.textContent = '📞 ' + PHONE_NUMBER;
      phoneEl.style.cssText = 'display:none;align-items:center;gap:6px;color:#f97316;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:.3px;margin-right:12px;white-space:nowrap;';
      phoneEl.title = 'Call us';

      var style = document.createElement('style');
      style.textContent = '@media(min-width:768px){#gc-header-phone{display:flex!important;}}';
      document.head.appendChild(style);

      var ctaBtn = header.querySelector('a[href="/contact"]');
      if (ctaBtn) {
        ctaBtn.parentNode.insertBefore(phoneEl, ctaBtn);
        return true;
      }
      return false;
    }

    if (!tryInsert()) {
      var obs = new MutationObserver(function () { if (tryInsert()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ── 3. TECH PARTNER BADGES SECTION ── */
  function addPartnerBadges() {
    var partners = [
      { name: 'AWS', color: '#FF9900', icon: 'AWS' },
      { name: 'Microsoft', color: '#00A4EF', icon: 'MS' },
      { name: 'Cisco', color: '#1BA0D7', icon: 'CSC' },
      { name: 'Fortinet', color: '#EE3124', icon: 'FTN' },
      { name: 'Dell', color: '#007DB8', icon: 'DELL' },
      { name: 'HP', color: '#0096D6', icon: 'HP' },
      { name: 'Sophos', color: '#003366', icon: 'SPH' }
    ];

    var section = document.createElement('section');
    section.id = 'gc-partners-section';
    section.innerHTML = '\
      <div class="container mx-auto px-4 md:px-6">\
        <p class="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">Technology Partners &amp; Certifications</p>\
        <div id="gc-partners-row"></div>\
      </div>';

    var row = section.querySelector('#gc-partners-row');
    partners.forEach(function (p) {
      var badge = document.createElement('div');
      badge.className = 'gc-partner-badge';
      badge.innerHTML = '<span class="gc-badge-icon" style="background:' + p.color + '15;color:' + p.color + ';border:1.5px solid ' + p.color + '40;">' + p.icon + '</span><span class="gc-badge-name">' + p.name + '</span>';
      row.appendChild(badge);
    });

    var style = document.createElement('style');
    style.textContent = '\
      #gc-partners-section{padding:48px 0 32px;background:#0a0f2c;border-top:1px solid rgba(249,115,22,.15);}\
      #gc-partners-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:20px;}\
      .gc-partner-badge{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:90px;}\
      .gc-badge-icon{display:flex;align-items:center;justify-content:center;width:72px;height:48px;border-radius:10px;font-weight:800;font-size:13px;letter-spacing:.5px;font-family:Poppins,sans-serif;transition:transform .2s,box-shadow .2s;}\
      .gc-partner-badge:hover .gc-badge-icon{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.3);}\
      .gc-badge-name{font-size:11px;color:#9ca3af;font-weight:500;text-align:center;}\
      @media(max-width:479px){#gc-partners-row{gap:14px;}.gc-badge-icon{width:60px;height:40px;font-size:11px;}}';
    document.head.appendChild(style);

    function tryInsert() {
      var heroSection = document.querySelector('section');
      if (!heroSection) return false;
      if (document.getElementById('gc-partners-section')) return true;
      heroSection.parentNode.insertBefore(section, heroSection.nextSibling);
      return true;
    }

    if (!tryInsert()) {
      var obs = new MutationObserver(function () { if (tryInsert()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ── 4. CLIENTS SECTION ── */
  function addClientsSection() {
    var clients = [
      { name: 'Reportage', abbr: 'REP', color: '#c8a96e' },
      { name: 'Empire Pakistan', abbr: 'EMP', color: '#8b5cf6' },
      { name: '1Link', abbr: '1LK', color: '#10b981' },
      { name: 'Good Luck Network', abbr: 'GLN', color: '#f59e0b' }
    ];

    var section = document.createElement('section');
    section.id = 'gc-clients-section';
    section.innerHTML = '\
      <div class="container mx-auto px-4 md:px-6 text-center">\
        <p class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">Trusted by Leading Businesses</p>\
        <div id="gc-clients-row"></div>\
      </div>';

    var row = section.querySelector('#gc-clients-row');
    clients.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'gc-client-card';
      card.innerHTML = '\
        <div class="gc-client-logo" style="background:' + c.color + '15;border-color:' + c.color + '30;">\
          <span style="color:' + c.color + ';font-weight:800;font-size:15px;font-family:Poppins,sans-serif;">' + c.abbr + '</span>\
        </div>\
        <span class="gc-client-name">' + c.name + '</span>';
      row.appendChild(card);
    });

    var style = document.createElement('style');
    style.textContent = '\
      #gc-clients-section{padding:32px 0 56px;background:#0a0f2c;}\
      #gc-clients-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:28px;}\
      .gc-client-card{display:flex;flex-direction:column;align-items:center;gap:10px;}\
      .gc-client-logo{display:flex;align-items:center;justify-content:center;width:100px;height:64px;border-radius:12px;border:1.5px solid;transition:transform .2s,box-shadow .2s;}\
      .gc-client-card:hover .gc-client-logo{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.3);}\
      .gc-client-name{font-size:12px;color:#9ca3af;font-weight:500;text-align:center;max-width:100px;}\
      @media(max-width:479px){.gc-client-logo{width:80px;height:52px;}}';
    document.head.appendChild(style);

    function tryInsert() {
      var partnersSection = document.getElementById('gc-partners-section');
      if (!partnersSection) return false;
      if (document.getElementById('gc-clients-section')) return true;
      partnersSection.parentNode.insertBefore(section, partnersSection.nextSibling);
      return true;
    }

    setTimeout(function () {
      if (!tryInsert()) {
        var obs = new MutationObserver(function () { if (tryInsert()) obs.disconnect(); });
        obs.observe(document.body, { childList: true, subtree: true });
      }
    }, 1200);
  }

  /* ── 5. "WHY CHOOSE US" STATS BAR (if not already present) ── */
  function addStatsBanner() {
    var stats = [
      { number: '10+', label: 'Years Experience' },
      { number: '200+', label: 'Projects Delivered' },
      { number: '50+', label: 'Enterprise Clients' },
      { number: '24/7', label: 'Support Available' }
    ];

    if (document.querySelector('[data-gc-stats]')) return;

    var bar = document.createElement('div');
    bar.setAttribute('data-gc-stats', '1');
    bar.id = 'gc-stats-bar';
    stats.forEach(function (s) {
      var item = document.createElement('div');
      item.className = 'gc-stat-item';
      item.innerHTML = '<span class="gc-stat-num">' + s.number + '</span><span class="gc-stat-lbl">' + s.label + '</span>';
      bar.appendChild(item);
    });

    var style = document.createElement('style');
    style.textContent = '\
      #gc-stats-bar{display:flex;flex-wrap:wrap;justify-content:center;gap:0;background:linear-gradient(90deg,#0a0f2c 0%,#111827 100%);border-top:1px solid rgba(249,115,22,.2);border-bottom:1px solid rgba(249,115,22,.2);}\
      .gc-stat-item{flex:1 1 140px;display:flex;flex-direction:column;align-items:center;padding:28px 20px;border-right:1px solid rgba(249,115,22,.1);}\
      .gc-stat-item:last-child{border-right:none;}\
      .gc-stat-num{font-family:Poppins,sans-serif;font-size:2rem;font-weight:800;color:#f97316;line-height:1;}\
      .gc-stat-lbl{font-size:13px;color:#9ca3af;margin-top:6px;text-align:center;}\
      @media(max-width:479px){.gc-stat-item{flex:1 1 45%;border-right:none;border-bottom:1px solid rgba(249,115,22,.1);padding:20px 12px;}}';
    document.head.appendChild(style);

    function tryInsert() {
      var clientsSection = document.getElementById('gc-clients-section');
      if (!clientsSection) return false;
      if (document.getElementById('gc-stats-bar')) return true;
      clientsSection.parentNode.insertBefore(bar, clientsSection.nextSibling);
      return true;
    }

    setTimeout(function () {
      if (!tryInsert()) {
        var obs = new MutationObserver(function () { if (tryInsert()) obs.disconnect(); });
        obs.observe(document.body, { childList: true, subtree: true });
      }
    }, 1800);
  }

  /* ── INIT ── */
  function init() {
    addWhatsAppButton();
    addPhoneToHeader();
    addPartnerBadges();
    addClientsSection();
    addStatsBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
