# BuzzCreator

BuzzCreator é uma API RESTful desenvolvida em Node.js com TypeScript, Express e Prisma. O sistema tem como objetivo gerenciar um catálogo de livros e pedidos, com autenticação de administrador para rotas protegidas.

---

## Funcionalidades

- CRUD de livros (`Books`)
- Gerenciamento de pedidos (`Orders`)
- Autenticação básica de administrador
- Validação de dados com Zod
- Documentação automática com Swagger
- Testes de integração com Jest e Supertest

---

## Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL** (produção)
- **Swagger**
- **Jest** + **Supertest**
- **Docker** (opcional)
- **Render** (deploy)

---

## Scripts úteis

```bash
# Ambiente de desenvolvimento
pnpm dev

# Compilar o projeto
pnpm build

# Rodar a aplicação compilada
pnpm start

# Rodar Swagger
pnpm swagger

# Rodar testes
pnpm test

# Acessar o Prisma Studio
pnpm studio
```

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js 18+
- PNPM (recomendado)
- PostgreSQL local ou Docker
- Docker (opcional)

### 1. Clonar o repositório

```bash
git clone https://github.com/WillianSantosC/buzzcreator-back.git
&&
cd buzzcreator-back
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Criar o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
API_PORT=
NODE_ENV=
JWT_SECRET=

DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

DATABASE_URL="postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?schema=public"
```

> Substitua os valores com as configurações corretas do seu ambiente.

### 4. Gerar os arquivos do Prisma e rodar as migrações

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### 5. Iniciar a aplicação

```bash
pnpm dev
```

---

## Rodando os Testes

```bash
# Executar todos os testes
NODE_ENV=test; pnpm test
```

---

## Rodando com Docker (Opcional)

### 1. Requisitos

- Docker instalado
- Variáveis de ambiente setadas corretamente

### 2. Variáveis de ambiente para rodar a aplicação

Configure as seguintes variáveis:

```env
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=buzzcreator
```

Exemplo de uso na variável `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/buzzcreator?schema=public"
```

### 3. Suba os containers

```bash
docker-compose up -d
```

---

## Autenticação

### Login de administrador

- Endpoint: `POST /admin/login`
- Payload:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Observação

> **Para fins de simplicidade e foco na lógica do sistema, a autenticação do administrador foi implementada com dados mockados. Em produção, ela seria substituída por um sistema com persistência, hashing de senha e etc.**

---

## Documentação da API

A documentação é gerada automaticamente com Swagger e pode ser acessada em:

```
GET /docs
```

---

## Deploy

O deploy deste projeto foi feito na plataforma **Render**.

🔗 Acesse a aplicação em produção:
**[https://buzzcreator-back.onrender.com](#)**
