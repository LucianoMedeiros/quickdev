# Projeto

> Criar um blog com as _features_ listadas abaixo:

## Users

- [x] Login
- [x] Criação de usuário
- [x] Editar usuário
- [x] Atualizar senha
- [x] Definir área restrita para o usuário

## Posts

- [x] Área comum [HOME] onde todos podem ler e interagir com os posts de todos os usuários
- [x] CRUD de Posts onde apenas o criador pode fazer alterações
- [x] Histórico de alterações
- [x] Contador de _Views_
- [x] _Likes_ e _Dislikes_ com contadores

## Comments

- [x] [Posts] - Cadastro e edição
- [x] [Posts] - Exclusão apenas pelo dono do **_post_** ou do **_comentário_** e colocar no lugar uma mensagem
- [ ] [Não deu tempo] - Notificar dono do _post_ que possui um novo comentário

# Stack de desenvolvimento

Escolhi esta stack pelo motivo de ter apenas 3 dias para construir a aplicação iteira. Então escolhi todos os itens abaixo pensando apenas em velocidade de entrega.

- **NextJS** com _Typescript_ tanto para o _Frontend_ quanto para o _Backend_
- **Firebase** para autenticação e armazenamento das imagens
- **MongoDB** para armazenamento de banco de dados
- **Vercel** para hospedagem

## Getting Started

First, run the development server:

# Firebase

No [Firebase Console](https://console.firebase.google.com/) você precisa ter criar os seguintes itens:

> Criar

- Projeto
  - App do Tipo WEB

> Configurar Módulos

- Authentication
  - Sign-in method: [E-mail/senha]
- Sorage
  - rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=\*\*} {
      allow read, write
    }
  }
}

```

> Variáveis de Ambiente referente ao Firebase

```js
NEXT_PUBLIC_FIREBASE_API_KEY = '...'
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = '...'
NEXT_PUBLIC_FIREBASE_PROJECT_ID = '...'
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = '...'
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '...'
NEXT_PUBLIC_FIREBASE_APP_ID = '...'
```

# Mongo DB

> Criar os seuintes itens no site do [mongodb](https://cloud.mongodb.com/)

- Cluster

  - Collection

> Variáveis de Ambiente referente ao MongoDB

```js
// A URI do banco pode ser obtida na aba Cmd Line Tools
NEXT_PUBLIC_MONGODB_URI = '...'
NEXT_PUBLIC_MONGODB_DATABASE_NAME = '...' // nome da collection criada
```

# Deploy

Eu publiquei na [Vercel](https://vercel.com/dashboard), mas poderia ser em outro server sem problemas.

Lá é preciso criar um project e vincular ele ao git onde está postado o projeto.

> Variáveis de Ambiente referente ao MongoDB

```js
// A URI do banco pode ser obtida na aba Cmd Line Tools
NEXT_PUBLIC_NEXT_API_BASE_URL = '...' // domínio de produção SEM o /api
```

A versão que eu publiquei está em: https://quikdev.vercel.app
