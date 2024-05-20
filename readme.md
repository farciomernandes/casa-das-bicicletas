[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

# **Casa Das Bicicletas**

<br /><br />

> ## Criacação de Migrations
  * npm run migration:create src/infra/db/typeorm/migrations/NOME_DA_MIGRATION
  * Configurar o webhook da asaas apontando para o endpoint POST /api/v1/order/payment-webhook
  * Para rodar as seeds criando a role de administrador e adicionando cidades e estados segundo o IBGE rode npm run seed

  > ## Erros comuns
  * Apagar tsconfig.build.tsbuildinfo caso o build não esteja sendo feito ao rodar npm run build
  * Verificar a tabela de migrations está vazia

  > ## Melhorias pendentes

  * Deve verificar status do correio
  * Get Order, retornar tambem: product (name e id) dentro de product_variables e city em address
  * Onde adicionar a informação de parcelamento? Qual entidade? Qual fluxo?
  * Considerar os juros quando o parcelamento for aplicado

  
  > ## Melhorias aplicadas
  
  * ~~Cria endpoint POST orders/calculate_interest para retornar os juros de um valor da order~~
  * ~~Deve apgar o objeto anterior do S3 na atualização dos itens~~
  * ~~User está retornando paginação com apenas os 10 items estáticos~~
  * ~~User não deve alterar no PUT os valores enviados como undefined~~
  * ~~Product deve pode alterar o category_id~~
  * ~~Get Product com parametro discount=true deve retornar produtos com pelo menos um product_variable com desconto~~
  * ~~Get Product, retornar paginação, e total de items~~
  * ~~Get Users filtragem por nome e cpf~~
  * ~~Get Order com paginação, total de items e total de paginas, parametros: name(nome do customer), status(status do order)~~
  * ~~Get Order realizar calculo do total usando price e o discount_price se existir discount_percent~~
  * ~~Tornar possivel status do order igual a null~~
  * ~~Adiciona status de envio no order chamado "shipping_status" com ENUM('PROCESSING', 'SENT' e null)
  * ~~Puts CATEGORY deve alterar as imagens~~

> ## Design Patterns

* Factory
* Dependency Injection


> ## Metodologias, Tecnologias e Designs

* TDD
* Clean Architecture
* DDD
* Conventional Commits
* Continuous Integration
* Server Side
* Gateway de pagamentos - Asaas
* Roles e Middlewares


> ## Para todar esse projeto

* Node 18
* NPM
* PostgreSQL
* Cadastro no Asaas para credenciais e webhook
* Cadastro na AWS para credenciais e bucket 

[![Code Style: Standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![License: GPLv3](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

