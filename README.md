# AS65A-Grupo-4-BackEnd
Este projeto tem como objetivo desenvolver o back-end para a disciplina Certificadora de Competência Identitária do curso de Análise e Desenvolvimento de Sistemas da UTFPR-CP.

A proposta central é implementar um sistema de gestão de estoque para o projeto de extensão Bons Fluidos, uma iniciativa da mesma instituição que busca apoiar meninas de outras entidades com a doação de produtos de higiene feminina.



---

## Estrutura do Projeto

O projeto segue uma arquitetura modular em camadas, conforme a estrutura abaixo:

```
src
├── controllers   # Lógica de aplicação e manipulação de requisições
├── db            # Configurações de banco de dados
├── middlewares   # Funções intermediárias como autenticação e validação
├── models        # Modelos de dados e esquemas
├── routes        # Definição de rotas e seus endpoints
├── scripts       # Scripts auxiliares para tarefas externas
└── app.js        # Configuração principal da aplicação
```

---

## Tecnologias Utilizadas
### Ferramentas para codificar, compilar e executar o projeto:

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.  
    **Versão**: v20.16.0  
    **Link**: [Node.js](https://nodejs.org/)
    
- **Express.js**: Framework web para criação de APIs RESTful.  
    **Versão**: express@4.21.1  
    **Link**: [Express.js](https://expressjs.com/)
    
- **Sequelize**: ORM para modelagem de dados e interação com o banco de dados.  
    **Versão**: sequelize@6.37.5  
    **Link**: [Sequelize](https://sequelize.org/)
    
- **Docker**: Plataforma de conteinerização para criar, implantar e executar aplicações em ambientes isolados.  
    **Versão**: 27.3.1  
    **Link**: [Docker](https://www.docker.com/)
    
- **docker-compose**: Orquestração de múltiplos contêineres Docker.  
    **Versão**: 1.29.2  
    **Link**: [Docker Compose](https://docs.docker.com/compose/)
    

### Ferramentas para criar e hospedar a base de dados:

- **PostgreSQL**: Banco de dados relacional utilizado no projeto.  
    **Versão**: 16.6  
    **Link**: [PostgreSQL](https://www.postgresql.org/)
    
- **PgAdmin4**: Interface gráfica para gerenciamento e administração do banco de dados PostgreSQL.  
    **Versão**: 8.14  
    **Link**: [PgAdmin4](https://www.pgadmin.org/)
    

### Bibliotecas e ferramentas complementares:

- **bcrypt**: Biblioteca para hashing de senhas.  
    **Versão**: bcrypt@5.1.0  
    **Link**: [bcrypt](https://www.npmjs.com/package/bcrypt)
    
- **jsonwebtoken (JWT)**: Biblioteca para autenticação baseada em tokens.  
    **Versão**: jsonwebtoken@9.0.2  
    **Link**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    
- **dotenv**: Biblioteca para gerenciamento de variáveis de ambiente.  
    **Versão**: dotenv@16.1.4  
    **Link**: [dotenv](https://www.npmjs.com/package/dotenv)
    
- **nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.  
    **Versão**: nodemon@3.0.1  
    **Link**: [nodemon](https://www.npmjs.com/package/nodemon)
    
---

## Configuração do Ambiente

### Passos para Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/Matari73/AS65A-Grupo-4-BackEnd
   ```

2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com os campos exemplificados no `.env-example`
   
3. Faça a Build da aplicação:
   ```bash
    docker-compose up -d --build
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## Testando o Sistema

Os testes podem ser realizados usando a interface do front-end do sistema. Para acessar o repositório do front-end e seguir as instruções de configuração, acesse: [AS65A-Grupo-4-FrontEnd](https://github.com/Serg-Ale/AS65A-Grupo-4-FrontEnd).

### Conta de Acesso Padrão

O projeto possui um arquivo `seed.js` que insere um usuário do tipo `admin_master` no banco de dados com as seguintes credenciais:

- **Nome**: `admin_master`
- **Senha**: `sua_senha_segura_master`

Essas credenciais devem ser utilizadas para realizar o login na aplicação.

O arquivo `seed.js` também insere produtos, participantes e movimentações iniciais. Para realizar movimentações, é necessário que os produtos e participantes envolvidos sejam cadastrados previamente no sistema.

---
