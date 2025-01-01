# Finance Me - Gerenciador de Finanças Pessoais
Este é um projeto de gerenciamento de finanças pessoais desenvolvido para 
auxiliar os usuários a controlar suas transações, acompanhar o progresso de 
metas financeiras e visualizar um resumo das suas  finanças por meio de um 
dashboard interativo.

## Tecnologias Utilizadas
# BackEnd:

**- Linguagem**: Typescript.

**- Framework**: Express.js.

**- Banco de Dados**: SQLite3.

**- Autenticação**: JSON Web Token (JWT).

**- Hashing de senhas**: Bcrypt.

# FrontEnd:

**- Biblioteca**: React.

**- Estilização**: Tailwind CSS.

**- Requisições HTTP**: Axios.

## Funcionalidades
# BackEnd:

**- Gerenciamento de Usuários**: Cadastro, login e autenticação segura utilizando JWT.

**- Transações**: CRUD de transações completo.

**- Metas Financeiras**: Gerenciamento de metas com progresso associado (fictícios).

**- Resumo Financeiro**: Calcula receitas, despesas e economias (fictícios).

**- Segurança**: Rotas protegidas  por autenticação JWT.

# FrontEnd:

**- DashBoard Financeiro**: Visao geral com gráfico de saldo, resumo de transações e progresso de metas.

**- Gerenciamento de Transações**: Visualização e manipulação das transações do usuário.

**- Progresso de Metas**: Barra de progresso para acompanhar  o cumprimento das metas.

**- Estilização Responsiva**: Layout responsivo com Tailwind CSS.

## Estrutura do Projeto
# BackEnd:

**- src/controllers**: Contém os controladores para as entidades do sistema.

**- src/models**: Define  os modelos de dados e interações com o SQLite.

**- src/routes**: Configuração das rotas da API.

**- src/middleware**: Middleware para validação de JWT e proteção de rotas.

# FrontEnd:

**- src/pages**: Páginas principais da aplicação.

**- src/components**: Componentes reutilizáveis, como NavBar, Footer, Gráficos e Listas.

**- src/hooks**: Hooks personalizados para lidar com requisições e estados do contexto.

**- src/context**: Contextos globais para autenticação e gerenciamento de estados.

## Como Rodar o Projeto
# BackEnd:

**1-** Clonar o repositório

``
git clone https://github.com/GuiSebax/Gerenciador-De-Financas-Pessoais.git
cd Gerenciador-De-Financas-Pessoais/backend
``

**2-** Instale as dependências

`npm install`

**3-** Configuraas variáveis de ambiente no arquivo .env:

``
PORT=3000
JWT_SECRET=sua_chave_secreta
`

**4-** Inicia o Servidor:

`npm start`

# FrontEnd:

**1-** Navegue para o diretório do frontend:

``
cd ../frontend
cd projeto
`

**2-** Instale as dependências:

`npm install`

**3-** Inicie o servidor de desenvolvimento:

`npm run dev`

# Contribuição
Sinta-se à vontade para contribuir com este projeto. Crie um fork do repositório, implemente suas melhorias e envie um Pull Request. Toda contribuição é bem-vinda!

Desenvolvido por Guilherme Clemente *-

