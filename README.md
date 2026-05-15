# Desafio Receitas de Culinária

Aplicação web para gerenciamento de receitas de culinária, com cadastro de usuários, autenticação JWT, listagem com busca, criação, edição, exclusão e impressão.

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Executar](#como-executar)

---

## Visão Geral

O projeto é dividido em dois módulos independentes:

- **Backend:** API REST em Node.js/Express e TypeScript com autenticação via JWT e banco de dados MySQL.
- **Frontend:** Vue 3 com Tailwind CSS.

Funcionalidades principais:

- Cadastro e login de usuários
- CRUD completo de receitas (Nome, categoria,ingredientes, modo de preparo,porções,tempo)
- Busca de receitas por nome
- Exportação/impressão de receita em PDF
- Documentação interativa da API via Swagger (`/docs`)

---

## Tecnologias

### Backend

Tecnologia

Node.js 20  
Express 4  
TypeScript  
MySQL 8 + mysql2  
JSON Web Token (JWT)  
bcryptjs  
Zod  
Swagger (swagger-jsdoc + swagger-ui-express)
Docker + Docker Compose

### Frontend

Vue 3  
Vite  
TypeScript  
Pinia  
Vue Router 5  
Tailwind CSS 4
Axios  
Zod  
jsPDF  
vue-sonner

---

## Arquitetura

### Backend — Arquitetura Hexagonal

O backend segue uma arquitetura hexagonal, separando as regras de negócio da infraestrutura:

```
src/
├── entities/          # Modelos de domínio (User, Recipe, Category)
├── repositories/      # Interfaces (ports) + adaptadores MySQL
│   └── mysql/
├── use-cases/         # Regras de negócio
│   └── factories/     # Wiring entre use cases e repositórios
├── controllers/       # Handlers HTTP
├── routes/            # Definição de rotas e middlewares
├── database/          # Configuração do pool de conexão MySQL
├── scripts/           # Script SQL de inicialização do banco
└── server.ts          # Entrada da aplicação (porta 3000)
```

```
O schema do banco é criado automaticamente no primeiro start do Docker via `backend/src/scripts/script.sql`, criando o banco `teste_receitas_rg_sistemas` com as tabelas `usuarios`, `categorias` e `receitas`.
```

## API Endpoints

Base URL padrão: `http://localhost:3000`

Documentação interativa disponível em: `http://localhost:3000/docs`

## Variáveis de Ambiente

### Backend — `backend/.env`

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=teste_receitas_rg_sistemas
JWT_SECRET=seu_segredo_jwt
```

> Ao usar Docker Compose, o `MYSQL_HOST` deve ser `mysql` (nome do serviço).

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## Como Executar

### Opção 1 — Docker Compose (backend + banco de dados)

Sobe o MySQL e o backend em containers. O schema é criado automaticamente no primeiro start.

```bash
# 1. Acesse a pasta do backend
cd backend

# 2. Crie o arquivo .env com as variáveis necessárias
#    (MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_PASSWORD, JWT_SECRET) - MYSQL_DATABASE precisa ser o mesmo nome do schema que é teste_receitas_rg_sistemas.

# 3. Suba os containers
docker compose up
```

O backend ficará disponível em `http://localhost:3000`.

Em seguida, rode o frontend separadamente (Opção 2 abaixo).

---

### Opção 2 — Desenvolvimento local

Requer MySQL rodando localmente com o schema importado.

**Importar o schema (apenas na primeira vez):**

```bash
mysql -u root -p < backend/src/scripts/script.sql
```

**Backend:**

```bash
cd backend
npm install
npm run dev
```

**Frontend (em outro terminal):**

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5173` (porta padrão do Vite).

---

## Testes unitários com Jest

Dentro de backend/src/use-cases/ contem os arquivos \*.spec.ts.Para a execução basta rodar npm run test

---

## Requisitos

- Node.js `>= 20.19.0`
- npm
- MySQL 8 (ou Docker para rodar via compose)
- Docker e Docker Compose (opcional)
