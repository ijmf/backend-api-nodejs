# backend-api-nodejs

> Projeto baseado no repositório original [QaCoders Academy](https://github.com/Qa-Coders/backend-api-nodejs), desenvolvido durante o curso de testes de API. Este repositório contém melhorias implementadas durante os estudos, incluindo refatoração do código de geração de massa de dados, criação da função `recommendationUpdate` para validação no PUT, testes automatizados com `pm.test` via Collection Runner e teste de carga com Grafana k6.

## Tecnologias

- Node.js
- Express
- MongoDB / Mongoose
- Postman (testes funcionais e massa de dados)
- Grafana k6 (testes de carga e performance)

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

## Testes de carga com k6

O script de carga está disponível em `k6/load-test-v2.js`.

### Pré-requisitos

- [Grafana k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) instalado

### Como executar

```bash
k6 run k6/load-test-v2.js
```

### Cenário

O teste simula o fluxo completo da API com 10 usuários simultâneos durante 2 minutos:

- 0–30s: rampa de 0 a 10 usuários
- 30s–1m30s: 10 usuários simultâneos
- 1m30s–2m: rampa de descida para 0

Cada iteração executa: **POST → GET por ID → DELETE**

### Resultados obtidos

| Métrica | Valor |
|--------|-------|
| Iterações completas | 908 |
| Checks executados | 4.540 |
| Checks com sucesso | 100% |
| Requisições com falha | 0% |
| Latência média | 4.42ms |
| P95 | 8.22ms |
| Requisições por segundo | 22 |

### Thresholds

- P95 abaixo de 500ms ✅
- Taxa de falha abaixo de 1% ✅