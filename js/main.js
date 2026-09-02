/* ==========================================================================
   NOVEX CONFORT — main.js
   JavaScript vanilla, sans dépendance.
   --------------------------------------------------------------------------
   1. Configuration
   2. Liens WhatsApp
   3. Menu mobile
   4. Accordion FAQ
   5. Header au scroll + navigation active
   6. Bandeau d'action rapide
   7. Composition interne
   8. Vidéos TikTok
   9. Révélation au scroll
   10. Divers
   ========================================================================== */
(function () {
  'use strict';

  /* ========================================================================
     1. CONFIGURATION
     Point unique à modifier pour le numéro et les messages par défaut.
     ====================================================================== */
  var CONFIG = {
    whatsappNumber: '2290197224140', // +229 01 97 22 41 40, format international sans « + »
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
      var format = (data.get('format') || '').toString().trim();
      var epaisseur = (data.get('epaisseur') || '').toString().trim();
      var zone = (data.get('zone') || '').toString().trim();

      var parts = ['Bonjour Novex Confort, je souhaite avoir des informations sur vos matelas.'];
      if (format) parts.push('Format : ' + format + '.');
      if (epaisseur) parts.push('Épaisseur : ' + epaisseur + '.');
      if (zone) parts.push('Zone : ' + zone + '.');

      window.open(buildWhatsAppUrl(parts.join(' ')), '_blank', 'noopener');
    });
  }

  /* ========================================================================
     7. COMPOSITION INTERNE
     Met en avant la couche du schéma correspondant à l'entrée survolée,
     activée au clavier ou cliquée.
     ====================================================================== */
  function initComposition() {
    var svg = document.querySelector('.layers');
    var items = document.querySelectorAll('.layer-item');

    if (!svg || !items.length) return;

    var layers = svg.querySelectorAll('.layer');

    function highlight(name) {
      svg.classList.toggle('has-active', Boolean(name));

      Array.prototype.forEach.call(layers, function (layer) {
        layer.classList.toggle('is-active', layer.getAttribute('data-layer') === name);
      });

      Array.prototype.forEach.call(items, function (item) {
        item.classList.toggle('is-active', item.getAttribute('data-layer') === name);
      });
    }

    Array.prototype.forEach.call(items, function (item) {
      var name = item.getAttribute('data-layer');

      item.addEventListener('mouseenter', function () { highlight(name); });
      item.addEventListener('focus', function () { highlight(name); });
      item.addEventListener('click', function () { highlight(name); });
      item.addEventListener('mouseleave', function () { highlight(null); });
      item.addEventListener('blur', function () { highlight(null); });
    });
  }

  /* ========================================================================
     8. VIDÉOS TIKTOK
     Intégration officielle. Les liens courts (vm.tiktok.com) ne contiennent
     pas l'identifiant de la vidéo : on le résout via l'API oEmbed de TikTok,
     qui renvoie le code d'intégration officiel. Si une carte porte déjà un
     attribut data-tiktok-id, l'embed est construit directement, sans appel
     réseau supplémentaire.

     Chargement différé : rien n'est demandé à TikTok avant que la section
     n'approche du viewport. En cas d'échec, le lien de repli visible dans
     le HTML reste en place.
     ====================================================================== */
  function initTikTok() {
    var grid = document.getElementById('video-grid');
    if (!grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.video-card[data-tiktok-url]'));
    if (!cards.length || typeof window.fetch !== 'function') return;

    var started = false;

    function buildBlockquote(url, videoId) {
      return '<blockquote class="tiktok-embed" cite="' + url +
             '" data-video-id="' + videoId + '"><section>' +
             '<a href="' + url + '" target="_blank" rel="noopener">Voir sur TikTok</a>' +
             '</section></blockquote>';
    }

    /** Renvoie le HTML d'intégration d'une carte, ou null en cas d'échec. */
    function resolve(card) {
      var url = card.getAttribute('data-tiktok-url');
      var videoId = card.getAttribute('data-tiktok-id');

      if (videoId) {
        return Promise.resolve({ card: card, html: buildBlockquote(url, videoId) });
      }

      return window.fetch('https://www.tiktok.com/oembed?url=' + encodeURIComponent(url))
        .then(function (response) {
          if (!response.ok) throw new Error('oEmbed ' + response.status);
          return response.json();
        })
        .then(function (data) {
          return { card: card, html: data && data.html ? data.html : null };
        })
        .catch(function () {
          return { card: card, html: null };
        });
    }

    /**
     * embed.js peut ne jamais s'exécuter (bloqueur de contenu, réseau).
     * Sans garde-fou, le blockquote resterait une zone vide : on remet
     * alors le lien de repli, qui reste cliquable.
     */
    function restoreIfNotEmbedded(card, frame, fallback) {
      window.setTimeout(function () {
        if (frame.querySelector('iframe')) return;

        frame.innerHTML = fallback;
        card.classList.remove('is-embedded');
      }, 6000);
    }

    function loadEmbedScript() {
      if (document.getElementById('tiktok-embed-script')) return;

      var script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.async = true;
      script.src = 'https://www.tiktok.com/embed.js';
      document.body.appendChild(script);
    }

    /**
     * Les embeds sont tous injectés avant le chargement du script :
     * embed.js traite l'ensemble des blockquotes présents à son exécution,
     * ce qui évite d'avoir à le réinitialiser.
     */
    function activate() {
      if (started) return;
      started = true;

      Promise.all(cards.map(resolve)).then(function (results) {
        var injected = false;

        results.forEach(function (result) {
          if (!result.html) return;

          var frame = result.card.querySelector('.video-card__frame');
          if (!frame) return;

          restoreIfNotEmbedded(result.card, frame, frame.innerHTML);
          frame.innerHTML = result.html;
          result.card.classList.add('is-embedded');
          injected = true;
        });

        if (injected) loadEmbedScript();
      });
    }

    if (!('IntersectionObserver' in window)) {
      activate();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      observer.disconnect();
      activate();
    }, { rootMargin: '400px 0px' });

    observer.observe(grid);
  }

  /* ========================================================================
     9. RÉVÉLATION AU SCROLL
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
     10. DIVERS
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
    initComposition();
    initTikTok();
    initReveal();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
