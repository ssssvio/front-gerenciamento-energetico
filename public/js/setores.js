window.Setores = { cache: [] };

async function carregarSetoresGlobais() {
  const setores = await API.get('/api/setores');
  window.Setores.cache = setores;

  document.querySelectorAll('select.setor-select').forEach((select) => {
    setores.forEach((setor) => {
      const option = document.createElement('option');
      option.value = setor.id;
      option.textContent = setor.nome;
      select.appendChild(option);
    });
  });

  return setores;
}

function nomeSetor(setorId) {
  const setor = window.Setores.cache.find((s) => s.id === setorId);
  return setor ? setor.nome : setorId;
}

// Outros módulos aguardam essa promise antes de usar nomeSetor/cache.
window.Setores.carregarPromise = carregarSetoresGlobais();
