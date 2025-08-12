# kmind-apm

Plugin Node.js para OpenTelemetry com autoinstrumentação automática de traces e logger estruturado que inclui `traceId` e `spanId` para correlação de logs e traces no Grafana Tempo.

---

## Visão Geral

Este plugin facilita a instrumentação de aplicações Node.js para tracing distribuído com OpenTelemetry e fornece um logger que automaticamente correlaciona logs e traces via IDs. Além disso, traz middlewares prontos para Express e suporte a filtro global de exceções no NestJS.

---

## Funcionalidades

- Autoinstrumentação OpenTelemetry para Node.js (HTTP, DB, etc)
- Exportação OTLP via HTTP para Grafana Tempo (configurável)
- Logger JSON estruturado com `traceId` e `spanId`
- Captura automática de erros globais (`uncaughtException` e `unhandledRejection`)
- Middleware de log de requisições HTTP para Express (debugável via variável de ambiente)
- Middleware para tratamento de erros e 404 no Express
- Filtro global de exceções para NestJS compatível com o middleware de erro do plugin

---

## Instalação

```bash
npm install kmind-apm
