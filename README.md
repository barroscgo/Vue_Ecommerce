# 🛒 Painel Administrativo - Startup de E-commerce

Este projeto é uma aplicação web full-stack desenvolvida como parte do curso UniSenai 2025. Trata-se de um painel administrativo completo para uma startup de e-commerce, permitindo o gerenciamento de produtos, autenticação segura de usuários e integração com API pública.

---

## 🚀 Funcionalidades

- 🔐 Autenticação de usuários com JWT (login, registro, logout)
- 🛍️ CRUD completo de produtos (nome, preço, categoria, imagem e descrição)
- 🌤️ Integração com a API do OpenWeatherMap para previsão do tempo
- 🖥️ Painel administrativo protegido
- 📱 Layout responsivo com Vuetify 3 e Bootstrap
- ⚙️ Backend em Node.js + Express + Sequelize + MySQL
- 🌐 Frontend em Vue.js + Vuex + Axios

---

## 🧱 Tecnologias Utilizadas

### Frontend
- Vue 3
- Vue Router
- Vuex
- Vuetify 3
- Axios
- Bootstrap 5
- ESLint + Prettier

### Backend
- Node.js
- Express
- Sequelize
- MySQL
- JWT
- Bcrypt

---

## 📦 Instalação e Execução

### 🔧 Pré-requisitos
- Node.js
- MySQL

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

2. Configure o banco de dados
No MySQL:

sql
Copiar
Editar
CREATE DATABASE projeto_final;
3. Configure as variáveis de ambiente
Crie um arquivo .env dentro da pasta backend com o seguinte conteúdo:

env
Copiar
Editar
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=projeto_final
JWT_SECRET=segredo123
4. Inicie o backend
bash
Copiar
Editar
cd backend
npm install
npx nodemon src/server.js
5. Inicie o frontend
bash
Copiar
Editar
cd frontend
npm install
npm run serve
✅ Como usar
Acesse http://localhost:8080

Cadastre um usuário e faça login

Acesse o dashboard

Veja a previsão do tempo no topo

Cadastre, edite e exclua produtos

📌 Requisitos Atendidos
✔ Autenticação JWT segura

✔ Painel de gerenciamento de produtos completo

✔ Integração com API pública (OpenWeatherMap)

✔ Layout responsivo utilizando Vuetify e Bootstrap

✔ Código organizado e seguindo boas práticas

✔ Estrutura recomendada no curso
