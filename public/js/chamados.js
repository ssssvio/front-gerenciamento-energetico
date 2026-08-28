const STATUS_LABELS = { aberto: 'Aberto', em_andamento: 'Em andamento', concluido: 'Concluído' };
const PRIORIDADE_LABELS = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };

async function carregarChamados() {
  const status = document.getElementById('filtro-status').value;
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const chamados = await API.get(`/api/chamados${query}`);

  const container = document.getElementById('lista-chamados');
  container.innerHTML = chamados
    .map(
      (c) => `
    <div class="chamado-card prioridade-${c.prioridade}">
      <div class="chamado-header">
        <strong>${c.titulo}</strong>
        <span class="badge status-${c.status}">${STATUS_LABELS[c.status]}</span>
      </div>
      <p>${c.descricao}</p>
      <div class="chamado-meta">
        <span>${c.categoria}</span>
        <span>${c.setorId ? nomeSetor(c.setorId) : 'Geral'}</span>
        <span>Prioridade: ${PRIORIDADE_LABELS[c.prioridade]}</span>
      </div>
      <div class="chamado-acoes">
        <label>Status
          <select data-id="${c.id}" class="select-status">
            <option value="aberto" ${c.status === 'aberto' ? 'selected' : ''}>Aberto</option>
            <option value="em_andamento" ${c.status === 'em_andamento' ? 'selected' : ''}>Em andamento</option>
            <option value="concluido" ${c.status === 'concluido' ? 'selected' : ''}>Concluído</option>
          </select>
        </label>
      </div>
    </div>`
    )
    .join('');

  container.querySelectorAll('.select-status').forEach((select) => {
    select.addEventListener('change', async (e) => {
      await API.patch(`/api/chamados/${e.target.dataset.id}`, { status: e.target.value });
      await carregarChamados();
    });
  });
}

document.getElementById('filtro-status')?.addEventListener('change', carregarChamados);

document.getElementById('form-chamado')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg-chamado');
  msg.textContent = '';

  const dados = {
    titulo: document.getElementById('input-titulo').value,
    descricao: document.getElementById('input-descricao').value,
    categoria: document.getElementById('input-categoria').value,
    setorId: document.getElementById('input-chamado-setor').value || null,
    prioridade: document.getElementById('input-prioridade').value,
  };

  try {
    await API.post('/api/chamados', dados);
    msg.textContent = 'Chamado aberto com sucesso!';
    msg.className = 'form-msg sucesso';
    e.target.reset();
    await carregarChamados();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'form-msg erro';
  }
});

window.Setores.carregarPromise.then(carregarChamados);
