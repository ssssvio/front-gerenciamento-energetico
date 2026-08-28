# Frontend — Gerenciamento Energético Escolar

Frontend em HTML/CSS/JavaScript puro (sem frameworks) para o sistema de
gerenciamento energético escolar. Consome a API do [backend](../backend) e é
servido por um pequeno servidor Node/Express que apenas entrega os arquivos
estáticos e injeta a URL da API em runtime (`/env.js`), sem precisar de build
step.

## Requisitos

- Node.js 18 ou superior
- Backend rodando (veja [../backend/README.md](../backend/README.md))

## Como rodar

```bash
cd frontend
npm install
copy .env.example .env    # no Windows (ou "cp .env.example .env" no Linux/Mac)
npm start                  # http://localhost:5500
```

Abra `http://localhost:5500` no navegador com o backend já rodando em
`http://localhost:3000` (ou no endereço configurado em `API_BASE_URL`).

## Variáveis de ambiente (`.env`)

| Variável       | Descrição                                   | Padrão                   |
| -------------- | --------------------------------------------- | -------------------------- |
| `PORT`         | Porta do servidor estático                    | `5500`                    |
| `API_BASE_URL` | URL base da API do backend                    | `http://localhost:3000`   |

## Telas

- **Dashboard** — cards de resumo e gráficos (Chart.js) comparando o consumo e
  o custo médio mensal antes/depois da implementação da energia solar, geral e
  por setor.
- **Consumo** — formulário para lançar novos registros de consumo (setor, mês,
  kWh, custo) e tabela com filtro por setor.
- **Chamados** — formulário para abrir chamados de suporte técnico, manutenção
  elétrica ou melhoria de rede/monitoramento, com lista filtrável por status e
  alteração de status diretamente na tela.
- **Configurações** — permite ajustar o mês/ano de implementação da energia
  solar usado no comparativo do dashboard.

## Estrutura de pastas

```
frontend/
├── public/
│   ├── index.html
│   ├── css/styles.css
│   └── js/
│       ├── api.js       # wrapper fetch para a API
│       ├── setores.js   # cache de setores compartilhado entre telas
│       ├── main.js      # navegação entre abas
│       ├── dashboard.js
│       ├── consumos.js
│       ├── chamados.js
│       └── settings.js
├── server.js  # servidor estático Node/Express + rota /env.js
└── package.json
```

## Observação sobre "env" em um front estático

Como o frontend não passa por build step, o `.env` não pode ser lido
diretamente pelo navegador. Por isso `server.js` lê o `.env` no servidor e
expõe uma rota `GET /env.js` que define `window.API_BASE_URL` em runtime —
assim a URL da API continua configurável por ambiente, mesmo em HTML/CSS/JS
puro.
