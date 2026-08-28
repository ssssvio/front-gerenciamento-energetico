async function carregarConfig() {
  const config = await API.get('/api/config');
  document.getElementById('input-data-solar').value = config.dataImplementacaoSolar;
}

document.getElementById('form-config')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('msg-config');
  msg.textContent = '';

  try {
    await API.put('/api/config', {
      dataImplementacaoSolar: document.getElementById('input-data-solar').value,
    });
    msg.textContent = 'Configuração salva! Dashboard atualizado.';
    msg.className = 'form-msg sucesso';
    await carregarDashboard();
  } catch (err) {
    msg.textContent = err.message;
    msg.className = 'form-msg erro';
  }
});

carregarConfig();
