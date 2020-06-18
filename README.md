# Parking Backend

## Database

reset

```bash
yarn sequelize db:drop
yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

create & migrate

```bash
yarn sequelize db:create
yarn sequelize db:migrate
```

drop

```bash
yarn sequelize db:drop
```

add model

```bash
yarn sequelize model:generate --name=User --attributes=name:string,email:string
```

add seed

```bash
yarn sequelize seed:generate --name=default-users
```

run seed

```bash
yarn sequelize db:seed --name=test
```
