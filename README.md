# Financial Management App

Este é um protótipo de um sistema para gestão financeira pessoal.

## Instalação

### Clonando o Repositório

Use o comando git clone:

```bash
git clone https://github.com/Gabriel-Cabeceira/finance-app.git
```

## Configuração do Front-end

- Navegue até o diretório do front-end:

```bash
cd finance-app-front-end
```
- Instale as dependências:

```bash
npm install
```
- Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Configuração do Back-end

- Navegue até o diretório do back-end:

```bash
cd finance-api
```
- Instale as dependências:

```bash
composer install
```
- Configure o arquivo .env:
```
Configure as variáveis de ambiente de acordo com seu Banco de Dados
```
- Execute as migrações do banco de dados:
```bash
php artisan migrate
```
- Inicie o servidor de desenvolvimento:
```bash
php artisan serve
```

## Uso

### Front-end

Acesse o front-end através do servidor de desenvolvimento do Vite. Por padrão, ele roda em http://localhost:3000.

### Back-end

A API do back-end estará disponível no endereço configurado, por padrão em http://localhost:8000.
