# Verzel Filmes
Um aplicativo full-stack para buscar, favoritar e compartilhar seus filmes preferidos.

Bem-vindo ao Verzel Filmes! Esta é uma aplicação full-stack desenvolvida como parte de um teste técnico. A plataforma permite que os usuários pesquisem filmes, vejam seus detalhes (incluindo a nota do TMDb), criem uma lista de favoritos e compartilhem essa lista com outras pessoas através de um link exclusivo e QRCODE.

---
### Funcionalidades
#### Front-End
- Pesquisa de Filmes: Interface intuitiva para buscar filmes na vasta base de dados do The Movie Database (TMDb).
- Detalhes do Filme: Exibição de informações detalhadas sobre cada filme, com destaque para a nota de avaliação (rating).
- Gerenciamento de Favoritos: Adicione e remova filmes da sua lista pessoal de favoritos com um clique.
- Compartilhamento: Gere um link exclusivo para compartilhar sua lista de filmes favoritos com amigos.

#### Back-End
- API Gateway: Gerencia de forma segura e eficiente as chamadas para a API externa do TMDb.
- Autenticação e Usuários: Sistema de usuários para que cada pessoa tenha sua própria lista de favoritos..
- Persistência de Dados: Armazenamento robusto da lista de filmes favoritos em um banco de dados PostgreSQL.

---
### Tecnologias

- Containerização: Docker e Docker Compose
- Back-End: Node.js (com Express) e Prisma ORM
- Front-End: React (via Vite)
- Banco de Dados: PostgreSQL
- Deploy: Vercel (Front-end) e Render (Back-end + Banco de Dados)
---
### Acesso e Execução
O projeto pode ser acessado de duas formas: através do link de produção ou executando localmente em sua máquina.

### 1. Acesso em Produção (Deploy)
Você pode testar a aplicação diretamente pelo link abaixo:

Link da Aplicação: https://verzel-filmes-alpha.vercel.app/

Aviso Importante sobre o Backend:  O back-end e o banco de dados estão hospedados na versão free da plataforma Render. Isso significa que o servidor "dorme" após um período de inatividade.

Ao acessar a aplicação (ou realizar login/cadastro) pela primeira vez, pode levar de 30 a 50 segundos para o backend "acordar" e processar a solicitação. Por favor, aguarde esse tempo. Após o primeiro acesso, a navegação ocorrerá em velocidade normal.

### 2. Como Executar (Ambiente Local com Docker)

#### A. Clonando o Projeto
Primeiro, clone o repositório e acesse a branch correta para desenvolvimento (develop). A branch main reflete o código em produção.

```bash 
git clone https://github.com/PatrickPierre1/VerzelFilmes.git

cd verzelfilmes

git checkout develop
```

#### B. Pré-requisitos
Antes de começar, certifique-se de que você tem o Docker e o Docker Compose instalados:
- Instalar Docker
- Instalar Docker Compose

#### C. Variáveis de Ambiente
O back-end precisa de algumas variáveis de ambiente para se comunicar com a API do TMDb e para a segurança da aplicação. O arquivo docker-compose.yml já está configurado com valores de exemplo.
As variáveis necessárias são:

| Váriavel      | Descrição |
| ----------- | ----------- |
| DATABASE_URL:| URL de conexão com o banco de dados (já configurada para o serviço db).|
| TMDB_API_URL:| URL de conexão com o banco de dados (já configurada para o serviço db).|
| TMDB_BEARER_TOKEN:| Token de autorização para acessar a API do TMDb.|
| JWT_SECRET:| Segredo para a geração de tokens de autenticação (JWT).|

Observação: Os valores no docker-compose.yml são para fins de demonstração. Em um ambiente de produção, eles devem ser gerenciados de forma segura (por exemplo, usando arquivos .env). 

#### D. Construindo e Iniciando os Contêineres
Com o Docker em execução, abra um terminal na raiz do projeto e execute o seguinte comando:

```bash 
docker-compose up --build
```

O docker-compose up irá baixar as imagens necessárias (PostgreSQL e Node.js), construir as imagens para o backend e frontend, criar a rede e os volumes, e iniciar os três contêineres.

A flag --build garante que as imagens sejam reconstruídas caso haja alguma alteração nos Dockerfiles.

Ao iniciar, o serviço de backend executará automaticamente as migrações do Prisma (npx prisma migrate dev), criando as tabelas necessárias no banco de dados.

------------------------------------------------------------------------
#### E. Acessando a Aplicação Local
Após a conclusão do comando, os serviços estarão disponíveis nos seguintes endereços:

- Front-End (Aplicação Principal): http://localhost:5173
- Back-End (API): http://localhost:3000
- Banco de Dados (PostgreSQL): Acessível em localhost:5432

Credenciais do Banco(Acesso via DBeaver)
| Campo      | Valor |
| ----------- | ----------- |
| Usuário| Patrick|
| Senha| Patrick@1|
| Banco| verzel_db|
