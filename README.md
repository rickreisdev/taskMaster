# TaskMaster - Sistema de Gerenciamento de Tarefas

## Descrição do Projeto
Uma aplicação fullstack de gerenciamento de tarefas desenvolvida com NestJS, React, Prisma e PostgreSQL, permitindo que usuários criem, editem, excluam e marquem tarefas como concluídas.

**OBS: Projeto não finalizado**

## Tecnologias Utilizadas
- **Backend**: NestJS
- **Frontend**: React + Vite
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT
- **Estilização**: TailwindCSS
- **Gerenciamento de Estado**: React Query

## Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL
- npm ou yarn

## Configuração do Ambiente

### Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/gerenciador-tarefas.git
cd gerenciador-tarefas
```

### Configurar Backend
1. Navegue para o diretório do backend
```bash
cd backend
```

2. Instalar dependências
```bash
npm install
```

3. Configurar variáveis de ambiente
Crie um arquivo `.env` com as seguintes variáveis:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gerenciador_tarefas"
JWT_SECRET="sua_chave_secreta_jwt"
```

4. Executar migrações do Prisma
```bash
npx prisma migrate dev --name init
```
```bash
npx prisma db seed
```

5. Iniciar o servidor
```bash
npm run start:dev
```

### Configurar Frontend
1. Navegue para o diretório do frontend
```bash
cd ../frontend
```

2. Instalar dependências
```bash
npm install
```

3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

## Endpoints da API
A documentação completa dos endpoints pode ser encontrada no Swagger, disponível em `http://localhost:3000/api`