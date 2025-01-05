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
- **Node.js**: Ambiente de execução para JavaScript.

- **Express.js**: Framework web para criação de APIs RESTful.

- **Sequelize**: ORM para modelagem de dados e interação com o banco de dados.

- **PostgreSQL**: Banco de dados relacional utilizado no projeto.

- **Docker**: Contêinerização para ambiente de desenvolvimento/produção.

- **docker-compose**: Orquestração de múltiplos contêineres Docker.

- **PgAdmin4**: Interface gráfica para gerenciamento e administração do banco de dados PostgreSQL;

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

