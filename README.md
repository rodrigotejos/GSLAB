# Gerenciador de produtos

Exemplo de gerenciador de produtos simples com autenticação em node.js

### guia de inicio

- Para rodar o porgrama deve-se ter instalado na maquina o [docker e docker compose](https://docs.docker.com/get-docker/)

- Para iniciar o programa basta rodar:

```bash
docker-compose up
```

- Para parar:

```bash
docker-compose down
```

Apos o docker compose finalizar:

- Acessar o link: http://localhost:3000

### Banco de dados

Usando seu gerenciador de banco de dados favorito rodar as query a seguir:

exemplos de gerenciadores de DB caso você queira conhecer alguns:
s

- [DBeaver Community](https://dbeaver.io/);

- [Beekeeper Studio](https://www.beekeeperstudio.io/);

Credenciais:

- user: "postgres"
- database: "postgres"
- password: "postgres"
- host: "localhost"

Criar a table de usuários:

```bash
create table db_usuario (
    id_usuario serial PRIMARY KEY,
	name VARCHAR ( 255 )  NOT NULL,
	password_hash VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) NOT NULL
);
```

Criar a tabela de produto:

```bash
create table db_produto (
    id_produto serial PRIMARY KEY,
	nome VARCHAR ( 255 )  NOT NULL,
	descri VARCHAR NOT NULL,
	valor VARCHAR ( 255 ) NOT NULL
);
```

### Funcionamento

O software permite que o usuario faça:

- login;
- Criar conta
- Listar Produtos na base da dados;
- Adicionar produtos;
- Alterar dados dos produtos;
- Remover produtos;

OBS: as apis são autenticadas por tokens jwt.

## License

[MIT](https://choosealicense.com/licenses/mit/)
