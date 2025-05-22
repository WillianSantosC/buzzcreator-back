# BuzzCreator

BuzzCreator é uma API RESTful desenvolvida em Node.js com TypeScript, Express e Prisma. O sistema tem como objetivo gerenciar um catálogo de livros e pedidos, com autenticação de administrador para rotas protegidas.

---

## Front-End

Este back-end pode ser usado em conjunto com o front-end disponível no repositório: **[buzzcreator-front](https://github.com/WillianSantosC/buzzcreator-front)**

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

- **Node.js** + **Express** + **TypeScript** (framework e tipagem)
- **Prisma ORM** (ORM)
- **PostgreSQL** (banco de dados)
- **Swagger** (documentação)
- **ESLint** + **Prettier** (padronização de código)
- **Jest** + **Supertest** (testes)
- **Docker** (rodar projeto - opcional)
- **Render** (deploy)
- **Husky** + **Lint-staged** (validação pre-commit)
- **Github Actions** (CI/CD)

---

## Arquitetura e Decisões Técnicas

- **Arquitetura**: Adotada a **Clean Architecture** como base para a organização do projeto, separando claramente as responsabilidades em camadas:

  - **Domain**: definição das entidades e repositórios.
  - **Application**: casos de uso que orquestram a lógica da aplicação.
  - **Infrastructure**: integração com tecnologias externas como banco de dados e frameworks.
  - **Web**: camada de entrega responsável pelas rotas HTTP e validações das mesmas.

    > Essa abordagem facilita a manutenção, escalabilidade e testabilidade do sistema, além de reduzir o acoplamento entre as partes.

* **Framework**: Optou-se por **Express.js**, um framework minimalista e flexível para construção de APIs REST, facilitando a implementação de rotas, middlewares e integração com bibliotecas de terceiros.

* **Tipagem**: Uso de **TypeScript** em toda a base de código para proporcionar maior segurança, clareza e escalabilidade, reduzindo a incidência de erros em tempo de execução.

* **ORM**: Utilizado **Prisma** para o mapeamento objeto-relacional, oferecendo uma camada de abstração segura e tipada sobre o banco de dados, além de facilitar operações como migrações e geração automática de tipos.

* **Banco de Dados**: Escolha por **PostgreSQL**, um sistema robusto e confiável para armazenamento relacional, garantindo integridade e escalabilidade dos dados.

* **Autenticação**: Implementada autenticação via **JWT (JSON Web Token)** para rotas protegidas. Para fins de simplicidade e foco na lógica do sistema, a autenticação do administrador foi mockada; em produção, seria substituída por um sistema robusto com persistência, hashing de senha e repositório.

* **Validação de Dados**: Emprego de **Zod** para validação de schemas, garantindo que os dados recebidos e processados pela API estejam sempre no formato esperado, evitando falhas e inconsistências.

* **Documentação de API**: Geração automática da documentação utilizando **Swagger**, facilitando o entendimento, a integração e os testes da API por outros desenvolvedores ou serviços.

* **Testes**: Estratégia de testes baseada em **Jest** e **Supertest** para testes de integração, garantindo que as rotas e a lógica de negócios funcionem conforme o esperado. O ambiente de testes utiliza truncamento das tabelas antes de cada suíte, garantindo isolamento entre os testes.

* **Padronização de Código**: Utilização de **ESLint**, **Prettier** e **Husky** para garantir a qualidade, consistência e padronização do código, além de hooks de pre-commit com **Lint-staged** para validação automática antes de cada commit.

* **Deploy**: Realizado via **Render**, aproveitando o suporte a containers e aplicações Node.js.

---

## Scripts úteis

```bash
# Ambiente de desenvolvimento
pnpm dev

# Compilar o projeto
pnpm build

# Rodar a aplicação compilada
pnpm start

# Rodar Swagger para atualizar a documentação
pnpm swagger

# Rodar testes
pnpm test

# Acessar o Prisma Studio
pnpm studio
```

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js 22+
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
CLIENT_URL=

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
