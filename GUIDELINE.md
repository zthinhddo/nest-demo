# I. Configuration
npm i --save @nestjs/config

## 1. YAML Option
npm i js-yaml
npm i -D @types/js-yaml

## 2. Schema validation
### 2.1 Custom validate function
- Create necessary ENV variables
- Create validate function

# II. Database
## 1. Setup TypeORM and Postgres
npm i --save @nestjs/typeorm typeorm pg

### ERROR: Unable to resolve signature of param of decor
https://github.com/microsoft/TypeScript/issues/52396

## 2. Using repository outside of the module which imports TypeOrmModule.forFeature
- Add TypeOrmModule to exports
- Add the wanted module to imports, providers, controllers

## 3. Relation: (1 - 1, 1-*/*-1, *-*)
## 4. Auto-load entities
## 5. Separating entitties (using schema)
## 6. 