# 🎵 NTTUnes – Plataforma de Streaming

Este projeto foi desenvolvido como parte de um *teste técnico* para a empresa *NTT DATA*. 
O objetivo foi simular uma **plataforma de streaming musical*, com funcionalidades completas de CRUD para gerenciamento de playlists, utilizando uma stack moderna e containerizada.

## 🚀 Tecnologias Utilizadas

### 🔹 Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker + Docker Compose

### 🔹 Frontend
- React (com Vite)
- Axios

## ▶️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/noellefranco/teste_tecnico_NTTDATA.git
cd teste_tecnico_nttdata
```

### 2. Suba os containers com Docker Compose
```bash
docker-compose --build
```

A aplicação está disponível em:
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

> ✅ O banco de dados PostgreSQL será inicializado automaticamente via Docker.

### 3. Aplique as migrações Prisma
Após os containers estarem rodando, execute:
```bash
docker-compose exec backend npx prisma migrate deploy
```

### 4. Teste as rotas da API
Em ambiente do Docker:
```bash
docker-compose exec backend npm test
```

## 📂 Estrutura básica do Projeto
```bash
teste_tecnico_nttdata/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🧪 Funcionalidades principais
- Criar playlists e músicas dentro de cada playlist
- Listar playlists e suas músicas
- Editar playlists e suas músicas
- Deletar playlists e suas músicas
- Integração com banco de dados PostgreSQL
- Comunicação entre frontend e backend via API REST (Axios)
- Interface simples construída com React + Vite
- Projeto containerizado com Docker

## ✅ Checklist para o avaliador
- Frontend (React, Angular ou Vue.js)
- Backend (NodeJS ou Python)
- Banco de dados relacional ou NoSQL com relacionamentos entre entidades
- Docker
- Git com Gitflow
- Testes com mínimo de 25% de cobertura (unitários e integração)
- Consumir uma API externa (ex: letras, capas de álbuns, artistas) e exibir na interface (extra)

## 📝 Observações
- O projeto utiliza type: "module" no backend. Caso vá executar localmente fora do Docker, certifique-se de usar Node.js 18+.
- A senha do banco de dados foi definida apenas para ambiente de desenvolvimento e está no docker-compose.yml por simplicidade. Em produção, recomenda-se utilizar variáveis de ambiente e um arquivo .env.

#### ✉️ noelle.mtf@gmail.com
