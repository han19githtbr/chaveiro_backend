<h1 align="center">Luis Gustavo REST API</h1>
<div align="center">
  <img width="auto" height="23em" src="https://img.shields.io/badge/TypeScript-323330?style=flat&logo=TypeScript">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Node.js-323330?style=flat&logo=Node.js">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Express.js-323330?style=flat&logo=express">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Prisma-323330?style=flat&logo=Prisma">
  <img width="auto" height="23em" src="https://img.shields.io/badge/MySQL-323330?style=flate&logo=mysql">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Vitest-323330?style=flat&logo=vitest">
</div>

## Pré-Requisitos

- NodeJS (v20.10.0) e npm (v10.2.3).
- MySQL (v8.0).

## Executando o projeto

01 - Instale as dependências:

```bash
$ npm install
```

02 - Configure as variáveis de ambiente:

- Crie uma copia do arquivo .env.example.
- Modifique o nome de uma copia para `.env` e preencha com as informações necessárias.

03 - Rode as migrations e seeds:

```bash
$ npm run prisma:migration
$ npm run prisma:seed
```

Confirme o Schema e o Banco de Dados: Verifique se o esquema do banco de dados está sincronizado com o modelo Prisma. Use:

```bash
$ npx prisma migrate dev

```

04 - Builde o projeto:

```bash
$ npm run build
```

05 - Inicie o projeto:

```bash
$ npm start
```

## Executando o projeto com docker (opcional)

01 - Configure as variáveis de ambiente:

- Importante se atentar com o valor do `DB_HOST`.

02 - Suba o projeto:

```bash
$ docker compose up
```

03 - Rode os seeds dentro do container da api:

```bash
$ docker exec -it [nome_do_container] bash
$ npm run prisma:seed
```

## Documentação

A documentação pode ser consultada através do endpoint: `/swagger`

## quando mudo de banco de dados(para atualizar o cliente prisma)

npx prisma generate

## Sincronizar o esquema do banco de dados (opcionalmente aplicando as migrações): Se você está iniciando um banco vazio:

npx prisma db push

## Caso já tenha migrações configuradas:

npx prisma migrate dev


## Configurando o firebase

npm install -g firebase-tools

firebase login

firebase init

firebase functions:config:set db.url="postgresql://handydev:dtx0os8UU7Z2PV_lGmEMFQ@andydev90-4338.jxf.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"

## para evitar o plano blaze

firebase emulators:start(Inicie o emulador)

http://localhost:5001/keybackend-eddbd/us-central1/<nomeDaSuaFuncao>