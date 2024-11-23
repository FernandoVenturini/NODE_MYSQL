COMO RODAR O PROJETO BAIXADO
Instalar todas as dedpendencias indicada pelo package.json
### npm install

SEQUENCIA PARA CRIAR O PROJETO
Criar o arquivo package
### npm init

Gerencia as requisicoes, rotas e URLs, entre outras funcionalidades
### npm install express

Rodar o projeto
### node app.js

Acessar o projeto no navegador
### http://localhost:8081

Instalar o modulo para reiniciar o servidor sempre que houver alteracao no codigo fonte, g significa globalmente
### npm install -g nodemon

Instalar o banco de dados MySQL
### npm install mysql2

Verificar o banco de dados MySQL no prompt de comando
### mysql -u root -p

Comandos basicos de MySQL
Criar a base de dados
### create database celke character set utf8mb4 collate utf8mb4_unicode_ci;

Criar a tabela
### CREATE TABLE `users`(
### 	`id` int NOT NULL auto_increment,
###     `name` varchar(220) collate utf8mb4_unicode_ci default null,
###     `email` varchar(220) collate utf8mb4_unicode_ci default null,
###     primary key (`id`)
### )engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

Rodar o projeto
### nodemon app.js

Selecionar registro no banco de dados:
### select id, name, email from users;

Cadastrar registro no banco de dados:
### insert into users (name, email) value ("Fernando", "lvfcode@.com");

Limitar quantidade de registros selecionado no banco de dados:
### select id, name, email from users limit 3;

Limitar a quantidade de registros selecionado no banco de dados e indicar o inicio: faz paginacao
### select id, name, email from users limit 2 offset 4;

Acrescentar condicao na busca de registros:
### select id, name, email from users where name = "Fernando";

Acrescentar mais de uma condicao na busca de registros:
### select id, name, email from users  where email = "lvfcode@.com" and name = 'Fernando' limit 1;
### select id, name, email from users  where email = "lvfcode@.com" or name = 'Fernando' limit 1;

Ordenar os registros retornado do banco de dados:
### select id, name, email from users order by id asc; Traz do primeiro para o ultimo
### select id, name, email from users order by id desc;  Traz do ultimo para o primeiro

Editar registro no banco de dados:
### update users set name = 'Cesar 3a', email='cesar3a@gmail.com' where id = 3;

Apagar registro no banco de dados:
### delete from users where id=7;

Sequelize e uma biblioteca JavaScript que facilita o gerenciamento de um banco de dados SQL:
### npm install --save sequelize

Instalar o drive do banco de dados:
### npm install --save mysql2

/* COMO CRIPTOGRAFAR A SENHA COM BCRYPTJS */
Instalar o modulo para criptografar a senha
### npm install --save bcryptjs

/* COMO GERAR E VALIDAR O TOKEN COM JWT */
### npm install --save jsonwebtoken

Gerenciar variaveis de ambiente:
### npm install --save dotenv