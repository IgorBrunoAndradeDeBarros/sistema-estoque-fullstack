# estoque-front

Frontend do sistema de gerenciamento de estoque, desenvolvido em [Angular](https://angular.dev/).

## Tecnologias

- Angular 21 (standalone, sem NgModules)
- SCSS para estilos
- Vitest para testes unitários
- Prettier para formatação de código

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão compatível com Angular 21, recomendado Node 20+)
- npm (vem junto com o Node.js)
- Angular CLI instalado globalmente (opcional, mas recomendado):

```shell script
npm install -g @angular/cli
```

## Instalando as dependências

Na raiz do projeto frontend, execute:

```shell script
npm install
```

## Rodando em modo desenvolvimento

Para iniciar o servidor de desenvolvimento com live reload:

```shell script
npm start
```

ou, usando o Angular CLI diretamente:

```shell script
ng serve
```

A aplicação ficará disponível em `http://localhost:4200/`. O servidor recarrega automaticamente sempre que algum arquivo do código-fonte for alterado.

> **Nota:** para que as requisições à API funcionem corretamente em modo de desenvolvimento, certifique-se de que a `estoque-api` (backend Quarkus) esteja rodando, normalmente em `http://localhost:8080`.

## Build de produção

Para gerar os artefatos de build (otimizados, com hashing de arquivos):

```shell script
npm run build
```

Os arquivos gerados ficam na pasta `dist/`.

## Build em modo watch (desenvolvimento)

Útil para gerar o build continuamente enquanto você desenvolve, sem otimizações:

```shell script
npm run watch
```

## Testes

Os testes unitários usam Vitest:

```shell script
npm test
```

## Estrutura do projeto

```
frontend/
├── public/              # Assets estáticos (copiados para o build)
├── src/
│   ├── app/              # Componentes, serviços, rotas, etc.
│   ├── main.ts            # Ponto de entrada da aplicação
│   └── styles.scss        # Estilos globais
├── angular.json           # Configuração do Angular CLI
├── package.json
└── tsconfig*.json
```

## Rodando via Docker

Este projeto possui um `Dockerfile` em `docker/Dockerfile`, utilizado pelo `docker-compose.yml` da raiz do projeto geral (`estoque`). Para rodar o frontend junto com a API e o banco de dados, veja o README do projeto principal.

Caso queira buildar a imagem isoladamente:

```shell script
docker build -t estoque-front -f docker/Dockerfile .
docker run -p 4200:80 estoque-front
```
