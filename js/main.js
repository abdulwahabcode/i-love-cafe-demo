(function(){
  "use strict";

  // Sticky header shadow on scroll
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if(window.scrollY > 12){ header.style.boxShadow = '0 8px 30px rgba(58,50,41,.12)'; }
    else { header.style.boxShadow = 'none'; }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    });
  });

  // Menu tabs
  var tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      var name = tab.getAttribute('data-tab');
      document.querySelectorAll('.menu-panel').forEach(function(p){
        var show = p.id === 'panel-' + name;
        p.classList.toggle('active', show);
        if(show){ p.removeAttribute('hidden'); } else { p.setAttribute('hidden',''); }
      });
    });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }
})();
