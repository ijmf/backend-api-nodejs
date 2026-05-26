# backend-api-nodejs

> Projeto baseado no repositório original [QaCoders Academy](https://github.com/Qa-Coders/backend-api-nodejs), desenvolvido durante o curso de testes de API. Este repositório contém melhorias implementadas durante os estudos, incluindo refatoração do código de geração de massa de dados, criação da função `recommendationUpdate` para validação no PUT, e testes automatizados com `pm.test` rodados em 100 iterações via Collection Runner.

# backend-api-nodejs

API REST desenvolvida em Node.js para gerenciamento de recomendações. Projeto de estudo com foco em testes de API usando Postman.

## Tecnologias

- Node.js
- Express
- MongoDB / Mongoose
- Postman (testes e massa de dados)

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /status | Verifica se a API está online |
| POST | /api/recommendation | Cria uma recomendação |
| GET | /api/recommendation | Lista todas as recomendações |
| GET | /api/recommendation/:id | Busca uma recomendação por ID |
| PUT | /api/recommendation/:id | Atualiza uma recomendação |
| DELETE | /api/recommendation/:id | Remove uma recomendação |

## Regras de negócio

- Todo cadastro via POST inicia com `situation: "Pendente"` e `status: true`, independente do valor enviado no body
- O campo `fullName` exige nome e sobrenome — nomes simples são rejeitados
- O campo `description` aceita no máximo 500 caracteres
- O campo `stars` é obrigatório
- A alteração de `situation` e `status` só é possível via PUT

## Como executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

## Testes com Postman

A collection está disponível no arquivo `Postman.json` na raiz do projeto.

Para importar:
1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `Postman.json`
4. Configure o environment com a variável `baseUrl: http://127.0.0.1:3001`

Os testes foram executados com **100 iterações via Collection Runner**, totalizando **1600 testes com 0 falhas**.