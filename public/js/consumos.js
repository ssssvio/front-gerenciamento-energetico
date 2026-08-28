async function carregarTabelaConsumo() {
  const setorId = document.getElementById('filtro-setor').value;
  const query = setorId ? `?setorId=${encodeURIComponent(setorId)}` : '';
  const registros = await API.get(`/api/consumos${query}`);

  const tbody = document.getElementById('tabela-consumo');
  tbody.innerHTML = registros
    .map(
      (r) => `<tr><td>${r.mes}</td><td>${nomeSetor(r.setorId)}</td><td>${r.kwh}</td><td>R$ ${r.custo.toFixed(2)}</td></tr>`
    )
    .join('');
}

document.getElementById('filtro-setor')?.addEventListener('change', carregarTabelaConsumo);

document.getElementById('form-consumo')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg-consumo');
  msg.textContent = '';

  const dados = {
    setorId: document.getElementById('input-setor').value,
    mes: document.getElementById('input-mes').value,
    kwh: Number(document.getElementById('input-kwh').value),
    custo: Number(document.getElementById('input-custo').value),
  };

  try {
    await API.post('/api/consumos', dados);
    msg.textContent = 'Registro salvo com sucesso!';
    msg.className = 'form-msg sucesso';
    e.target.reset();
    await carregarTabelaConsumo();
    await carregarDashboard();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'form-msg erro';
  }
});

window.Setores.carregarPromise.then(carregarTabelaConsumo);
