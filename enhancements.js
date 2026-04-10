(function () {
  'use strict';

  var WHATSAPP_NUMBER = '923320000911';
  var WHATSAPP_MESSAGE = 'Hello! I visited the GENCORE IT website and would like to know more about your services.';
  var PHONE_NUMBER = '+92 332 0000911';
  var PHONE_TEL = 'tel:+923320000911';

  /* ════════════════════════════════════
     1. FLOATING WHATSAPP BUTTON
  ════════════════════════════════════ */
  function addWhatsAppButton() {
    if (document.getElementById('wa-float-btn')) return;
    var btn = document.createElement('a');
    btn.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.id = 'wa-float-btn';
    btn.setAttribute('aria-label', 'Chat on WhatsApp');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="26" height="26" fill="white"><path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.478 2.027 7.789L0 32l8.469-2.004A15.93 15.93 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm8.07 22.338c-.334.937-1.959 1.791-2.695 1.904-.69.105-1.56.149-2.515-.158-.581-.186-1.326-.435-2.28-.853-4.01-1.73-6.635-5.77-6.832-6.038-.197-.268-1.607-2.136-1.607-4.075s1.02-2.893 1.381-3.287c.362-.393.789-.492 1.052-.492.264 0 .527.002.757.014.242.012.568-.092.888.678.334.797 1.137 2.736 1.236 2.934.1.198.165.43.033.692-.133.262-.199.424-.395.654-.197.23-.414.514-.591.69-.197.196-.402.409-.173.803.23.394 1.02 1.682 2.188 2.727 1.504 1.34 2.773 1.754 3.167 1.952.394.197.625.165.856-.099.23-.263.986-1.15 1.249-1.544.263-.394.526-.329.888-.197.362.131 2.3 1.086 2.694 1.283.395.198.657.297.756.462.1.164.1.953-.233 1.89z"/></svg>';
    document.head.insertAdjacentHTML('beforeend', '<style>#wa-float-btn{position:fixed;bottom:24px;right:24px;z-index:9999;background:#25D366;border-radius:50%;width:58px;height:58px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,.5);text-decoration:none;animation:waPulse 2s infinite}@keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 0 0 14px rgba(37,211,102,0)}}#wa-float-btn:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(37,211,102,.7)}</style>');
    document.body.appendChild(btn);
  }

  /* ════════════════════════════════════
     2. PHONE IN HEADER
  ════════════════════════════════════ */
  function addPhoneToHeader() {
    if (document.getElementById('gc-phone')) return;
    var header = document.querySelector('header');
    if (!header) return;

    var el = document.createElement('a');
    el.id = 'gc-phone';
    el.href = PHONE_TEL;
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> ' + PHONE_NUMBER;
    document.head.insertAdjacentHTML('beforeend', '<style>#gc-phone{display:none;align-items:center;gap:6px;color:#f97316;font-size:13px;font-weight:600;text-decoration:none;margin-right:10px;white-space:nowrap;transition:opacity .2s}#gc-phone:hover{opacity:.8}@media(min-width:768px){#gc-phone{display:flex!important}}</style>');

    var cta = header.querySelector('a[href="/contact"]');
    if (cta && cta.parentNode) {
      cta.parentNode.insertBefore(el, cta);
    }
  }

  /* ════════════════════════════════════
     3 + 4 + 5. PARTNER BADGES, CLIENTS, STATS
     Injected right before the first py-20 section
     (which is the Services section after the hero)
  ════════════════════════════════════ */
  function buildSections() {
    var html = '\
<div id="gc-trust-block" style="background:#080d1f;border-top:1px solid rgba(249,115,22,.12);border-bottom:1px solid rgba(249,115,22,.12);">\
\
  <!-- STATS BAR -->\
  <div style="display:flex;flex-wrap:wrap;justify-content:center;border-bottom:1px solid rgba(249,115,22,.08);">\
    <div class="gc-stat"><span class="gc-stat-n">10+</span><span class="gc-stat-l">Years Experience</span></div>\
    <div class="gc-stat"><span class="gc-stat-n">200+</span><span class="gc-stat-l">Projects Delivered</span></div>\
    <div class="gc-stat"><span class="gc-stat-n">50+</span><span class="gc-stat-l">Enterprise Clients</span></div>\
    <div class="gc-stat"><span class="gc-stat-n">24/7</span><span class="gc-stat-l">Support Available</span></div>\
  </div>\
\
  <!-- TECH PARTNERS -->\
  <div style="padding:40px 24px 28px;text-align:center;">\
    <p class="gc-section-label">Technology Partners &amp; Certifications</p>\
    <div class="gc-badges-row">\
      <div class="gc-badge" style="--c:#FF9900"><span class="gc-badge-icon" style="background:#FF990018;border-color:#FF990050;color:#FF9900">AWS</span><span class="gc-badge-name">AWS</span></div>\
      <div class="gc-badge" style="--c:#00A4EF"><span class="gc-badge-icon" style="background:#00A4EF18;border-color:#00A4EF50;color:#00A4EF">MS</span><span class="gc-badge-name">Microsoft</span></div>\
      <div class="gc-badge" style="--c:#1BA0D7"><span class="gc-badge-icon" style="background:#1BA0D718;border-color:#1BA0D750;color:#1BA0D7">CSC</span><span class="gc-badge-name">Cisco</span></div>\
      <div class="gc-badge" style="--c:#EE3124"><span class="gc-badge-icon" style="background:#EE312418;border-color:#EE312450;color:#EE3124">FTN</span><span class="gc-badge-name">Fortinet</span></div>\
      <div class="gc-badge" style="--c:#007DB8"><span class="gc-badge-icon" style="background:#007DB818;border-color:#007DB850;color:#007DB8">DELL</span><span class="gc-badge-name">Dell</span></div>\
      <div class="gc-badge" style="--c:#0096D6"><span class="gc-badge-icon" style="background:#0096D618;border-color:#0096D650;color:#0096D6">HP</span><span class="gc-badge-name">HP</span></div>\
      <div class="gc-badge" style="--c:#1d4ed8"><span class="gc-badge-icon" style="background:#1d4ed818;border-color:#1d4ed850;color:#1d4ed8">SPH</span><span class="gc-badge-name">Sophos</span></div>\
    </div>\
  </div>\
\
  <!-- CLIENTS -->\
  <div style="padding:4px 24px 44px;text-align:center;">\
    <p class="gc-section-label">Trusted by Leading Businesses</p>\
    <div class="gc-clients-row">\
      <div class="gc-client"><div class="gc-client-box" style="background:#c8a96e18;border-color:#c8a96e40"><span style="color:#c8a96e;font-weight:800;font-size:15px;font-family:Poppins,sans-serif">REP</span></div><span class="gc-client-name">Reportage</span></div>\
      <div class="gc-client"><div class="gc-client-box" style="background:#8b5cf618;border-color:#8b5cf640"><span style="color:#8b5cf6;font-weight:800;font-size:15px;font-family:Poppins,sans-serif">EMP</span></div><span class="gc-client-name">Empire Pakistan</span></div>\
      <div class="gc-client"><div class="gc-client-box" style="background:#10b98118;border-color:#10b98140"><span style="color:#10b981;font-weight:800;font-size:15px;font-family:Poppins,sans-serif">1LK</span></div><span class="gc-client-name">1Link</span></div>\
      <div class="gc-client"><div class="gc-client-box" style="background:#f59e0b18;border-color:#f59e0b40"><span style="color:#f59e0b;font-weight:800;font-size:15px;font-family:Poppins,sans-serif">GLN</span></div><span class="gc-client-name">Good Luck Network</span></div>\
    </div>\
  </div>\
\
</div>';

    var styles = '\
<style>\
.gc-stat{flex:1 1 140px;display:flex;flex-direction:column;align-items:center;padding:24px 16px;border-right:1px solid rgba(249,115,22,.08)}\
.gc-stat:last-child{border-right:none}\
.gc-stat-n{font-family:Poppins,sans-serif;font-size:2rem;font-weight:800;color:#f97316;line-height:1}\
.gc-stat-l{font-size:12px;color:#9ca3af;margin-top:6px;text-align:center}\
.gc-section-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#6b7280;margin:0 0 28px}\
.gc-badges-row{display:flex;flex-wrap:wrap;justify-content:center;gap:18px}\
.gc-badge{display:flex;flex-direction:column;align-items:center;gap:8px}\
.gc-badge-icon{display:flex;align-items:center;justify-content:center;width:76px;height:50px;border-radius:10px;font-weight:800;font-size:12px;letter-spacing:.5px;border:1.5px solid;font-family:Poppins,sans-serif;transition:transform .2s,box-shadow .2s;cursor:default}\
.gc-badge:hover .gc-badge-icon{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.4)}\
.gc-badge-name{font-size:11px;color:#9ca3af;font-weight:500}\
.gc-clients-row{display:flex;flex-wrap:wrap;justify-content:center;gap:28px}\
.gc-client{display:flex;flex-direction:column;align-items:center;gap:10px}\
.gc-client-box{display:flex;align-items:center;justify-content:center;width:104px;height:66px;border-radius:12px;border:1.5px solid;transition:transform .2s,box-shadow .2s;cursor:default}\
.gc-client:hover .gc-client-box{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.4)}\
.gc-client-name{font-size:12px;color:#9ca3af;font-weight:500;text-align:center;max-width:110px}\
@media(max-width:479px){.gc-stat{flex:1 1 45%;border-right:none;padding:18px 10px}.gc-badge-icon{width:62px;height:44px;font-size:11px}.gc-client-box{width:88px;height:56px}}\
</style>';

    document.head.insertAdjacentHTML('beforeend', styles);

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    return wrapper.firstElementChild;
  }

  function injectTrustBlock() {
    if (document.getElementById('gc-trust-block')) return true;

    /* Target: the first section inside #root that has "py-20" in its class
       This is the Services section that comes right after the Hero */
    var root = document.getElementById('root');
    if (!root) return false;

    var allSections = root.querySelectorAll('section');
    var targetSection = null;
    var py20Count = 0;
    for (var i = 0; i < allSections.length; i++) {
      if (allSections[i].className && allSections[i].className.indexOf('py-20') !== -1) {
        py20Count++;
        /* Skip the FIRST py-20 section — that is the hero.
           Insert before the SECOND py-20 section (Services). */
        if (py20Count === 2) {
          targetSection = allSections[i];
          break;
        }
      }
    }

    if (!targetSection) return false;

    var block = buildSections();
    targetSection.parentNode.insertBefore(block, targetSection);
    return true;
  }

  /* ════════════════════════════════════
     POLLING — keeps retrying until React renders
  ════════════════════════════════════ */
  function pollUntilReady() {
    /* Phone + WhatsApp can run immediately */
    addWhatsAppButton();

    var headerDone = false;
    var trustDone = false;
    var attempts = 0;
    var maxAttempts = 60; /* 6 seconds max */

    var timer = setInterval(function () {
      attempts++;

      if (!headerDone) {
        var header = document.querySelector('header');
        if (header) {
          addPhoneToHeader();
          headerDone = true;
        }
      }

      if (!trustDone) {
        trustDone = injectTrustBlock();
      }

      if ((headerDone && trustDone) || attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pollUntilReady);
  } else {
    pollUntilReady();
  }

})();
