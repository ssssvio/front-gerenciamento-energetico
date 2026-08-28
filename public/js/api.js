async function extrairErro(resp) {
  try {
    const corpo = await resp.json();
    return corpo.erro || `Erro HTTP ${resp.status}`;
  } catch {
    return `Erro HTTP ${resp.status}`;
  }
}

const API = {
  base: window.API_BASE_URL || 'http://localhost:3000',

  async get(caminho) {
    const resp = await fetch(`${this.base}${caminho}`);
    if (!resp.ok) throw new Error(await extrairErro(resp));
    return resp.json();
  },

  async post(caminho, dados) {
    const resp = await fetch(`${this.base}${caminho}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!resp.ok) throw new Error(await extrairErro(resp));
    return resp.json();
  },

  async patch(caminho, dados) {
    const resp = await fetch(`${this.base}${caminho}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!resp.ok) throw new Error(await extrairErro(resp));
    return resp.json();
  },

  async put(caminho, dados) {
    const resp = await fetch(`${this.base}${caminho}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!resp.ok) throw new Error(await extrairErro(resp));
    return resp.json();
  },
};
