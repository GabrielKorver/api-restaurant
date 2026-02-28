🍽️ API Restaurant

API REST para gerenciamento de mesas e produtos de um restaurante.

Projeto desenvolvido com Node.js, TypeScript, Express, Knex e SQLite, com foco em prática de CRUD, validações e organização de código.

🚀 Tecnologias

Node.js

TypeScript

Express

Knex

SQLite

Zod

📂 Estrutura Básica
src
🥇├── controller
🥇├── routes
🥇├── database
🥇├──────── migrations
🥇├──────── seeds
🥇├── middlewares
🥇├── types
🥇├── utils
🥇└── server.ts
🪑 Mesas (Tables)
🔹 Listar mesas
GET /tables
🔹 Criar mesa
POST /tables

Body:

{
"table_number": 1
}

Regras:

Número maior que 0

Não permite duplicidade

🔹 Atualizar mesa
PUT /tables/:id

Regras:

ID deve existir

Não pode atualizar para número já existente

🔹 Deletar mesa
DELETE /tables/:id

Regras:

ID deve existir

🛒 Produtos (Products)
🔹 Listar produtos
GET /products
GET /products?name=burger
🔹 Criar produto
POST /products

Body:

{
"name": "Hamburguer",
"price": 29.90
}

Regras:

Nome mínimo 6 caracteres

Preço maior que 0

Não permite nome duplicado

🔹 Atualizar produto
PUT /products/:id

Regras:

ID deve existir

Não permite duplicidade

🔹 Deletar produto
DELETE /products/:id

Regras:

ID deve existir

🛠️ Instalação
npm install
▶️ Executar projeto
npm run dev

Servidor:

http://localhost:3000
🗄️ Banco de Dados

Executar migrations:

npx knex migrate:latest
🔮 Próximas Atualizações (Evolução do Projeto)

Planejamento de melhorias futuras:

✅ Relacionar pedidos com mesas

✅ Criar entidade orders

✅ Relacionar produtos aos pedidos

✅ Controle de status da mesa (aberta / fechada)

✅ Controle de status do pedido

✅ Fechamento de conta

✅ Cálculo automático do total do pedido

✅ Autenticação de usuários (garçom / admin)

🎯 Objetivo

Projeto criado para praticar:

CRUD com TypeScript

Validação com Zod

Organização com Controllers e Routes

Controle de integridade de dados

Preparação para evolução para um sistema completo de restaurante

👨‍💻 Autor

Gabriel Almeida
Desenvolvedor Fullstack 🚀
