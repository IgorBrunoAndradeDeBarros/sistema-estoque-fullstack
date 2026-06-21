# estoque

Sistema de gerenciamento de estoque, composto por:

- **backend** (`estoque-api`): API REST desenvolvida em [Quarkus](https://quarkus.io/) (Java)
- **frontend** (`estoque-front`): aplicação web desenvolvida em [Angular](https://angular.dev/)
- **postgres**: banco de dados PostgreSQL 17

Todo o ambiente é orquestrado via Docker Compose, facilitando a execução sem precisar instalar Java, Node ou Postgres localmente.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/) (já incluso no Docker Desktop)

## Como rodar

Na raiz do projeto, execute:

```shell script
docker-compose up --build
```

Esse comando irá:

1. Baixar a imagem do PostgreSQL e criar o banco `estoque_db`
2. Buildar a imagem da API (`backend/src/main/docker/Dockerfile.jvm`) e subir o container `estoque-api`
3. Buildar a imagem do frontend (`frontend/docker/Dockerfile`) e subir o container `estoque-front`
4. Conectar tudo na mesma rede, aguardando o banco estar saudável (`healthcheck`) antes de iniciar a API

## Serviços e portas

| Serviço         | Container         | Porta externa | Porta interna |
|-----------------|-------------------|----------------|----------------|
| PostgreSQL      | estoque-postgres  | 5433           | 5432           |
| API (Quarkus)   | estoque-api       | 8080           | 8080           |
| Frontend (Angular) | estoque-front  | 4200           | 80             |

## Acessando a aplicação

- **Frontend:** [http://localhost:4200](http://localhost:4200)
- **API:** [http://localhost:8080](http://localhost:8080)
- **Swagger UI (API):** [http://localhost:8080/q/swagger-ui](http://localhost:8080/q/swagger-ui)

## Variáveis de ambiente da API

Configuradas diretamente no `docker-compose.yml`:

```yaml
QUARKUS_DATASOURCE_JDBC_URL: jdbc:postgresql://postgres:5432/estoque_db
QUARKUS_DATASOURCE_USERNAME: postgres
QUARKUS_DATASOURCE_PASSWORD: admin123
```

## Persistência de dados

Os dados do PostgreSQL são persistidos no volume `estoque-postgres-data`, então eles não são perdidos ao reiniciar os containers.

## Parando os containers

```shell script
docker-compose down
```

Para parar e remover também os volumes (apaga os dados do banco):

```shell script
docker-compose down -v
```

## Rodando em background (modo detached)

```shell script
docker-compose up --build -d
```

Para ver os logs depois:

```shell script
docker-compose logs -f
```

## Estrutura do repositório

```
estoque/
├── backend/              # API Quarkus (estoque-api)
│   └── src/main/docker/
│       └── Dockerfile.jvm
├── frontend/              # Aplicação Angular (estoque-front)
│   └── docker/
│       └── Dockerfile
└── docker-compose.yml
```
