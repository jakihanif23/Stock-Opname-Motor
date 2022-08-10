# Stock-Opname-motorcycle


`` npx sequelize-cli
npx sequelize-cli model:generate --name motorcycle --attributes name:string,categoryId:integer,transmisi:string,cc:integer,stock:integer,price:integer

npx sequelize-cli model:generate --name category --attributes name:string

npx sequelize-cli model:generate --name input --attributes motorcycleId:integer,categoryId:integer,stock:integer

npx sequelize-cli model:generate --name output --attributes motorcycleId:integer,categoryId:integer,stock:integer

npx sequelize-cli model:generate --name report --attributes name:string,inputId:integer,outputId:integer,motorcycleId:integer,categoryId:integer

``