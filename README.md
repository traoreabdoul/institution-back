## Description

Projet de gestion de stock

## Installation

```bash
$ yarn add
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## How to migrate data

```bash
# generate a migration file
$ yarn typeorm migration:generate ./src/database/migrations/<NAME OF YOU MIGRATION>

# Run the migration
$ yarn typeorm migration:run

# Revert the migration
$ yarn typeorm migration:revert
```

## Deploy on Heroku

```bash
# Log in to Heroku
$ heroku login

#Log in to Container Registry
$ heroku container:login

# Push your Docker-based app
$ heroku container:push web -a app-name

Deploy the changes
$ heroku container:release web -a app-name
```
