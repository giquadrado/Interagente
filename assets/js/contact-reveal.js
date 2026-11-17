/**
 * contact-reveal.js
 * Script comum (não é módulo), para funcionar mesmo abrindo o arquivo direto.
 *
 * A seção de contato (Clara + formulário) fica visível no HTML.
 * Quando este script roda, ele a recolhe; qualquer link para #contato
 * (ex.: "Vamos escalar seu negócio juntos?") abre a seção na mesma página.
 * Sem JavaScript, o formulário continua visível.
 */
(function () {
  'use strict';

  var contato = document.getElementById('contato');
  if (!contato) return;

  function abrir() {
    contato.hidden = false;
    var navbar = document.getElementById('navbar');
    var offset = navbar ? navbar.offsetHeight + 16 : 0;
    requestAnimationFrame(function () {
      window.scrollTo({
        top: contato.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth',
      });
      var campo = contato.querySelector('input, select, textarea');
      if (campo) campo.focus({ preventScroll: true });
    });
  }

  // Começa recolhido, a menos que a URL já peça o contato
  if (window.location.hash !== '#contato') contato.hidden = true;

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href="#contato"]');
    if (!link) return;
    e.preventDefault();
    abrir();
  });
})();
