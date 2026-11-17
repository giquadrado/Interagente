/**
 * contact-reveal.js
 * Script comum (não é módulo), para funcionar mesmo abrindo o arquivo direto.
 *
 * A seção de contato fica sempre visível (título, Clara e o botão
 * "Prefere que a gente entre em contato?"). Só o formulário começa recolhido.
 * Ele abre na mesma página ao clicar nesse botão ou em qualquer link para
 * #contato (ex.: "Vamos escalar seu negócio juntos?").
 * Sem JavaScript, o formulário continua visível.
 */
(function () {
  'use strict';

  var contato = document.getElementById('contato');
  var card = document.getElementById('form-card');
  var botao = document.getElementById('open-form');
  if (!contato || !card) return;

  function mostrarFormulario() {
    card.hidden = false;
    if (botao) {
      botao.hidden = true;
      botao.setAttribute('aria-expanded', 'true');
    }
    // Garante que a animação de entrada não deixe o formulário transparente
    card.classList.add('is-visible');
    var campo = card.querySelector('input, select, textarea');
    if (campo) campo.focus({ preventScroll: true });
  }

  function irParaContato() {
    var navbar = document.getElementById('navbar');
    var offset = navbar ? navbar.offsetHeight + 16 : 0;
    requestAnimationFrame(function () {
      window.scrollTo({
        top: contato.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth',
      });
    });
  }

  // Começa recolhido, a menos que a URL já peça o contato
  if (window.location.hash === '#contato') {
    mostrarFormulario();
  } else {
    card.hidden = true;
    if (botao) botao.hidden = false;
  }

  if (botao) botao.addEventListener('click', mostrarFormulario);

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href="#contato"]');
    if (!link) return;
    e.preventDefault();
    mostrarFormulario();
    irParaContato();
  });
})();
