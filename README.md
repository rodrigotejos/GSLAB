# Gerenciador de produtos

<<<<<<< HEAD
Exemplo de gerenciador de produtos simples com autenticação em node.js

### guia de inicio

- Para rodar o porgrama deve-se ter instalado na maquina o [docker e docker compose](https://docs.docker.com/get-docker/)
=======
exemplo de gerenciador de produtos simples com autenticação em node.js

### guia de inicio

- Para rodar deve ter instalado o docker e docker compose
>>>>>>> 780ef928b4ce6639910ff7b1840252a9fe3ee43b

- Para iniciar o programa basta rodar:

```bash
docker-compose up
```

- Para parar:

```bash
docker-compose down
```

Apos o docker compose finalizar:

<<<<<<< HEAD
- Acessar o link: http://localhost:3000
=======
Acessar o link: http://localhost:3000
>>>>>>> 780ef928b4ce6639910ff7b1840252a9fe3ee43b

### Banco de dados

Usando seu gerenciador de banco de dados favorito rodar as query a seguir:
exemplo:
[DBeaver Community](https://dbeaver.io/)
[Beekeeper Studio](https://www.beekeeperstudio.io/)

Credencias:
- user: "postgres"
- database: "postgres"
- password: "postgres"
- host: "172.25.0.101"

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
