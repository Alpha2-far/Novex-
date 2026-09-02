/* ==========================================================================
   NOVEX CONFORT — main.js (phase squelette)
   JavaScript vanilla, sans dépendance.
   --------------------------------------------------------------------------
   1. Configuration
   2. Liens WhatsApp
   3. Menu mobile
   4. Accordion FAQ
   5. Header au scroll + navigation active
   6. Bandeau d'action rapide
   7. Révélation au scroll
   8. Divers
   ========================================================================== */
(function () {
  'use strict';

  /* ========================================================================
     1. CONFIGURATION
     Point unique à modifier pour le numéro et les messages par défaut.
     ====================================================================== */
  var CONFIG = {
    whatsappNumber: '22997224140', // +229 97 22 41 40, format international sans « + »
    defaultMessage: 'Bonjour Novex Confort, je souhaite avoir des informations sur vos matelas.'
  };

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Construit une URL WhatsApp à partir d'un message.
   * Permet de générer plus tard un message différent selon le produit.
   */
  function buildWhatsAppUrl(message) {
    var text = (message || CONFIG.defaultMessage).trim();
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(text);
  }

  /* ========================================================================
     2. LIENS WHATSAPP
     Les liens fonctionnent déjà sans JS ; on les enrichit du message
     contextuel porté par data-wa-message.
     ====================================================================== */
  function initWhatsAppLinks() {
    var links = document.querySelectorAll('.js-wa');

    Array.prototype.forEach.call(links, function (link) {
      link.href = buildWhatsAppUrl(link.getAttribute('data-wa-message'));
    });
  }

  /* ========================================================================
     3. MENU MOBILE
     ====================================================================== */
  function initMobileMenu() {
    var burger = document.getElementById('burger');
    var menu = document.getElementById('mobile-nav');
    var overlay = document.getElementById('nav-overlay');

    if (!burger || !menu || !overlay) return;

    function setState(open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      menu.hidden = !open;
      overlay.hidden = !open;
      document.body.classList.toggle('is-locked', open);
    }

    function close() {
      if (burger.getAttribute('aria-expanded') === 'true') setState(false);
    }

    burger.addEventListener('click', function () {
      setState(burger.getAttribute('aria-expanded') !== 'true');
    });

    overlay.addEventListener('click', close);

    // Fermeture après clic sur une ancre
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        close();
        burger.focus();
      }
    });

    // Retour au layout desktop : on réinitialise l'état
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (event) {
      if (event.matches) close();
    });

    setState(false);
  }

  /* ========================================================================
     4. ACCORDION FAQ
     Une seule question ouverte à la fois, accessible au clavier
     (les déclencheurs sont de vrais <button>).
     ====================================================================== */
  function initFaq() {
    var list = document.getElementById('faq-list');
    if (!list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('.faq-item'));
    if (!items.length) return;

    list.classList.add('is-enhanced');

    function panelOf(item) { return item.querySelector('.faq-item__panel'); }
    function triggerOf(item) { return item.querySelector('.faq-item__trigger'); }

    function collapse(item) {
      var panel = panelOf(item);
      if (!item.classList.contains('is-open')) return;

      // Fige la hauteur courante avant d'animer vers 0
      panel.style.height = panel.scrollHeight + 'px';
      requestAnimationFrame(function () {
        item.classList.remove('is-open');
        triggerOf(item).setAttribute('aria-expanded', 'false');
        panel.style.height = '0px';
      });
    }

    function expand(item) {
      var panel = panelOf(item);
      item.classList.add('is-open');
      triggerOf(item).setAttribute('aria-expanded', 'true');
      panel.style.height = panel.scrollHeight + 'px';
    }

    items.forEach(function (item) {
      var panel = panelOf(item);
      var trigger = triggerOf(item);

      // État initial : replié
      panel.style.height = '0px';
      trigger.setAttribute('aria-expanded', 'false');

      // Une fois ouvert, on passe en hauteur automatique pour absorber
      // les changements de mise en page (redimensionnement, polices).
      panel.addEventListener('transitionend', function (event) {
        if (event.propertyName !== 'height') return;
        if (item.classList.contains('is-open')) panel.style.height = 'auto';
      });

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(collapse);
        if (!isOpen) expand(item);
      });
    });
  }

  /* ========================================================================
     5. HEADER AU SCROLL + NAVIGATION ACTIVE
     ====================================================================== */
  function initHeaderState() {
    var header = document.getElementById('site-header');
    if (!header) return;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = links
      .map(function (link) { return document.querySelector(link.getAttribute('href')); })
      .filter(Boolean);

    function activate(id) {
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target.id);
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ========================================================================
     6. BANDEAU D'ACTION RAPIDE
     Aucun backend pour l'instant : la demande est transmise via WhatsApp.
     Pour brancher un formulaire ou un CRM plus tard, il suffit de
     remplacer le corps de handleSubmit().
     ====================================================================== */
  function initQuickBar() {
    var form = document.getElementById('quickbar');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var type = (data.get('type') || '').toString().trim();
      var format = (data.get('format') || '').toString().trim();
      var ville = (data.get('ville') || '').toString().trim();

      var parts = ['Bonjour Novex Confort, je souhaite des informations sur vos matelas.'];
      if (format) parts.push('Format : ' + format + '.');
      if (type) parts.push('Épaisseur : ' + type + '.');
      if (ville) parts.push('Livraison : ' + ville + '.');

      window.open(buildWhatsAppUrl(parts.join(' ')), '_blank', 'noopener');
    });
  }

  /* ========================================================================
     7. RÉVÉLATION AU SCROLL
     ====================================================================== */
  function initReveal() {
    if (prefersReducedMotion) return;

    var groups = document.querySelectorAll('[data-reveal-group]');
    var targets = [];

    Array.prototype.forEach.call(groups, function (group) {
      Array.prototype.forEach.call(group.children, function (child, index) {
        child.setAttribute('data-reveal', '');
        child.style.transitionDelay = (index * 70) + 'ms';
        targets.push(child);
      });
    });

    if (!targets.length) return;

    var scheduled = false;

    function reveal(el) {
      el.classList.add('is-visible');
      el.style.transitionDelay = '';
    }

    /**
     * Révèle tout élément entré dans la fenêtre — y compris ceux déjà
     * dépassés par un scroll rapide, afin qu'aucun contenu ne puisse
     * rester invisible.
     */
    function sweep() {
      scheduled = false;
      var limit = window.innerHeight - 40;

      targets = targets.filter(function (el) {
        var box = el.getBoundingClientRect();
        if (box.top < limit) {
          reveal(el);
          return false;
        }
        return true;
      });

      if (!targets.length) {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
      }
    }

    function request() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(sweep);
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    sweep();
  }

  /* ========================================================================
     8. DIVERS
     ====================================================================== */
  function initYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ====================================================================== */
  function init() {
    initWhatsAppLinks();
    initMobileMenu();
    initFaq();
    initHeaderState();
    initScrollSpy();
    initQuickBar();
    initReveal();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
