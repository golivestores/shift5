// ===== UTILITIES =====
function splitChars(el) {
  var text = el.textContent;
  el.innerHTML = '';
  for (var i = 0; i < text.length; i++) {
    var span = document.createElement('span');
    span.className = text[i] === ' ' ? 'char char-space' : 'char';
    span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    el.appendChild(span);
  }
}

// ===== SPLIT CTA FORM TITLE INTO CHARS =====
function initFormTitleSplit() {
  var formTitle = document.querySelector('.form-title');
  if (!formTitle) return;
  formTitle.querySelectorAll('span:not(.-slash)').forEach(splitChars);
  var slash = formTitle.querySelector('.-slash');
  if (slash) splitChars(slash);
  formTitle.querySelectorAll('.char').forEach(function(c, i) {
    c.style.animationDelay = (i * 0.025) + 's';
  });
}

// ===== STAGGER CONTACT-INFO ITEMS =====
function initContactInfoStagger() {
  var contactInfo = document.querySelector('.contact-info');
  if (!contactInfo) return;
  var label = contactInfo.querySelector('.info-label');
  if (label) label.style.animationDelay = '0s';
  contactInfo.querySelectorAll('.info-item').forEach(function(item, i) {
    item.style.animationDelay = ((i + 1) * 0.06) + 's';
  });
}

// ===== PAGE LOAD SEQUENCE =====
// heroSelector: e.g. '.heroHome' or '.heroPlatform'
function initPageLoad(heroSelector) {
  window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    var header = document.querySelector('.header');
    var hero = document.querySelector(heroSelector);

    // 1. Reveal loader upward
    setTimeout(function() {
      loader.classList.add('is-done');
    }, 200);

    // 2. After loader starts, trigger header + hero
    setTimeout(function() {
      if (header) header.classList.add('is-visible');
      if (hero) hero.classList.add('is-loaded');
    }, 600);

    // 3. Hide loader element after animation
    setTimeout(function() {
      loader.style.display = 'none';
    }, 2200);
  });
}

// ===== HEADER COLOR DETECTION =====
// Switches header to light/dark based on the section it overlaps
function initHeaderColorSwitch() {
  var header = document.querySelector('.header');
  if (!header) return;

  var darkSections = document.querySelectorAll('[data-bg="dark"]');
  if (!darkSections.length) return;

  // Track which dark sections are currently intersecting the header area
  var activeDark = new Set();

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        activeDark.add(entry.target);
      } else {
        activeDark.delete(entry.target);
      }
    });
    if (activeDark.size > 0) {
      header.classList.add('header-light');
    } else {
      header.classList.remove('header-light');
    }
  }, {
    // Only observe the top 80px of the viewport (where the header sits)
    rootMargin: '0px 0px -95% 0px',
    threshold: 0
  });

  darkSections.forEach(function(section) {
    observer.observe(section);
  });
}

// ===== SCROLL-TRIGGERED OBSERVER =====
// selectors: array of CSS selectors to observe
function initScrollObserver(selectors) {
  var scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll(selectors.join(',')).forEach(function(el) {
    scrollObserver.observe(el);
  });
}
