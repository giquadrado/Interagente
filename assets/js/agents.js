/**
 * agents.js
 * Portfólio de agentes:
 *  - Atalhos abaixo do hero levam ao card do agente e o destacam
 *  - CTAs "Quero este agente" avisam o formulário qual área foi escolhida
 */

'use strict';

import { $$, scrollToElement, INTEREST_EVENT } from './utils.js';

const agentsData = {
  prevendas:   { name: 'Pré-vendas',                area: 'vendas' },
  atendimento: { name: 'Atendimento',               area: 'atendimento' },
  cobranca:    { name: 'Cobrança',                  area: 'financeiro' },
  ativacao:    { name: 'Ativação de novos clientes', area: 'ativação' },
  expansao:    { name: 'Expansão de contratos',     area: 'vendas' },
  campo:       { name: 'Campo',                     area: 'campo' },
  suporte:     { name: 'Suporte técnico',           area: 'suporte' },
};

const cards     = $$('.agent-card');
const shortcuts = $$('[data-agent-link]');

const selectAgent = (agentId) => {
  if (!agentsData[agentId]) return;
  cards.forEach((card) => {
    card.classList.toggle('is-active', card.dataset.agent === agentId);
  });
};

const announceInterest = (agentId) => {
  const data = agentsData[agentId];
  if (!data) return;
  document.dispatchEvent(new CustomEvent(INTEREST_EVENT, {
    detail: { agent: data.name, area: data.area },
  }));
};

cards.forEach((card) => {
  const agentId = card.dataset.agent;

  // Link "Quero este agente": seleciona e avisa o formulário (a âncora #contato faz a rolagem)
  card.querySelector('a[href="#contato"]')?.addEventListener('click', () => {
    selectAgent(agentId);
    announceInterest(agentId);
  });
});

// Atalhos abaixo do hero: destacam o card e rolam até o portfólio
shortcuts.forEach((shortcut) => {
  shortcut.addEventListener('click', (e) => {
    e.preventDefault();
    selectAgent(shortcut.dataset.agentLink);
    scrollToElement('#agentes');
  });
});

selectAgent('prevendas');
