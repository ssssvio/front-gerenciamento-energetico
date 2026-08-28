let chartSetores = null;
let chartAntesDepois = null;

function formatarVariacao(valor) {
  if (valor === null || valor === undefined) return '—';
  const sinal = valor > 0 ? '+' : '';
  return `${sinal}${valor}%`;
}

function renderizarCards(comparativo) {
  const { geral, dataImplementacaoSolar } = comparativo;
  const container = document.getElementById('cards-resumo');

  container.innerHTML = `
    <div class="card">
      <span class="card-label">Solar implantada em</span>
      <span class="card-value">${dataImplementacaoSolar}</span>
    </div>
    <div class="card">
      <span class="card-label">Consumo médio mensal (antes)</span>
      <span class="card-value">${geral.antes.mediaMensalKwh} kWh</span>
    </div>
    <div class="card">
      <span class="card-label">Consumo médio mensal (depois)</span>
      <span class="card-value">${geral.depois.mediaMensalKwh} kWh</span>
    </div>
    <div class="card ${geral.variacaoPercentualKwh < 0 ? 'card-positivo' : ''}">
      <span class="card-label">Variação de consumo</span>
      <span class="card-value">${formatarVariacao(geral.variacaoPercentualKwh)}</span>
    </div>
    <div class="card ${geral.variacaoPercentualCusto < 0 ? 'card-positivo' : ''}">
      <span class="card-label">Variação de custo</span>
      <span class="card-value">${formatarVariacao(geral.variacaoPercentualCusto)}</span>
    </div>
    <div class="card card-positivo">
      <span class="card-label">Economia média mensal</span>
      <span class="card-value">R$ ${geral.economiaEstimadaMensalReais}</span>
    </div>
  `;
}

function renderizarGraficoSetores(porSetor) {
  const ctx = document.getElementById('chart-setores');
  const labels = porSetor.map((s) => s.setorNome);
  const antes = porSetor.map((s) => s.antes.mediaMensalKwh);
  const depois = porSetor.map((s) => s.depois.mediaMensalKwh);

  if (chartSetores) chartSetores.destroy();
  chartSetores = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Antes (kWh)', data: antes, backgroundColor: '#94a3b8' },
        { label: 'Depois (kWh)', data: depois, backgroundColor: '#0f766e' },
      ],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  });
}

function renderizarGraficoAntesDepois(geral) {
  const ctx = document.getElementById('chart-antes-depois');

  if (chartAntesDepois) chartAntesDepois.destroy();
  chartAntesDepois = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Antes', 'Depois'],
      datasets: [
        {
          data: [geral.antes.mediaMensalCusto, geral.depois.mediaMensalCusto],
          backgroundColor: ['#94a3b8', '#0f766e'],
        },
      ],
    },
    options: { responsive: true },
  });
}

async function carregarDashboard() {
  const comparativo = await API.get('/api/consumos/comparativo');
  renderizarCards(comparativo);
  renderizarGraficoSetores(comparativo.porSetor);
  renderizarGraficoAntesDepois(comparativo.geral);
}

carregarDashboard();
